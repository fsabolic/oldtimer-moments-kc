import { Component } from "solid-js";
import classes from "./title-ribbon.module.css";
import texture from "../../styles/textures.module.css";

const TitleRibbon: Component<{}> = (props) => {
  return (
    <div class={classes.titleRibbonContainer}>
      <div
        class={`${classes.edge} ${classes.leftEdge} ${texture.rundownTexture}`}
      ></div>
      <div class={classes.centerPiece}>
        <div class={classes.shadowContainer}>
          <div class={`${classes.shadow} ${classes.leftShadow}`}></div>
          <div class={`${classes.shadow} ${classes.rightShadow}`}></div>
        </div>
        <div class={`${classes.centerBanner} ${texture.rundownTexture}`}>
          <p class={classes.titleText}>Čiškalićžkđa popo</p>
        </div>
      </div>
      <div
        class={`${classes.edge} ${classes.rightEdge}  ${texture.rundownTexture}`}
      ></div>
    </div>
  );
};

export default TitleRibbon;
