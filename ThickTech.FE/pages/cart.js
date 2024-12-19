import Button from "@/components/client/button/ActionBtn";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { CartContext } from "@/components/client/CartContext";
import MainLayer from "@/components/client/MainLayer";
import apiService from "@/services/api";
import Link from "next/link";
import formatNumber from "@/utils/formatNumber";
import ModalConfirm from "@/components/Modal";
import toast from "react-hot-toast";
import ButtonLink from "@/components/client/button/ButtonLink";

export default function CartPage() {
  const {
    cartProducts,
    addProduct,
    decreaseProduct,
    removeProduct,
    clearCart,
  } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item_title, setItemTitle] = useState("");
  const [item_id, setItemId] = useState("");
  const handleDelete = () => {
    setIsModalOpen(false);
    removeProduct(item_id);
    toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
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
    } catch (error) {
      console.error("Error fetching cart items:", error.message);
      toast.error("Có lỗi xảy ra khi cập nhật giỏ hàng");
    }
  }
  useEffect(() => {
    if (cartProducts.length > 0) {
      const ids = cartProducts.map((item) => item.productId);
      // lấy tổng số lượng sản phẩm
      const total = cartProducts.reduce((acc, item) => acc + item.quantity, 0);
      setTotalItems(total);
      fetchCartItems(ids);
    } else {
      clearCart();
      setTotalItems(0);
      setProducts([]);
    }
  }, [cartProducts]);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id, quanity, title) {
    if (quanity === 1) {
      OpenModal(id, title);
      return;
    } else {
      decreaseProduct(id);
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

  return (
    <MainLayer>
      <ModalConfirm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        message="Bạn chắc chắn muốn bỏ sản phẩm này?"
        item_title={item_title}
      />
      <div>
        <div className="bg-white rounded-lg p-2 lg:p-6 md:p-4 xl:p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-700">
            Số lượng sản phẩm: ({totalItems})
          </h2>
          {!cartProducts?.length && (
            <div className="text-center text-gray-600">
              <img
                src="/assets/Empty-pana.svg"
                alt="Empty"
                className="w-1/4 mx-auto"
              />
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
                  return (
                    <React.Fragment key={product._id} className="w-full">
                      <div className="bg-white flex flex-row border-2 border-slate-400 rounded-md p-3 justify-between">
                        <div className="flex items-start flex-row gap-3">
                          <Link
                            href={`/product/${product._id}`}
                            className="flex items-center"
                          >
                            <div className="min-w-[6rem] max-w-[6rem] min-h-[6rem] max-h-[6rem] h-[6rem] w-[6rem]rounded-lg flex justify-center items-center">
                              <img
                                src={product.images[0]}
                                alt={product.title}
                                className="object-cover rounded-md w-full h-full"
                              />
                            </div>
                          </Link>

                          <div className="flex flex-col">
                            <Link
                              href={`/product/${product._id}`}
                              className="flex items-center"
                            >
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
                                onClick={() =>
                                  lessOfThisProduct(
                                    product._id,
                                    productQuantity,
                                    product.title
                                  )
                                }
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
                                className="px-3 py-1 border border-slate-600 hover:bg-gray-300"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="text-center">
                          <Button
                            onClick={() =>
                              OpenModal(product._id, product.title)
                            }
                            color={"red"}
                            className="outline-red-400 "
                          >
                            Xóa
                          </Button>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between mt-6 ">
          <ButtonLink
            href="/products"
            color={"blue"}
            className={"px-4 outline-blue-400"}
          >
            Tiếp tục mua sắm
          </ButtonLink>

          <Link href="/order">
            <Button
              color={"red"}
              className={"px-10 outline-double outline-red-400 border-red-600"}
            >
              Đặt hàng
            </Button>
          </Link>
        </div>
      </div>
    </MainLayer>
  );
}
