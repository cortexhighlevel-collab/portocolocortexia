export function isIOSDevice(): boolean {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent || "";
  const iOS = /iPad|iPhone|iPod/i.test(ua);

  // iPadOS 13+ reports as Mac, but with touch points.
  const iPadOS =
    navigator.platform === "MacIntel" &&
    typeof navigator.maxTouchPoints === "number" &&
    navigator.maxTouchPoints > 1;

  return iOS || iPadOS;
}
