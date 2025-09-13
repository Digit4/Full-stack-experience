// UserContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/all");
        if (response.status !== 200) {
          console.error("Error fetching users", response);
        }
        setUsers(response.data);
        setSelectedUser(response.data[0]);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, selectedUser, setSelectedUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for convenience
export const useUser = () => useContext(UserContext);
