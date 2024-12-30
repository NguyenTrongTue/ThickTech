import { Button } from "@nextui-org/react";
import { Edit2, Trash2 } from "lucide-react";
import { Tooltip } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";

const ClubList = ({ clubs, handleDelete }) => {
  const router = useRouter();
  return (
    <table className="basic mt-2 table-auto">
      <thead>
        <tr>
          <td className="text-center">Image</td>
          <td>Club name</td>
          <td className="hidden lg:table-cell">Title</td>

          <td className="text-center">Action</td>
        </tr>
      </thead>
      <tbody>
        {clubs.map((item, index) => (
          <tr key={item._id} className="text-sm hover:bg-gray-100">
            <td className="text-center table-cell">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-md">
                <img
                  src={item.club_images[0]}
                  alt={item.club_name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </td>

            <td>{item.club_name}</td>

            <td className="hidden lg:table-cell">
              {item.club_title && item.club_title.length > 50 ? (
                <Tooltip title={item.club_title}>
                  <span>{`${item.club_title.slice(0, 50)}...`}</span>
                </Tooltip>
              ) : (
                <span>{item.club_title}</span>
              )}
            </td>

            <td className="text-center">
              <Button
                isIconOnly
                size="sm"
                onClick={() => router.push("/admin/clubs/edit/" + item._id)}
                className="p-2 mr-2 border rounded bg-blue-200 text-blue-600"
              >
                <Edit2 size={13} />
              </Button>
              <Button
                isIconOnly
                size="sm"
                onClick={() => handleDelete(item)}
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

export default ClubList;
