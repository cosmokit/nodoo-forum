import * as React from "react";

export default React.createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
  userData: { id: Number, username: String, roles: [], avatar: String },
  setUserData: (data: {}) => {}
});
