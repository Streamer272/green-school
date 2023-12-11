import hotkeys from "hotkeys-js";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { useProjects } from "~/composables/useStates";

export function useHotkeys() {
  const user = useUser();
  const auth = useFireAuth();
  const info = useInfo();
  const projects = useProjects();

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

  hotkeys("ctrl+p", (event) => {
    event.preventDefault();
    projects.value = !projects.value;
  });
}
