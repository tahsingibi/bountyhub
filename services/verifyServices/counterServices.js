import { useDispatch } from "react-redux";
import { actions as VerifyStore } from "../../stores/verifyStore/verifyStore";

export default function CounterActions() {
  const dispatch = useDispatch();
  const { setIsCount, setIsShowCount } = VerifyStore;

  function counterShow(isShow) {
    dispatch(setIsShowCount(isShow));
  }

  function counterRestart(isStart) {
    dispatch(setIsCount(isStart));
  }

  return { counterShow, counterRestart };
}
