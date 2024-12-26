import { FacebookShareButton, FacebookIcon } from "react-share";
import Image from "next/image";
import Zalo from "@/public/assets/Icons/zalo.svg";
import Instagram from "@/public/assets/Icons/instagram.svg";
const ShareButton = ({ url }) => {
  const zaloShareUrl = `https://zalo.me/share?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center space-x-4">
      {/* Facebook */}
      <FacebookShareButton url={url} style={{ outline: "none" }}>
        <FacebookIcon size="32px" round />
      </FacebookShareButton>

      {/* Zalo */}
      <a
        href={zaloShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ outline: "none" }}
      >
        <Image
          src={Zalo}
          width={32}
          height={32}
          alt="Zalo Share"
          className="w-8 h-8 rounded-full"
        />
      </a>

      {/* Instagram */}
      <a
        href={`https://www.instagram.com`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ outline: "none" }}
      >
        <Image
          src={Instagram}
          width={32}
          height={32}
          alt="Instagram Share"
          className="w-8 h-8 rounded-full"
        />
      </a>
    </div>
  );
};

export default ShareButton;
