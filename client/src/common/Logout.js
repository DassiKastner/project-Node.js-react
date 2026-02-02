import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Logout = () => {
    const navigate = useNavigate()
    localStorage.removeItem("token")
    useEffect(()=>{
        navigate("/Register")     
    })
    
    return<></>
}
export default Logout