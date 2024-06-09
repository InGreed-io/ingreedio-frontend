import { createContext, useState, useEffect } from "react";
import { apiGet } from "../utils/api";
import { useToast } from "@chakra-ui/react";

export const AuthContext = createContext();

function transformEmail(email) {
  let namePart = email.split("@")[0];
  let nameSegments = namePart.split(".");
  let transformedName = nameSegments.map(segment => {
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  }).join(" ");

  return transformedName;
}

export const AuthProvider = ({ children }) => {
  const toast = useToast();
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
      }).catch((e) => {
        switch (e.status) {
          case 404:
            toast({
              title: "Logged Out",
              description: "Cannot find user. Logged out.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            break;
          default:
            toast({
              title: "Logged Out",
              description: "Authorization error occured. Logged out.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
        }

        setToken(null);
        setRole(null);
        setUsername(null);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
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
