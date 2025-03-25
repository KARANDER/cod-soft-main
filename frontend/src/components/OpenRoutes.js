// This will prevent authenticated users from accessing this route
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function OpenRoute({ children }) {
    const { token } = useSelector((state) => state.auth);
    const userRole = localStorage.getItem("userRole") ? JSON.parse(localStorage.getItem("userRole")) : null, 
   
    if (token === null) {
        return children;   
    } else if( userRole === 'employer') {
       useNavigate("/employer-dashboard");
    }else{
        useNavigate("/candidate-dashboard");
    }
}

export default OpenRoute;
