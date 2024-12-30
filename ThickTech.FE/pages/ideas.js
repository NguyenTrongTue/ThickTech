import MainLayer from "@/components/client/MainLayer";
import { getAllPosts } from "@/api/blog";
import Post from "@/components/client/idea/Post";
export async function getStaticProps() {
  const res = await getAllPosts();
  return {
    props: {
      posts: res,
    },
  };
}

export default function Ideas({ posts }) {
  return (
    <MainLayer
      title="Ideas -ThickTech"
      description="Các bài viết về ý tưởng sáng tạo, dự án của ThickTech"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post) => (
            <div className="mb-4 grid grid-cols-1" key={post._id}>
              <Post
                title={post.title}
                author={post.author}
                blog_slug={post.blog_slug}
                content={post.content}
                images={post.images}
                createdAt={post.createdAt}
              />
            </div>
          ))}
        </div>
      </div>
    </MainLayer>
  );
}
