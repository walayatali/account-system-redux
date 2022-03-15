import React,{ useMemo, useState } from 'react';
import Card from '../UI/Card';
import { useParams} from 'react-router-dom';
import Report from './Report';
import FilterReport from './FilterReport';

function AccountStatement(props)	{
	const params = useParams();
  	const { accountId } = params;

  	const [filterData, setFilterData] = useState({});
  	const onFilterExpensesHandler = (date, price) => {
  		setFilterData({date: date, price: price});
  	}

	return (
		<Card>
			<FilterReport onFilterExpenses = {onFilterExpensesHandler}/>
			<Report accountId={accountId} filterData = {filterData} />
		</Card>
	)
}

export default AccountStatement;