import Button from "@/components/client/button/ButtonCart";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { CartContext } from "@/components/client/CartContext";
import MainLayer from "@/components/client/MainLayer";
import apiService from "@/services/api";
import Link from "next/link";
import formatNumber from "@/utils/formatNumber";
import ModalConfirm from "@/components/Modal";

export default function CartPage() {
  const {
    cartProducts,
    addProduct,
    decreaseProduct,
    removeProduct,
    clearCart,
  } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item_title, setItemTitle] = useState("");
  const [item_id, setItemId] = useState("");
  const handleDelete = () => {
    setIsModalOpen(false);
    removeProduct(item_id);
  };

  const OpenModal = (id, title) => {
    setIsModalOpen(true);
    setItemId(id);
    setItemTitle(title);
  };
  async function fetchCartItems(ids) {
    try {
      const response = await apiService.post("/api/cart", { ids });
      setProducts(response);
      console.log("response", response);
    } catch (error) {
      console.error("Error fetching cart items:", error.message);
    }
  }
  useEffect(() => {
    if (cartProducts.length > 0) {
      const ids = cartProducts.map((id) => id.productId);
      fetchCartItems(ids);
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    decreaseProduct(id);
  }

  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  let total = 0;
  for (const product of cartProducts) {
    console.log("productId", product);

    const productId = product.productId;
    const quantity = product.quantity;
    const productInfo = products.find((p) => p._id === productId);
    if (productInfo) {
      total += productInfo.selling_price * quantity;
    }
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <div className="grid grid-cols-1 gap-10 mt-10">
          <div className="bg-white rounded-lg p-8">
            <h1 className="text-2xl font-semibold">Thanks for your order!</h1>
            <p className="mt-4">
              We will email you when your order will be sent.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <MainLayer>
      <ModalConfirm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        message="Bạn chắc chắn muốn bỏ sản phẩm này?"
        item_title={item_title}
      />
      <div className="bg-white rounded-lg p-8 shadow-md">
        <h2 className="text-xl font-bold mb-4">Giỏ hàng</h2>

        {!cartProducts?.length && (
          <div className="text-center text-gray-500">
            Giỏ hàng của bạn đang trống.
          </div>
        )}

        {products?.length > 0 && (
          <div>
            <div className="w-full table-auto border-collapse grid grid-cols-1 lg:grid-cols-2 gap-4">
              {products.map((product) => {
                const productQuantity = cartProducts.filter(
                  (item) => item.productId === product._id
                )[0]?.quantity;
                const productTotal = product.selling_price * productQuantity;
                return (
                  <React.Fragment key={product._id} className="w-full">
                    <div className="bg-white flex flex-row border border-gray-300  rounded-md">
                      <div className="px-4 py-2 flex items-center flex-col">
                        <Link
                          href={`/product/${product._id}`}
                          className="flex items-center"
                        >
                          <div className="min-w-[4rem] max-w-[4rem] min-h-[4rem] max-h-[4rem] h-[4rem] w-[4rem] p-1 border border-red-500 rounded-lg flex justify-center items-center">
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className="object-cover rounded-md w-full h-full"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="ml-4 text-sm font-medium">
                              {product.title}
                            </span>
                            <div>
                              <span className="ml-4 text-sm font-medium text-gray-500">
                                {formatNumber(product.original_price)}đ
                              </span>
                              <span className="ml-3 text-sm font-medium text-gray-700">
                                {formatNumber(product.selling_price)}đ
                              </span>
                            </div>
                          </div>
                        </Link>

                        <div className="flex items-center">
                          <button
                            onClick={() => lessOfThisProduct(product._id)}
                            className="px-3 py-1 border border-slate-600 hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span
                            className="text-center border-t border-b border-gray-300 py-1 focus:outline-none w-12"
                            min="1"
                          >
                            {productQuantity}
                          </span>
                          <button
                            onClick={() => moreOfThisProduct(product._id)}
                            className="px-3 py-1 border  border-slate-600 hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="px-4 py-2 text-center"></div>

                      <div className="px-4 py-2 text-center">
                        <Button
                          onClick={() => OpenModal(product._id, product.title)}
                          className="text-red-600"
                        >
                          Xóa
                        </Button>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
              {/* Tổng cộng */}

              {/* Tiết kiệm */}
              <tr>
                <td colSpan="4" className="text-right px-4 py-2 text-gray-600">
                  Tiết kiệm:
                </td>
                <td className="px-4 py-2 text-center">${}</td>
                <td className="px-4 py-2"></td>
              </tr>
            </div>
          </div>
        )}

        <div className="font-bold border-t border-gray-300 mt-6 pt-2 flex justify-end">
          <div className="flex flex-row items-center">
            <span>Tổng thanh toán:</span>
            <div className="px-4 py-2 text-red-500 items-start flex flex-row">
              <span className="text-sm">đ</span>
              {formatNumber(total)}
            </div>
          </div>
        </div>
      </div>
    </MainLayer>
  );
}
