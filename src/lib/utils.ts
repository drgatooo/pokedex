export function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export function isLight(color: string) {
  const [r, g, b] = color.slice(1).match(/.{1,2}/g)!.map(hex => parseInt(hex, 16));
  return r * 0.299 + g * 0.587 + b * 0.114 > 186;
}