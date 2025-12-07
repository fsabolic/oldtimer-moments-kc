import { onCleanup, onMount, type Component } from "solid-js";
import HeroCover from "./sections/hero-cover/HeroCover";
import PolaroidSeparator from "./components/polaroid-separator/PolaroidSeparator";
import { setWindowWidthGlobal } from "./global-store/WindowWidthGlobal";
import classes from "./app.module.css";

const App: Component = () => {
  const handler = (event: Event) => {
    setWindowWidthGlobal(window.innerWidth);
  };
  onMount(() => {
    window.addEventListener("resize", handler);
  });

  onCleanup(() => {
    window.removeEventListener("resize", handler);
  });
  return (
    <div class={classes.appContainer}>
      <HeroCover />
      <PolaroidSeparator />
    </div>
  );
};

export default App;
