import { useState } from "react";
import Login from "./Login";
import Report from "./Report";
import AdminDashboard from "./AdminDashboard";
import MapView from "./MapView";

function App() {
  const [role, setRole] = useState(null);

  if (!role) return <Login setRole={setRole} />;

  return (
    <>
      {role === "citizen" && (
        <>
          <Report />
          <MapView />
        </>
      )}
      {role === "authority" && (
  <>
    <AdminDashboard />
    <MapView />
  </>
)}

    </>
  );
}

export default App;

