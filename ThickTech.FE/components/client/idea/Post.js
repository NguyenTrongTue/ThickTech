import moment from "moment";
import Link from "next/link";

export default function Post({
  title,
  author,
  blog_slug,
  content,
  images,
  createdAt,
}) {
  const url = `/blog/${blog_slug}`;

  return (
    <Link href={url}>
      <div className="overflow-hidden rounded-md transition-all duration-300 hover:translate-y-[-3px] post_item border-b-2 border-gray-300 border">
        {/* Cover Image */}
        <div
          className="w-full h-56 bg-cover bg-center"
          style={{
            backgroundImage: `url(${images[0] || "/placeholder-image.png"})`,
          }}
        ></div>

        {/* Title */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 line-clamp-2">
            {title}
          </h2>
        </div>
        {/* Author Section */}
        <div className="flex items-center px-4 py-2 bg-gray-100">
          <div
            className="w-10 h-10 rounded-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${images[0] || "/placeholder-avatar.png"})`,
            }}
          ></div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-800">{author}</p>
            <p className="text-xs text-gray-500">
              {moment(createdAt).format("MMMM Do YYYY")}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
