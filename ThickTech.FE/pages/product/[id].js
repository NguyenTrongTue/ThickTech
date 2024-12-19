import Head from "next/head";
import ProductImages from "@/components/client/ProductImages";
import ButtonLink from "@/components/client/button/ButtonLink";
import ButtonCart from "@/components/client/button/ButtonCart";
import { useContext, useState } from "react";
import { CartContext } from "@/components/client/CartContext";
import apiService from "@/services/api";
import MainLayer from "@/components/client/MainLayer";
import formatNumber from "@/utils/formatNumber";
import Link from "next/link";
import ProductDescription from "@/components/client/ProductDescription";

export default function ProductPage({ product, meta }) {
  const { addProduct } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };
  return (
    <>
      <Head>
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <meta property="og:title" content={meta?.title} />
        <meta property="og:description" content={meta?.description} />
        <meta property="og:image" content={meta?.image} />
        <meta
          property="og:url"
          content={`https://yourwebsite.com/products/${product._id}`}
        />
      </Head>
      <MainLayer>
        <div className="w-full flex flex-col lg:flex-row gap-4 lg:px-10 xl:px-10 md:px-10">
          {/* Hình ảnh sản phẩm */}
          <div className="bg-white rounded-lg shadow-md w-full lg:w-1/2 md:w-full xl:w-1/2">
            <ProductImages images={product.images} />
          </div>

          {/* Thông tin sản phẩm */}
          <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6">
            <h1 className="text-xl font-bold line-clamp-2">{product.title}</h1>

            <div className="flex items-center gap-5 mt-6">
              <span className="text-lg font-bold text-gray-800">
                {formatNumber(product.selling_price)}đ
              </span>
              <span className="text-sm font-normal opacity-75 line-through text-gray-500">
                {" "}
                {formatNumber(product.original_price)}đ
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
                onClick={() => addProduct(product._id, quantity)}
              >
                Thêm vào giỏ hàng
              </ButtonCart>
            </div>
          </div>
        </div>
      </MainLayer>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  try {
    const response = await apiService.get(`/api/products/${id}`);
    const product = response;
    const meta = {
      title: product?.title || "Sản phẩm",
      description: product?.description || "Mô tả sản phẩm",
      image: product?.images?.[0] || "/public/assets/logo.png",
    };
    return {
      props: {
        product,
        meta,
      },
    };
  } catch (error) {
    console.error("Error fetching product data:", error.message);
    return {
      notFound: true,
    };
  }
}