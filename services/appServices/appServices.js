import { useDispatch } from "react-redux";
import { actions as AppStore } from "@/stores/appStore/appStore";

export default function AppActions() {
  const dispatch = useDispatch();
  const { setReady: setStoreReady } = AppStore;

  const setReady = (ready) => dispatch(setStoreReady(ready));

  return { setReady };
}
