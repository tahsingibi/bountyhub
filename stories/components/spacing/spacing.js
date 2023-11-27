import React from "react";
import styles from "./spacing.module.scss";
import Heading from "../../../components/core/heading/heading";
import Text from "../../../components/core/text/text";

function Item({ name = "Name", value = "8px" }) {
  return (
    <div className={styles.spacing}>
      <div className={styles.text}>
        <Heading text={name} />
        <Text>{value}</Text>
      </div>
      <div className={styles.block}>
        <div style={{ width: value }} />
      </div>
    </div>
  );
}

export default function Spacing({ children }) {
  return <div className={styles.wrapper}>{children}</div>;
}

Spacing.Item = Item;
