import Link from "components/Link";
import moment from "moment";

export default function Post({
  title,
  subtitle,
  authorName,
  authorImage,
  slug,
  date,
  coverImage,
}) {
  return (
    <Link
      href="/blog/[slug]"
      as={`/blog/${slug}`}
      className="block w-full transform transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Ảnh bìa */}
      <div
        className="relative pb-[45.25%] bg-cover bg-center rounded-t-lg"
        style={{ backgroundImage: `url(${coverImage})` }}
      ></div>

      {/* Nội dung */}
      <div className="p-4 bg-white rounded-b-lg">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">
          {subtitle.length > 80 ? subtitle.substr(0, 80) + "..." : subtitle}
        </p>

        {/* Thông tin tác giả */}
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${authorImage})` }}
          ></div>
          <div>
            <p className="text-sm font-medium">{authorName}</p>
            <p className="text-xs text-gray-500">
              {moment(date).format("MMMM Do YYYY")}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
