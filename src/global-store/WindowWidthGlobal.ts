import { createSignal } from "solid-js";

export const [windowWidthGlobal, setWindowWidthGlobal] = createSignal(
  window.innerWidth,
);

export const MOBILE_BREAKPOINT = 768;
export const DESKTOP_BREAKPOINT = 1024;

export const isMobile = () => windowWidthGlobal() < MOBILE_BREAKPOINT;
