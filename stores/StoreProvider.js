"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import PropTypes from "prop-types";

export default function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

StoreProvider.propTypes = {
  children: PropTypes.node,
};
