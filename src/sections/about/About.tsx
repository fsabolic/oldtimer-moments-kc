import { Component } from "solid-js";
import { PaperSection } from "../../components/paper-section/PaperSection";
import classes from "./about.module.css";
import textures from "../../styles/textures.module.css";
import PolaroidFrame from "../../components/polaroid-frame/PolaroidFrame";

const About: Component = () => {
  const title = "O nama";
  const text = `
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  congue nisi eu ligula dictum vehicula. Sed et pharetra odio,
                  ac tincidunt est. Quisque laoreet varius mi, id molestie sem
                  ultrices eget. Sed elementum aliquet nisl eget feugiat. In
                  dictum scelerisque eros, id blandit erat congue nec. Sed
                  ultrices at lectus pulvinar vestibulum. Suspendisse ut viverra
                  orci. Aenean eu molestie ante. Donec nec imperdiet eros. In id
                  mauris odio. Aliquam tristique, ipsum sed consequat aliquam,
                  sem mi mollis enim, eu dignissim turpis ipsum in enim.
                  Suspendisse ac odio nibh.
                `;
  return (
    <div class={`${classes.aboutContainer} ${textures.rundownTexture}`}>
      <PaperSection>
        <div class={classes.aboutContent}>
          <div class={classes.textSection}>
            <div class={classes.textSectionContainer}>
              <div class={classes.titleContainer}>
                <p>{title}</p>
              </div>
              <div class={classes.textContainer}>
                <p class={classes.text}>{text}</p>
              </div>
            </div>
          </div>
          <div class={classes.imageSection}>
            <PolaroidFrame
              width={"40rem"}
              height={"20rem"}
              class={classes.polaroid}
              sideTape={true}
            />
          </div>
        </div>
      </PaperSection>
    </div>
  );
};

export default About;
