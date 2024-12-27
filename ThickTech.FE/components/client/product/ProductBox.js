import ButtonCard from "@/components/button/ButtonCart";
import ButtonLink from "@/components/button/ButtonLink";
import Link from "next/link";

import FormatNumber from "@/utils/formatNumber";
export default function ProductBox({
  _id,
  title,
  description,
  original_price,
  selling_price,
  images,
  product_category,
  product_slug,
  is_featured,
}) {
  const url = "/product/" + product_slug;
  const urlByNow = `/cart/checkout?type=buynow&productId=${_id}`;
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 2xl:w-1/4 mt-4 hover:scale-[1.04] transform transition duration-500 ease-in-out">
      <div className="bg-white m-2 px-3 pt-3 shadow-courses rounded-2xl">
        {/* Product Image */}
        <div className="relative rounded-3xl group">
          <img
            src={images[0]}
            alt={title}
            className="rounded-xl object-cover w-full aspect-[4/3] transition duration-500 ease-in-out group-hover:opacity-0"
          />
          <img
            src={images[1]}
            alt={title}
            className="rounded-xl object-cover w-full aspect-[4/3] transition duration-700 ease-in-out opacity-0 group-hover:opacity-100 absolute top-0 left-0"
          />
          {is_featured === "true" && (
            <div className="absolute -right-2 -bottom-2 bg-orange-600 rounded-full p-4 pt-6 pb-6">
              <h4 className="text-white uppercase text-center font-medium text-sm">
                best <br /> seller
              </h4>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="py-3">
          <Link href={url}>
            <h3 className="text-base font-semibold text-black line-clamp-2">
              {title}
            </h3>
          </Link>

          <div className="flex items-center py-2 text-center justify-center">
            <h3 className="text-lg font-medium text-red-600">
              <FormatNumber number={selling_price} />
            </h3>
          </div>

          {/* Action Buttons */}
          <hr className="border-gray-400" />
          <div className="flex justify-between items-center pt-4 gap-3">
            <ButtonLink href={urlByNow} color="blue" className="w-full">
              Mua ngay
            </ButtonLink>
            <ButtonCard productId={_id}></ButtonCard>
          </div>
        </div>
      </div>
    </div>
  );
}
