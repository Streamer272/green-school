import { getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "@firebase/auth";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBwokOILzago40HKeM7KOCuTjzdgAQpz2U",
  authDomain: "green-school-f3e14.firebaseapp.com",
  projectId: "green-school-f3e14",
  storageBucket: "green-school-f3e14.appspot.com",
  messagingSenderId: "999756024706",
  appId: "1:999756024706:web:54b12526acb338b9631d9b",
};

export function initFirebase() {
  initializeApp(FIREBASE_CONFIG);
}

export function useFirebase() {
  return getApp();
}

export function useFirestore() {
  return getFirestore();
}

export function useFireAuth() {
  return getAuth();
}
