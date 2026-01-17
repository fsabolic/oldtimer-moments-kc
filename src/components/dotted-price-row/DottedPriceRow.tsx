import { Component, JSX } from "solid-js";
import classes from "./dotted-price-row.module.css";

interface DottedPriceRowProps {
  title: string;
  price: string;
  class?: string;
  style?: JSX.CSSProperties;
}

const DottedPriceRow: Component<DottedPriceRowProps> = (props) => {
  return (
    <div class={`${classes.dottedPriceRow} ${props.class}`} style={props.style}>
      <span class={classes.title}>{props.title}</span>
      <span class={classes.dots} />
      <span class={classes.price}>{props.price}</span>
    </div>
  );
};

export default DottedPriceRow;
