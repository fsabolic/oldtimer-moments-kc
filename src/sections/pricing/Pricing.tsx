import { Component, For, createSignal } from "solid-js";
import { PaperSection } from "../../components/paper-section/PaperSection";
import classes from "./pricing.module.css";
import ShadowedTitle from "../../components/shadowed-title/ShadowedTitle";
import { ScrollId } from "../../models/ScrollId";
import { useSkinningStore } from "../../global-store/SkinningStore";
import FlipCard from "../../components/flip-card/FlipCard";
import {
  windowWidthGlobal,
  isMobile,
} from "../../global-store/WindowWidthGlobal";
import { bandColors } from "../../styles/band-colors";
import Carousel from "../../components/carousel/Carousel";
import RightArrow from "/assets/images/right-arrow.svg?raw";
import MobilePricingModal from "../../components/mobile-pricing-modal/MobilePricingModal";
const Pricing: Component<{}> = () => {
  const pricingSkinningText = useSkinningStore().pricingSkinning.textJson;
  const pricingSkinningImages = useSkinningStore().pricingSkinning.imageIds;
  const pageId: ScrollId = "prices";
  const title = pricingSkinningText.title;
  const pricingItems = pricingSkinningText.packages;
  const pricingExtras = pricingSkinningText.extras;
  const pricingFootnotes = pricingSkinningText.footnotes;

  const [selectedPackageIndex, setSelectedPackageIndex] = createSignal<
    number | null
  >(null);

  const handleCloseModal = () => setSelectedPackageIndex(null);
  const flipCardConfig = {
    width: () => (isMobile() ? 190 : 300),
    height: () => (isMobile() ? 260 : 400),
    defaultScalingFactor: 1.35,
    computedScaling: () => {
      return flipCardConfig.width() * 2 * flipCardConfig.defaultScalingFactor >
        windowWidthGlobal()
        ? (flipCardConfig.width() * 2) / windowWidthGlobal()
        : flipCardConfig.defaultScalingFactor;
    },
    rotation: () => (Math.random() * 2 - 1) * 15,
  };

  const leftButtonHandler = (onClick: () => void) => (
    <div class={`${classes.arrowContainer} ${classes.leftArrow}`}>
      <button
        class={classes.navButton}
        onClick={onClick}
        innerHTML={RightArrow}
        aria-label="Prethodna ponuda"
      />
    </div>
  );

  const rightButtonHandler = (onClick: () => void) => (
    <div class={`${classes.arrowContainer} ${classes.rightArrow}`}>
      <button
        class={classes.navButton}
        onClick={onClick}
        innerHTML={RightArrow}
        aria-label="Sljedeća ponuda"
      />
    </div>
  );

  const flipCardClickHandler = (index: number) => {
    if (isMobile()) {
      setSelectedPackageIndex(index);
    }
  };

  return (
    <PaperSection id={pageId} class={classes.pricingSection}>
      <div class={classes.pricingContainer}>
        <ShadowedTitle
          text={title}
          class={classes.title}
          textColor={"var(--pricing-title)"}
          shadowColor={"var(--pricing-title-shadow)"}
        />

        <Carousel
          items={pricingItems}
          renderLeftButton={leftButtonHandler}
          renderRightButton={rightButtonHandler}
          renderItem={(item, index) => (
            <div
              class={classes.flipCardContainer}
              style={{
                "--rotation": `${flipCardConfig.rotation()}deg`,
              }}
            >
              <FlipCard
                title={item.name}
                width={`${flipCardConfig.width()}px`}
                height={`${flipCardConfig.height()}px`}
                scalingFactor={flipCardConfig.computedScaling()}
                packages={item}
                extras={pricingExtras}
                bandColor={bandColors[index % bandColors.length]}
                image={
                  pricingSkinningImages[index % pricingSkinningImages.length]
                }
                onClick={() => flipCardClickHandler(index)}
              />
            </div>
          )}
        />
      </div>

      <div class={classes.footnotes}>
        <For each={pricingFootnotes}>
          {(footnote, index) => {
            return (
              <p
                class={classes.footnote}
              >{`${"*".repeat(index() + 1)} ${footnote}`}</p>
            );
          }}
        </For>
      </div>

      <MobilePricingModal
        isOpen={selectedPackageIndex() !== null}
        onClose={handleCloseModal}
        package={
          selectedPackageIndex() !== null
            ? pricingItems[selectedPackageIndex()!]
            : null
        }
        extras={pricingExtras}
        bandColor={
          selectedPackageIndex() !== null
            ? bandColors[selectedPackageIndex()! % bandColors.length]
            : bandColors[0]
        }
        image={
          selectedPackageIndex() !== null
            ? pricingSkinningImages[
                selectedPackageIndex()! % pricingSkinningImages.length
              ]
            : undefined
        }
      />
    </PaperSection>
  );
};

export default Pricing;
