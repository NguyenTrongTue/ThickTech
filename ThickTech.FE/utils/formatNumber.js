import numeral from "numeral";

export default function formatNumber(price) {
  // Tiền tệ Việt Nam
  return numeral(price).format("0,0");
}
