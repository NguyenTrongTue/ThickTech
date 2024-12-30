const BlogBody = ({ content }) => {
  return (
    <div className="max-w-3xl mx-auto px-4">
      <div
        className="mt-6 prose prose-lg prose-blue"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default BlogBody;
