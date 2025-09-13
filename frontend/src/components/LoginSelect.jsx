import { Box, MenuItem, Select } from "@mui/material";
import { useUser } from "./context/UserContext";

const LoginSelect = ({ children }) => {
  const { users, selectedUser, setSelectedUser } = useUser();

  const handleChange = (e) => {
    setSelectedUser(e.target.value);
  };

  return (
    <Box>
      Select User:
      <Select
        fullWidth
        value={selectedUser}
        onChange={handleChange}
        sx={{ backgroundColor: "white" }}
      >
        {users.map((user) => (
          <MenuItem key={user.id} value={user}>
            {user.name}
          </MenuItem>
        ))}
      </Select>
      <Box>{children}</Box>
    </Box>
  );
};

export default LoginSelect;
