import { Component, JSX } from "solid-js";
import classes from "./dotted-price-row.module.css";

interface DottedPriceRowProps {
  title: string;
  price: string;
  containerClass?: string;
  titleClass?: string;
  priceClass?: string;
  fontSize?: string;
  color?: string;
}

const DottedPriceRow: Component<DottedPriceRowProps> = (props) => {
  return (
    <li class={`${classes.dottedPriceRow} ${props.containerClass}`}>
      <span
        class={`${classes.title} ${props.titleClass}`}
        style={{ "font-size": props.fontSize, color: props.color }}
      >
        {props.title}
      </span>
      <span
        class={classes.dots}
        style={{ "font-size": props.fontSize, color: props.color }}
      />
      <span
        class={`${classes.price} ${props.priceClass}`}
        style={{ "font-size": props.fontSize, color: props.color }}
      >
        {props.price}
      </span>
    </li>
  );
};

export default DottedPriceRow;
