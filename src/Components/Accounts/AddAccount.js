import React, { useState, useContext } from 'react';
import classes from './AddAccount.module.css';
import AccountContext from '../Store/account-context';
import useGetData from '../../Hooks/useGetData';



function AddAccount(props)	{
const ctxAcc =  useContext(AccountContext);
const allKeys = ["id", 'name'];
const {alldata, fetchDataHandler: addAccount} = useGetData(allKeys);

 const addAccountHandler = async (account) => {
	const accountDataCtx = {
		"id": account.id,
		"name": accountname
	};
	const saveData = (data) => {
		// console.log(data);
	}
	const addAccountWrapper = async() => {
	await	addAccount(`https://expensetracker-706b7-default-rtdb.firebaseio.com/accounts.json`, {
		  method: 'POST',
		  body: JSON.stringify(account),
		  headers: {
		    'Content-Type': 'application/json'
		  }
		},saveData);
	await ctxAcc.onAccountsUpdate(accountDataCtx);

	}
	addAccountWrapper();
	
}


const [accountname, setAccountname] = useState('');

const accountnameChangeHandler = (e) => {

	setAccountname(e.target.value);

}

function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const submitHandler = (e) => {
	e.preventDefault();

	const accountData = {
		"id": randomInteger(1,100),
		"name": accountname
	};
	
	addAccountHandler(accountData);
	setAccountname('');
	props.onCancel();
	

}
	return (
		<div className={classes['new-account']}>
			<form onSubmit = {submitHandler}>
				<div className={classes['new-account__controls']}>
					<div className={classes['new-account__control']}>
						<label>Name</label>
						<input onChange={accountnameChangeHandler} type="text" value={accountname}/>
					</div>
				</div>
				<div className={classes['new-account__actions']}>
					<button onClick={props.onCancel} type="button">
						Cancel
					</button>
					<button type="submit">
						Add Account
					</button>
				</div>	
			</form>
		</div>
	)
}

export default AddAccount;