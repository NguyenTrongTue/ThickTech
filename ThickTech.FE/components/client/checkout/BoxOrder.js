import React from "react";
import FormatNumber from "@/utils/formatNumber";

export const BoxOrder = ({ checkoutData }) => {
  const productList = checkoutData?.products;
  const address = checkoutData?.address;
  const totalPrice = productList?.reduce(
    (total, product) => total + product.selling_price * product.quantity,
    0
  );
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full flex-1 h-full">
      <section className="flex-1 flex flex-col gap-3 border-2 rounded-xl p-4 min-h-full">
        <h1 className="text-xl">Địa chỉ giao hàng</h1>
        <div className="flex-1 flex flex-col gap-2 pt-2 border-t-2">
          <div className="flex gap-2 items-center">
            <label className="text-lg">Tên người nhận:</label>
            <h3 className="text-lg">{address?.fullName}</h3>
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-lg">Sđt:</label>
            <h3 className="text-lg">{address?.mobile}</h3>
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-lg">Email:</label>
            <h3 className="text-lg">{address?.email}</h3>
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-lg">Tỉnh / thành phố:</label>
            <h3 className="text-lg">{address?.province}</h3>
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-lg">Quận / huyện:</label>
            <h3 className="text-lg">{address?.district}</h3>
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-lg">Phường / xã :</label>
            <h3 className="text-lg">{address?.ward}</h3>
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-lg">Địa chỉ :</label>
            <h3 className="text-lg">{address?.addressLine}</h3>
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-lg">Ghi chú :</label>
            <h3 className="text-lg">{address?.orderNote}</h3>
          </div>
        </div>
      </section>

      {/* Phần giỏ hàng và thanh toán */}
      <div className="flex-1 flex flex-col gap-3 h-full">
        <section className="flex flex-col gap-3 border-2 rounded-xl p-4 h-full">
          <h1 className="text-xl">Products</h1>
          <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
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
                    <span className="text-center text-green-600">
                      {item?.quantity}
                    </span>
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
      </div>
    </div>
  );
};
