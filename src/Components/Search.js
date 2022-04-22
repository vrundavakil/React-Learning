import React, { useState, useEffect } from "react";
import axios from "axios";
const SearchComponent = () => {

    const [Term, setTerm] = useState('');
    const [results, setResult] = useState([]);

    useEffect(() => {
        const search = async () => {
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php',
                {
                    params: {
                        action: 'query',
                        list: 'search',
                        srsearch: Term,
                        utf8: '',
                        origin: '*',
                        format: 'json',
                    }
                });
            setResult(data.query.search);
        };
       
        if(Term && !results){
            search();
        }
        else{
            const timeoutId = setTimeout(() => {
                if (Term) {
                    search()
                }
            }, 1000);
    
            return () => {
                clearTimeout(timeoutId);
            }
        }
    }, [Term]);
   const renderedResults = results.map((result) => {
        return (
            <div key={result.pageid} className="item">
                <div className="right floated content">
                    <a href={`https://en.wikipedia.org?curid=${result.pageid}`}
                        className="ui button">Go</a>
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>

                </div>
            </div>
        );
    });


    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input className="input" onChange={e => setTerm(e.target.value)} value={Term} />
                </div>
            </div>
            <div className="ui celled list">
                {renderedResults}
            </div>
        </div>
    )
}

export default SearchComponent  