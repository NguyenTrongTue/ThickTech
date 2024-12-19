import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  // State lưu giỏ hàng: { productId, quantity }
  const [cartProducts, setCartProducts] = useState([]);

  // Lưu giỏ hàng vào localStorage khi có thay đổi
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    } else {
      ls?.removeItem("cart"); // Xóa dữ liệu trong localStorage nếu giỏ hàng trống
    }
  }, [cartProducts]);

  // Khôi phục giỏ hàng từ localStorage khi load trang
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  // Hàm thêm sản phẩm vào giỏ hàng
  function addProduct(productId, quantity = 1) {
    setCartProducts((prev) => {
      const existingProduct = prev.find((item) => item.productId === productId);

      if (existingProduct) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Thêm sản phẩm mới với quantity
        return [...prev, { productId, quantity }];
      }
    });
  }
  // hàm giảm số lượng sản phẩm
  function decreaseProduct(productId) {
    setCartProducts((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }
  // Hàm xóa sản phẩm khỏi giỏ hàng
  function removeProduct(productId) {
    setCartProducts((prev) =>
      prev.filter((item) => item.productId !== productId)
    );
  }

  // Hàm cập nhật số lượng sản phẩm
  function updateQuantity(productId, quantity) {
    setCartProducts((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  }

  // Hàm xóa toàn bộ giỏ hàng
  function clearCart() {
    setCartProducts([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        updateQuantity,
        clearCart,
        decreaseProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
