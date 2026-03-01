import ShadowedTitle from "../shadowed-title/ShadowedTitle";
import styles from "./flip-card.module.css";
import textures from "../../styles/textures.module.css";
import PolaroidFrame from "../polaroid-frame/PolaroidFrame";
import BurstBadge from "../burst-badge/BurstBadge";
import {
  PricingExtras,
  PricingPackage,
} from "../../models/text-jsons/PricingTextJson";
import { For } from "solid-js";
import DottedPriceRow from "../dotted-price-row/DottedPriceRow";
import { getApiImage } from "../../util/getApiImage";

interface FlipCardProps {
  packages: PricingPackage;
  extras: PricingExtras;
  title: string;
  bandColor?: string;
  width?: string;
  height?: string;
  scalingFactor?: number;
  image?: string;
  onClick?: () => void;
}

export default function FlipCard(props: FlipCardProps) {
  const handleCardClick = () => {
    if (props.onClick) props.onClick();
  };

  return (
    <div
      class={styles.card}
      onClick={handleCardClick}
      style={{
        "--width": props.width ?? "18.75rem",
        "--height": props.height ?? "25rem",
        "--scaling-factor": props.scalingFactor ?? "1.35",
        "--bg-color": props.bandColor,
      }}
    >
      <div class={styles.leftSideContainer}>
        {/*--- O U T S I D E   P A G E ---*/}
        <div class={styles.outsidePage}>
          {props.bandColor && (
            <div
              class={styles.outsidePageCornerDecoration}
              style={{ background: props.bandColor }}
            ></div>
          )}
          <div
            class={`${textures.floralMaskBg} ${styles.outsidePageContent}  ${textures.rundownTexture}`}
          >
            <div class={styles.titleContainer}>
              <ShadowedTitle
                text={props.title}
                class={styles.shadowedTitle}
                textColor={"var(--flip-card-outside-text)"}
                shadowColor={"var(--flip-card-outside-text-shadow)"}
              />
            </div>
          </div>
        </div>
        {/*--- L E F T   P A G E ---*/}
        <div class={styles.insideLeftPage}>
          <div
            class={`${styles.insideLeftPageContent} ${textures.rundownTexture}`}
          >
            <p class={styles.packageName}>{props.packages.name} </p>
            <div class={styles.benefits}>
              <For each={props.packages.benefits}>
                {(item) => (
                  <div class={styles.benefitItem}>
                    <p> &#10170;</p>
                    <p> {item}</p>
                  </div>
                )}
              </For>
            </div>
            {props.packages.price ? (
              <div class={styles.priceBadgeContainer}>
                <BurstBadge
                  fill={`color-mix(in srgb, ${props.bandColor} 15%, white 5%)`}
                  stroke={"var(--flip-card-inside-left-price-badge-stroke)"}
                  strokeWidth={5}
                  size="6.25rem"
                  pointCount={10}
                  spin={true}
                >
                  <ShadowedTitle
                    text={props.packages.price + "€"}
                    shadowColor="var(--flip-card-inside-left-price-badge-text-shadow)"
                    textColor={"var(--flip-card-inside-left-price-badge-text)"}
                    style={{
                      "font-size": "var(--font-size-xm)",
                    }}
                  />
                </BurstBadge>
              </div>
            ) : (
              <div style={{ height: "3rem" }}></div>
            )}
          </div>
        </div>
      </div>

      {/*--- R I G H T   P A G E ---*/}
      <div class={`${styles.insideRightPage}`}>
        <div
          class={`${styles.insideRightPageContent} ${textures.rundownTexture}`}
        >
          {props.image && (
            <div class={styles.polaroidContainer}>
              <PolaroidFrame
                src={getApiImage(props.image, 175, 175)}
                topTape={true}
                rotate={Math.random() * 10 - 5}
                alt={props.packages.name}
              />
            </div>
          )}
          <div class={styles.extrasContainer}>
            <p class={styles.extrasTitle}>{props.extras.title}</p>
            <ul class={styles.extrasItemList}>
              <For each={props.extras.items}>
                {(item) => (
                  <DottedPriceRow
                    title={item.name}
                    price={item.price}
                    containerClass={styles.dottedPriceRow}
                    fontSize="var(--font-size-xxs)"
                    color="var(--flip-card-inside-right-important-text)"
                  />
                )}
              </For>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
