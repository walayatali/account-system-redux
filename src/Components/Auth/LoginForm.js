import React, { useRef, useState, useEffect, useReducer, useContext} from 'react';
import classes from './LoginForm.module.css';
import Input from '../UI/Input';
import AuthContext from '../Store/auth-context';
import useGetData from '../../Hooks/useGetData';

import { useDispatch } from 'react-redux';
import { authActions } from '../Store/auth-slice';

const authReducer = (state, action) => {
	
	if (action.type == 'FORM_VALIDATE') {
		if (action.email.trim() === "")
		{
			return {
				email: state.email, password: state.password, valid:false,
				error: true, errorMessage: 'Email cannot be empty'
			}	
		}
		else if (action.password.trim() === "" || action.password.trim().length < 6)
		{
			return {
				email: state.email, password: state.password, valid:false,
				error: true, errorMessage: 'Password cannot be empty <br> must be atleast 7 chracters'
			}	
		}
		else{

			return { email: action.email, password: action.password, valid: true }		
		}
	} else {
		return { email: '', password: '', valid:false }
	}

}

function LoginForm (props)	{

	const reduxDispatch = useDispatch();

	const InitialUser = {email: '', password: '', valid: false, error: false, errorMessage: ''};

	const emailRef = useRef();
	const passwordRef = useRef();
	
	const [authState, dispatch] =  useReducer(authReducer, InitialUser);
	const ctxAuth =  useContext(AuthContext);
	
	const [localuser, setLocaluser] = useState({});
	const allKeys = ["email", "password"];
	const {alldata, dataDepend, fetchDataHandler: sendCredentials} = useGetData(allKeys);
	
	
	const changeFormHandler = () => {
		dispatch({type:"FORM_VALIDATE", email: emailRef.current.value, password: passwordRef.current.value })
	}

	const fetchCredentials = (data) => {
		// console.log(data);
	}

	const submitHandler = async(e) => {
		e.preventDefault();
		dispatch({type:"FORM_VALIDATE", email: emailRef.current.value, password: passwordRef.current.value })
		if( authState.valid){
			const goAuth = async()=> {
				await sendCredentials(`https://expensetracker-706b7-default-rtdb.firebaseio.com/users.json`,"", fetchCredentials);
				await ctxAuth.onSetUser(emailRef.current.value, passwordRef.current.value ); 
				await reduxDispatch(authActions.login({email: emailRef.current.value, password: passwordRef.current.value})); 

			}
			// if(setLocaluser({email: emailRef.current.value, password: passwordRef.current.value })){
				// setLocaluser({email: emailRef.current.value, password: passwordRef.current.value });
			// }
			goAuth();
		}
	}
	
	useEffect (() => {
		emailRef.current.focus();
	}, []);

	return (
		<form className={classes.form}  onSubmit={submitHandler}>
		{authState.error && <p className={classes.error}>{authState.errorMessage}</p>}
			<Input  label="Email" ref={emailRef} input={{
				type: "email",
				onChange: changeFormHandler,
			}}/>
			<Input label="Password" ref={passwordRef} input={{
				type: "password",
				onChange: changeFormHandler
			}}/>
			<button  type="submit">Login</button>
		</form>
	)
}

export default LoginForm;