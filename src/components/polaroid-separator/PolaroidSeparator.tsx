import { Component, createMemo, For } from "solid-js";
import PolaroidFrame from "../polaroid-frame/PolaroidFrame";
import classes from "./polaroid-separator.module.css";
import { windowWidthGlobal } from "../../global-store/WindowWidthGlobal";

type PolaroidData = {
  rotate: number;
  bottom: string;
  index: number;
};

const randomBetween = (min: number, max: number, seed: number) =>
  min + ((Math.sin(seed) + 1) / 2) * (max - min);

const POLAROID_WIDTH = 150;
const LEFT_OFFSET = -50;
const BOTTOM_RANGE = [-120, -100];
const ROTATE_RANGE = [-50, 50];

const PolaroidSeparator: Component = () => {
  const polaroidCount = createMemo(() =>
    Math.max(1, Math.ceil(windowWidthGlobal() / POLAROID_WIDTH))
  );

  const polaroids = createMemo<PolaroidData[]>(() =>
    Array.from({ length: polaroidCount() }, (_, index) => ({
      index,
      rotate: randomBetween(ROTATE_RANGE[0], ROTATE_RANGE[1], (index + 1) * 17),
      bottom: `${
        randomBetween(BOTTOM_RANGE[0], BOTTOM_RANGE[1], index * 31) / 16
      }rem`,
    }))
  );

  const getLeft = (index: number) =>
    polaroidCount() <= 1
      ? `${LEFT_OFFSET / 16}rem`
      : `${
          (LEFT_OFFSET +
            (index / (polaroidCount() - 1)) * (windowWidthGlobal() + 40)) /
          16
        }rem`;

  return (
    <div class={classes.container}>
      <For each={polaroids()}>
        {(p) => (
          <PolaroidFrame
            class={classes.polaroidComponent}
            rotate={p.rotate}
            style={{
              left: getLeft(p.index),
              bottom: p.bottom,
            }}
          />
        )}
      </For>
    </div>
  );
};

export default PolaroidSeparator;
