import { Component, For } from "solid-js";
import { StampDiv } from "../stamp-div/StampDiv";
import classes from "./pricing-item.module.css";
import ShadowedTitle from "../shadowed-title/ShadowedTitle";
import BurstBadge from "../burst-badge/BurstBadge";
import { PricingBenefit } from "../../models/PricingBenefit";
import texture from "../../styles/textures.module.css";
import FloralPattern from "/assets/images/floral-pattern.webp";
import FadingImageTitle from "../fading-image-title/FadingImageTitle";

interface PricingItemProps {
  title: string;
  benefits: PricingBenefit[];
  price: string;
}

const PricingItem: Component<PricingItemProps> = (props) => {
  return (
    <StampDiv class={`${classes.stampWrapper} ${texture.rundownTexture}`}>
      <div class={`${classes.stamp} ${texture.rundownTexture}`}>
        <FadingImageTitle
          title={props.title}
          imageUrl={FloralPattern}
          gradientDirection="to bottom"
          class={classes.imageWrapper}
          shadowColor="var(--pricing-item-shadow)"
          textColor="var(--pricing-item-title)"
        />
        <div class={classes.stampContent}>
          <div class={classes.textBlock}>
            <For each={props.benefits}>
              {(benefit) => (
                <div class={classes.benefit}>
                  <div innerHTML={benefit.icon} class={classes.icon} />
                  <p class={classes.title}>{benefit.title}</p>
                </div>
              )}
            </For>
          </div>

          <div class={classes.badgeContainer}>
            <BurstBadge
              fill="var(--pricing-item-badge-fill)"
              stroke="var(--pricing-item-badge-stroke)"
              strokeWidth={5}
              size="6.25rem"
              pointCount={10}
              class={classes.badge}
              spin={true}
            >
              <ShadowedTitle
                text={props.price + "€"}
                shadowColor="var(--pricing-item-badge-title-shadow)"
                class={classes.badgeTitle}
              />
            </BurstBadge>
          </div>
        </div>
      </div>
    </StampDiv>
  );
};

export default PricingItem;
