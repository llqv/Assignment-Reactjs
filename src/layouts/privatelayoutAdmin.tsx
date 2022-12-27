import React from 'react'
import { Navigate } from "react-router-dom";
type PrivatelayoutAdminprops = {
    children: React.ReactElement
}

const PrivatelayoutAdmin = ({ children }: PrivatelayoutAdminprops) => {
    const data = localStorage.getItem("user")
    if (!data) {
        return <Navigate to="/auth" />
    } else {
        const datauser = JSON.parse(data)
        const role = datauser.user.role
        if (role == 1) {
            return <Navigate to="/admin" />
        } else {
            return <Navigate to="/" />
        }
    }
}

export default PrivatelayoutAdmin