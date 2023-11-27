"use client";
import React, { memo, useState } from "react";
import Label from "@/components/core/label/label";
import Avatar from "@/components/avatar/avatar";
import styles from "./createcommunity.module.scss";
import Form from "@/components/core/form/form";
import FormServices from "@/services/formServices/formServices";
import { useSelector } from "react-redux";
import Message from "@/components/core/message/message";
import CommunityServices from "@/services/communityServices/communityServices";
import PropTypes from "prop-types";

let _content = {
  formName: "CreateCommunity",
  primaryButtonText: "Create a community",
  avatarText: "Recommended size is 256x256px",
  titleField: {
    control_type: "communityTitle",
    placeholder: "examle",
    label: "Title",
    name: "Title",
  },
  descriptionField: {
    control_type: "communityDescription",
    placeholder: "Write a few sentences to introduce your community",
    label: "Description",
    name: "Description",
  },
  categoryField: {
    control_type: "communityCategories",
    placeholder: "Choose at least 1 and at most 3 categories",
    label: "Categories",
    name: "Categories",
  },
};

function CreateCommunityForm({ setActionResult = () => {} }) {
  const [communityAvatar, setCommunityAvatar] = useState(null);
  const [resultMessage, setResultMessage] = useState(null);

  const { GetForm } = FormServices();
  const { values } = GetForm(_content.formName);

  const { createCommunity } = CommunityServices();

  const { category } = useSelector((state) => state.community.community);

  async function handleSubmit(val) {
    setResultMessage(null);

    let formValue = { ...val, LogoFile: communityAvatar?.avatar };

    const result = await createCommunity(formValue);
    setResultMessage(result);
    if (result?.success) {
      _content.formName = "CreateCommunity" + val?.Title;
      setActionResult(result);
    }
  }

  const _avatar = () => {
    if (communityAvatar?.avatar) {
      const blobUrl = URL.createObjectURL(communityAvatar?.avatar);
      return blobUrl;
    }
  };

  const avatar = _avatar();

  return (
    <div className={styles.formWrapper}>
      <div className={styles.message}>
        <Message text={resultMessage?.message} />
      </div>
      <Form
        buttons={{
          primary: {
            text: _content.primaryButtonText,
          },
        }}
        initialValues={{
          LogoFile: null,
          [_content.titleField.name]: null,
          [_content.descriptionField.name]: null,
          [_content.categoryField.name]: null,
        }}
        name={_content.formName}
        onSubmit={handleSubmit}
      >
        <>
          <div className={styles.formField}>
            <Label text="Logo" />
            <Avatar
              size="large"
              avatar={avatar}
              username={values?.Title}
              update={{ callback: setCommunityAvatar, setMessage: () => {} }}
              description={_content.avatarText}
              border
              icon
            />
          </div>
          <Form.Field
            controlType={_content.titleField.control_type}
            isRealtimeValidation
            input={{
              placeholder: _content.titleField.placeholder,
            }}
            label={{
              text: _content.titleField.label,
            }}
            name={_content.titleField.name}
          />

          <Form.Field
            isRealtimeValidation
            controlType={_content.descriptionField.control_type}
            textarea={{
              placeholder: _content.descriptionField.placeholder,
            }}
            label={{
              text: _content.descriptionField.label,
            }}
            name={_content.descriptionField.name}
            required={false}
          />

          <Form.Field
            name={_content.categoryField.name}
            isRealtimeValidation
            controlType={_content.categoryField.control_type}
            selectbox={{
              placeholder: _content.categoryField.placeholder,
              isMulti: true,
              options: category,
            }}
            label={{
              text: _content.categoryField.label,
            }}
          />
        </>
      </Form>
    </div>
  );
}

export default memo(CreateCommunityForm);

CreateCommunityForm.propTypes = {
  setActionResult: PropTypes.func,
};
