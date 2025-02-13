import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

function RoutesApp() {
  const user = localStorage.getItem("user_id");
  const auth = useContext(AuthContext);
  const [route, setRoute] = useState<any>();

  useEffect(() => {
    if (user && auth) {
      if (auth.user) {
        setRoute(<AppRoutes />);
      } else {
        setRoute(<AuthRoutes />);
      }
    }
  }, [auth]);

  if (route) {
    return route;
  }
}

export default RoutesApp;
