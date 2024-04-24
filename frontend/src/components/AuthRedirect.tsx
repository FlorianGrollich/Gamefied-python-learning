import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {RootState} from "store";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

const AuthRedirect = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const navigate = useNavigate();
    const locator = useLocation();

    useEffect(() => {
        if (!token && locator.pathname !== '/register') {
            navigate('/login');
        }
    }, [token, navigate]);

    return null
};

export default AuthRedirect;
