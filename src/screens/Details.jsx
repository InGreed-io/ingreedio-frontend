import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";
import { Navigate } from "react-router-dom";
import { Text } from "@chakra-ui/react";

export const Details = () => {
  const { username, token, loading } = useContext(AuthContext);

  if (loading || !token) {
    return (<Navigate to="/" replace />);
  }

  return (
    <Text>Hello {username}</Text>
  );
};
