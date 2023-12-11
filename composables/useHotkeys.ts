import hotkeys from "hotkeys-js";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";

export function useHotkeys() {
  const user = useUser();
  const auth = useFireAuth();
  const info = useInfo();

  hotkeys("ctrl+e", (event) => {
    event.preventDefault();

    if (!user.value?.user) {
      const provider = new GoogleAuthProvider();
      auth.useDeviceLanguage();

      signInWithPopup(auth, provider).then(() => {
        navigateTo("/admin");
      });
    } else {
      navigateTo("/admin");
    }
  });

  hotkeys("ctrl+i", (event) => {
    event.preventDefault();
    info.value = !info.value;
  });
}
