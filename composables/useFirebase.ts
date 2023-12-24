import { getApp, initializeApp } from "firebase/app";
import {
  doc,
  getDoc,
  getFirestore,
  initializeFirestore,
} from "firebase/firestore";
import { getAuth, type User } from "@firebase/auth";
import { getStorage } from "@firebase/storage";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBwokOILzago40HKeM7KOCuTjzdgAQpz2U",
  authDomain: "green-school-f3e14.firebaseapp.com",
  projectId: "green-school-f3e14",
  storageBucket: "green-school-f3e14.appspot.com",
  messagingSenderId: "999756024706",
  appId: "1:999756024706:web:54b12526acb338b9631d9b",
};

export function initFirebase() {
  const app = initializeApp(FIREBASE_CONFIG);
  initializeFirestore(app, {
    ignoreUndefinedProperties: true,
  });
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

export function useFireStorage() {
  return getStorage();
}

export interface Account {
  user: User | undefined;
  admin: boolean;
}

export function useUser() {
  return useState<Account | undefined>("user", () => {
    return undefined;
  });
}

export function initFireAuth() {
  const auth = useFireAuth();
  const user = useUser();
  const authGuard = useAuthGuard();

  auth.onAuthStateChanged((data) => {
    if (data === null) {
      user.value = {
        user: undefined,
        admin: false,
      };

      if (authGuard.value) {
        navigateTo("/");
      }
      return;
    }

    getDoc(doc(useFirestore(), "accounts", data.uid))
      .then((snapshot) => {
        const admin = snapshot.data()?.admin ?? false;
        if (authGuard.value && !admin) {
          navigateTo("/");
        }

        user.value = {
          user: data,
          admin: admin,
        };
      })
      .catch(() => {
        if (authGuard.value) {
          navigateTo("/");
        }

        user.value = {
          user: data,
          admin: false,
        };
      });
  });
}

export function useAuthGuard(enforce?: boolean) {
  const authGuard = useState("authGuard", () => false);

  if (enforce !== undefined) {
    authGuard.value = enforce;
  }
  return authGuard;
}
