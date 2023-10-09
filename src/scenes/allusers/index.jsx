import React, { useEffect, useState } from "react";
import { Box, InputBase, Typography, Grid, Button, TextField, DialogContent, DialogTitle, Dialog, DialogActions } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Allusers = () => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({});
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false); 

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "account_no", headerName: "Account Number", width: 150 },
    { field: "firstname", headerName: "First Name", width: 150 },
    { field: "lastname", headerName: "Last Name", width: 150 },
    //{ field: "password", headerName: "Password", width: 150 },
    { field: "address", headerName: "Address", width: 150 },
    { field: "designation", headerName: "Designation", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "position", headerName: "Position", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Typography
          style={{ color: params.value === "Active" ? "#50C878" : "#EA3C53" }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <React.Fragment>
          <button onClick={() => handleUpdate(params.row.id)}>Edit</button>
          <button
            className="btn btn-danger mx-2"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </button>
        </React.Fragment>
      ),
    },
  ];

  useEffect(() => {
    fetch("http://localhost:8080/user/getAllUser")
      .then((res) => res.json())
      .then((result) => {
        setUsers(result);
      });
  }, [deleteStatus]);

  useEffect(() => {
    if (searchValue === "" && statusFilter === "All") {
      setFilteredUsers(users);
    } else {
      const filteredData = users.filter((user) => {
        const fullName = `${user.firstname} ${user.lastname}`;
        const isNameMatched = fullName
          .toLowerCase()
          .includes(searchValue.toLowerCase());
        const isStatusMatched =
          statusFilter === "All" || user.status === statusFilter;
        return isNameMatched && isStatusMatched;
      });
      setFilteredUsers(filteredData);
    }
  }, [searchValue, statusFilter, users]);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/user/deleteUser/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          console.log(`User with ID ${id} deleted successfully`);
          window.alert(`User with ID ${id} deleted successfully`);
          setDeleteStatus(!deleteStatus);
        } else {
          console.log(`Error deleting user with ID ${id}`);
          window.alert(`Error deleting user with ID ${id}`);
        }
      });
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };
/*
  useEffect(() => {
    // Fetch user data by ID when the component mounts
    fetch(`http://localhost:8080/user/putUser/${id}`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, [users]);
*/
  const handleUpdate = (id) => {
    const user = users.find((user)=> user.id === id);
    setSelectedUser(user);
    setUpdateFormData({
      id: user.id,
      account_no: user.account_no,
      firstname: user.firstname,
      lastname: user.lastname,
      //password: user.password,
      address: user.address,
      designation: user.designation,
      email: user.email,
      position: user.position,
      status: user.status,
    });
    setIsUpdateFormOpen(true);  
  };

  const handleUpdateFormSubmit = () => {
    const id  = selectedUser.id;
    fetch(`http://localhost:8080/user/putUser/${id}`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateFormData),
    })
      .then((res) => res.json())
      .then((result) => {
        setUsers(result);
        if (result.success) {
          console.log(`User with ID ${id} Updated successfully`);
          window.alert(`User with ID ${id} Updated successfully`);
          setIsUpdateFormOpen(false);
        } else {
          console.log(`Error Updating user with ID ${id}`);
          window.alert(`Error Updating user with ID ${id}`);
        }
      });
  };

  return (
    <Box m="15px">
      <Header title="All Users" />
      <Box m="10px 0 0 0">
        <Grid container justifyContent="space-between">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
            sx={{
              width: "30%",
              height: "40px",
              mt: -2,
            }}
            backgroundColor={colors.black[400]}
            borderRadius="1px"
          >
            <InputBase
              sx={{ ml: 2, width: "100%" }}
              placeholder="Search by firstname or lastname..."
              value={searchValue}
              onChange={handleSearch}
              startAdornment={<SearchIcon color="inherit" />}
            />
          </Box>
          <Box sx={{ width: "30%", mt: -1.5 }}>
            <Typography variant="body2">Filter by status:</Typography>
            <select value={statusFilter} onChange={handleStatusFilterChange}>
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </Box>
        </Grid>
        <Box
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
          <div style={{ height: 370, width: "100%" }}>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              pageSize={20}
              rowsPerPageOptions={[20, 50, 100]}
            />
          </div>
          <Box m="15px">
      {isUpdateFormOpen && (
        <Dialog open={isUpdateFormOpen} onClose={() => setIsUpdateFormOpen(false)}>
          <DialogTitle>Update User</DialogTitle>
          <DialogContent>
          <TextField
              label="ID"
              value={updateFormData.id}
              onChange={(e) =>
                setUpdateFormData({
                  ...updateFormData,
                  id: e.target.value,
                })
              }
            />
            <TextField
              label="Account Number"
              value={updateFormData.account_no}
              onChange={(e) =>
                setUpdateFormData({
                  ...updateFormData,
                  account_no: e.target.value,
                })
              }
            />
            <TextField
              label="FirstName"
              value={updateFormData.firstname}
              onChange={(e) =>
                setUpdateFormData({
                  ...updateFormData,
                  firstname: e.target.value,
                })
              }
            />
            <TextField
              label="LastName"
              value={updateFormData.lastname}
              onChange={(e) =>
                setUpdateFormData({
                  ...updateFormData,
                  lastname: e.target.value,
                })
              }
            />
            <TextField
              label="Address"
              value={updateFormData.address}
              onChange={(e) =>
                setUpdateFormData({
                  ...updateFormData,
                  address: e.target.value,
                })
              }
            />
             <TextField
              label="Designation"
              value={updateFormData.designation}
              onChange={(e) =>
                setUpdateFormData({
                  ...updateFormData,
                  designation: e.target.value,
                })
              }
            />
            <TextField
              label="Email"
              value={updateFormData.email}
              onChange={(e) =>
                setUpdateFormData({
                  ...updateFormData,
                  email: e.target.value,
                })
              }
            />
            <TextField
              label="Position"
              value={updateFormData.position}
              onChange={(e) =>
                setUpdateFormData({
                  ...updateFormData,
                  position: e.target.value,
                })
              }
            />
              <TextField
              label="Status"
              value={updateFormData.status}
              onChange={(e) =>
                setUpdateFormData({
                  ...updateFormData,
                  status: e.target.value,
                })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsUpdateFormOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateFormSubmit}>Update</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Allusers;
