import { createSignal, onCleanup, onMount, type Accessor } from "solid-js";

interface ScrollObserverOptions {
  threshold?: number;
  rootMargin?: string;
  repeat?: boolean;
}

interface ScrollObserverResult {
  ref: (el: HTMLElement) => void;
  isVisible: Accessor<boolean>;
}

export function createScrollObserver(
  options: ScrollObserverOptions = {},
): ScrollObserverResult {
  const {
    threshold = 0.15,
    rootMargin = "0px 0px -50px 0px",
    repeat = false,
  } = options;

  const [isVisible, setIsVisible] = createSignal(false);
  let observer: IntersectionObserver | undefined;
  let element: HTMLElement | undefined;

  const ref = (el: HTMLElement) => {
    element = el;
  };

  onMount(() => {
    if (!element) return;

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (!repeat) {
              observer?.unobserve(entry.target);
            }
          } else if (repeat) {
            setIsVisible(false);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
  });

  onCleanup(() => {
    observer?.disconnect();
  });

  return { ref, isVisible };
}
