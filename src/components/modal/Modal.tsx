import { Component, createEffect, JSX, onCleanup } from "solid-js";
import { Portal } from "solid-js/web";
import { Show } from "solid-js";
import classes from "./modal.module.css";
import Cancel from "/assets/images/cancel.svg?raw";

interface FullScreenModalProps {
  open: boolean;
  onClose?: () => void;
  children: JSX.Element;
}

const Modal: Component<FullScreenModalProps> = (props) => {
  createEffect(() => {
    if (!props.open) return;
    document.body.style.overflow = "hidden";
    onCleanup(() => (document.body.style.overflow = ""));
  });

  return (
    <Show when={props.open}>
      <Portal>
        <button
          class={classes.closeButton}
          onClick={() => props.onClose?.()}
          innerHTML={Cancel}
        />
        <div class={classes.modalContainer} onClick={props.onClose}>
          {props.children}
        </div>
      </Portal>
    </Show>
  );
};

export default Modal;
