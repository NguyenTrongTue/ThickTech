import ProductImages from "@/components/client/product/ProductImages";
import ButtonLink from "@/components/button/ButtonLink";
import ButtonCart from "@/components/button/ButtonCart";
import MainLayer from "@/components/client/MainLayer";
import FormatNumber from "@/utils/formatNumber";
import Link from "next/link";

import NewProducts from "@/components/client/product/NewProducts";
import ProductDescription from "@/components/client/product/ProductDescription";
import {
  getProductBySlug,
  getAllProductsWithSlug,
  getProductRelated,
} from "@/api/product";
import toast from "react-hot-toast";
export async function getStaticPaths() {
  const allProducts = await getAllProductsWithSlug();
  return {
    paths: allProducts?.map(({ slug }) => `/product/${slug}`) ?? [],
    fallback: true,
  };
}
export async function getStaticProps({ params }) {
  try {
    const product = await getProductBySlug(params.slug);
    const productsCatqegory = await getProductRelated(
      product.product_slug,
      product.product_category
    );

    return {
      props: {
        product: product || null,
        categoryProducts: productsCatqegory || null,
      },
      revalidate: 3600, // Revalidate every 2 hours
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default function ProductItem({ product, categoryProducts }) {
  return (
    <MainLayer
      title={product.title}
      description={product.description}
      image={product.images[0]}
      url={`https://thicktech.vn/product/${product.product_slug}`}
    >
      <div className="w-full lg:w-full md:w-full xl:w-full bg-white rounded-lg shadow-md p-6 mt-6 flex flex-col lg:flex-row gap-4">
        <div className="bg-white rounded-lg shadow-md w-full lg:w-1/2 md:w-full xl:w-1/2">
          <ProductImages images={product.images} />
        </div>
        {/* Thông tin sản phẩm */}
        <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6">
          <h1 className="text-xl font-bold line-clamp-2">{product.title}</h1>

          <div className="flex items-center gap-5 mt-6">
            <span className="text-lg font-bold text-gray-800">
              <FormatNumber
                number={product.selling_price}
                className={"text-red-500"}
              />
            </span>
          </div>
          <hr className="w-full border-gray-600 my-3" />
          <h2 className="text-lg  text-gray-800 mb-4">Mô tả sản phẩm</h2>
          <ProductDescription description={product.description} />
          <hr className="w-full border-gray-600 my-3" />
          <Link
            href="/products"
            className="text-red-600 text-lg font-medium hover:text-blue-500 space-links border-b-2 border-transparent hover:border-blue-500"
          >
            Tiếp tục mua sắm ...
          </Link>

          <div className=" flex items-center gap-5 mt-6  flex-row">
            <ButtonLink
              href={"/order/" + product._id}
              color="red"
              className="w-1/2"
            >
              Mua ngay
            </ButtonLink>
            <ButtonCart
              type={"large"}
              className={"w-1/2"}
              productId={product._id}
            >
              Thêm vào giỏ hàng
            </ButtonCart>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-full md:w-full xl:w-full bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-lg  text-gray-800 mb-4">Sản phẩm liên quan</h2>
        <NewProducts products={categoryProducts} />
      </div>
    </MainLayer>
  );
}

// export async function getServerSideProps(context) {
//   const { slug } = context.query;
//   try {
//     const response = await apiService.get(`/api/products/slug/${slug}`);

//     const product = response;
//     const categoryProductsResponse = await apiService.get(
//       `/api/products/category/${product.product_category}`
//     );
//     const categoryProducts = categoryProductsResponse;

//     return {
//       props: {
//         product,
//         categoryProducts,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching product data:", error.message);
//     return {
//       notFound: true,
//     };
//   }
// }
