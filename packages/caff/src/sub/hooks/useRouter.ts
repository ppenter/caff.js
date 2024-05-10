import { useLocation, useNavigate } from "react-router-dom"

export const useRouter = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return {
        push: navigate,
        pathname: location.pathname,
        query: location.search,
        back: () => navigate(-1),
        reload: () => navigate(0)
    }
}