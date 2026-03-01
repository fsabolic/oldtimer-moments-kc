import { Component, createMemo, createSignal, For, onMount } from "solid-js";
import PolaroidFrame from "../polaroid-frame/PolaroidFrame";
import classes from "./polaroid-separator.module.css";
import {
  isMobile,
  windowWidthGlobal,
} from "../../global-store/WindowWidthGlobal";

type PolaroidData = {
  rotate: number;
  bottom: string;
  index: number;
};

const randomBetween = (min: number, max: number, seed: number) =>
  min + ((Math.sin(seed) + 1) / 2) * (max - min);

const PolaroidSeparator: Component = () => {
  const POLAROID_WIDTH = createMemo(() => (isMobile() ? 50 : 150));
  const LEFT_OFFSET = createMemo(() => (isMobile() ? -10 : -50));
  const BOTTOM_RANGE = createMemo(() => (isMobile() ? [-40, 0] : [-120, -100]));
  const ROTATE_RANGE = createMemo(() => (isMobile() ? [-50, 50] : [-50, 50]));

  const [animateIn, setAnimateIn] = createSignal(false);

  onMount(() => {
    requestAnimationFrame(() => setAnimateIn(true));
  });

  const polaroidCount = createMemo(() =>
    Math.max(1, Math.ceil(windowWidthGlobal() / POLAROID_WIDTH())),
  );

  const polaroids = createMemo<PolaroidData[]>(() =>
    Array.from({ length: polaroidCount() }, (_, index) => ({
      index,
      rotate: randomBetween(
        ROTATE_RANGE()[0],
        ROTATE_RANGE()[1],
        (index + 1) * 17,
      ),
      bottom: `${
        randomBetween(BOTTOM_RANGE()[0], BOTTOM_RANGE()[1], index * 31) / 16
      }rem`,
    })),
  );

  const getLeft = (index: number) =>
    polaroidCount() <= 1
      ? `${LEFT_OFFSET() / 16}rem`
      : `${
          (LEFT_OFFSET() +
            (index / (polaroidCount() - 1)) * (windowWidthGlobal() + 40)) /
          16
        }rem`;

  const getStaggerDelay = (index: number) => `${Math.min(index * 0.04, 0.8)}s`;

  return (
    <div class={classes.container}>
      <For each={polaroids()}>
        {(p) => (
          <PolaroidFrame
            class={`${classes.polaroidComponent} ${
              animateIn() ? "animateFadeIn" : "animateHidden"
            }`}
            rotate={p.rotate}
            style={{
              left: getLeft(p.index),
              bottom: p.bottom,
              "animation-delay": animateIn()
                ? getStaggerDelay(p.index)
                : undefined,
            }}
          />
        )}
      </For>
    </div>
  );
};

export default PolaroidSeparator;
