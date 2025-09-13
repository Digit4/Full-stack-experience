import "./App.css";
import AssetsTable from "./components/AssetsTable.jsx";
import ReservationsTable from "./components/ReservationsTable.jsx";
import LoginSelect from "./components/LoginSelect.jsx";
import { UserProvider } from "./components/context/UserContext.jsx";

function App() {
  return (
    <>
      <UserProvider>
        <LoginSelect>
          <AssetsTable /> <ReservationsTable />
        </LoginSelect>
      </UserProvider>
    </>
  );
}

export default App;
