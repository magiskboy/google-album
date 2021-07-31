import React, { useContext, useEffect, useState, useCallback } from "react";
import { useGoogleLogin } from "react-google-login";
import { GOOGLE_SCOPE, GOOGLE_CLIENT_ID } from "../environment";

export const PageContext = React.createContext(null);
export const usePage = () => useContext(PageContext);

export const GOOGLE_AUTH_RESPONSE_KEY = "googleAuthResponse";
export const AuthContext = React.createContext(null);
export const useAuth = () => {
  const { setAuth, auth } = useContext(AuthContext);
  const [authReloader, setAuthReloader] = useState();

  const authReload = useCallback(async () => {
    if (authReloader) {
      const data = await authReloader();
      localStorage.setItem(GOOGLE_AUTH_RESPONSE_KEY, JSON.stringify(data));
      setAuth(data);
      return data;
    }
  }, [authReloader, setAuth]);

  const logout = useCallback(() => {
    localStorage.removeItem(GOOGLE_AUTH_RESPONSE_KEY);
    window.location.reload();
  }, []);

  const { signIn } = useGoogleLogin({
    onSuccess: (response) => {
      const data = response.getAuthResponse();
      localStorage.setItem(GOOGLE_AUTH_RESPONSE_KEY, JSON.stringify(data));
      setAuth(data);
      setAuthReloader(response.reloadAuthResponse);
    },
    clientId: GOOGLE_CLIENT_ID,
    scope: GOOGLE_SCOPE,
  });

  useEffect(() => {
    if (!auth || auth.expires_at < new Date().getTime()) {
      signIn();
    }
  }, [auth, signIn]);

  return {
    auth,
    authReload,
    logout,
  };
};
