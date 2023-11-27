import { useDispatch } from "react-redux";
import { actions as ModalStore } from "@/stores/modalStore/modalStore";
import { v4 as uuid } from "uuid";

export default function ModalActions() {
  const dispatch = useDispatch();

  const { append, destroy, destroyAll } = ModalStore;

  function createModal({ name = null, data = <></> }) {
    const id = uuid();
    dispatch(append({ name, id, data }));
  }

  function destroyModal() {
    dispatch(destroy());
  }

  function destroyAllModal(e) {
    const element = document?.getElementById("modalWrapper") || null;

    element?.classList.add("hidden");

    setTimeout(() => {
      dispatch(destroyAll());
    }, 400);
  }

  return { createModal, destroyModal, destroyAllModal };
}
