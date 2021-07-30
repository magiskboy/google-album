import React, { useContext, useEffect } from "react";
import { useGoogleLogin } from "react-google-login";
import { GOOGLE_SCOPE, GOOGLE_CLIENT_ID } from "../environment";

export const PageContext = React.createContext(null);
export const usePage = () => useContext(PageContext);

export const AuthContext = React.createContext(null);
export const useAuth = () => {
  const { setAuth, auth } = useContext(AuthContext);
  const { signIn } = useGoogleLogin({
    onSuccess: (response) => setAuth(response),
    clientId: GOOGLE_CLIENT_ID,
    scope: GOOGLE_SCOPE,
  });
  useEffect(() => {
    !auth && signIn();
  }, [auth, signIn]);
  return auth;
};
