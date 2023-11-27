import { getApp, initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth, type User } from "@firebase/auth";

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

interface Account {
  user: User | undefined;
  admin: boolean;
}

export function useUser() {
  return useState<Account | undefined>("user", () => undefined);
}

export function initFireAuth() {
  const auth = useFireAuth();
  const user = useUser();

  auth.onAuthStateChanged((data) => {
    if (data === null) {
      user.value = {
        user: undefined,
        admin: false,
      };
      return;
    }

    getDoc(doc(useFirestore(), "accounts", data.uid))
      .then((snapshot) => {
        const admin = snapshot.data()?.admin ?? false;
        user.value = {
          user: data,
          admin: admin,
        };
      })
      .catch(() => {
        user.value = {
          user: data,
          admin: false,
        };
      });
  });
}

export function useAuthGuard(path: string = "/") {
  const user = useUser();
  if (!user.value || !user.value?.admin) {
    navigateTo(path);
  }
}
