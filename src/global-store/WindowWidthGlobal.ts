import { createSignal } from "solid-js";

export const [windowWidthGlobal, setWindowWidthGlobal] = createSignal(
  window.innerWidth
);
