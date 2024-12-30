import moment from "moment";

const BlogHeader = ({ title, author, createdAt, images }) => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Tiêu đề */}
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {/* Thông tin tác giả */}
      <div className="flex items-center gap-4 mb-6">
        {/* Avatar */}
        <img
          src={images[0]}
          alt="Author"
          className="w-12 h-12 rounded-full shadow-lg"
        />
        {/* Thông tin */}
        <div>
          <p className="font-medium text-lg">{author}</p>
          <p className="text-gray-500 text-sm">
            {moment(createdAt).format("MMMM Do YYYY")}
          </p>
        </div>
      </div>
      {/* Ảnh bìa */}
      <div className="mb-6">
        <img
          src={images[0]}
          alt="Cover"
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default BlogHeader;
