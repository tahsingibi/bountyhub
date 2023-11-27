import { useDispatch, useSelector } from "react-redux";
import { actions as VerifyStore } from "../../stores/verifyStore/verifyStore";
import { actions as MembershipStore } from "../../stores/membershipStore/membershipStore";
import CounterActions from "./counterServices";
import FetchRequest from "../../utils/fetchRequest";

export default function VerifyActions() {
  const dispatch = useDispatch();

  const { length } = useSelector((state) => state.verification.otp);

  const { verification, counter } = useSelector((state) => state.verification);

  const { verifyCode, reload } = verification;

  const { verifyToken, verifyTokenType } = useSelector(
    (state) => state.membership.membership
  );

  const { setVerifyToken } = MembershipStore;

  const {
    setIsResendable,
    setIsSended,
    setIsLoading,
    setVerifyCode,
    setMessage,
    setReload,
  } = VerifyStore;

  const { counterShow, counterRestart } = CounterActions();

  function setErrorMessage(message) {
    dispatch(setMessage(message));
  }

  function setVerificationCode(code) {
    setErrorMessage(null);
    dispatch(setVerifyCode(code));
  }

  function setResendable(resendable) {
    setErrorMessage(null);
    dispatch(setIsResendable(resendable));
  }

  function setLoading(loading) {
    dispatch(setIsLoading(loading));
  }

  function setSended(sended) {
    setErrorMessage(null);
    dispatch(setIsSended(sended));
  }

  function onReload() {
    dispatch(setReload(reload + 1));
  }

  async function sendVerificationCode() {
    setErrorMessage(null);
    setResendable(false);

    if (counter.isCount) return counterShow(true);

    const body = new URLSearchParams();
    body.append("verifyToken", verifyToken);
    body.append("type", verifyTokenType);

    await FetchRequest("membership/verify/resend", {
      method: "POST",
      body,
      onSuccess: (response) => {
        if (response?.success) {
          dispatch(setVerifyToken(response.token));
          setSended(true);
          counterRestart(true);
          onReload();

          setTimeout(() => setSended(false), 10000);
        }
      },
      onError: (res) => setErrorMessage(res?.message),
    });
  }

  const isFilled = verifyCode?.length === length;

  return {
    sendVerificationCode,
    setVerificationCode,
    setResendable,
    isFilled,
    onReload,
    setErrorMessage,
    setLoading,
  };
}
