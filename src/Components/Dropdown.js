import React, { useEffect, useState, useRef } from "react";

const Dropdown = ({ optionArray, onSelectedchange, selected,lable }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const onBodyClicked = (event) => {
            if (ref.current.contains(event.target)) {
                return;
            }
            setOpen(false);
        };
        document.body.addEventListener('click', onBodyClicked);

        return () => {
                    
            document.body.removeEventListener('click', onBodyClicked);
        };
    },[]);

    const renderOptions = optionArray.map(option => {
        if (selected.value === option.value) {
            return null
        }
        return (
            <div key={option.value} className="item" onClick={() => {
                onSelectedchange(option)
            }}>
                {option.lable}
            </div>
        );
    });

    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <div className="lable"> {lable} </div>
                <div onClick={() => {
                    setOpen(!open)
                }}
                    className={`ui selection dropdown ${open ? 'visible active' : ''}`} >
                    <i className="dropdown icon"></i>
                    <div className="text"> {selected.lable} </div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>
                        {renderOptions}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dropdown;