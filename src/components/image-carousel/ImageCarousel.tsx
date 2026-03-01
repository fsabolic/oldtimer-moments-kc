import { Component, JSX, onMount, onCleanup } from "solid-js";
import classes from "./image-carousel.module.css";
import RightArrow from "/assets/images/right-arrow.svg?raw";
import { Image } from "../../models/Image";
import Carousel from "../carousel/Carousel";
import CarouselImage from "./CarouselImage";

interface ImageCarouselProps {
  images: Image[];
  firstIndex: number;
  onClose?: () => void;
}

const ImageCarousel: Component<ImageCarouselProps> = (props) => {
  let nextFn: (() => void) | undefined;
  let prevFn: (() => void) | undefined;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" && nextFn) nextFn();
    if (e.key === "ArrowLeft" && prevFn) prevFn();
    if (e.key === "Escape" && props.onClose) props.onClose();
  };

  onMount(() => {
    window.addEventListener("keydown", handleKeyDown);
  });

  onCleanup(() => {
    window.removeEventListener("keydown", handleKeyDown);
  });

  const leftButtonHandler = (prev: () => void) => {
    prevFn = prev;
    return (
      <button
        class={`${classes.carouselButton} ${classes.carouselButtonLeft}`}
        onClick={prev}
        innerHTML={RightArrow}
        aria-label="Prethodna slika"
      />
    );
  };
  const rightButtonHandler = (next: () => void) => {
    nextFn = next;
    return (
      <button
        class={`${classes.carouselButton} ${classes.carouselButtonRight}`}
        onClick={next}
        innerHTML={RightArrow}
        aria-label="Sljedeća slika"
      />
    );
  };

  const itemStyleHandler = (diff: number) => {
    const transition =
      "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease";
    let transform = "none";
    let opacity = 1;

    if (diff > 0) {
      transform = `translateX(${diff * 100}%)`;
      opacity = 0;
    } else if (diff < 0) {
      transform = `translateX(${diff * 100}%)`;
      opacity = 0;
    }

    return {
      display: "flex",
      "justify-content": "center",
      "align-items": "center",
      width: "100%",
      height: "100%",
      opacity,
      transform,
      transition,
      "z-index": diff === 0 ? "var(--z-index-2)" : "var(--z-index-0)",
      "pointer-events": diff === 0 ? "auto" : "none",
      position: "absolute",
      top: 0,
      left: 0,
    } as JSX.CSSProperties;
  };

  return (
    <div class={classes.modalContent} onClick={(e) => e.stopPropagation()}>
      <Carousel
        items={props.images}
        startIndex={props.firstIndex}
        class={classes.carouselContainer}
        trackClass={classes.carouselTrack}
        renderItem={(item: Image, _, diff) => (
          <CarouselImage item={item} diff={diff} />
        )}
        renderLeftButton={leftButtonHandler}
        renderRightButton={rightButtonHandler}
        getItemStyle={itemStyleHandler}
      />
    </div>
  );
};

export default ImageCarousel;
