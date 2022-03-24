import React, { useState, useEffect, useContext } from 'react';
import Login from './Components/Auth/Login';
import ListAccounts from './Components/Accounts/ListAccounts';
import AccountStatement from './Components/Accounts/AccountStatement';
import AuthContext from './Components/Store/auth-context';
import ReportContext from './Components/Store/report-context';
import AccountContext from './Components/Store/account-context';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation,
  useNavigate,
  Navigate
} from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import { authActions } from './Components/Store/auth-slice';

function App() {

    const dispatch = useDispatch();
    const reduxEmail = useSelector(state => state.auth.email);

    const [accountNotify, setAccountNotify] = useState({});

    useEffect(() => {
        const localEmail = localStorage.getItem("email");

        if(localEmail){
            dispatch(authActions.login({email:localEmail, password: '123'}));
        }
        return () => {
        };
    },[]);

    const accountsUpdatedObj = {
        accountsUpdated: accountNotify,
        onAccountsUpdate: (val) => {
            setAccountNotify(val);
        }
    }
    
    const logoutHandler = () => {
        dispatch(authActions.logout());
        localStorage.removeItem("email");
        setAccountNotify({});

    }

    return (
        <React.Fragment>
                    <AccountContext.Provider value={accountsUpdatedObj}>    
            {!(reduxEmail) && <Login/>}
            {(reduxEmail) && 
                
                        
                        <Routes>
                            <Route path="/" element={<ListAccounts logout={logoutHandler}/>}> 
                                <Route exact path="AccountStatement/:accountId" element={<AccountStatement  />}  />
                            </Route>
                        </Routes>
                }
                    </AccountContext.Provider>
        </React.Fragment>
    );
}

export default App;