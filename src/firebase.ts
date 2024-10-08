// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeLnLQe75Rzbai-F97QYvbsP99_aiNfWA",
  authDomain: "bamfclone.firebaseapp.com",
  projectId: "bamfclone",
  storageBucket: "bamfclone.appspot.com",
  messagingSenderId: "675385413150",
  appId: "1:675385413150:web:d9239c0bebde7bbc08e80f",
  measurementId: "G-N930S2FPB7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Example: Log an event
logEvent(analytics, 'notification_received'); // You can log different events here as per your requirement
