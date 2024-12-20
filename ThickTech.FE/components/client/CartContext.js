import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  // Lưu giỏ hàng vào cookie khi có thay đổi
  const [cartProducts, setCartProducts] = useState([]);

  // Lưu giỏ hàng vào cookie khi `cartProducts` thay đổi
  useEffect(() => {
    if (cartProducts?.length > 0) {
      Cookies.set("cart", JSON.stringify(cartProducts), { expires: 7 }); // lưu cookie trong 7 ngày
    }
  }, [cartProducts]);

  // Khôi phục giỏ hàng từ cookie khi load trang
  useEffect(() => {
    const cartFromCookie = Cookies.get("cart");
    if (cartFromCookie) {
      setCartProducts(JSON.parse(cartFromCookie));
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

  // Hàm giảm số lượng sản phẩm
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
    setCartProducts((prev) => {
      const updatedCart = prev.filter((item) => item.productId !== productId);

      // Kiểm tra nếu giỏ hàng trống, xóa cookie
      if (updatedCart.length === 0) {
        Cookies.remove("cart");
      } else {
        // Lưu lại giỏ hàng vào cookie nếu vẫn còn sản phẩm
        Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 });
      }

      // Cập nhật giỏ hàng trong state
      return updatedCart;
    });
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
    Cookies.remove("cart"); // Xóa cookie khi giỏ hàng trống
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
