import { Component, For } from "solid-js";
import classes from "./contacts.module.css";
import ShadowedTitle from "../../components/shadowed-title/ShadowedTitle";
import gmailIcon from "/assets/images/gmail-icon.svg?raw";
import whatsappIcon from "/assets/images/whatsapp-icon.svg?raw";
import BurstBadge from "../../components/burst-badge/BurstBadge";
import instagramIcon from "/assets/images/insta-icon.svg?raw";
import { ScrollId } from "../../models/ScrollId";
import { useSkinningStore } from "../../global-store/SkinningStore";

interface ContactItem {
  href: string;
  ariaLabel: string;
  icon: string;
  external?: boolean;
}

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

  return (
    <div id={pageId} class={classes.contactsContainer}>
      <ShadowedTitle text={contactUsText} class={classes.bigTitle} />

      <div class={classes.icons}>
        <For each={CONTACTS}>
          {(contact) => (
            <a
              class={classes.contactItem}
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
