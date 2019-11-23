import * as React from "react";

export default React.createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
  userData: { username: String, roles: [] },
  setUserData: (data: {}) => {}
});
