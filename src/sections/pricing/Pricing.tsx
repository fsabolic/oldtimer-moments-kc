import { Component, For } from "solid-js";
import { PaperSection } from "../../components/paper-section/PaperSection";
import classes from "./pricing.module.css";
import ShadowedTitle from "../../components/shadowed-title/ShadowedTitle";
import { ScrollId } from "../../models/ScrollId";
import { useSkinningStore } from "../../global-store/SkinningStore";
import FlipCard from "../../components/flip-card/FlipCard";
import { windowWidthGlobal } from "../../global-store/WindowWidthGlobal";
import { bandColors } from "../../styles/band-colors";

const Pricing: Component<{}> = () => {
  const pricingSkinningText = useSkinningStore().pricingSkinning.textJson;
  const pricingSkinningImages = useSkinningStore().pricingSkinning.imageIds;
  const pageId: ScrollId = "prices";

  const flipCardConfig = {
    width: 300,
    height: 400,
    defaultScalingFactor: 1.35,
    computedScaling: () => {
      return flipCardConfig.width * 2 * flipCardConfig.defaultScalingFactor >
        windowWidthGlobal()
        ? (flipCardConfig.width * 2) / windowWidthGlobal()
        : flipCardConfig.defaultScalingFactor;
    },
    rotation: () => (Math.random() * 2 - 1) * 15,
    gap: 5,
  };

  const title = pricingSkinningText.title;

  const pricingItems = pricingSkinningText.packages;
  const pricingExtras = pricingSkinningText.extras;
  const pricingFootnotes = pricingSkinningText.footnotes;

  return (
    <PaperSection id={pageId} class={classes.pricingSection}>
      <div class={classes.pricingContainer}>
        <ShadowedTitle
          text={title}
          class={classes.title}
          textColor={"var(--pricing-title)"}
          shadowColor={"var(--pricing-title-shadow)"}
        />

        <div
          class={classes.pricingItemsContainer}
          style={{
            "--needed-space": `${flipCardConfig.width * flipCardConfig.defaultScalingFactor * flipCardConfig.computedScaling()}px`,
          }}
        >
          <For each={pricingItems}>
            {(item, index) => {
              return (
                <div
                  class={classes.flipCardContainer}
                  style={{
                    "--rotation": `${flipCardConfig.rotation()}deg`,
                  }}
                >
                  <FlipCard
                    title={item.name}
                    width={`${flipCardConfig.width}px`}
                    height={`${flipCardConfig.height}px`}
                    scalingFactor={flipCardConfig.computedScaling()}
                    packages={item}
                    extras={pricingExtras}
                    bandColor={bandColors[index() % bandColors.length]}
                    image={
                      pricingSkinningImages[
                        index() % pricingSkinningImages.length
                      ]
                    }
                  />
                </div>
              );
            }}
          </For>
        </div>
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
    </PaperSection>
  );
};

export default Pricing;
