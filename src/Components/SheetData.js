import React, { useEffect, useState, Fragment } from "react";
import Papa from "papaparse";
const SheetData = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        Papa.parse("https://docs.google.com/spreadsheets/d/1vjot5SKKC9ZqdDDGlgFdsTjjNDyu0HNFm7sSRtpcAH0/pub?output=csv", {
            download: true,
            header: true,
            complete: (results) => {
                setData(results.data);
            },
        });
    }, [])


    console.log(data);
    return (
        <>
            <h1>data from google sheets</h1>
            <ul>
                {data.map((item, i) => (
                    <Fragment key={i}>
                        <li>Date :- {item.Date} </li>
                        <li>Email :- {item.Task}</li>
                        <br />
                    </Fragment>
                ))}
            </ul>
        </>
    );
}

export default SheetData;         