import React, { useRef, useReducer } from 'react';
import Card from '../UI/Card';
import classes from './FilterReport.module.css';

const filterReducer = (state, action) => {

	if (action.type == 'VALIDATE_FILTER') {
		let currThisDate = new Date();
		let currDate =  currThisDate.toISOString().split('T')[0];

		let actionDate = action.filterDate.trim();
		let actionPrice = action.filterPrice.trim();
		
		if (actionDate !== "" && actionPrice !== "")
		{
			if ((actionDate !== currDate) && (actionPrice > 0)) {
				return {
					filterDate: action.filterDate, filterPrice: state.filterPrice,
					 filterValid: true, error: false, errorMessage: ''
				}	
			}
			else{
				if (actionPrice < 0 ){
					return {
						error: true, errorMessage: 'Price can not be negative number'
					}	
				}	
				if ((actionDate === currDate)) {
					return {
						 filterValid: false, error: true, errorMessage: 'Date cannot be current date'
					}	
				}
			}
		}else{
			if (actionDate === '' && actionPrice === ''){
				return {
					filterValid: false, error: true, errorMessage: 'Enter Date or Price to continue'
				}	
			}
			if (actionPrice < 0 ){
				return {
					filterValid: false, error: true, errorMessage: 'Price can not be negative number'
				}	
			}
			if ((actionDate === currDate)) {
				return {
					 filterValid: false, error: true, errorMessage: 'Date cannot be current date'
				}	
			}
		}
	}
	
		return {
			filterDate : "", filterPrice: "", filterValid: true, error: false, errorMessage:''
		};

}

function FilterReport(props)	{
	const priceRef = useRef();
	const dateRef = useRef();
	
	const filterChangeHandler = () => {
		dispatch({type: "VALIDATE_FILTER", filterDate: dateRef.current.value, filterPrice: priceRef.current.value})
	}

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch({type: "VALIDATE_FILTER", filterDate: dateRef.current.value, filterPrice: priceRef.current.value})
		if (filterState.filterValid)
		{
			props.onFilterExpenses(dateRef.current.value, priceRef.current.value);
		}
	}

	const InitialFilter = {filterDate : Date.now(), filterPrice: "", filterValid: false, error: false, errorMessage:''};
	const [filterState, dispatch] =  useReducer(filterReducer, InitialFilter);
	
	return (
		<Card>
			<div className={classes['new-filter']}>
				<form onSubmit = {submitHandler}>
					{filterState.error && <p className={classes.error}>{filterState.errorMessage}</p>}
					<div className={classes['new-filter__controls']}>
						<div className={classes['new-filter__control']}>
							<label>Filter By Date</label>
							<input ref={dateRef} onChange={filterChangeHandler} type="date" />
						</div>
					</div>
					<div className={classes['new-filter__controls']}>
						<div className={classes['new-filter__control']}>
							<label>Filter By Price</label>
							<input ref={priceRef} onChange={filterChangeHandler} type="text" />
						</div>
					</div>
					<div className={classes['new-filter__actions']}>
						<button  type="submit">
							Filter
						</button>
					</div>	
				</form>
			</div>
		</Card>
	)
}

export default FilterReport;