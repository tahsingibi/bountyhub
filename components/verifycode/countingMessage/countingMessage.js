"use client";
import React, { memo } from "react";
import Countdown from "react-countdown";
import Message from "../../core/message/message";
import styles from "../verifycode.module.scss";
import CounterActions from "../../../services/verifyServices/counterServices";
import PropTypes from "prop-types";

const renderer = ({ minutes, seconds }) => {
  const _seconds = seconds > 9 ? seconds : `0${seconds}`;
  return (
    <Message
      style="info"
      text={`Please wait for ${minutes}:${_seconds} minutes for re-sending.`}
      type="text"
    />
  );
};

function CountingMessage({ second = 0 }) {
  const { counterShow, counterRestart } = CounterActions();

  let millisecond = second * 1000;

  function handleComplete() {
    counterShow(false);
    counterRestart(false);
  }

  return (
    <div className={styles.countmessage}>
      <Countdown
        date={Date.now() + millisecond}
        autoStart
        renderer={renderer}
        onComplete={handleComplete}
      />
    </div>
  );
}

export default memo(CountingMessage);

CountingMessage.propTypes = {
  second: PropTypes.number,
};
