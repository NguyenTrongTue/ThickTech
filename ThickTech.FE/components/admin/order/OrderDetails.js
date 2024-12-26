import React from "react";
import {
  Box,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
} from "@mui/material";
import FormatNumber from "@/utils/formatNumber";

const OrderDetails = ({ order }) => {
  if (!order) {
    return <Typography variant="h6">No Order Selected</Typography>;
  }

  return (
    <div className="min-h-full flex flex-col">
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Order Details: {order.address.email}
      </Typography>
      {/* Thông tin đơn hàng */}
      <div className="bg-white rounded-lg shadow-md p-4 gap-4 flex flex-col">
        <div className="flex flex-col gap-2 md:flex-row justify-between flex-1">
          <div className="flex flex-col gap-2 flex-1">
            <Typography variant="subtitle1" fontWeight="bold">
              Thông tin người nhận
            </Typography>
            <Typography>Name: {order.address.fullName}</Typography>
            <Typography>Email: {order.address.email}</Typography>
            <Typography>Phone: {order.address.mobile}</Typography>
            <Typography>
              Address:{" "}
              {`${order.address.addressLine}, ${order.address.ward}, ${order.address.district}, ${order.address.province}`}
            </Typography>
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <Typography variant="subtitle1" fontWeight="bold">
              Thông tin đơn hàng
            </Typography>
            <Typography>
              Order Date: {new Date(order.order_date).toLocaleString()}
            </Typography>
            <Typography>
              Order Note: {order.address.orderNote || "No notes"}
            </Typography>
            <Typography>Status: {order.status || "Pending"}</Typography>
          </div>
        </div>
      </div>

      <Divider sx={{ marginY: 2 }} />

      <Paper elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.products.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell className="">{index + 1}</TableCell>
                <TableCell>
                  {product.title.length > 50 ? (
                    <Tooltip title={product.title}>
                      <span>{`${product.title.slice(0, 60)}...`}</span>
                    </Tooltip>
                  ) : (
                    <span>{product.title}</span>
                  )}
                </TableCell>
                <TableCell align="center">{product.quantity}</TableCell>
                <TableCell align="center">
                  <FormatNumber number={product.selling_price} />
                </TableCell>
                <TableCell align="center">
                  <FormatNumber number={product.price * product.quantity} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Tổng tiền */}
      <Box sx={{ textAlign: "right", marginTop: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          Total: $
          <FormatNumber
            number={order.products.reduce(
              (total, product) => total + product.price * product.quantity,
              0
            )}
          />
        </Typography>
      </Box>
    </div>
  );
};

export default OrderDetails;
