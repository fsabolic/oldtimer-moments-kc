import { Component, JSX } from "solid-js";
import classes from "./image-carousel.module.css";
import RightArrow from "/assets/images/right-arrow.svg?raw";
import { Image } from "../../models/Image";
import Carousel from "../carousel/Carousel";

interface ImageCarouselProps {
  images: Image[];
  firstIndex: number;
}

const ImageCarousel: Component<ImageCarouselProps> = (props) => {
  const leftButtonHandler = (prev: () => void) => (
    <button
      class={`${classes.carouselButton} ${classes.carouselButtonLeft}`}
      onClick={prev}
      innerHTML={RightArrow}
    />
  );
  const rightButtonHandler = (next: () => void) => (
    <button
      class={`${classes.carouselButton} ${classes.carouselButtonRight}`}
      onClick={next}
      innerHTML={RightArrow}
    />
  );

  const itemStyleHandler = (diff: number) => {
    return {
      display: diff === 0 ? "flex" : "none",
      "justify-content": "center",
      "align-items": "center",
      width: "100%",
      height: "100%",
      opacity: 1,
      transform: "none",
      transition: "none",
      "z-index": diff === 0 ? "var(--z-index-2)" : "var(--z-index-0)",
      "pointer-events": diff === 0 ? "auto" : "none",
    } as JSX.CSSProperties;
  };

  return (
    <div class={classes.modalContent} onClick={(e) => e.stopPropagation()}>
      <Carousel
        items={props.images}
        startIndex={props.firstIndex}
        class={classes.carouselContainer}
        trackClass={classes.carouselTrack}
        renderItem={(item: Image) => (
          <img src={item.image} class={classes.carouselImage} />
        )}
        renderLeftButton={leftButtonHandler}
        renderRightButton={rightButtonHandler}
        getItemStyle={itemStyleHandler}
      />
    </div>
  );
};

export default ImageCarousel;
