export const COLORS: Record<string, string> = {
  pink: "oklch(0.8 0.07 345)",
  green: "oklch(0.69 0.10 148)",
  white: "oklch(1 0 0)",
  lightGray: "oklch(0.88 0 0)",
  medGray: "oklch(0.84 0 0)",
  yellow: "oklch(0.87 0.1 98)",
};

const lightness = (color: string, lDiff: number): string => {
  const values = color.substring(color.indexOf("(") + 1, color.indexOf(")"));
  const [l, c, h] = values.split(" ");
  let upc = lDiff < 0 ? Number(c) + 0.03 : c;
  return `oklch(${Number(l) + Number(lDiff)} ${upc} ${h})`;
};

const alpha = (color: string, alpha: number) => {
  return `${color.substring(0, color.indexOf(")"))} / ${alpha})`;
};

COLORS["yellowD"] = lightness(COLORS.yellow, -0.018);
COLORS["greenD"] = lightness(COLORS.green, -0.04);
COLORS["whiteA"] = alpha(COLORS.white, 0.6);
COLORS["lightGrayA"] = alpha(COLORS.lightGray, 0.75);
COLORS["medGrayA"] = alpha(COLORS.medGray, 0.75);

export const createColorCustomProps = () => {
  let css = ":root {\n";
  for (const [key, value] of Object.entries(COLORS)) {
    const cssVarName = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
    css += `  ${cssVarName}: ${value};\n`;
  }
  css += "}";

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
};
