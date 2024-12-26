import { Button } from "@nextui-org/react";
import { Edit2, Trash2 } from "lucide-react";
import { Tooltip } from "@mui/material";
import React from "react";

const ProductTable = ({ products, router }) => {
  return (
    <table className="basic mt-2 table-auto">
      <thead>
        <tr>
          <td className="text-center hidden lg:table-cell">No.</td>
          <td>Product name</td>
          <td className="text-center whitespace-nowrap hidden lg:table-cell">
            Origin Price
          </td>
          <td className="text-center whitespace-nowrap hidden lg:table-cell">
            Sell Price
          </td>
          <td className="text-center whitespace-nowrap hidden lg:table-cell">
            Feature
          </td>
          <td className="text-center">Action</td>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={product._id} className="text-sm hover:bg-gray-100">
            <td className="text-center hidden lg:table-cell">{index + 1}</td>

            <td>
              {product.title && product.title.length > 50 ? (
                <Tooltip title={product.title}>
                  <span>{`${product.title.slice(0, 50)}...`}</span>
                </Tooltip>
              ) : (
                <span>{product.title}</span>
              )}
            </td>

            <td className="text-center hidden lg:table-cell">
              {product.original_price}
            </td>
            <td className="text-center hidden lg:table-cell">
              {product.selling_price}
            </td>
            <td className="text-center hidden lg:table-cell">
              <span
                className={`p-1 text-[12px] rounded-md ${
                  product.is_featured === "true"
                    ? "text-green-600 bg-green-200"
                    : "text-red-600 bg-red-200"
                }`}
              >
                {product.is_featured === "true" ? "Yes" : "No"}
              </span>
            </td>
            <td className="text-center">
              <Button
                isIconOnly
                size="sm"
                onClick={() =>
                  router.push("/admin/products/edit/" + product._id)
                }
                className="p-2 mr-2 border rounded bg-blue-200 text-blue-600"
              >
                <Edit2 size={13} />
              </Button>
              <Button
                isIconOnly
                size="sm"
                onClick={() =>
                  router.push("/admin/products/delete/" + product._id)
                }
                className="p-2 border rounded bg-red-200 text-red-600"
              >
                <Trash2 size={13} />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
