import { Component, createSignal, For } from "solid-js";
import classes from "./gallery.module.css";
import PolaroidFrame from "../../components/polaroid-frame/PolaroidFrame";
import Modal from "../../components/modal/Modal";
import ImageCarousel from "../../components/image-carousel/ImageCarousel";
import { Image } from "../../models/Image";
import { ScrollId } from "../../models/ScrollId";
import textures from "../../styles/textures.module.css";

const POLAROID_COUNT = 20;

const Gallery: Component = () => {
  const [openModal, setOpenModal] = createSignal<Image | null>(null);

  const pageId: ScrollId = "gallery";

  const polaroids: Image[] = Array.from(
    { length: POLAROID_COUNT },
    (_, index) => ({
      index,
      image: `https://picsum.photos/${700 + index}/${700 + index}`,
    })
  );

  const handlePolaroidClick = (index: number) => {
    setOpenModal(polaroids[index]);
  };

  const transformStyle = () => {
    return `translate(${Math.random() * 3.125 - 1.5625}rem, ${
      Math.random() * 3.125 - 1.5625
    }rem)`;
  };

  return (
    <div
      id={pageId}
      class={`${textures.floralMaskBg} ${classes.galleryContainer}`}
    >
      <Modal open={!!openModal()} onClose={() => setOpenModal(null)}>
        {openModal() && (
          <ImageCarousel
            images={polaroids}
            firstIndex={openModal()?.index ?? 0}
          />
        )}
      </Modal>
      <div class={classes.polaroidContainer}>
        <For each={polaroids}>
          {(galleryItem) => (
            <div
              onClick={() => handlePolaroidClick(galleryItem.index)}
              class={classes.galleryItem}
              style={{ transform: transformStyle() }}
            >
              <PolaroidFrame
                rotate={Math.random() * 10 - 5}
                class={classes.polaroidComponent}
                src={galleryItem.image}
                topTape={true}
              />
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default Gallery;
