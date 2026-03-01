import { Component, createSignal, For } from "solid-js";
import classes from "./gallery.module.css";
import PolaroidFrame from "../../components/polaroid-frame/PolaroidFrame";
import Modal from "../../components/modal/Modal";
import ImageCarousel from "../../components/image-carousel/ImageCarousel";
import { Image } from "../../models/Image";
import { ScrollId } from "../../models/ScrollId";
import textures from "../../styles/textures.module.css";
import tape from "/assets/images/clear-tape.png";
import ShadowedTitle from "../../components/shadowed-title/ShadowedTitle";
import { useSkinningStore } from "../../global-store/SkinningStore";
import { getApiImage } from "../../util/getApiImage";
import { createScrollObserver } from "../../hooks/createScrollObserver";

const Gallery: Component = () => {
  const gallerySkinning = useSkinningStore().gallerySkinning;
  const gallerySkinningImages = gallerySkinning.imageIds;
  const gallerySkinningText = gallerySkinning.textJson;
  const [openModal, setOpenModal] = createSignal<Image | null>(null);

  const pageId: ScrollId = "gallery";
  const title = gallerySkinningText.title;

  const polaroids = gallerySkinningImages.map((imageId, index) => ({
    index,
    image: getApiImage(imageId, 200, 200),
  }));

  const handlePolaroidClick = (index: number) => {
    setOpenModal(polaroids[index]);
  };

  const transformStyle = () => {
    return `translate(${Math.random() * 1 - 0.5}rem, ${
      Math.random() * 1 - 0.5
    }rem)`;
  };

  const titleObserver = createScrollObserver();
  const gridObserver = createScrollObserver({ threshold: 0.05 });

  const getItemStaggerDelay = (index: number) =>
    `${Math.min(index * 0.08, 0.6)}s`;

  return (
    <div
      id={pageId}
      class={`${textures.floralMaskBg} ${classes.galleryContainer}`}
    >
      <div
        ref={titleObserver.ref}
        class={`${classes.titleContainer} ${
          titleObserver.isVisible() ? "animatePopIn" : "animateHidden"
        }`}
      >
        <img
          alt="tape-image"
          src={tape}
          class={`${classes.tape} ${classes.topTape}`}
        />
        <div class={`${classes.tornPaper} ${textures.rundownTexture}`} />
        <ShadowedTitle
          text={title}
          class={classes.title}
          shadowColor="var(--gallery-title-shadow)"
          textColor="var(--gallery-title)"
        />
      </div>
      <Modal open={!!openModal()} onClose={() => setOpenModal(null)}>
        {openModal() && (
          <ImageCarousel
            images={polaroids}
            firstIndex={openModal()?.index ?? 0}
            onClose={() => setOpenModal(null)}
          />
        )}
      </Modal>
      <div ref={gridObserver.ref} class={classes.polaroidContainer}>
        <For each={polaroids}>
          {(galleryItem) => (
            <div
              class={`${classes.galleryItemWrapper} ${
                gridObserver.isVisible() ? "animateFadeIn" : "animateHidden"
              }`}
              style={{
                transform: transformStyle(),
                "animation-delay": gridObserver.isVisible()
                  ? getItemStaggerDelay(galleryItem.index)
                  : undefined,
              }}
              onClick={() => handlePolaroidClick(galleryItem.index)}
            >
              <div class={classes.galleryItem}>
                <PolaroidFrame
                  rotate={Math.random() * 10 - 5}
                  class={classes.polaroidComponent}
                  src={galleryItem.image}
                  topTape={true}
                  alt={`${title} - slika ${galleryItem.index + 1}`}
                />
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default Gallery;
