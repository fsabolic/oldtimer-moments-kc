import { Component } from "solid-js";
import classes from "./masked-image.module.css";

interface MaskedImageProps {
  src: string;
  alt?: string;

  width: string;
  height: string;

  imageColor: string;
  backgroundColor: string;
}

const MaskedImage: Component<MaskedImageProps> = (props) => {
  return (
    <div
      class={classes.container}
      style={{
        width: props.width,
        height: props.height,
        "background-color": props.backgroundColor,
      }}
      aria-label={props.alt}
    >
      <div
        class={classes.mask}
        style={{
          "background-color": props.imageColor,
          "-webkit-mask-image": `url(${props.src})`,
          "mask-image": `url(${props.src})`,
        }}
      />
    </div>
  );
};

export default MaskedImage;
