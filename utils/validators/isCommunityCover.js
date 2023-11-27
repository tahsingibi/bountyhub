import getMessage from "../getMessage";

export default function isCommunityCover(imageFile) {
  if (imageFile.size > 5 * 1024 * 1024) return getMessage("15");

  const acceptedFormats = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  if (!acceptedFormats.includes(imageFile.type)) {
    return getMessage("20");
  }

  return new Promise((resolve, reject) => {
    let image = new Image();
    image.src = URL.createObjectURL(imageFile);

    image.onload = () => {
      let height = image.height;
      let width = image.width;
      let response = width < 1920 || height < 920 ? getMessage("30") : null;
      resolve(response);
    };

    image.onerror = () => {
      reject(getMessage("30"));
    };
  });
}
