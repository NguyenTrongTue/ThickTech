import MainLayer from "@/components/client/MainLayer";
import SearchOrder from "@/components/client/checkout/SearchOrder";
export default function OrderPage({}) {
  return (
    <MainLayer
      title="ThickTech - Tìm kiếm đơn hàng"
      description="Tìm kiếm đơn hàng của bạn"
    >
      <SearchOrder />
    </MainLayer>
  );
}
