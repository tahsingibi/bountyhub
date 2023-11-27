import React from "react";
import styles from "./textarea.module.scss";

export default function Textarea({ ...props }) {
  return <textarea {...props} className={styles.textarea} rows={6}></textarea>;
}
