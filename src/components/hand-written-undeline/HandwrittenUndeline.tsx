import { Component, onMount, createSignal } from "solid-js";
import classes from "./hand-written-underline.module.css";

type HandDrawnUnderlineProps = {
  text: string;
  strokeWidth?: number;
  fontSize?: number;
  maxWidth?: number;
};

export const HandDrawnUnderline: Component<HandDrawnUnderlineProps> = (
  props
) => {
  let textRef!: HTMLParagraphElement;

  const [metrics, setMetrics] = createSignal({
    width: 0,
    height: 0,
  });

  onMount(() => {
    setMetrics({
      width: textRef.offsetWidth,
      height: textRef.offsetHeight,
    });
  });

  const underlineHeight = () => {
    const base = 10;
    return Math.max(base, metrics().height * 0.25);
  };

  return (
    <>
      <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path
            id="underline-spring"
            d="M2 6c40 2 80 3 120 2-38 2-75 4-110 6 36-1 72-1 108 0"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            vector-effect="non-scaling-stroke"
          />
        </defs>
      </svg>

      <span class={classes.handDrawnUnderline}>
        <p
          ref={textRef}
          class={classes.handDrawnUnderlineText}
          style={{
            "font-size": `${props.fontSize}rem`,
            "max-width": `${props.maxWidth}rem`,
          }}
        >
          {props.text}
        </p>

        <svg
          viewBox="0 0 130 16"
          preserveAspectRatio="none"
          class={classes.handDrawnUnderlineSvg}
          style={{
            bottom: `-${underlineHeight() * 0.6}px`,
            width: `${metrics().width}px`,
            height: `${underlineHeight()}px`,
          }}
        >
          <use
            href={`#underline-spring`}
            stroke-width={props.strokeWidth ?? 3}
          />
        </svg>
      </span>
    </>
  );
};
