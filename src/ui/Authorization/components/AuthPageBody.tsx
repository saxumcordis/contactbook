import React from "react";
import {useAuthData} from "../../../service/contexts/useAuth";

export const AuthPageBody = () => {
    const {authMode} = useAuthData();

    return <>{authMode}</>;
}