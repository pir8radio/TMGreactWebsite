export const formatAmount = (
  input: string | number | undefined,
  shortHand = false,
  suffix = ""
) => {
  if (input === 0 || input === "0" || input === undefined) return "0";

  if (shortHand) {
    let formatInput = input.toLocaleString("en", {
      notation: "compact",
    });

    if (formatInput.endsWith("K"))
      formatInput = formatInput.toLocaleLowerCase();

    return formatInput + suffix;
  }

  return Number(input).toLocaleString("en") + suffix;
};
