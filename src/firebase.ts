// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const apiKey = import.meta.env.apiKey
const authDomain = import.meta.env.authDomain
const projectId = import.meta.env.projectId
const storageBucket = import.meta.env.storageBucket
const messagingSenderId = import.meta.env.messagingSenderId
const appId = import.meta.env.appId
const measurementId = import.meta.env.measurementId

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Example: Log an event
logEvent(analytics, 'notification_received'); // You can log different events here as per your requirement
