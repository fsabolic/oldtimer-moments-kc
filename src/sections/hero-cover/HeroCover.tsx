import { Component, For } from "solid-js";
import classes from "./hero-cover.module.css";
import BurstBadge from "../../components/burst-badge/BurstBadge";
import TitleRibbon from "../../components/title-ribbon/TitleRibbon";
import ShadowedTitle from "../../components/shadowed-title/ShadowedTitle";
import hypnoSpiral from "/assets/images/hypno-spiral.webp";
import car from "/assets/images/ficho-hero.webp";
import { HandDrawnUnderline } from "../../components/hand-written-underline/HandwrittenUnderline";
import { ScrollId } from "../../models/ScrollId";
import { useSkinningStore } from "../../global-store/SkinningStore";
import { isMobile } from "../../global-store/WindowWidthGlobal";

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
  const skinning = useSkinningStore();
  const bigTitleText = skinning.heroSkinning.textJson.title;
  const ribbonText = skinning.heroSkinning.textJson.subtitle;

  const underlinePositions: UnderlineText[] = [
    {
      text: skinning.heroSkinning.textJson.navigation.aboutUs,
      position: isMobile()
        ? { top: "10%", left: "5%", rotate: "-20deg" }
        : { top: "10%", left: "10%", rotate: "-20deg" },
      scrollId: "about",
    },
    {
      text: skinning.heroSkinning.textJson.navigation.gallery,
      position: isMobile()
        ? { top: "10%", right: "5%", rotate: "20deg" }
        : { top: "10%", right: "10%", rotate: "20deg" },
      scrollId: "gallery",
    },
    {
      text: skinning.heroSkinning.textJson.navigation.pricing,
      position: isMobile()
        ? { bottom: "15%", left: "5%", rotate: "20deg" }
        : { bottom: "20%", left: "10%", rotate: "20deg" },
      scrollId: "prices",
    },
    {
      text: skinning.heroSkinning.textJson.navigation.contactUs,
      position: isMobile()
        ? { bottom: "15%", right: "5%", rotate: "-20deg" }
        : { bottom: "20%", right: "10%", rotate: "-20deg" },
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
              strokeWidth={isMobile() ? 1 : 1.5}
              fontSize={isMobile() ? 1.5 : 2.5}
              maxWidth={isMobile() ? 10 : 20}
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
