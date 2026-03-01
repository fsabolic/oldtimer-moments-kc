import { Component, createMemo } from "solid-js";
import { PaperSection } from "../../components/paper-section/PaperSection";
import classes from "./about.module.css";
import textures from "../../styles/textures.module.css";
import PolaroidFrame from "../../components/polaroid-frame/PolaroidFrame";
import ShadowedTitle from "../../components/shadowed-title/ShadowedTitle";
import { ScrollId } from "../../models/ScrollId";
import { useSkinningStore } from "../../global-store/SkinningStore";
import { getApiImage } from "../../util/getApiImage";
import { isMobile } from "../../global-store/WindowWidthGlobal";
import { createScrollObserver } from "../../hooks/createScrollObserver";

const About: Component = () => {
  const aboutSkinning = useSkinningStore().aboutSkinning;
  const aboutSkinningText = aboutSkinning.textJson;
  const aboutSkinningImage =
    aboutSkinning.imageIds.length > 0 ? aboutSkinning.imageIds[0] : "";

  const pageId: ScrollId = "about";
  const title = aboutSkinningText.title;
  const text = aboutSkinningText.description;

  const width = createMemo(() => (isMobile() ? "16rem" : "40rem"));
  const height = createMemo(() => (isMobile() ? "12rem" : "20rem"));

  const titleObserver = createScrollObserver();
  const textObserver = createScrollObserver();
  const imageObserver = createScrollObserver();

  return (
    <div id={pageId} class={textures.rundownTexture}>
      <PaperSection>
        <div class={classes.aboutContent}>
          <div class={classes.textSection}>
            <div class={classes.textSectionContainer}>
              <div
                ref={titleObserver.ref}
                class={
                  titleObserver.isVisible()
                    ? "animateSlideLeft"
                    : "animateHidden"
                }
              >
                <ShadowedTitle
                  text={title}
                  textColor={"var(--about-title)"}
                  shadowColor={"var(--about-title-shadow)"}
                  class={classes.title}
                />
              </div>
              <div
                ref={textObserver.ref}
                class={`${classes.textContainer} ${
                  textObserver.isVisible()
                    ? "animateSlideUp delay200"
                    : "animateHidden"
                }`}
              >
                <p class={classes.text}>{text}</p>
              </div>
            </div>
          </div>
          <div
            ref={imageObserver.ref}
            class={`${classes.imageSection} ${
              imageObserver.isVisible()
                ? "animateSlideRight delay100"
                : "animateHidden"
            }`}
          >
            <PolaroidFrame
              width={width()}
              height={height()}
              class={classes.polaroid}
              sideTape={true}
              src={getApiImage(aboutSkinningImage)}
              alt={title}
            />
          </div>
        </div>
      </PaperSection>
    </div>
  );
};

export default About;
