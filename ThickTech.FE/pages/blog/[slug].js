import { useRouter } from "next/router";

import BlogHeader from "@/components/client/blog/BlogHeader";
import BlogBody from "@/components/client/blog/BlogBody";
import Post from "@/components/client/blog/Post";
import ShareButton from "@/components/client/blog/ShareButton";

import { getPostBySlug, getMorePosts, getAllPostsWithSlug } from "@/api/blog";
import { Typography } from "@mui/material";
import MainLayer from "@/components/client/MainLayer";

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths: allPosts?.map(({ slug }) => `/blog/${slug}`) ?? [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  try {
    const post = await getPostBySlug(params.slug);
    const morePosts = await getMorePosts(params.slug);
    return {
      props: {
        post: post || null,
        morePosts: morePosts || null,
      },
      revalidate: 7200, // Revalidate every 2 hours
    };
  } catch (error) {
    return { notFound: true };
  }
}

const Blog = ({ post, morePosts }) => {
  const router = useRouter();

  if (!router.isFallback && !post) {
    return <p>Post not found</p>;
  }

  return (
    <MainLayer
      title={post?.title}
      description={post?.title}
      ogImage={post?.images[0]}
      url={`https://thicktech.vn/blog/${post?.blog_slug}`}
    >
      <BlogHeader
        title={post?.title}
        author={post?.author}
        images={post?.images}
        createdAt={post?.createdAt}
      />
      <BlogBody content={post?.content} />
      <div className="mt-16 container">
        <div className="flex container justify-center align-center flex-col text-slate-700">
          <Typography align="center" className="text-lg font-bold">
            - Chia sẻ -
          </Typography>
          <div className="flex justify-center gap-4 mt-4">
            <ShareButton url={`https://thicktech.vn/blog/${post?.blog_slug}`} />
          </div>
        </div>
        <h4
          align="center"
          className="text-lg font-bold my-8 border-b-2 border-gray-300 text-slate-700"
        >
          - Xem thêm các bài viết -
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {morePosts?.map((post) => (
            <div className="mb-4 grid grid-cols-1" key={post._id}>
              <Post {...post} />
            </div>
          ))}
        </div>
      </div>
    </MainLayer>
  );
};

export default Blog;
