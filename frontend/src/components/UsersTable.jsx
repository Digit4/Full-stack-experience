import { Box } from "@mui/material";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/all");
        if (response.status !== 200) {
          console.error("Error fetching users", response);
        }
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };
    fetchUsers();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", editable: true, width: 320 },
    {
      field: "is_admin",
      headerName: "Admin",
      editable: true,
      type: "boolean",
      width: 90,
    },
  ];
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid columns={columns} rows={users} />
    </Box>
  );
};

export default UsersTable;
