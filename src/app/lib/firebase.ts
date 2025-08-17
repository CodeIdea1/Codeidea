// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDXh4k5q0wDAii3y5ia5cAtZd37qv0Lyr4",
  authDomain: "codeidea-1a8fc.firebaseapp.com",
  databaseURL: "https://codeidea-1a8fc-default-rtdb.firebaseio.com",
  projectId: "codeidea-1a8fc",
  storageBucket: "codeidea-1a8fc.firebasestorage.app",
  messagingSenderId: "522567476469",
  appId: "1:522567476469:web:7884e4c86273d8c22951bc"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Get Realtime Database instance
export const database = getDatabase(app);
