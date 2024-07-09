import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

interface User {
  email: string;
  username: string;
  password: string;
}

const users: User[] = [];

app.post('/signup', async (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ error: 'Email, password, and username are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword, username });
  res.status(201).json({ message: 'User Registered' });
});

app.post('/login', async (req: Request, res: Response) => {
  const { identifier, password } = req.body;
  const user = users.find(u => u.email === identifier || u.username === identifier);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: 'Invalid Credentials' });
  }

  const token = jwt.sign({ email: user.email }, 'secret_key', { expiresIn: '1h' });
  res.json({ token });
});

app.get('/protected', (req: Request, res: Response) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Access Denied' });
  }

  try {
    const verified = jwt.verify(token, 'secret_key');
    req.user = verified;
    res.json({ message: 'Protected Data' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid Token' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
