import React, {useState, useEffect, useCallback, useContext} from 'react';
import Card from '../UI/Card';
import AccountStatement from './AccountStatement';
import AddExpense from './AddExpense';
import AddAccount from './AddAccount';
import NavBar from '../Header/NavBar';
import Modal from '../UI/Modal';
import useGetData from '../../Hooks/useGetData';
import classes from './ListAccounts.module.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation,
  useNavigate,
  Navigate,
  Outlet
} from "react-router-dom";
import AccountContext from '../Store/account-context';
import AuthContext from '../Store/auth-context';


function ListAccounts(props)	{

	const accRep = useContext(AccountContext);
	const { accountsUpdated } = accRep;

	const authCtx = useContext(AuthContext);
	const { email } = authCtx;

	const navigate = useNavigate();
	let location = useLocation();
	const currLocation = location.pathname;

	const id = currLocation.substring(currLocation.lastIndexOf('/') + 1);

	const [accounts, setAccounts] = useState([]);

	const[showExpenseModal, setShowExpenseModal] = useState(false);
	const[showAccountModal, setShowAccountModal] = useState(false);
	
	const closeExpenseModalHandler = () => {
        setShowExpenseModal(false);      
    }
    const openExpenseModalHandler = () => {
        setShowExpenseModal(true);      
    }

    const closeAccountModalHandler = () => {
        setShowAccountModal(false);      
    }
    const openAccountModalHandler = () => {
        setShowAccountModal(true);      
    }

    const navigateHandler = (e,logout=false) => {
        navigate(e);
        if(logout)
        {
        	props.logout()
        }      
    }
    const allKeys = ['id','name'];
   
    const {alldata, fetchDataHandler: getAccounts} = useGetData(allKeys);
    
    const fetchRecords = (accounts) => {
    	const loadedAccounts = [];

      for (const accountKey in accounts) {
        loadedAccounts.push({ id: accounts[accountKey].id, name: accounts[accountKey].name });
      }

      setAccounts(loadedAccounts);
    }

    useEffect(() =>{
    	if(typeof accountsUpdated.name !== "undefined"){
  			setAccounts(accounts.concat(accountsUpdated));
  		}else{
    		getAccounts('https://expensetracker-706b7-default-rtdb.firebaseio.com/accounts.json',"",fetchRecords);
    	}
    	return ()=>{
    		setAccounts([]);
    	}
    },[getAccounts, accountsUpdated])

	return (

		<>
			{ showAccountModal && 
				<Modal onClose={closeAccountModalHandler}>
					<AddAccount onCancel={closeAccountModalHandler}/>
				</Modal> 
			}
			{ showExpenseModal && 
				<Modal onClose={closeExpenseModalHandler}>
					<AddExpense accounts={accounts} id={id} onCancel={closeExpenseModalHandler}/>
				</Modal> 
			}
			<Card>
				<div className={classes.nav_buttons}>
					<NavBar onClick={() => navigateHandler("/",true)} key="logout" link="/" account={{id:"logout", name:"Logout"}}/>
					<NavBar onClick={openAccountModalHandler} key="add-account" link={currLocation} account={{id:"add-account", name:"Add Account"}}/>
					<NavBar onClick={openExpenseModalHandler} key="add-expense" link={currLocation} account={{id:"add-expense", name:"Add Expense"}}/>
					<NavBar onClick={() => navigateHandler("/")} key="all_accounts" link="/" account={{id:"all_accounts", name:"all accounts"}}/>
				</div>
			</Card>

			<h1> Welcome <em>{email}</em></h1>
			{
				(accounts.length > 0 ) &&
					accounts.map(account => (
						<NavBar onClick={() => navigateHandler("/AccountStatement/" + account.id)} key={account.id} link={"/AccountStatement/" + account.id} account={account}/>
					))
			}
			<Outlet/>
		</>
	)
}

export default ListAccounts;