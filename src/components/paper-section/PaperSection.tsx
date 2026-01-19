import { JSX, splitProps } from "solid-js";
import DecorationSvg from "/assets/images/paper-texture.svg?raw";
import classes from "./paper-section.module.css";
import textures from "../../styles/textures.module.css";

interface DecoratedDivProps extends JSX.HTMLAttributes<HTMLDivElement> {
  svgHeight?: number | string;
  svgColor?: string;
  children?: JSX.Element;
}

export function PaperSection(props: DecoratedDivProps) {
  const [local, divProps] = splitProps(props, [
    "children",
    "svgHeight",
    "svgColor",
  ]);

  const color = () => local.svgColor ?? "var(--paper-section-svg)";

  const modifiedSvg = () => {
    let svg = DecorationSvg;
    svg = svg.replace(/fill="[^"]*"/g, `fill="${color()}"`);
    svg = svg.replace(/stroke="[^"]*"/g, `stroke="${color()}"`);
    svg = svg.replace(
      /<svg/,
      `<svg fill="${color()}" width="100%" preserveAspectRatio="none"`
    );

    if (local.svgHeight) {
      svg = svg.replace(/height="[^"]*"/, `height="${local.svgHeight}"`);
    }

    return svg;
  };

  return (
    <div class={classes.paperSectionContainer}>
      <div
        innerHTML={modifiedSvg()}
        class={`${classes.paperSvg} ${classes.topSvg}`}
      />

      <div
        {...divProps}
        style={{ "background-color": color() }}
        class={`${classes.paperSectionContent} ${textures.rundownTexture}`}
      >
        {local.children}
      </div>

      <div innerHTML={modifiedSvg()} class={classes.paperSvg} />
    </div>
  );
}
