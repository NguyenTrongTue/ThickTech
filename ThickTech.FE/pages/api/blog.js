import apiService from "@/services/api";

// Lấy tất cả bài viết
export async function getAllPosts() {
  try {
    const res = await apiService.get("/api/blogs");
    return res;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch all posts.");
  }
}

// Lấy bài viết theo slug
export async function getPostBySlug(slug) {
  try {
    const res = await apiService.get(`/api/blogs/slug/${slug}`);
    return res;
  } catch (error) {
    throw new Error(error.message || `Failed to fetch post with slug: ${slug}`);
  }
}

// Lấy thêm bài viết (trừ bài hiện tại)
export async function getMorePosts(slug) {
  try {
    const allPosts = await getAllPosts();
    return allPosts.filter((post) => post.blog_slug !== slug).slice(0, 3);
  } catch (error) {
    throw new Error(error.message || `Failed to fetch more posts.`);
  }
}

// Lấy bài viết có slug (dành cho static paths)
export async function getAllPostsWithSlug() {
  try {
    const allPosts = await getAllPosts();
    return allPosts.map((post) => ({ slug: post.blog_slug }));
  } catch (error) {
    throw new Error(error.message || `Failed to fetch post slugs.`);
  }
}
