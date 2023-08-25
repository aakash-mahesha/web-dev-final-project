import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { profileThunk } from "../thunks/auth-thunks";
function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const load = async () => {
      const { payload } = await dispatch(profileThunk());
      console.log('in protected route',payload)
      if (payload.loggedIn === false) {
        navigate("/login");
      }
      setLoading(false);
    };
    load();
  }, []);
  return(<div className={`${loading ? "d-none" : ""}`}>
           {children}
         </div>);
}
export default ProtectedRoute;