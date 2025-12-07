import { Component, JSX, mergeProps } from "solid-js";
import classes from "./title-ribbon.module.css";
import texture from "../../styles/textures.module.css";

interface TitleRibbonProps extends JSX.HTMLAttributes<HTMLDivElement> {
  text: string;
}

const TitleRibbon: Component<TitleRibbonProps> = (props) => {
  return (
    <div {...props} class={`${classes.titleRibbonContainer} ${props.class}`}>
      <div
        class={`${classes.edge} ${classes.leftEdge} ${texture.rundownTexture}`}
      ></div>
      <div class={classes.centerPiece}>
        <div class={classes.shadowContainer}>
          <div class={`${classes.shadow} ${classes.leftShadow}`}></div>
          <div class={`${classes.shadow} ${classes.rightShadow}`}></div>
        </div>
        <div class={`${classes.centerBanner} ${texture.rundownTexture}`}>
          <p class={classes.titleText}>{props.text}</p>
        </div>
      </div>
      <div
        class={`${classes.edge} ${classes.rightEdge}  ${texture.rundownTexture}`}
      ></div>
    </div>
  );
};

export default TitleRibbon;
