import { createContext, useState, useEffect } from "react";
import { apiGet } from "../utils/api";

export const AuthContext = createContext();

function transformEmail(email) {
  let namePart = email.split("@")[0];
  let nameSegments = namePart.split(".");
  let transformedName = nameSegments.map(segment => {
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  }).join(" ");

  return transformedName;
}

export const hasAdminPanelAccess = (role) => ["Admin", "Moderator", "Producer"].includes(role);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    setToken(storedToken);
    const storedRole = sessionStorage.getItem("role");
    setRole(storedRole);
    if (storedToken) {
      apiGet("user/details").then((response) => {
        setUsername(transformEmail(response.userName));
      });
    } else {
      setUsername(null);
    }
    setLoading(false);
  }, [token, role]);

  return (
    <AuthContext.Provider value={{ token, setToken, username, loading, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
