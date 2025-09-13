import axios from "axios";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const ReservationsTable = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/reservation/all",
        );
        if (response.status !== 200) {
          console.error("Error fetching reservations", response);
        }
        setReservations(response.data);
      } catch (err) {
        console.error("Error fetching reservations", err);
      }
    };
    fetchReservations();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "asset_name", headerName: "Asset Name", width: 240 },
    { field: "user_name", headerName: "User Name", width: 240 },
    { field: "time", headerName: "Time", width: 240 },
    { field: "duration", headerName: "Duration(in seconds)", width: 200 },
  ];

  return (
    <Box>
      Reservations Table
      <Box>
        <DataGrid columns={columns} rows={reservations} />
      </Box>
    </Box>
  );
};

export default ReservationsTable;
