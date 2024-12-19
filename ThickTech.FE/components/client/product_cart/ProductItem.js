import React from "react";
import Link from "next/link";
import Button from "@/components/button/ActionBtn";
import formatNumber from "@/utils/formatNumber";

export default function ProductItem({
  product,
  quantity,
  lessOfThisProduct,
  moreOfThisProduct,
  openModal,
}) {
  return (
    <div className="bg-white flex flex-row border-2 border-slate-400 rounded-md p-3 justify-between">
      <div className="flex items-start flex-row gap-3">
        <Link href={`/product/${product._id}`} className="flex items-center">
          <div className="min-w-[6rem] max-w-[6rem] min-h-[6rem] max-h-[6rem] h-[6rem] w-[6rem] rounded-lg flex justify-center items-center">
            <img
              src={product.images[0]}
              alt={product.title}
              className="object-cover rounded-md w-full h-full"
            />
          </div>
        </Link>
        <div className="flex flex-col">
          <Link href={`/product/${product._id}`} className="flex items-center">
            <h3
              className="ml-4 font-medium line-clamp-2 overflow-hidden"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {product.title}
            </h3>
          </Link>
          <div>
            <span className="ml-4 text-sm font-medium text-gray-500 line-through">
              {formatNumber(product.original_price)}đ
            </span>
            <span className="ml-3 text-md font-medium text-red-700">
              {formatNumber(product.selling_price)}đ
            </span>
          </div>
          <div className="ml-4 mt-2 flex items-center">
            <button
              onClick={() => lessOfThisProduct(product._id)}
              className="px-3 py-1 border border-slate-600 hover:bg-gray-300"
              disabled={quantity === 1}
              style={{
                opacity: quantity === 1 ? 0.2 : 1,
              }}
            >
              -
            </button>
            <span className="text-center border-t border-b border-gray-300 py-1 w-12">
              {quantity}
            </span>
            <button
              onClick={() => moreOfThisProduct(product._id)}
              className="px-3 py-1 border border-slate-600 hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="text-center">
        <Button
          onClick={() => openModal(product._id, product.title)}
          color={"red"}
        >
          Xóa
        </Button>
      </div>
    </div>
  );
}
