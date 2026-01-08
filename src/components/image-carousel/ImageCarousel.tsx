import { Component, createSignal } from "solid-js";
import classes from "./image-carousel.module.css";
import RightArrow from "/assets/images/right-arrow.svg?raw";
import { Image } from "../../models/Image";

interface ImageCarouselProps {
  images: Image[];
  firstIndex: number;
}

const ImageCarousel: Component<ImageCarouselProps> = (props) => {
  const [currentImage, setCurrentImage] = createSignal(
    props.images[props.firstIndex]
  );

  const move = (delta: number) => {
    const { length } = props.images;
    const currentIndex = currentImage().index;
    const nextIndex = (currentIndex + delta + length) % length;

    setCurrentImage(props.images[nextIndex]);
  };

  const goLeft = () => move(-1);
  const goRight = () => move(1);

  return (
    <div class={classes.modalContent} onClick={(e) => e.stopPropagation()}>
      <div class={classes.carouselContainer}>
        <img src={currentImage().image} class={classes.carouselImage} />
        <button
          class={`${classes.carouselButton} ${classes.carouselButtonLeft}`}
          onClick={goLeft}
          innerHTML={RightArrow}
        />
        <button
          class={`${classes.carouselButton} ${classes.carouselButtonRight}`}
          onClick={goRight}
          innerHTML={RightArrow}
        />
      </div>
    </div>
  );
};

export default ImageCarousel;
