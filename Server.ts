import express, { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/quizapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// User Schema and Model
interface IUser extends mongoose.Document {
  email: string;
  username: string;
  password: string;
  incorrectAnswers: Array<{ questionId: string, attempts: number }>;
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  incorrectAnswers: [
    {
      questionId: String,
      attempts: Number,
    },
  ],
});

const User = mongoose.model<IUser>('User', userSchema);

// Extend the Request interface
interface CustomRequest extends express.Request {
  user?: JwtPayload;
}

interface JwtPayload {
  userId: string;
}

// Routes
app.post('/signup', async (req: express.Request, res: Response) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ error: 'Email, password, and username are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = new User({ email, password: hashedPassword, username });
    await newUser.save();
    res.status(201).json({ message: 'User Registered' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

app.post('/login', async (req: express.Request, res: Response) => {
  const { identifier, password } = req.body;
  const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: 'Invalid Credentials' });
  }

  const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
  res.json({ token });
});

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Access Denied' });
  }

  try {
    const verified = jwt.verify(token, 'secret_key') as JwtPayload;
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid Token' });
  }
};

app.get('/protected', authMiddleware, (_req: CustomRequest, res: Response) => {
  res.json({ message: 'Protected Data' });
});

// Route to update user statistics
app.post('/update-statistics', authMiddleware, async (req: CustomRequest, res: Response) => {
  const { questionId, correct } = req.body;
  const user = await User.findById(req.user?.userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const questionStat = user.incorrectAnswers.find(stat => stat.questionId === questionId);

  if (correct) {
    if (questionStat) {
      user.incorrectAnswers = user.incorrectAnswers.filter(stat => stat.questionId !== questionId);
    }
  } else {
    if (questionStat) {
      questionStat.attempts += 1;
    } else {
      user.incorrectAnswers.push({ questionId, attempts: 1 });
    }
  }

  await user.save();
  res.json({ message: 'Statistics updated' });
});

// Route to get user statistics
app.get('/statistics', authMiddleware, async (req: CustomRequest, res: Response) => {
  const user = await User.findById(req.user?.userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ incorrectAnswers: user.incorrectAnswers });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
