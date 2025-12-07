import { Component, For } from "solid-js";
import classes from "./hero-cover.module.css";

import BurstBadge from "../../components/burst-badge/BurstBadge";
import TitleRibbon from "../../components/title-ribbon/TitleRibbon";
import ShadowedTitle from "../../components/shadowed-title/ShadowedTitle";
import hypnoSpiral from "/oldtimer-moments-kc/assets/images/hypno-spiral.png";
import car from "/oldtimer-moments-kc/assets/images/ficho-hero.png";

const HeroCover: Component = () => {
  const bigTitleText = "OLDTIMER MOMENTS";
  const ribbonText = "Koprivnica";

  return (
    <div class={classes.heroContainer}>
      <img src={hypnoSpiral} class={classes.bgImage} />
      <div class={classes.centerPiece}>
        <ShadowedTitle text={bigTitleText} class={classes.bigTitle} />

        <BurstBadge
          class={classes.badge}
          pointCount={12}
          strokeWidth={10}
          opacity={0.6}
          size="70%"
          fill="var(--badge-fill)"
          stroke="var(--badge-stroke)"
        >
          <img class={classes.centerImage} src={car} />
        </BurstBadge>

        <TitleRibbon text={ribbonText} class={classes.ribbonTitle} />
      </div>
    </div>
  );
};

export default HeroCover;
