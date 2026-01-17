import { JSX } from "solid-js";
import classes from "./stamp-div.module.css";

interface StampDivProps {
  children: JSX.Element;
  class?: string;
  style?: JSX.CSSProperties;
}

export function StampDiv(props: StampDivProps) {
  return (
    <div class={classes.wrapper} style={props.style}>
      <div class={classes.border} />
      <div class={`${classes.stamp} ${props.class ?? ""}`}>
        {props.children}
      </div>
    </div>
  );
}
