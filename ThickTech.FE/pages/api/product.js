import apiService from "@/services/api";

export async function getAllCategories() {
  try {
    const res = await apiService.get("/api/categories");
    return res;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch all categories.");
  }
}
// Lấy tất cả sản phẩmphẩm
export async function getAllProducts() {
  try {
    const res = await apiService.get("/api/products");
    return res;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch all posts.");
  }
}
// Lấy sản phẩm  theo slug
export async function getProductBySlug(slug) {
  try {
    const res = await apiService.get(`/api/products/slug/${slug}`);
    return res;
  } catch (error) {
    throw new Error(error.message || `Failed to fetch post with slug: ${slug}`);
  }
}

// Lấy sản phẩm theo category
export async function getProductByCategory(category) {
  try {
    const res = await apiService.get(`/api/products/category/${category}`);
    return res;
  } catch (error) {
    throw new Error(
      error.message || `Failed to fetch post with category: ${category}`
    );
  }
}
// Lấy thêm sản phẩm liên quan (trừ bài hiện tại)
export async function getProductRelated(slug, category) {
  console.log("slug", slug, "category", category);

  try {
    const productsRelated = await getProductByCategory(category);
    return productsRelated
      .filter((product) => product.product_slug !== slug)
      .slice(0, 4);
  } catch (error) {
    throw new Error(error.message || `Failed to fetch more posts.`);
  }
}

// Lấy bài viết có slug (dành cho static paths)
export async function getAllProductsWithSlug() {
  try {
    const allProducts = await getAllProducts();
    return allProducts.map((product) => ({ slug: product.product_slug }));
  } catch (error) {
    throw new Error(error.message || `Failed to fetch post slugs.`);
  }
}

// lấy sản phẩm trong giỏ hàng
export async function getCartProducts(ids) {
  try {
    const res = await apiService.post("/api/cart", { ids });
    return res;
  } catch (error) {
    throw new Error(error.message || `Failed to fetch post with id: ${id}`);
  }
}
