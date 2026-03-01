import {
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  type Component,
} from "solid-js";
import HeroCover from "./sections/hero-cover/HeroCover";
import PolaroidSeparator from "./components/polaroid-separator/PolaroidSeparator";
import { setWindowWidthGlobal } from "./global-store/WindowWidthGlobal";
import About from "./sections/about/About";
import Contacts from "./sections/contacts/Contacts";
import Gallery from "./sections/gallery/Gallery";
import Pricing from "./sections/pricing/Pricing";
import { createSkinning } from "./hooks/createSkinning";
import LoadingScreen from "./sections/loading-screen/LoadingScreen";
import "./styles/animations.css";

const App: Component = () => {
  const { skinningLoaded } = createSkinning();

  const handler = (event: Event) => {
    setWindowWidthGlobal(window.innerWidth);
  };
  onMount(() => {
    window.addEventListener("resize", handler);
  });

  onCleanup(() => {
    window.removeEventListener("resize", handler);
  });

  const [calcStyle, setCalcStyle] = createSignal("standard");

  createEffect(() => {
    const body = document.body;

    body.classList.add("variables");
    body.classList.remove("standard", "compact", "whatever-else");
    body.classList.add(calcStyle());

    onCleanup(() => {
      body.classList.remove("variables", calcStyle());
    });
  });

  return (
    <>
      {!skinningLoaded() ? (
        <LoadingScreen />
      ) : (
        <>
          <main>
            <HeroCover />
            <PolaroidSeparator />
            <About />
            <Gallery />
            <Pricing />
            <Contacts />
          </main>
        </>
      )}
    </>
  );
};

export default App;
