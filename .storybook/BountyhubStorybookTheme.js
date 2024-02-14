import { create } from "@storybook/theming/create";
import getCdnUrl from "../utils/getCdnUrl";

export default create({
  base: "dark",
  brandTitle: "Bountyhub",
  brandImage: getCdnUrl({ path: "bussiness/logo/bountyhub-logo.svg" }),
  brandTarget: "_self",
});
