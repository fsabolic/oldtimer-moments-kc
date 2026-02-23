import { JSX, createSignal, For } from "solid-js";
import styles from "./carousel.module.css";
import { isMobile } from "../../global-store/WindowWidthGlobal";

export interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => JSX.Element;
  renderLeftButton: (onClick: () => void) => JSX.Element;
  renderRightButton: (onClick: () => void) => JSX.Element;
  getItemStyle?: (diff: number, length: number) => JSX.CSSProperties;
  class?: string;
  style?: JSX.CSSProperties | string;
  startIndex?: number;
  trackClass?: string;
}

function Carousel<T>(props: CarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = createSignal(props.startIndex ?? 0);
  const [touchStartX, setTouchStartX] = createSignal<number | null>(null);

  const next = () => {
    setCurrentIndex((i) => (i + 1) % props.items.length);
  };
  const prev = () => {
    setCurrentIndex((i) => (i - 1 + props.items.length) % props.items.length);
  };

  const defaultGetItemStyle = (diff: number, length: number) => {
    let transform = `translateX(${diff > 0 ? "200%" : "-200%"}) scale(0.5)`;
    let opacity = 0;
    let zIndex = "var(--z-index-0)";
    let pointerEvents = "none";
    let transition =
      "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s ease-in-out";

    if (diff === 0) {
      transform = "translateX(0) scale(1)";
      opacity = 1;
      zIndex = "var(--z-index-2)";
      pointerEvents = "auto";
    } else if (diff === -1) {
      transform = "translateX(-110%) scale(0.8)";
      opacity = isMobile() ? 0 : 0.4;
      zIndex = "var(--z-index-1)";
    } else if (diff === 1) {
      transform = "translateX(110%) scale(0.8)";
      opacity = isMobile() ? 0 : 0.4;
      zIndex = "var(--z-index-1)";
    }

    return {
      transform,
      opacity,
      "z-index": zIndex,
      "pointer-events": pointerEvents,
      transition,
    } as JSX.CSSProperties;
  };

  const getItemStyleWrapper = (index: number) => {
    const len = props.items.length;
    let diff = index - currentIndex();
    if (diff > len / 2) diff -= len;
    else if (diff < -len / 2) diff += len;

    if (props.getItemStyle) {
      return props.getItemStyle(diff, len);
    }
    return defaultGetItemStyle(diff, len);
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const startX = touchStartX();
    if (startX === null) return;
    const endX = e.changedTouches[0].clientX;
    const touchDiff = startX - endX;

    if (Math.abs(touchDiff) > 50) {
      if (touchDiff > 0) {
        next();
      } else {
        prev();
      }
    }
    setTouchStartX(null);
  };

  return (
    <div
      class={`${styles.carouselContainer} ${props.class || ""}`}
      style={props.style}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {props.renderLeftButton(prev)}

      <div class={`${styles.track} ${props.trackClass || ""}`}>
        <For each={props.items}>
          {(item, index) => {
            return (
              <div
                class={styles.carouselItemWrapper}
                style={getItemStyleWrapper(index())}
              >
                {props.renderItem(item, index())}
              </div>
            );
          }}
        </For>
      </div>

      {props.renderRightButton(next)}
    </div>
  );
}

export default Carousel;
