import { Component, For } from "solid-js";
import { PaperSection } from "../../components/paper-section/PaperSection";
import decorationIcon from "/assets/images/decoration-icon.svg?raw";
import locationIcon from "/assets/images/location-icon.svg?raw";
import timeIcon from "/assets/images/time-icon.svg?raw";
import carIcon from "/assets/images/car-icon.svg?raw";
import classes from "./pricing.module.css";
import ShadowedTitle from "../../components/shadowed-title/ShadowedTitle";
import PricingItem from "../../components/pricing-item/PricingItem";
import FadingImageTitle from "../../components/fading-image-title/FadingImageTitle";
import GalleryBackground from "/assets/images/gallery-bg.jpg";
import DottedPriceRow from "../../components/dotted-price-row/DottedPriceRow";
import PolaroidFrame from "../../components/polaroid-frame/PolaroidFrame";

interface DottedPriceItem {
  title: string;
  price: string;
}

interface PolaroidItem {
  src: string;
  rotate?: number;
}

const Pricing: Component<{}> = () => {
  const title = "Paketi i ponude";
  const pricingItems = [
    {
      title: "Classic shoot",
      price: "120",
      benefits: [
        { title: "Dopremanje 30km od lokacije", icon: locationIcon },
        { title: "1 sat korištenja vozila", icon: timeIcon },
        { title: "Bez vožnje", icon: carIcon },
        { title: "Osnovne dekoracije", icon: decorationIcon },
      ],
    },
    {
      title: "Moments in motion",
      price: "320",
      benefits: [
        { title: "Dopremanje 50km od lokacije", icon: locationIcon },
        { title: "3 sata korištenja vozila", icon: timeIcon },
        { title: "Vožnja", icon: carIcon },
        { title: "Osnovne dekoracije + limenke", icon: decorationIcon },
      ],
    },
    {
      title: "Full retro experience",
      price: "600",
      benefits: [
        { title: "Dopremanje 100km od lokacije", icon: locationIcon },
        { title: "Do 8 sati korištenja vozila", icon: timeIcon },
        { title: "Vožnja", icon: carIcon },
        {
          title: "Osnovne dekoracije + limenke + šampanjac",
          icon: decorationIcon,
        },
      ],
    },
  ];

  const dottedPriceItems: DottedPriceItem[] = [
    { title: "Kofer", price: "50€" },
    { title: "Košara", price: "30€" },
    { title: "Limenke", price: "20€" },
    { title: "Svaki dodatan kilometar", price: "0,70€/km" },
  ];

  const polaroidItems: PolaroidItem[] = [
    { src: GalleryBackground, rotate: -10 },
    { src: GalleryBackground },
    { src: GalleryBackground, rotate: 10 },
  ];

  return (
    <PaperSection>
      <div class={classes.pricingContainer}>
        <ShadowedTitle
          text={title}
          class={classes.title}
          textColor={"var(--title-primary)"}
          shadowColor={"white"}
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
              title="Dodatci"
              imageUrl={GalleryBackground}
              gradientDirection="to right"
              shadowColor="white"
              textColor="var(--highlight-tertiary)"
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
