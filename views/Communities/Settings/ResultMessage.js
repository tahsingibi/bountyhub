"use client";
import React, { Suspense, memo, useEffect, useState } from "react";
import styles from "../communities.module.scss";
import Message from "@/components/core/message/message";
import { useSelector } from "react-redux";
import UseStorage, { storages } from "@/utils/useStorage";

function ResultMessage() {
  const { settingResult } = useSelector((state) => state.community.community);
  const [result, setResult] = useState();

  const { getItem, removeItem } = UseStorage();
  const storageMessage = getItem(storages.communityUpdateResult);

  const messageStyle = result?.success ? "success" : "danger";

  useEffect(() => {
    if (storageMessage) {
      setResult({ success: true, message: storageMessage });
      removeItem(storages.communityUpdateResult);
    } else if (settingResult) {
      setResult(settingResult);
    } else {
      setResult(null);
    }
  }, [storageMessage, settingResult]);

  useEffect(() => {
    let handleMessage;
    if (result) handleMessage = setTimeout(() => setResult(null), 10000);

    return () => clearTimeout(handleMessage);
  }, [result]);

  return (
    <div className={styles.resultMessage}>
      <Suspense>
        <Message text={result?.message} style={messageStyle} />
      </Suspense>
    </div>
  );
}

export default memo(ResultMessage);
