"use client";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./modal.module.scss";
import ModalActions from "@/services/modalServices/modalServices";
import ModalHeading from "./heading";
import renderClass from "@/utils/renderClass";

export default function Modal() {
  const modals = useSelector((state) => state.modal.modals);
  const { destroyAllModal } = ModalActions();

  const modalWrapperRef = useRef(null);

  const _wrapperID = "modalWrapper";

  function handleClose(e) {
    if (e?.target?.id == _wrapperID || e.key === "Escape") {
      destroyAllModal();
    }
  }

  useEffect(() => {
    if (modalWrapperRef?.current && modals?.length) {
      modalWrapperRef?.current?.addEventListener("click", handleClose);
      document?.addEventListener("keydown", handleClose);
    }
  }, [modals, modalWrapperRef]);

  if (modals?.length)
    return (
      <div className={styles.modal} id={_wrapperID} ref={modalWrapperRef}>
        {modals?.map((item) => {
          return (
            <div
              id="modalBody"
              key={item.id}
              className={renderClass([
                styles.body,
                styles["size_" + item?.size],
              ])}
            >
              <item.data />
            </div>
          );
        })}
      </div>
    );
}

Modal.Heading = ModalHeading;
