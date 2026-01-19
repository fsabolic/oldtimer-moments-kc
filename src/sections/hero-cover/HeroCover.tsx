import { Component, For } from "solid-js";
import classes from "./hero-cover.module.css";
import BurstBadge from "../../components/burst-badge/BurstBadge";
import TitleRibbon from "../../components/title-ribbon/TitleRibbon";
import ShadowedTitle from "../../components/shadowed-title/ShadowedTitle";
import hypnoSpiral from "/assets/images/hypno-spiral.png";
import car from "/assets/images/ficho-hero.png";
import { HandDrawnUnderline } from "../../components/hand-written-underline/HandwrittenUnderline";
import { ScrollId } from "../../models/ScrollId";

interface Position {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotate?: string;
}

interface UnderlineText {
  text: string;
  scrollId: ScrollId;
  position: Position;
}

const HeroCover: Component = () => {
  const bigTitleText = "OLDTIMER MOMENTS";
  const ribbonText = "Koprivnica";

  const underlinePositions: UnderlineText[] = [
    {
      text: "Malo o nama",
      position: { top: "10%", left: "10%", rotate: "-20deg" },
      scrollId: "about",
    },
    {
      text: "Slike i uspomene",
      position: { top: "10%", right: "10%", rotate: "20deg" },
      scrollId: "gallery",
    },
    {
      text: "Naša ponuda",
      position: { bottom: "20%", left: "10%", rotate: "20deg" },
      scrollId: "prices",
    },
    {
      text: "Javite nam se",
      position: { bottom: "20%", right: "10%", rotate: "-20deg" },
      scrollId: "contact",
    },
  ];

  const underlineClickHandler = (id: ScrollId) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    }
  };

  return (
    <div class={classes.heroContainer}>
      <For each={underlinePositions}>
        {(underline) => (
          <div
            onClick={() => underlineClickHandler(underline.scrollId)}
            class={classes.handDrawnUnderlineContainer}
            style={{
              rotate: `${underline.position.rotate}`,
              ...underline.position,
            }}
          >
            <HandDrawnUnderline
              strokeWidth={1.5}
              fontSize={2.5}
              maxWidth={20}
              text={underline.text}
            />
          </div>
        )}
      </For>
      <img src={hypnoSpiral} class={classes.bgImage} />
      <div class={classes.centerPiece}>
        <ShadowedTitle text={bigTitleText} class={classes.bigTitle} />
        <BurstBadge
          class={classes.badge}
          pointCount={12}
          strokeWidth={10}
          opacity={0.6}
          size="70%"
          fill="var(--hero-badge-fill)"
          stroke="var(--hero-badge-stroke)"
        >
          <img class={classes.centerImage} src={car} />
        </BurstBadge>
        <TitleRibbon text={ribbonText} class={classes.ribbonTitle} />
      </div>
    </div>
  );
};

export default HeroCover;
