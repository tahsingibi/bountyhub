"use client";
import React, { useRef, useState, useEffect, memo } from "react";
import NextImage from "next/image";
import PropTypes from "prop-types";
import styles from "./avatar.module.scss";
import renderClass from "../../utils/renderClass";
import Icon from "../core/icon/icon";
import getMessage from "../../utils/getMessage";
import getCdnUrl from "../../utils/getCdnUrl";
import usernameToColor from "../../utils/usernameToColor";
import Text from "../core/text/text";
import Message from "../core/message/message";

/**
 * All avatars displayed throughout the application are generated with this component.
 */
function Avatar({
  avatar = null,
  username = "",
  onClick = () => {},
  size = "default",
  update = null,
  border = false,
  icon = null,
  description = null,
  message = null,
}) {
  const inputRef = useRef();
  const avatarRef = useRef();
  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState(message);

  const _message = resultMessage || message;

  const handleAvatarClick = () => inputRef?.current.click();

  useEffect(() => {
    if (username && avatarRef?.current) {
      const { background } = usernameToColor(username);

      avatarRef.current.style.setProperty("--specialBg", background);
    }
  }, [username, avatarRef]);

  function handleClick() {
    if (update) return handleAvatarClick();

    onClick();
  }

  function handleError(error) {
    setResultMessage(error);
    update?.setMessage(error);
  }

  async function handleFileSelect(event) {
    const selectedFile = event.target.files[0];
    handleError(null);

    if (selectedFile) {
      if (selectedFile.size > 2 * 1024 * 1024) {
        return update?.setMessage({
          success: false,
          message: getMessage(15),
        });
      }

      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      if (!allowedExtensions.exec(selectedFile.name)) {
        const _error = {
          success: false,
          message: getMessage(20),
        };

        handleError(_error);
        return;
      }

      const image = new Image();
      image.src = URL.createObjectURL(selectedFile);
      image.onload = async () => {
        if (image.width < 256 || image.height < 256) {
          return update?.setMessage({
            success: false,
            message: getMessage(20),
          });
        }
        setLoading(true);
        await update?.callback({
          avatar: selectedFile,
          setMessage: update?.setMessage,
        });
        setLoading(false);
      };
    }
  }

  const userAvatar = () => {
    if (!avatar) return null;
    const isBlob = avatar.includes("blob");

    return isBlob ? avatar : getCdnUrl({ type: "upload", path: avatar });
  };

  const _avatar = userAvatar();

  const _text = username ? username[0] : "";

  return (
    <div className={styles.avatarWrapper}>
      <button
        type="button"
        className={renderClass([
          styles.avatar,
          styles["size_" + size],
          border ? styles.border : "",
        ])}
        onClick={handleClick}
        ref={avatarRef}
      >
        {_avatar && (
          <NextImage
            src={_avatar}
            alt={username || "Bountyhub"}
            width={256}
            height={256}
          />
        )}
        {!avatar && (
          <span className={styles.default}>
            <font>{_text}</font>
          </span>
        )}
        {loading && (
          <span className={styles.loading}>
            <Icon type="processing" />
          </span>
        )}
        {update && (
          <input
            type="file"
            accept=".jpg, .jpeg, .png, .gif"
            onChange={handleFileSelect}
            ref={inputRef}
            disabled={loading}
          />
        )}
        {icon && (
          <div className={styles.icon}>
            <Icon type="camera" />
          </div>
        )}
      </button>
      {description && <Text size="small">{description}</Text>}

      <div
        className={renderClass([
          styles.message,
          _message?.message ? styles.show : "",
        ])}
      >
        <Message
          text={_message?.message}
          style={_message?.success && "success"}
        />
      </div>
    </div>
  );
}

export default memo(Avatar);

Avatar.propTypes = {
  /**
   * It checks the avatar information belonging to the user.
   */
  avatar: PropTypes.string,
  /**
   * To set a default avatar if there is no avatar, it uses the first letter of the username.
   */
  username: PropTypes.string,
  /**
   * It checks the size information
   */
  size: PropTypes.oneOf(["default", "large"]),
  /**
   * It controls the onClick event.
   */
  onClick: PropTypes.func,
  /**
   * It allows for the updating of the user's avatar, and it checks the set function within the object to return the result of the operation.
   */
  update: PropTypes.object,
  /**
   * Avatar component controls the border style.
   */
  border: PropTypes.bool,
  /**
   * Avatar component controls the icon.
   */
  icon: PropTypes.bool,
  /**
   * Avatar component controls the description or rules.
   */
  description: PropTypes.any,
  /**
   * Avatar component controls the messages.
   */
  message: PropTypes.object,
};
