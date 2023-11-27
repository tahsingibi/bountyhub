"use client";
import { useState } from "react";
import styles from "./profile.module.scss";
import SingleForm from "@/components/core/singleform/singleform";
import UserActions from "@/services/userServices/userServices";
import PropTypes from "prop-types";

const _content = {
  form: {
    name: "ProfilePageUsernameUpdate",
  },
  field: {
    label: "Username",
    name: "username",
    controlType: "username",
    description:
      "Aenean et leo id purus ornare vulputate nec sit amet odio. Curabitur vel malesuada augue.",
    delay: 200,
  },
  button: {
    text: "Update",
    type: "submit",
  },
};

export default function UpdateUsername({ user = {} }) {
  const { userUpdate } = UserActions();
  const [resultMessage, setResultMessage] = useState();

  async function handleSubmit(values) {
    const result = await userUpdate({
      username: values?.username,
    });
    setResultMessage(result);
  }

  if (user?.username)
    return (
      <div className={styles.update}>
        <SingleForm
          name={_content.form.name}
          fieldName={_content.field.name}
          label={_content.field.label}
          description={_content.field.description}
          initialValues={{ [_content.field.name]: user.username }}
          onSubmit={handleSubmit}
          controlType={_content.field.controlType}
          isPristineControl
          isRealtimeValidation
          processing
          resultMessage={resultMessage}
          setResultMessage={setResultMessage}
          delay={_content.field.delay}
          button={{ text: _content.button.text, style: "secondary" }}
        />
      </div>
    );
}

UpdateUsername.propTypes = {
  user: PropTypes?.object,
};
