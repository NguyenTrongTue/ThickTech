import { useRouter } from "next/router";
import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { CartContext } from "@/components/client/CartContext";
import ActionBtn from "@/components/button/Button";
import { useEffect } from "react";
import InputText from "@/components/input/InputText";
import InputTextArea from "@/components/input/InputTextArea";
import { SelectInput } from "@/components/input/SelectInput";
import FormatNumber from "@/utils/formatNumber";
import axios from "axios";
import ButtonLink from "@/components/button/ButtonLink";
import apiService from "@/services/api";
export default function Checkout({ productList }) {
  const [paymentMode, setPaymentMode] = useState("cod");
  const [address, setAddress] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const router = useRouter();
  const {
    cartProducts,
    addProduct,
    decreaseProduct,
    removeProduct,
    clearCart,
  } = useContext(CartContext);
  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id, quantity) {
    if (quantity === 1) {
      // Nếu số lượng là 1, yêu cầu xác nhận xóa
      if (
        !window.confirm(
          "Bạn có chắc muốn xóa sản phẩm này trong giỏ hàng không?"
        )
      ) {
        return; // Người dùng không đồng ý, thoát khỏi hàm
      }
      // Xóa sản phẩm nếu người dùng đồng ý
      removeThisProduct(id);
    } else {
      // Giảm số lượng sản phẩm
      decreaseProduct(id);
    }
  }

  function removeThisProduct(id) {
    // Xóa sản phẩm khỏi giỏ hàng
    removeProduct(id);
    toast.success("Đã xóa sản phẩm khỏi giỏ hàng.");
  }

  // Lấy danh sách tỉnh/thành phố khi component được mount
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          "https://provinces.open-api.vn/api/p/"
        );
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  const handleProvinceChange = async (provinceCode) => {
    setSelectedProvince(provinceCode);
    setSelectedDistrict(null);
    setWards([]);
    try {
      const response = await axios.get(
        `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
      );
      setDistricts(response.data.districts);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  // Lấy danh sách xã/phường khi chọn quận/huyện
  const handleDistrictChange = async (districtCode) => {
    setSelectedDistrict(districtCode);
    try {
      const response = await axios.get(
        `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
      );
      setWards(response.data.wards);
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  };

  // Tính tổng giá
  const totalPrice = productList?.reduce(
    (total, product) => total + product.selling_price * product.quantity,
    0
  );

  // Hàm cập nhật địa chỉ
  const handleAddress = (key, value) => {
    setAddress({ ...(address ?? {}), [key]: value });
  };

  const isAddressValid = () => {
    return (
      address?.fullName &&
      address?.mobile &&
      address?.email &&
      address?.province &&
      address?.district &&
      address?.ward &&
      address?.addressLine
    );
  };

  // Hàm xử lý đặt hàng
  const handlePlaceOrder = async () => {
    if (!isAddressValid()) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    try {
      // Thực 'hiện đặt hàng

      if (paymentMode === "prepaid") {
        toast.warn("Chức năng chuyển khoản đang được phát triển!");
        return;
      } else {
        const checkoutResponse = await apiService.post("/api/checkout", {
          products: productList,
          address: address,
        });
        clearCart();
        const checkoutId = checkoutResponse.checkoutId;
        router.push(`/cart/checkout-order?checkout_id=${checkoutId}`);
        toast.success("Bạn đã đặt hàng thành công!");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error(error?.message);
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      {/* Phần địa chỉ giao hàng */}
      <section className="flex-1 flex flex-col gap-4 border-2 rounded-xl p-4">
        <h1 className="text-xl">Địa chỉ giao hàng</h1>
        <div className="flex flex-col gap-2">
          <InputText
            label="Full Name"
            placeholder="Full Name"
            value={address?.fullName ?? ""}
            onChange={(e) => handleAddress("fullName", e.target.value)}
            className="px-4 py-2"
          />
          <InputText
            label="Mobile Number"
            placeholder="Mobile Number"
            value={address?.mobile ?? ""}
            onChange={(e) => handleAddress("mobile", e.target.value)}
            className="px-4 py-2"
          />
          <InputText
            label="Email"
            placeholder="Email"
            value={address?.email ?? ""}
            onChange={(e) => handleAddress("email", e.target.value)}
            className="px-4 py-2"
          />
          <SelectInput
            label="Tỉnh/Thành phố"
            value={selectedProvince ?? ""}
            onChange={(e) => {
              handleProvinceChange(e.target.value);
              handleAddress(
                "province",
                provinces.find((p) => p.code == e.target.value)?.name
              );
            }}
            options={provinces?.map((province) => ({
              label: province.name,
              value: province.code,
            }))}
            className="px-4 py-2"
          />
          <SelectInput
            label="Quận/Huyện"
            value={selectedDistrict ?? ""}
            onChange={(e) => {
              handleDistrictChange(e.target.value);
              handleAddress(
                "district",
                districts.find((d) => d.code == e.target.value)?.name
              );
            }}
            options={districts?.map((district) => ({
              label: district.name,
              value: district.code,
            }))}
            className="px-4 py-2"
          />

          <SelectInput
            label="Phường/Xã"
            value={selectedWard ?? ""}
            onChange={(e) => {
              setSelectedWard(e.target.value);
              handleAddress(
                "ward",
                wards.find((w) => w.code == e.target.value)?.name
              );
            }}
            options={wards?.map((ward) => ({
              label: ward.name,
              value: ward.code,
            }))}
            className="px-4 py-2"
          />

          <InputText
            label="Địa chỉ"
            placeholder="Địa chỉ"
            value={address?.addressLine ?? ""}
            onChange={(e) => handleAddress("addressLine", e.target.value)}
            className="px-4 py-2"
          />
          <InputTextArea
            label="Ghi chú"
            isRequired={false}
            placeholder="Nhập ghi chú"
            value={address?.orderNote ?? ""}
            onChange={(e) => handleAddress("orderNote", e.target.value)}
            className="px-4 py-2"
          />
        </div>
      </section>

      {/* Phần giỏ hàng và thanh toán */}
      <div className="flex-1 flex flex-col gap-3">
        <section className="flex flex-col gap-3 border-2 rounded-xl p-4">
          <h1 className="text-xl">Products</h1>
          <div className="flex flex-col gap-2">
            {productList?.map((item) => (
              <div
                className="flex gap-3 items-center pt-2 border-t-2 hover:bg-gray-200 px-2"
                key={item._id}
              >
                <img
                  className="w-12 h-12 object-cover rounded-lg"
                  src={item?.images[0] ?? ""}
                  alt=""
                />
                <div className="flex-1 flex flex-col">
                  <h1 className="text-[15px] line-clamp-2 leading-5">
                    {item?.title}
                  </h1>
                  <h3 className="text-[15px] mt-2 flex items-center gap-1">
                    <FormatNumber
                      number={item?.selling_price}
                      className={"text-green-600"}
                    />
                    <span className="text-black text-[10px]"> X </span>{" "}
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          lessOfThisProduct(item._id, item?.quantity)
                        }
                        className={
                          "px-2.5 py-0.5 border border-slate-600 hover:bg-gray-300"
                        }
                      >
                        -
                      </button>
                      <span className="text-center border-gray-300 px-2.5 py-0.5 border">
                        {item?.quantity}
                      </span>
                      <button
                        onClick={() => moreOfThisProduct(item._id)}
                        className="px-2.5 py-0.5 border  border-slate-600 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </h3>
                </div>
                <div>
                  <h3 className="text-sm">
                    <FormatNumber
                      number={item?.quantity * item?.selling_price}
                    />
                  </h3>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between w-full items-center font-semibold border-t-2 pt-2">
            <h1>Total</h1>
            <h1 className="text-green-600">
              <FormatNumber number={totalPrice} />
            </h1>
          </div>
        </section>
        <section className="flex flex-col gap-4 border rounded-xl p-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-xl">Payment Mode</h2>
            <div className="flex items-left gap-3 flex-col">
              <button
                onClick={() => setPaymentMode("cod")}
                className="flex items-center gap-1 text-xs"
              >
                {paymentMode === "cod" ? "✅" : "⭕"} Thanh toán khi nhận hàng /
                Chuyển phát nhanh - COD
              </button>
              <button
                onClick={() => setPaymentMode("prepaid")}
                className="flex items-center gap-1 text-xs"
              >
                {paymentMode === "prepaid" ? "✅" : "⭕"} Chuyển khoản qua ngân
                hàng
              </button>
            </div>
          </div>
          <div className="flex flex-r gap-3">
            <ButtonLink
              href={"/products"}
              color="blue"
              className=" text-white flex-1"
            >
              Tiếp tục mua sắm
            </ButtonLink>
            <ActionBtn
              color="green"
              onClick={handlePlaceOrder}
              className="bg-green-500 text-white flex-1 hover:bg-green-600"
            >
              Place Order
            </ActionBtn>
          </div>
        </section>
      </div>
    </section>
  );
}
