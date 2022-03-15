import React from 'react';
import classes from './NavBar.module.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom";
function NavBar(props)	{
	let location = useLocation();
	const currLocation = location.pathname;
	return (
		<>
			{ props.account.name !== 'all accounts' && !(currLocation.includes('AccountStatement')) && 	 
				<div onClick={props.onClick} key={props.account.id} className={`${(props.account.name !== 'Logout' && props.account.name !== 'Add Expense') ?  classes.account : classes.all_accounts_div } `} >
					<NavLink onClick={props.onClick} key={props.account.id} to={props.link}>{props.account.name}</NavLink>
				</div>
			}
			{ (currLocation.includes('AccountStatement')) && (props.account.name === 'Add Expense' || props.account.name === 'all accounts' || props.account.name === 'Logout') && 	 
				<div onClick={props.onClick} className={classes.all_accounts_div}>
					<NavLink onClick={props.onClick} key="all_accounts_link" to={props.link}>{props.account.name}</NavLink>
				</div>
			}
		</>
	)
}

export default NavBar;