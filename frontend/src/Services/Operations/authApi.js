import { toast } from "react-toastify";
import { endpoints } from "../api";
import { apiconnector } from "../apiconnector";
import { setLoading, setToken } from "../../Slices/authSlice";
import { setUser, setUserRole } from "../../Slices/profileSlice";

const  SIGNUP_API  = "http://localhost:4000/api/register";
console.log(SIGNUP_API, "APIIURL");
export function signUp(name, email, password, role, navigate) {
    console.log(name, email, password, role);
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiconnector("POST", SIGNUP_API, {
        name,
        email,
        password,
        role,
      });

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}




// const SIGNUP_API = `https://jobportal-bed.vercel.app/api/register`;
// console.log(SIGNUP_API, "API URL");

// export function signUp(name, email, password, role, navigate) {
//   console.log(name, email, password, role, "Signup Params");
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...");
//     // dispatch(setLoading(true));
//     try {
//       const response = await apiconnector("POST", SIGNUP_API, {
//         name,
//         email,
//         password,
//         role,
//       });

//       console.log("SIGNUP API RESPONSE:", response);

//       if (!response.data.success) {
//         throw new Error(response.data.message);
//       }
//       toast.success("Signup Successful");
//       navigate("/login");
//     } catch (error) {
//       console.log("SIGNUP API ERROR:", error);
//       toast.error("Signup Failed");
//       navigate("/signup");
//     }
//     // dispatch(setLoading(false));
//     toast.dismiss(toastId);
//   };
// }


//sign in
export function signIn(email, password, navigate) {
  return async (dispatch) => {
    const SIGNIN_API = `http://localhost:4000/api/login`;
    try {
      console.log("Sending data to API:", { email, password });  // Debug logging
      const response = await apiconnector("POST", SIGNIN_API, { email, password });

      console.log("API response:", response);  // Debug logging

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user.name));
      dispatch(setUserRole(response.data.user.role));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user.name));
      localStorage.setItem("userRole", JSON.stringify(response.data.user.role));

      if (response.data.user.role === "employer") {
        navigate("/employer-dashboard");
      } else {
        navigate("/candidate-dashboard");
      }
    } catch (err) {
      console.log("Login Error:", err);  // Debug logging
    }
  };
}
