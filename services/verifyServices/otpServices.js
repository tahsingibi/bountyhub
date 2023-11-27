import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions as VerifyStore } from "../../stores/verifyStore/verifyStore";
import useRefArray from "../../utils/useRefArray";
import VerifyActions from "./verifyServices";

export default function OTPActions() {
  const dispatch = useDispatch();
  const { setVerificationCode } = VerifyActions();
  const { isSended } = useSelector((state) => state.verification.verification);

  const { length, values } = useSelector((state) => state.verification.otp);
  const { setOTP, clearOTP } = VerifyStore;
  const inputRefs = useRefArray(length);

  useEffect(() => {
    setVerificationCode(values.join(""));
  }, [values]);

  useEffect(() => {
    if (isSended) setOTPValues(new Array(length).fill(""));
  }, [isSended]);

  function setOTPValues(value) {
    dispatch(setOTP(value));
  }

  function inputStep(value, index) {
    value && setOTPValues(value);
    inputRefs[index]?.ref?.current?.focus();
    inputRefs[index]?.ref?.current?.select();
  }

  function inputChange(e, index) {
    const { value } = e.target;
    const nextIndex = index + 1 < length ? index + 1 : index;

    if (!isNaN(value) && index < length) {
      if (value.length >= length) {
        const pasted = [...value.slice(0, length)];
        inputStep(pasted, length - 1);
        return;
      }

      if (value != "") {
        const newOTPValues = [...values];
        newOTPValues[index] = value.length > 1 ? value.slice(-1) : value;
        inputStep(newOTPValues, nextIndex);
      }
    }
  }

  function inputKeyDown(event, index) {
    const { code } = event;
    const prevIndex = index - 1 >= 0 ? index - 1 : index;
    if (code == "Backspace") {
      const newOTPValues = [...values];
      newOTPValues[index] = "";
      inputStep(newOTPValues, prevIndex);
    }
  }

  const clearlyOTPBox = (manyChar) => dispatch(clearOTP(manyChar));

  return {
    setOTPValues,
    inputChange,
    inputKeyDown,
    inputStep,
    inputRefs,
    clearlyOTPBox,
  };
}
