export const messageCodes = {
  0: {
    success: false,
    desc: "UnknowError",
    message: "Message Content - UnknowError",
  },
  10: {
    success: false,
    desc: "KeywordBanned",
    message:
      "Sorry, the username you entered is already being used in another user account.",
  },

  15: {
    success: false,
    desc: "FileSizeMaxLimit",
    message: "Content - FileExtensionError",
  },
  20: {
    success: false,
    desc: "FileExtensionError",
    message: "Content - FileExtensionError",
  },
  25: {
    success: false,
    desc: "NotFound",
    message: "{scope} is not found.",
  },
  30: {
    success: false,
    desc: "FileDimensionError",
    message: "Message Content - FileDimensionError",
  },
  100: {
    success: false,
    desc: "TokenError",
    message: "Message Content - TokenError",
  },

  101: {
    success: false,
    desc: "VerifyCodeError",
    message:
      "Sorry, you entered an incorrect or invalid verification code. Please check your verification code or request a new verification code.",
  },

  102: {
    success: false,
    desc: "TokenResendWait",
    message: "Message Content - TokenResendWait",
  },

  1000: {
    success: false,
    desc: "UserAlreadyExists",
    message: "Message Content - UserAlreadyExists",
  },

  1001: {
    success: false,
    desc: "UserBanned",
    message:
      "Sorry, your account has been suspended due to a violation of community guidelines.",
  },

  1005: {
    success: false,
    desc: "ExternalTokenError",
    message: "Message Content - ExternalTokenError",
  },

  1013: {
    success: false,
    desc: "EmailRequired",
    message: "Please enter a valid e-mail address.",
  },

  1014: {
    success: false,
    desc: "NotValidEmail",
    message: "Please enter a valid e-mail address.",
  },

  1015: {
    success: false,
    desc: "DomainBanned",
    message:
      "Sorry, we can't let you into our contest with this email address. Please register with one of the major email providers and help us prevent spam for a fair contest for all.",
  },

  1016: {
    success: false,
    desc: "HasEmail",
    message:
      "Sorry, the email address you entered is already being used in another user account.",
  },

  1019: {
    success: false,
    desc: "PHONE_NUMBER_INVALID",
    message: "Please enter a valid phone number.",
  },

  1002: {
    success: false,
    desc: "UsernameMinLengthError",
    message:
      "Your username is too short. Please enter a username with at least 3 characters.",
  },

  1003: {
    success: false,
    desc: "UsernameMaxLengthError",
    message:
      "Your username is too long. Please enter a username with a maximum of 20 characters.",
  },

  1011: {
    success: false,
    desc: "UsernameContainsSpecialCharacter",
    message:
      "Your username contains invalid characters. Remember that your username can only include letters (A-Z) and numbers (0-9), and should not contain special characters.",
  },

  1006: {
    success: false,
    desc: "ExternalUserNotFound",
    message: "Message Content - ExternalUserNotFound",
  },

  1008: {
    success: false,
    desc: "UsernameRequired",
    message: "Message Content - UsernameRequired",
  },

  1012: {
    success: false,
    desc: "HasUsername",
    message:
      "Sorry, the username you entered is already being used in another user account.",
  },

  1017: {
    success: false,
    desc: "UsernameKeywordBanned",
    message:
      "Sorry, the username you entered is already being used in another user account.",
  },

  1020: {
    success: false,
    desc: "PHONE_CODE_INVALID",
    message: "Content - PHONE_CODE_INVALID",
  },

  1021: {
    success: false,
    desc: "FLOOD_WAIT_X",
    message: "Content- FLOOW_WAIT_X",
  },
  401: {
    success: false,
    desc: "Unauthorized",
    message: "Message Content - Unauthorized Process",
  },
  4001: {
    success: false,
    desc: "CategoriesRequired",
    message: "Message Content -CategoriesRequired",
  },

  4002: {
    success: false,
    desc: "MaxCategoriesError",
    message: "Message Content -MaxCategoriesError",
  },

  4003: {
    success: false,
    desc: "HasCommunity",
    message: "Message Content - HasCommunity",
  },

  4006: {
    success: false,
    desc: "UserAlreadyCollaboration",
    message: "Message Content - UserAlreadyCollaboration",
  },

  4007: {
    success: false,
    desc: "DescriptionMinLengthError",
    message: "Message Content - DescriptionMinLengthError",
  },

  4008: {
    success: false,
    desc: "DescriptionMaxLengthError",
    message: "Message Content - DescriptionMaxLengthError",
  },

  4009: {
    success: false,
    desc: "TitleMinLengthError",
    message: "Message Content - TitleMinLengthError",
  },

  4010: {
    success: false,
    desc: "TitleMaxLengthError",
    message: "Message Content - TitleMaxLengthError",
  },

  4011: {
    success: false,
    desc: "SlugMinLengthError",
    message: "Message Content - SlugMinLengthError",
  },

  4012: {
    success: false,
    desc: "SlugMaxLengthError",
    message: "Message Content - SlugMaxLengthError",
  },
  4013: {
    success: false,
    desc: "HasSlug",
    message: "Message Content - HasSlug",
  },
  4027: {
    success: false,
    desc: "TitleKeywordBanned",
    message: "Message Content - TitleKeywordBanned",
  },

  F001: {
    success: false,
    desc: "VerifyNotFound",
    message: "Please enter your verification code.",
  },

  F002: {
    success: false,
    desc: "SignatureAwaited",
    message:
      "A signature is awaited from the wallet account you are trying to log into.",
  },

  F003: {
    success: false,
    desc: "UrlNotValid",
    message: "Content - URLNOTVALID",
  },

  F004: {
    success: false,
    desc: "SlugNotValid",
    message: "Content - SlugNotValid",
  },
  F005: {
    success: false,
    desc: "ImageFileDPIError",
    message: "Content - ImageFileDPIError",
  },

  T001: {
    success: true,
    desc: "UserConnectionSocial",
    message: "Your {socialName} connection has been connected.",
  },

  T002: {
    success: true,
    desc: "UserDisconnectionSocial",
    message: "Your {socialName} connection has been disconnected.",
  },

  T003: {
    success: true,
    desc: "UserUpdated",
    message: "{updated} has been successfully updated.",
  },

  T004: {
    success: true,
    desc: "CommunityUpdated",
    message: "{community} has been successfully updated.",
  },
};

export function MessageCode(key) {
  return messageCodes[key] || messageCodes[0];
}

export default function getMessage(key) {
  return MessageCode(key)?.message;
}
