import { Component, For } from "solid-js";
import { PaperSection } from "../../components/paper-section/PaperSection";
import classes from "./pricing.module.css";
import ShadowedTitle from "../../components/shadowed-title/ShadowedTitle";
import PricingItem from "../../components/pricing-item/PricingItem";
import FadingImageTitle from "../../components/fading-image-title/FadingImageTitle";
import FloralPattern from "/assets/images/floral-pattern.webp";
import DottedPriceRow from "../../components/dotted-price-row/DottedPriceRow";
import PolaroidFrame from "../../components/polaroid-frame/PolaroidFrame";
import { ScrollId } from "../../models/ScrollId";
import { useSkinningStore } from "../../global-store/SkinningStore";

interface DottedPriceItem {
  title: string;
  price: string;
}

interface PolaroidItem {
  src: string;
  rotate?: number;
}

const Pricing: Component<{}> = () => {
  const pricingSkinningStore = useSkinningStore().pricingSkinning.textJson;
  const pageId: ScrollId = "prices";
  const title = pricingSkinningStore.title;
  const pricingItems = pricingSkinningStore.packages.map((item) => {
    return {
      title: item.name,
      price: item.price,
      benefits: item.benefits.map((benefit) => {
        return {
          title: benefit,
          icon: "",
        };
      }),
    };
  });

  const additionalTitle = pricingSkinningStore.extras.title;
  const dottedPriceItems: DottedPriceItem[] =
    pricingSkinningStore.extras.items.map((item) => {
      return {
        title: item.name,
        price: item.price,
      };
    });

  const polaroidItems: PolaroidItem[] = [
    { src: FloralPattern, rotate: -10 },
    { src: FloralPattern },
    { src: FloralPattern, rotate: 10 },
  ];

  return (
    <PaperSection id={pageId}>
      <div class={classes.pricingContainer}>
        <ShadowedTitle
          text={title}
          class={classes.title}
          textColor={"var(--pricing-title)"}
          shadowColor={"var(--pricing-title-shadow)"}
        />
        <div class={classes.pricingItems}>
          <For each={pricingItems}>
            {(item) => (
              <PricingItem
                title={item.title}
                benefits={item.benefits}
                price={item.price}
              />
            )}
          </For>
        </div>

        <div class={classes.additionalsWrapper}>
          <div class={classes.additionalsContainer}>
            <FadingImageTitle
              title={additionalTitle}
              imageUrl={FloralPattern}
              gradientDirection="to right"
              shadowColor="var(--pricing-additionals-title-shadow)"
              textColor="var(--pricing-additionals-title-text-color)"
              class={classes.additionalsTitle}
            />

            <div class={classes.additionalsContent}>
              <For each={dottedPriceItems}>
                {(item) => (
                  <DottedPriceRow title={item.title} price={item.price} />
                )}
              </For>
            </div>
          </div>
          <div class={classes.additionalsImages}>
            <For each={polaroidItems}>
              {(item) => (
                <PolaroidFrame
                  topTape
                  src={item.src}
                  width={"13rem"}
                  height={"13rem"}
                  rotate={item.rotate}
                />
              )}
            </For>
          </div>
        </div>
      </div>
    </PaperSection>
  );
};

export default Pricing;
