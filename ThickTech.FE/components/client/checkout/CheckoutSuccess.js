import ButtonLink from "@/components/button/ButtonLink";
import { BoxOrder } from "@/components/client/checkout/BoxOrder";
export default function CheckoutSussess({ checkoutData }) {
  return (
    <section className="flex gap-4 flex-col flex-1 justify-center items-center">
      <div className="flex flex-col gap-4 border-2 rounded-xl p-4 w-full">
        <h1 className="text-xl text-center uppercase text-green-500">
          Đơn hàng của bản đã đặt thành công!{" "}
        </h1>
      </div>
      <BoxOrder checkoutData={checkoutData} />
      <div className="flex flex-col gap-4 w-full justify-start">
        <ButtonLink
          href={"/products"}
          color="blue"
          className=" text-white w-40"
        >
          Tiếp tục mua sắm
        </ButtonLink>
      </div>
    </section>
  );
}
