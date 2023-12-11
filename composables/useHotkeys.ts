import hotkeys from "hotkeys-js";
import { type Auth, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import type { Account } from "~/composables/useFirebase";

export function useHotkeys(user: Account | undefined, auth: Auth) {
  hotkeys("ctrl+e", (event) => {
    event.preventDefault();

    if (!user?.user) {
      const provider = new GoogleAuthProvider();
      auth.useDeviceLanguage();

      signInWithPopup(auth, provider).then(() => {
        navigateTo("/admin");
      });
    } else {
      navigateTo("/admin");
    }
  });
}
