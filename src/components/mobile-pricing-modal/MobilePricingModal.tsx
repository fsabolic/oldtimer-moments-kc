import { createSignal, createEffect, onCleanup, For } from "solid-js";
import DecorationSvg from "/assets/images/paper-texture.svg?raw";
import ShadowedTitle from "../shadowed-title/ShadowedTitle";
import BurstBadge from "../burst-badge/BurstBadge";
import PolaroidFrame from "../polaroid-frame/PolaroidFrame";
import DottedPriceRow from "../dotted-price-row/DottedPriceRow";
import {
  PricingPackage,
  PricingExtras,
} from "../../models/text-jsons/PricingTextJson";
import { getApiImage } from "../../util/getApiImage";
import classes from "./mobile-pricing-modal.module.css";
import textures from "../../styles/textures.module.css";

export interface MobilePricingModalProps {
  package: PricingPackage | null;
  extras: PricingExtras;
  title?: string;
  bandColor: string;
  image?: string;
  onClose: () => void;
  isOpen: boolean;
}

export default function MobilePricingModal(props: MobilePricingModalProps) {
  const [height, setHeight] = createSignal(0);
  let contentRef: HTMLDivElement | undefined;

  createEffect(() => {
    if (contentRef && props.isOpen) {
      const observer = new ResizeObserver((entries) => {
        setHeight(
          entries[0].borderBoxSize?.[0]?.blockSize ||
            entries[0].contentRect.height,
        );
      });
      observer.observe(contentRef);
      onCleanup(() => observer.disconnect());
    }
  });

  const modifiedSvg = () => {
    let svg = DecorationSvg;
    svg = svg.replace(/fill="[^"]*"/g, 'fill="currentColor"');
    svg = svg.replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
    svg = svg.replace(
      /<svg/,
      `<svg fill="currentColor" width="100%" preserveAspectRatio="none"`,
    );
    return svg;
  };

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  };

  return (
    <div
      class={`${classes.modalBackdrop} ${props.isOpen ? classes.open : ""}`}
      onClick={handleBackdropClick}
    >
      <div class={classes.modalContentWrapper}>
        <div
          class={classes.modalContentBox}
          ref={contentRef}
          style={{
            "--bg-color": `color-mix(in srgb, ${props.bandColor} 10%, white)`,
            "background-color": "var(--bg-color)",
            color: `color-mix(in srgb, var(--bg-color) 5%, ${props.bandColor})`,
          }}
        >
          {/* Top and Bottom Edges */}
          <div
            innerHTML={modifiedSvg()}
            class={`${classes.edge} ${classes.edgeTop}`}
          />
          <div
            innerHTML={modifiedSvg()}
            class={`${classes.edge} ${classes.edgeBottom}`}
          />

          {/* Left and Right Edges dynamically sized to height() */}
          {height() > 0 && (
            <>
              <div
                innerHTML={modifiedSvg()}
                class={`${classes.edge} ${classes.edgeLeft}`}
                style={{ width: `${height()}px` }}
              />
              <div
                innerHTML={modifiedSvg()}
                class={`${classes.edge} ${classes.edgeRight}`}
                style={{ width: `${height()}px` }}
              />
            </>
          )}

          <button class={classes.closeButton} onClick={props.onClose}>
            &times;
          </button>

          {/* Actual Scrollable Content */}
          <div class={`${classes.actualContent} ${textures.rundownTexture}`}>
            {props.package && (
              <>
                <div class={classes.titleContainer}>
                  <ShadowedTitle
                    text={props.package.name}
                    class={classes.shadowedTitle}
                    textColor={"var(--flip-card-inside-left-text)"}
                    shadowColor={"var(--color-white)"}
                  />
                </div>

                <div class={classes.benefits}>
                  <For each={props.package.benefits}>
                    {(item) => (
                      <div class={classes.benefitItem}>
                        <p> &#10170;</p>
                        <p> {item}</p>
                      </div>
                    )}
                  </For>
                </div>

                <div class={classes.priceBadgeContainer}>
                  <BurstBadge
                    fill={`color-mix(in srgb, ${props.bandColor} 15%, white 5%)`}
                    stroke={"var(--flip-card-inside-left-price-badge-stroke)"}
                    strokeWidth={5}
                    size="7.5rem"
                    pointCount={10}
                    spin={true}
                  >
                    <ShadowedTitle
                      text={props.package.price + "€"}
                      shadowColor="var(--flip-card-inside-left-price-badge-text-shadow)"
                      textColor={
                        "var(--flip-card-inside-left-price-badge-text)"
                      }
                      style={{
                        "font-size": "var(--font-size-l)",
                      }}
                    />
                  </BurstBadge>
                </div>

                {props.image && (
                  <div class={classes.polaroidContainer}>
                    <PolaroidFrame
                      src={getApiImage(props.image, 250, 250)}
                      topTape={true}
                      rotate={Math.random() * 6 - 3}
                    />
                  </div>
                )}

                <div class={classes.extrasContainer}>
                  <p class={classes.extrasTitle}>{props.extras.title}</p>
                  <ul class={classes.extrasItemList}>
                    <For each={props.extras.items}>
                      {(item) => (
                        <DottedPriceRow
                          title={item.name}
                          price={item.price}
                          containerClass={classes.dottedPriceRow}
                          fontSize="var(--font-size-s)"
                          color="var(--flip-card-inside-right-important-text)"
                        />
                      )}
                    </For>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
