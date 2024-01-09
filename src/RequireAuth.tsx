import { useLocation,Navigate } from "react-router-dom";

const RequireAuth = ({children}:any) =>{
    const location = useLocation()
    const auth = localStorage.getItem('token')
    if(!auth){
        return <Navigate to={'/'} state={{from:location}}/>
    }

    return children;
}

export {RequireAuth}