import { Component, For } from "solid-js";
import classes from "./contacts.module.css";
import ShadowedTitle from "../../components/shadowed-title/ShadowedTitle";
import gmailIcon from "/assets/images/gmail-icon.svg?raw";
import whatsappIcon from "/assets/images/whatsapp-icon.svg?raw";
import BurstBadge from "../../components/burst-badge/BurstBadge";
import instagramIcon from "/assets/images/insta-icon.svg?raw";

const EMAIL = "test@gmail.com";
const PHONE = "000000000";
const INSTAGRAM = "oldtimer.moments.koprivnica";

interface ContactItem {
  href: string;
  ariaLabel: string;
  icon: string;
  external?: boolean;
}

const CONTACTS: ContactItem[] = [
  {
    href: `mailto:${EMAIL}`,
    ariaLabel: "Send us an email",
    icon: gmailIcon,
  },
  {
    href: `https://wa.me/${PHONE}`,
    ariaLabel: "Chat with us on WhatsApp",
    icon: whatsappIcon,
    external: true,
  },
  {
    href: `https://www.instagram.com/${INSTAGRAM}`,
    ariaLabel: "Visit our Instagram profile",
    icon: instagramIcon,
    external: true,
  },
] as const;

const Contacts: Component = () => {
  const contactUsText = "Kontaktirajte nas!";
  return (
    <div class={classes.contactsContainer}>
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
