import React from "react";
import styles from "./radius.module.scss";
import Heading from "../../../components/core/heading/heading";
import Text from "../../../components/core/text/text";

function Item({ name = "Name", value = "8px" }) {
  return (
    <div className={styles.radius}>
      <div className={styles.text}>
        <Heading text={name} />
        <Text>{value}</Text>
      </div>
      <div className={styles.block} style={{ borderRadius: value }} />
    </div>
  );
}

export default function Radius({ children }) {
  return <div className={styles.wrapper}>{children}</div>;
}

Radius.Item = Item;
