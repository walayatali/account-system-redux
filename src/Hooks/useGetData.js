import React, { useState, useEffect, useCallback } from 'react';
import ReportContext from '../Components/Store/report-context';

function useGetData( allKeys, dataDepend = "")	{
    const [alldata, setAlldata] = useState([]);
    const fetchDataHandler = useCallback(async (url, config="", applyData) => {
    try {
        let response="";
        if(config !== ""){
            response = await fetch(url,config);
        }
        else
        {
            response = await fetch(url);
        }
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

    const data = await response.json();
    applyData(data);
     //  const allInnerData = [];
     //  for (const key in data) {
  			// var obj = Object.create({});
     //  		for (const singleKey of allKeys) {
     //        if (singleKey == 'ItemDate'){
     //          var d = new Date(data[key][singleKey]);
     //          obj['month'] = d.getMonth()+1;
     //          obj['day'] = d.getUTCDate();
     //          obj['year'] = d.getFullYear();
     //        }else{
     //  		    obj[singleKey] = data[key][singleKey];
     //        }
     //      }
	    //     allInnerData.push(obj);
     //  }
     //  if(config !== "")
     //    {
     //        return;
     //    }
     //    setAlldata(allInnerData);
    } catch (error) {
      console.log(error);
    }
  },[])

	// useEffect(() => {
	//     fetchDataHandler();
 //        return () => {
 //            setAlldata([]); // This worked for me
 //            };
 //        }, [dataDepend]);

    return {alldata, dataDepend, fetchDataHandler};
}

export default useGetData;