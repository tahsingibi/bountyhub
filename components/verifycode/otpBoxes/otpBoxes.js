"use client";
import React, { memo } from "react";
import Input from "../../core/input/input";
import styles from "../verifycode.module.scss";
import { useSelector } from "react-redux";
import OTPActions from "../../../services/verifyServices/otpServices";

function OTPBoxes() {
  const { values } = useSelector((state) => state.verification.otp);

  const { inputChange, inputKeyDown, inputStep, inputRefs } = OTPActions();

  return (
    <div className={styles.group}>
      {values.map((value, i) => (
        <Input
          key={inputRefs[i]?.id}
          reference={inputRefs[i]?.ref}
          value={value}
          placeholder="X"
          type="number"
          size="large"
          autoFocus={i == 0}
          onKeyDown={(e) => inputKeyDown(e, i)}
          onChange={(e) => inputChange(e, i)}
          onFocus={() => inputStep(null, i)}
        />
      ))}
    </div>
  );
}

export default memo(OTPBoxes);
