"use client";
import React from "react";
import PropTypes from "prop-types";
import styles from "./linkedaccount.module.scss";
import SingleForm from "@/components/core/singleform/singleform";

const _content = {
  name: "userEmailUpdate",
  input: {
    name: "email",
    icon: "mail",
  },
  label: "Email",
  description:
    "Sed in magna sed purus efficitur lacinia. Integer vel sagittis leo. Aenean portas.",
  button: {
    disabled: true,
    text: "Disconnect",
    style: "secondary",
  },
};

export default function EmailUpdate({ user }) {
  if (user?.email)
    return (
      <div className={styles.item}>
        <SingleForm
          name={_content.name}
          fieldName={_content.input.name}
          label={_content.label}
          description={_content.description}
          initialValues={{ [_content.input.name]: user?.email }}
          icon={_content.input.icon}
          isDisabled
          isReadOnly
          isPristineControl
          button={{
            text: _content.button.text,
            disabled: _content.button.disabled,
            style: _content.button.style,
          }}
        />
      </div>
    );
}

EmailUpdate.propTypes = {
  user: PropTypes.object,
};
