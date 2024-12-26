import { Pagination, Select, MenuItem, Box, Typography } from "@mui/material";

const PaginationMUI = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (event, value) => {
    onPageChange({ selected: value - 1 });
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding={2}
      bgcolor="#f9fafb"
      borderRadius="8px"
      boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
    >
      <Typography variant="body2" sx={{ fontWeight: "500", color: "#374151" }}>
        Showing {currentPage * itemsPerPage + 1}-
        {Math.min((currentPage + 1) * itemsPerPage, totalItems)} of {totalItems}
      </Typography>

      <Box display="flex" alignItems="center" gap={2}>
        <Typography
          variant="body2"
          whiteSpace="nowrap"
          sx={{ fontWeight: "500", color: "#4B5563" }}
        >
          Items per page:
        </Typography>
        <Select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(parseInt(e.target.value, 10))}
          size="small"
          sx={{
            minWidth: 60,
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            "& .MuiSelect-select": {
              padding: "6px 12px",
            },
          }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={45}>45</MenuItem>
        </Select>
        <Pagination
          count={totalPages}
          page={currentPage + 1}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          siblingCount={1}
          boundaryCount={1}
          size="small"
          sx={{
            "& .MuiPaginationItem-root": {
              fontWeight: "500",
              fontSize: "14px",
              "&.Mui-selected": {
                backgroundColor: "#1D4ED8",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#1E40AF",
                },
              },
              "&:hover": {
                backgroundColor: "#E5E7EB",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default PaginationMUI;
