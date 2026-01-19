/* @refresh reload */
import { render } from "solid-js/web";
import "solid-devtools";

import "./styles/variables.css";
import "./styles/fonts.css";
import "./styles/global.css";
import "./styles/themes/standard.css";
import "./styles/themes/christmas.css";
import "./styles/themes/easter.css";
import "./styles/themes/halloween.css";
import "./styles/themes/valentine.css";

import App from "./App";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(() => <App />, root!);
