import { Component, JSX } from "solid-js";
import classes from "./shadowed-title.module.css";

type ShadowedTitleProps = {
  text: string;
  class?: string;
  style?: JSX.CSSProperties;
};

const ShadowedTitle: Component<ShadowedTitleProps> = (props) => {
  return (
    <span
      class={`${classes.shadowedTitle} ${props.class ?? ""}`}
      style={props.style}
      data-text={props.text}
    >
      {props.text}
    </span>
  );
};

export default ShadowedTitle;
