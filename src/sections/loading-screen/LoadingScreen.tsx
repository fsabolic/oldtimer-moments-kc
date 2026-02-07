import { Component, createSignal, onCleanup, onMount } from "solid-js";
import BurstBadge from "../../components/burst-badge/BurstBadge";
import classes from "./loading-screen.module.css";

const LoadingScreen: Component<{}> = (props) => {
  const [ellipses, setEllipses] = createSignal(".");

  onMount(() => {
    const interval = setInterval(() => {
      setEllipses((prev) => (prev.length === 3 ? "." : prev + "."));
    }, 500);

    onCleanup(() => clearInterval(interval));
  });
  return (
    <div class={classes.loadingScreen}>
      <div class={classes.loadingCenterPiece}>
        <BurstBadge
          fill="var(--loading-screen-badge-fill)"
          stroke="var(--loading-screen-badge-stroke)"
          size="large"
          pointCount={12}
          spin={true}
          class={classes.spinningBadge}
        />
        <h1 class={classes.loadingText}>Palimo pilu{ellipses()}</h1>
      </div>
    </div>
  );
};

export default LoadingScreen;
