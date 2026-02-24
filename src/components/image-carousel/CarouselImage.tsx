import { Component, createSignal, createEffect, Show } from "solid-js";
import { Image } from "../../models/Image";
import classes from "./image-carousel.module.css";

interface CarouselImageProps {
  item: Image;
  diff: number;
}

const CarouselImage: Component<CarouselImageProps> = (props) => {
  const [loading, setLoading] = createSignal(true);
  const [shouldLoad, setShouldLoad] = createSignal(false);

  createEffect(() => {
    if (Math.abs(props.diff) <= 1) {
      setShouldLoad(true);
    }
  });

  return (
    <div class={classes.imageWrapper}>
      <Show when={loading() && shouldLoad()}>
        <div class={classes.loaderContainer}>
          <div class={classes.loader} />
        </div>
      </Show>
      <Show when={shouldLoad()}>
        <img
          src={props.item.image}
          class={classes.carouselImage}
          style={{ opacity: loading() ? 0 : 1 }}
          onLoad={() => setLoading(false)}
        />
      </Show>
    </div>
  );
};

export default CarouselImage;
