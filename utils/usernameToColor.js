export default function usernameToColor(username) {
  if (username) {
    function staticColor(seed) {
      let colorCode = Math.floor(seed * 16777215).toString(16);
      return "#" + colorCode.padStart(6, "0");
    }

    function pastelTone(mainColor, dif) {
      const _val = dif || 2;
      let r = parseInt(mainColor.slice(1, 3), 16);
      let g = parseInt(mainColor.slice(3, 5), 16);
      let b = parseInt(mainColor.slice(5, 7), 16);

      r = Math.floor((255 - r) / _val) + r;
      g = Math.floor((255 - g) / _val) + g;
      b = Math.floor((255 - b) / _val) + b;

      return "#" + (r * 65536 + g * 256 + b).toString(16).padStart(6, "0");
    }

    let wordHash = username.split("").reduce(function (acc, char) {
      return acc + char.charCodeAt(0);
    }, 0);

    let _color = staticColor(wordHash);
    let color = pastelTone(_color);
    let color2 = pastelTone(_color, 32);

    let gradient = "linear-gradient(45deg, " + color + ", " + color2 + ")";

    return {
      background: gradient,
    };
  }
}
