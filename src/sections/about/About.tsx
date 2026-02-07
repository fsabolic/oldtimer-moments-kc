import { Component } from "solid-js";
import { PaperSection } from "../../components/paper-section/PaperSection";
import classes from "./about.module.css";
import textures from "../../styles/textures.module.css";
import PolaroidFrame from "../../components/polaroid-frame/PolaroidFrame";
import ShadowedTitle from "../../components/shadowed-title/ShadowedTitle";
import { ScrollId } from "../../models/ScrollId";
import { useSkinningStore } from "../../global-store/SkinningStore";

const About: Component = () => {
  const aboutSkinningStore = useSkinningStore().aboutSkinning.textJson;
  const pageId: ScrollId = "about";
  const title = aboutSkinningStore.title;
  const text = aboutSkinningStore.description;
  return (
    <div id={pageId} class={textures.rundownTexture}>
      <PaperSection>
        <div class={classes.aboutContent}>
          <div class={classes.textSection}>
            <div class={classes.textSectionContainer}>
              <ShadowedTitle
                text={title}
                textColor={"var(--about-title)"}
                shadowColor={"var(--about-title-shadow)"}
                class={classes.title}
              />
              <div class={classes.textContainer}>
                <p class={classes.text}>{text}</p>
              </div>
            </div>
          </div>
          <div class={classes.imageSection}>
            <PolaroidFrame
              width={"100%"}
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
