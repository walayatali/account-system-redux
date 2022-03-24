import React, { useState, useEffect, useCallback, useContext } from 'react';
import ReportEntry from './ReportEntry';
import classes from './Report.module.css';
import useGetData from '../../Hooks/useGetData';
import ReportContext from '../Store/report-context';

import { useSelector, useDispatch } from 'react-redux';
import { reportActions } from '../Store/report-slice';


function Report(props)	{

	const dispatch = useDispatch();
	const expensesUpdated = useSelector(state => state.report.expensesUpdated);
	
	
  	const loadedExpenses = [];
	const [expenses, setExpenses] = useState([]);
	const allKeys = ['Price', 'description', 'ItemDate'];
	const { alldata,fetchDataHandler: getExpenses } = useGetData(allKeys);
	const fetchExpenses = (allExpenses) => {
		const loadedExpenses = [];
	      for (const expenseKey in allExpenses) {
			console.log(allExpenses[expenseKey]["expense"]["ItemDate"]);
	      	var d = new Date(allExpenses[expenseKey]["expense"]["ItemDate"]);
              let month = d.getMonth()+1;
              let day = d.getUTCDate();
              let year = d.getFullYear();
	        loadedExpenses.push({ day: day, month: month, year: year, "Price": allExpenses[expenseKey]["expense"]["Price"],
	        	 "description": allExpenses[expenseKey]["expense"]["description"] });
	      }
	      setExpenses(loadedExpenses);
    }
  useEffect(() => {
  		if(typeof expensesUpdated.day !== "undefined"){
  			setExpenses(expenses.concat(expensesUpdated));
  		}else{
			// getExpenses(`https://expensetracker-706b7-default-rtdb.firebaseio.com/expense/${props.accountId}.json`,"", fetchExpenses);
			getExpenses(`${process.env.REACT_APP_SERVER_URL}record/?resources=expense&accountid=${props.accountId}`,{method: 'GET'}, fetchExpenses);
  		}
  	return () => {
      setExpenses([]); // This worked for me
    };
  },[getExpenses, expensesUpdated])

  useEffect(()=> {
  		dispatch(reportActions.onExpensesUpdate({}));
  },[]);

  useEffect(()=> {
  		const filteredExpenses = expenses.filter(function(expense) {

		  return  parseInt(props.filterData.price) === parseInt(expense.Price);
		});
		setExpenses(filteredExpenses);
  },[props.filterData]);

  

	

	// console.log(expenses);
	const accId = props.accountId;
	let midArr = [];
	if(expenses.length > 0){
		expenses.map(function(items,i){
			// if(accId == i){
				midArr.push(items);
			// }
			// if(accId-1 == i)
			// {
			// 	items.map(function(item,j){
			// 		midArr.push(item);
			// 	})

			// }
		})
	}
	return (
		<ul className={classes['expenses-list']}>
		{
			 midArr.length > 0 &&midArr.map(single => (
					<ReportEntry key={Math.random()} reportData={single}/> 
				))
		}

		</ul>
	)
}

export default Report;