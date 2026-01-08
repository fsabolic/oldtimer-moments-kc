import { Component, JSX, splitProps } from "solid-js";
import classes from "./polaroid-frame.module.css";
import textures from "../../styles/textures.module.css";
import tape from "/assets/images/clear-tape.png";
interface PolaroidFrameProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "style"> {
  style?: JSX.CSSProperties;
  src?: string;
  width?: JSX.CSSProperties["width"];
  height?: JSX.CSSProperties["height"];
  rotate?: number;
  sideTape?: boolean;
  topTape?: boolean;
}

const PolaroidFrame: Component<PolaroidFrameProps> = (props) => {
  const [local, divProps] = splitProps(props, [
    "src",
    "width",
    "height",
    "rotate",
    "class",
    "style",
    "sideTape",
    "topTape",
  ]);

  const mergedStyle: JSX.CSSProperties = {
    width: local.width,
    height: local.height,
    transform: local.rotate ? `rotate(${local.rotate}deg)` : undefined,
    ...local.style,
  };

  return (
    <>
      <div
        {...divProps}
        class={[classes.polaroidContainer, textures.rundownTexture, local.class]
          .filter(Boolean)
          .join(" ")}
        style={mergedStyle}
      >
        {local.sideTape && (
          <>
            <img
              src={tape}
              class={`${classes.tape} ${classes.leftCornerTape}`}
            />

            <img
              src={tape}
              class={`${classes.tape} ${classes.rightCornerTape}`}
            />
          </>
        )}
        {local.topTape && (
          <>
            <img src={tape} class={`${classes.tape} ${classes.topTape}`} />
          </>
        )}
        <div class={classes.imageContainer}>
          {local.src ? (
            <img src={local.src} class={classes.image} />
          ) : (
            <div class={classes.image} />
          )}
        </div>
      </div>
    </>
  );
};

export default PolaroidFrame;
