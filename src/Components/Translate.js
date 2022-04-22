import React, { useState } from "react";
import Convert from "./Convert.js";
import Dropdown from './Dropdown.js';

const Translate = () => {

    const dropdownOptions = [
        { lable: 'Afrikaans ', value: 'af', },
        { lable: 'Arabic', value: 'ar', },
        { lable: 'Hindi', value: 'hi', },
    ]

    const [language, setLanguate] = useState(dropdownOptions[0]);
    const [text, setText] = useState('');

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Text:</label>
                    <input value={text} onChange={(e) => setText(e.target.value)} />
                </div>
            </div>
            <Dropdown selected={language} onSelectedchange={setLanguate} optionArray={dropdownOptions} lable={'Select Language'} />
            <h3>Output</h3>
            <Convert language={language} text={text}/>
        </div>
    );

}

export default Translate;       