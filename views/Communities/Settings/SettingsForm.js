"use client";
import React, { useState, memo } from "react";
import Form from "@/components/core/form/form";
import styles from "../communities.module.scss";
import { useSelector } from "react-redux";
import getCdnUrl from "@/utils/getCdnUrl";
import FileInput from "./fileInput";
import CommunityServices from "@/services/communityServices/communityServices";

const _content = {
  formName: "CommunityUpdate",
  logoFile: {
    name: "logoFile",
    label: "Logo",
    description: "Recommended size is 256x256px",
  },
  coverImageFile: {
    name: "coverImageFile",
    label: "Cover",
    description: "Recommended size is 1920x920px",
    control_type: "communityCover",
  },
  logo: {
    name: "logo",
    label: "Logo",
    description: "Recommended size is 256x256px",
  },
  coverImage: {
    name: "coverImage",
    label: "Cover",
    description: "Recommended size is 1920x920px",
  },
  title: {
    name: "title",
    label: "Title",
    placeholder: "Enter your community title",
    control_type: "communityTitle",
  },
  description: {
    name: "description",
    label: "Description",
    placeholder: "Enter your community description",
    control_type: "communityDescription",
  },
  slug: {
    name: "slug",
    label: "Community URL",
    placeholder: "Enter your community URL",
    control_type: "slug",
  },
  category: {
    name: "categories",
    label: "Category",
    control_type: "communityCategories",
  },
  websiteUrl: {
    name: "webSiteUrl",
    label: "Website URL",
    placeholder: "https://www.example.com",
    control_type: "url",
  },
  isPublic: {
    name: "isPublic",
    label: "Private community",
    description: "Require an invite to join the community and see the quests",
  },
  isDraft: {
    name: "isDraft",
    label: "Draft community",
    description: "Content draft setting",
  },
  button: "Save community information",
};

function SettingsForm() {
  const { updateCommunity } = CommunityServices();
  const community = useSelector(
    (state) => state.community.community.singleCommunity
  );

  let initials = community?.community || null;

  const { category } = useSelector((state) => state.community.community);
  const [communityCover, setCommunityCover] = useState();
  const [communityLogo, setCommunityLogo] = useState();

  const defaultLogo =
    initials?.logo && initials?.logo !== "null"
      ? getCdnUrl({ type: "upload", path: initials?.logo })
      : null;

  const defaultCover =
    initials?.coverImage && initials?.coverImage !== "null"
      ? getCdnUrl({ type: "upload", path: initials?.coverImage })
      : null;

  if (!initials) return;

  const formInitials = {
    id: initials?.id,
    [_content.title.name]: initials[_content.title.name],
    [_content.description.name]: initials[_content.description.name],
    [_content.category.name]: initials[_content.category.name],
    [_content.isPublic.name]: initials[_content.isPublic.name],
    [_content.isDraft.name]: initials[_content.isDraft.name],
    [_content.slug.name]: initials[_content.slug.name],
    [_content.logo.name]: initials[_content.logo.name],
    [_content.logoFile.name]: initials[_content.logoFile.name],
    [_content.coverImage.name]: initials[_content.coverImage.name],
    [_content.coverImageFile.name]: initials[_content.coverImageFile.name],
    [_content.websiteUrl.name]: initials[_content.websiteUrl.name],
  };

  const handleSubmit = async (values) => {
    let newInfo = { ...values };

    newInfo[_content.coverImageFile.name] = communityCover;
    newInfo[_content.logoFile.name] = communityLogo;
    await updateCommunity(newInfo);
  };
  return (
    <div className={styles.settings}>
      <Form
        name={_content.formName}
        onSubmit={handleSubmit}
        initialValues={formInitials}
        buttons={{
          primary: { text: _content.button },
        }}
      >
        <>
          <FileInput
            label={_content.logoFile.label}
            name={_content.logoFile.name}
            description={_content.logoFile.description}
            defaultValue={defaultLogo}
            callback={setCommunityLogo}
          />

          <FileInput
            label={_content.coverImageFile.label}
            name={_content.coverImageFile.name}
            description={_content.coverImageFile.description}
            defaultValue={defaultCover}
            callback={setCommunityCover}
            controller={_content.coverImageFile.control_type}
            size="large"
          />

          <Form.Field
            name={_content.title.name}
            label={{ text: _content.title.label }}
            initialValue={formInitials[_content.title.name]}
            input={{ placeholder: _content.title.placeholder }}
            isRealtimeValidation
            controlType={_content.title.control_type}
          />
          <Form.Field
            name={_content.description.name}
            label={{ text: _content.description.label }}
            initialValue={formInitials[_content.description.name]}
            textarea={{ placeholder: _content.description.placeholder }}
            isRealtimeValidation
            controlType={_content.description.control_type}
          />
          <Form.Field
            name={_content.slug.name}
            controlType={_content.slug.control_type}
            isRealtimeValidation
            label={{ text: _content.slug.label }}
            initialValue={formInitials[_content.slug.name]}
            input={{
              prefix: "bountyhub.com/",
              placeholder: _content.slug.placeholder,
            }}
          />
          <Form.Field
            isRealtimeValidation
            controlType={_content.category.control_type}
            name={_content.category.name}
            label={{ text: _content.category.label }}
            initialValue={formInitials[_content.category.name]}
            selectbox={{
              isMulti: true,
              options: category,
              defaultValues: formInitials[_content.category.name],
            }}
          />
          <Form.Field
            name={_content.websiteUrl.name}
            label={{ text: _content.websiteUrl.label }}
            initialValue={formInitials[_content.websiteUrl.name]}
            input={{ placeholder: _content.websiteUrl.placeholder }}
            controlType={_content.websiteUrl.control_type}
            isRealtimeValidation
          />
          <Form.Field
            name={_content.isPublic.name}
            label={{ text: _content.isPublic.label }}
            initialValue={formInitials[_content.isPublic.name]}
            toggle={{ description: _content.isPublic.description }}
          />
        </>
      </Form>
    </div>
  );
}

export default memo(SettingsForm);
