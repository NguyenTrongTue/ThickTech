import React from "react";
import { TextField, MenuItem, Box } from "@mui/material";

const OrderSearchBar = ({
  onSearch,
  onFilter,
  onDateFilter,
  searchTerm,
  statusFilter,
  dateFilter,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Ô tìm kiếm */}
      <TextField
        id="outlined-select-currency"
        label="Search by customer name"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        fullWidth
        sx={{ flex: "1 1 auto", maxWidth: 300 }}
      />

      {/* Dropdown lọc trạng thái */}
      <div className="flex gap-2">
        <div className="w-44">
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            defaultValue=""
            className="w-full"
            size="small"
            value={statusFilter}
            onChange={(e) => onFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </TextField>
        </div>

        {/* Lọc theo ngày */}
        <TextField
          id="outlined-select-currency"
          label="From"
          type="date"
          value={dateFilter.startDate}
          onChange={(e) =>
            onDateFilter({ ...dateFilter, startDate: e.target.value })
          }
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
        />

        <TextField
          label="To"
          type="date"
          value={dateFilter.endDate}
          onChange={(e) =>
            onDateFilter({ ...dateFilter, endDate: e.target.value })
          }
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
        />
      </div>
    </Box>
  );
};

export default OrderSearchBar;
