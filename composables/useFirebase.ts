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

export interface Account {
  user: User | undefined;
  admin: boolean;
}

export function useUser() {
  return useState<Account | undefined>("user", () => {
    console.log("initing");
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
        console.log("checking");
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

export function useAuthGuard(apply: boolean | undefined = undefined) {
  const authGuard = useState("authGuard", () => false);

  if (apply !== undefined) {
    authGuard.value = apply;
  }
  return authGuard;
}
