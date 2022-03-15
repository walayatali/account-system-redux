import React from 'react';
import classes from './ReportEntry.module.css';
import Card from '../UI/Card';

function ReportEntry(props)	{
	return (
		<>
			<li>
				<Card className={classes['expense-item']}>
					<div className={classes['expense-date']}>
						<div className={classes['expense-date__month']}>{props.reportData.month}</div>
						<div className={classes['expense-date__year']}>{props.reportData.year}</div>
						<div className={classes['expense-date__day']}>{props.reportData.day}</div>
					</div>
					<div className={classes['expense-item__description']}>
						<h2>asdasd</h2>
						<p className={classes['expense-item__price']}>$ {props.reportData.Price}</p>
					</div>
				</Card>
			</li>
		</>
	)
}

export default ReportEntry;