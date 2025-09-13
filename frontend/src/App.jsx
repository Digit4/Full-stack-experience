import "./App.css";
import AssetsTable from "./components/AssetsTable.jsx";
import LoginSelect from "./components/LoginSelect.jsx";
import { UserProvider } from "./components/context/UserContext.jsx";

function App() {
  return (
    <>
      <UserProvider>
        <LoginSelect>
          <AssetsTable />
        </LoginSelect>
      </UserProvider>
    </>
  );
}

export default App;
