import { Component } from "solid-js";
import classes from "./contacts.module.css";
const Contacts: Component = () => {
  return (
    <div class={classes.contactsContainer}>
      <p>email</p>
      <p>phone</p>
      <p>address</p>
    </div>
  );
};

export default Contacts;
