import { Component, JSX } from "solid-js";
import classes from "./shadowed-title.module.css";

type ShadowedTitleProps = {
  text: string;
  textColor?: string;
  shadowColor?: string;
  class?: string;
  style?: JSX.CSSProperties;
};

const ShadowedTitle: Component<ShadowedTitleProps> = (props) => {
  return (
    <span
      class={`${classes.shadowedTitle} ${props.class ?? ""}`}
      style={{
        color: props.textColor,
        "text-shadow": `0.125rem 0.125rem 0.25rem ${props.shadowColor}`,
        ...props.style,
      }}
      data-text={props.text}
    >
      {props.text}
    </span>
  );
};

export default ShadowedTitle;
