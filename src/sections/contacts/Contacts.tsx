import { Component, For } from "solid-js";
import classes from "./contacts.module.css";
import ShadowedTitle from "../../components/shadowed-title/ShadowedTitle";
import gmailIcon from "/assets/images/gmail-icon.svg?raw";
import whatsappIcon from "/assets/images/whatsapp-icon.svg?raw";
import BurstBadge from "../../components/burst-badge/BurstBadge";
import instagramIcon from "/assets/images/insta-icon.svg?raw";
import { ScrollId } from "../../models/ScrollId";
import { useSkinningStore } from "../../global-store/SkinningStore";
import { createScrollObserver } from "../../hooks/createScrollObserver";

interface ContactItem {
  href: string;
  ariaLabel: string;
  icon: string;
  external?: boolean;
}

const BADGE_STAGGER_DELAYS = ["delay100", "delay200", "delay300"] as const;

const Contacts: Component = () => {
  const contactsSkinningStore = useSkinningStore().contactsSkinning.textJson;
  const pageId: ScrollId = "contact";
  const contactUsText = contactsSkinningStore.title;

  const CONTACTS: ContactItem[] = [
    {
      href: `mailto:${contactsSkinningStore.contacts.email}`,
      ariaLabel: "Send us an email",
      icon: gmailIcon,
    },
    {
      href: `https://wa.me/${contactsSkinningStore.contacts.whatsapp}`,
      ariaLabel: "Chat with us on WhatsApp",
      icon: whatsappIcon,
      external: true,
    },
    {
      href: `https://www.instagram.com/${contactsSkinningStore.contacts.instagram}`,
      ariaLabel: "Visit our Instagram profile",
      icon: instagramIcon,
      external: true,
    },
  ] as const;

  const titleObserver = createScrollObserver();
  const badgesObserver = createScrollObserver({ threshold: 0.3 });

  return (
    <div id={pageId} class={classes.contactsContainer}>
      <div
        ref={titleObserver.ref}
        class={titleObserver.isVisible() ? "animatePopIn" : "animateHidden"}
      >
        <ShadowedTitle text={contactUsText} class={classes.bigTitle} />
      </div>

      <div ref={badgesObserver.ref} class={classes.icons}>
        <For each={CONTACTS}>
          {(contact, index) => (
            <a
              class={`${classes.contactItem} ${
                badgesObserver.isVisible()
                  ? `animateScaleIn ${BADGE_STAGGER_DELAYS[index()]}`
                  : "animateHidden"
              }`}
              href={contact.href}
              aria-label={contact.ariaLabel}
              target={contact.external ? "_blank" : undefined}
              rel={contact.external ? "noopener noreferrer" : undefined}
            >
              <BurstBadge
                class={classes.badgeWrapper}
                pointCount={10}
                strokeWidth={10}
                size="100%"
                fill="var(--contacts-badge-fill)"
                stroke="var(--contacts-badge-stroke)"
                spin={true}
              >
                <div class={classes.badge}>
                  <div class={classes.badgeContent}>
                    <div class={classes.icon} innerHTML={contact.icon} />
                  </div>
                </div>
              </BurstBadge>
            </a>
          )}
        </For>
      </div>
    </div>
  );
};

export default Contacts;
