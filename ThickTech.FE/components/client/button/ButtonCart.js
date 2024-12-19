import { useState, useContext } from "react";
import toast from "react-hot-toast";
import CartIcon from "@/components/client/icons/CartIcon";
import ShoppingCartIcon from "@/components/client/icons/ShoppingCartIcon";
import { CartContext } from "@/components/client/CartContext";
import Button from "@/components/client/button/ActionBtn";
export default function ButtonCard({ productId, type, className }) {
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);

  const isAdded = cartProducts.some((item) => item.productId === productId);

  const handlClick = async () => {
    try {
      if (isAdded) {
        await removeProduct(productId);
      } else {
        await addProduct(productId);
      }
      toast.success(
        isAdded
          ? "Đã xóa sản phẩm trong giỏ hàng"
          : "Đã thêm sản phẩm vào giỏ hàng"
      );
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };

  if (type === "cute") {
    return (
      <Button
        onClick={handlClick}
        color={isAdded ? "red" : "slate"}
        className={`${className} ${
          isAdded
            ? "outline-red-400 border-red-600"
            : "outline-slate-400 border-slate-600"
        }`}
      >
        {isAdded ? "Click to Remove" : "Add To Cart"}
      </Button>
    );
  }

  if (type === "large") {
    return (
      <Button
        onClick={handlClick}
        color={isAdded ? "red" : "slate"}
        className={`${className} ${
          isAdded
            ? "outline-red-400 border-red-600"
            : "outline-slate-400 border-slate-600"
        }`}
      >
        {isAdded ? (
          <>
            <ShoppingCartIcon className="text-xs" />
            Click to Remove
          </>
        ) : (
          <>
            <CartIcon className="text-xs" />
            Add To Cart
          </>
        )}
      </Button>
    );
  }

  return (
    <Button
      onClick={handlClick}
      color={isAdded ? "red" : "slate"}
      className={`${className} ${
        isAdded
          ? "outline-red-400 border-red-600"
          : "outline-slate-400 border-slate-600"
      }`}
    >
      {isAdded ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
            clip-rule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      )}
    </Button>
  );
}
