import Link from "next/link";
import Image from "next/image";
import logo from "../public/assets/logo.png";
export default function Logo({ url = "/" }) {
  return (
    <Link
      href={url}
      className="flex gap-1 w-full border-spacing-1 border-cyan-200 items-center"
    >
      <Image src={logo} alt="Logo" width={200} height={100} className="" />
    </Link>
  );
}
