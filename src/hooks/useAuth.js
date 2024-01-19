import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
    const token = useSelector(selectCurrentToken);

    if (token) {
        const decoded = jwtDecode(token);

        const { id, name, role } = decoded.userInfo;

        return { id, name, role };
    }

    return { id: "", name: "", role: "" };
};
export default useAuth;
