import Component from "./stickymenu";
import PageRedirect from "../../utils/redirect";

const _page = PageRedirect("profile");

export default {
  title: "Component/Sticky Menu",
  component: Component,
  tags: ["autodocs"],
};

export const Default = {
  args: {
    pages: _page,
  },
};
