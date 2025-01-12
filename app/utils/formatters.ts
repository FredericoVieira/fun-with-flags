export const formatNumber = (number: number | undefined) => {
  if (!number) return "0";

  const digits = Math.abs(number).toString().length;
  const tier = Math.floor((digits - 1) / 3);

  if (tier === 0) return number.toString();

  const scale = Math.pow(10, tier * 3);
  const scaled = number / scale;
  const units = ["", "K", "M", "B", "T"];

  return `${scaled.toFixed(1).replace(/\.0/, "")}${units[tier]}`;
};
