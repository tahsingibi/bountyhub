import { isEmail, isMobilePhone, isLength, isURL } from "validator";
import isSlug from "./validators/isSlug";
import getMessage from "./getMessage";
import isUsername from "./validators/isUsername";
import isCommunityCover from "./validators/isCommunityCover";

export const controllers = [
  "email",
  "username",
  "communityTitle",
  "communityDescription",
  "communityCategories",
  "communityCover",
  "slug",
  "url",
  "mobile",
];

const controller = {
  email: (value) => (isEmail(value) ? null : getMessage("1014")),
  username: (value) => isUsername(value),
  communityTitle: (value) => {
    if (!isLength(value?.trim(), { min: 3 })) return getMessage("4009");
    if (!isLength(value?.trim(), { max: 32 })) return getMessage("4010");
  },
  communityDescription: (value) => {
    if (!value?.trim()) return null;
    if (!isLength(value?.trim(), { min: 32 })) return getMessage("4007");
    if (!isLength(value?.trim(), { max: 256 })) return getMessage("4008");
  },
  communityCategories: (value) => {
    if (value?.length < 1) return getMessage("4001");
    if (value?.length > 3) return getMessage("4002");
  },
  communityCover: async (value) => await isCommunityCover(value),
  slug: (value) => {
    if (!isLength(value?.trim(), { min: 3 })) return getMessage("4011");
    if (!isLength(value?.trim(), { max: 32 })) return getMessage("4012");
    if (!isSlug(value?.trim())) return getMessage("F004");
  },
  url: (value) => {
    if (value && value?.trim() != "null") {
      if (!isURL(value)) return getMessage("F003");
      return null;
    }
    return null;
  },
  mobile: (value) => {
    const control = isMobilePhone(value, "any", { strictMode: false });

    return control ? null : getMessage("1019");
  },
};

export default async function controlTypes(type, value, callback) {
  const initialValue = value || "";

  if (callback) return callback(initialValue);

  const _controller = controller[type] || null;
  if (!_controller)
    throw new Error(
      `No such controltype exists, only ${controllers?.toString()}`
    );

  const result = _controller(value) || null;

  return result;
}
