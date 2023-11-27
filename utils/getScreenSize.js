export default function getScreenSize() {
  let window_height = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${window_height}px`);
}
