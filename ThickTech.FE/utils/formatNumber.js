import numeral from "numeral";

export default function FormatNumber({ number, className }) {
  // Tiền tệ Việt Nam

  return (
    <span className={`${className}`}>
      {numeral(number).format("0,0")} <sup>đ</sup>
    </span>
  );
}
