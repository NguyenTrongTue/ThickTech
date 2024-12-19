import { useContext, useEffect, useState, useCallback } from "react";
import { CartContext } from "@/components/client/CartContext";
import MainLayer from "@/components/client/MainLayer";
import ProductList from "@/components/client/product_cart/ProductList";
import ConfirmModal from "@/components/client/product_cart/ConfirmModal";
import toast from "react-hot-toast";
import ButtonLink from "@/components/button/ButtonLink";
import apiService from "@/services/api";

export default function CartPage() {
  const {
    cartProducts,
    addProduct,
    decreaseProduct,
    removeProduct,
    clearCart,
  } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemTitle, setItemTitle] = useState("");
  const [itemId, setItemId] = useState("");

  useEffect(() => {
    if (cartProducts.length === 0 && products.length > 0) {
      clearCart(); // Xóa giỏ hàng khi không còn sản phẩm
      setProducts([]); // Đặt lại danh sách sản phẩm
    }
  }, [cartProducts, products]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      const ids = cartProducts.map((item) => item.productId);
      fetchProducts(ids);
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  const fetchProducts = async (ids) => {
    try {
      const response = await apiService.post("/api/cart", { ids });
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Có lỗi xảy ra khi lấy dữ liệu sản phẩm.");
      setProducts([]);
    }
  };

  const handleDelete = useCallback(() => {
    removeProduct(itemId);
    setIsModalOpen(false);
    toast.success("Đã xóa sản phẩm khỏi giỏ hàng.");
  }, [itemId, removeProduct]);

  const openModal = (id, title) => {
    setIsModalOpen(true);
    setItemId(id);
    setItemTitle(title);
  };

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    decreaseProduct(id);
  }

  const totalItems = cartProducts.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <MainLayer>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        message="Bạn chắc chắn muốn bỏ sản phẩm này?"
        itemTitle={itemTitle}
      />
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-700">
          Số lượng sản phẩm: ({totalItems})
        </h2>
        {cartProducts.length === 0 && (
          <div className="text-center text-gray-600">
            <img
              src="/assets/Empty-pana.svg"
              alt="Empty"
              className="w-1/4 mx-auto"
            />
            Giỏ hàng của bạn đang trống.
          </div>
        )}

        {cartProducts.length > 0 && (
          <ProductList
            products={products}
            cartProducts={cartProducts}
            lessOfThisProduct={lessOfThisProduct}
            moreOfThisProduct={moreOfThisProduct}
            openModal={openModal}
          />
        )}
        <div className="flex justify-between mt-6">
          <ButtonLink
            href="/products"
            color="blue"
            className="px-4 outline-blue-400"
          >
            Tiếp tục mua sắm
          </ButtonLink>
          <ButtonLink
            href="/checkout?type=cart"
            color="red"
            className="px-10 outline-double outline-red-400 border-red-600"
          >
            Đặt hàng
          </ButtonLink>
        </div>
      </div>
    </MainLayer>
  );
}
