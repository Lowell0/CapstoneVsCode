import React, { useEffect, useState } from "react";
//import { Box, IconButton, InputBase, Link, Typography } from "@mui/material";
import { Box, IconButton, InputBase, Link, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import RefreshIcon from "@mui/icons-material/Refresh";
import { UserInformationTeam } from "../../database/UserInformation";

const OccupancyClosureOrder = () => {

  const [closureOrder, setClosureOrder] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "co_id", headerName: "No.", width: 50 },
    { field: "application_no", headerName: "Application No.", width: 100 },
    { field: "bldgpermit_no", headerName: "Building Permit No.", width: 120 },
    { field: "applicants_name", headerName: "Applicants Name", width: 110 },
    { field: "project_name", headerName: "Project Name", width: 100 },
    /*{
      field: "address",
      headerName: "Address",
      width: 200,
      valueGetter: (params) =>
        `${params.row.house_no}, ${params.row.barangay}, ${params.row.city}`,
    },*/
    { field: "address", headerName: "Location", width: 70 },
    { field: "type_occupancy", headerName: "Type of Occupancy", width: 110 },
    { field: "contact_no", headerName: "Contact No.", width: 100 },
    { field: "administrative_fine", headerName: "Administrative Fine", width: 120 },
    { field: "status", headerName: "Status", width: 80 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <div>
          <button className="btn btn-outline-primary mx-2"onClick={() => handleView(params.row)}
          >
            View</button>
          <button className="btn btn-danger mx-2">Edit</button>
        </div>
      ),
    },
  ];  
  useEffect(() => {
   
    fetch("http://localhost:8080/closureorder/getAllClosureOrder")
      .then((res) => res.json()) // Parse the response as JSON
      .then((result) => {
        
        setClosureOrder(result);
        setFilteredData(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


/*
  const handleDelete = (id) => {
    // Handle delete logic here
    console.log(Deleting user with ID: ${id});
  };*/
  const handleView = (item) => {
    setSelectedItem(item);
    setIsViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setIsViewDialogOpen(false);
  };

  const filterData = () => {
    const filtered = closureOrder.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const fetchData = () => {
    fetch("http://localhost:8080/closureorder/getAllClosureOrder")
      .then((res) => res.json())
      .then((result) => {
        setClosureOrder(result);
        setFilteredData(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchButtonClick = () => {
    filterData();
  };

  const handleRefreshButtonClick = () => {
    fetchData();
    setSearchValue("");
    setFilteredData(closureOrder);
  };


  return (
    <Box m="15px">
      <Header title="FSIC -> Occupancy -> Closure Order" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "35%",
          mt: -2,
        }}
        backgroundColor={colors.black[400]}
        borderRadius="3px"
      >
        <InputBase
          sx={{ ml: 2, width: "80%" }}
          placeholder="Search"
          value={searchValue}
          onChange={handleSearchInputChange}
        />
        <IconButton type="button" sx={{ p: 1 }} onClick={handleSearchButtonClick}>
          <SearchIcon />
        </IconButton>
        <IconButton type="button" sx={{ p: 1 }} onClick={handleRefreshButtonClick}>
          <RefreshIcon /> 
        </IconButton>
      </Box>
      <Box
        m="10px 0 0 0"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.red[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blue[800],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.black[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blue[800],
          },
        }}
      >
        <div style={{ height: 370, width: '100%' }}>
          <DataGrid
            rows={filteredData}
            columns={columns}
            getRowId={(row) => row.co_id}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </div>
      </Box>
      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onClose={handleCloseViewDialog}>
        <DialogTitle>Occupancy Closure Order</DialogTitle>
        <DialogContent>
          {selectedItem && (
            <div>
                {/* Display the details of the selected item here */}
                <TextField
                label="No."
                fullWidth
                value={selectedItem.co_id}
                disabled
              />
                <TextField
                label="Application No."
                fullWidth
                value={selectedItem.application_no}
                disabled
              />
              <TextField
                label="Building Permit No."
                fullWidth
                value={selectedItem.bldgpermit_no}
                disabled
              />
              <TextField
                label="Applicants Name"
                fullWidth
                value={selectedItem.applicants_name}
                disabled
              />
              <TextField
                label="Project Name"
                fullWidth
                value={selectedItem.project_name}
                disabled
              />
              <TextField
                label="Location"
                fullWidth
                value={selectedItem.address}
                disabled
              />
              <TextField
                label="Type of Occupancy"
                fullWidth
                value={selectedItem.type_occupancy}
                disabled
              />
              <TextField
                label="Contact No."
                fullWidth
                value={selectedItem.contact_no}
                disabled
              />
              <TextField
                label="Administrative Fine"
                fullWidth
                value={selectedItem.administrative_fine}
                disabled
              />
              <TextField
                label="Status"
                fullWidth
                value={selectedItem.status}
                disabled
              />

            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OccupancyClosureOrder;