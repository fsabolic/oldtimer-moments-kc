import { Component, JSX } from "solid-js";
import ShadowedTitle from "../shadowed-title/ShadowedTitle";
import classes from "./fading-image-title.module.css";

type GradientDirection = "to bottom" | "to top" | "to left" | "to right";

interface FadingImageTitleProps {
  title: string;
  imageUrl: string;
  gradientDirection?: GradientDirection;
  class?: string;
  style?: JSX.CSSProperties;
}

const FadingImageTitle: Component<FadingImageTitleProps> = (props) => {
  const direction = props.gradientDirection ?? "to bottom";

  const maskStyle = {
    "-webkit-mask-image": `linear-gradient(${direction}, rgba(0,0,0,1), rgba(0,0,0,0))`,
    "mask-image": `linear-gradient(${direction}, rgba(0,0,0,1), rgba(0,0,0,0))`,
  };

  return (
    <div class={`${classes.wrapper} ${props.class ?? ""}`} style={props.style}>
      <div
        class={classes.image}
        style={{
          "background-image": `url(${props.imageUrl})`,
          ...maskStyle,
        }}
      />
      <ShadowedTitle
        text={props.title}
        class={classes.title}
        shadowColor="white"
      />
    </div>
  );
};

export default FadingImageTitle;
