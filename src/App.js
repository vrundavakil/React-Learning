import React, { useState } from "react";
import Accordion from './Components/Accordion.js'
import SearchComponent from './Components/Search.js'
import Dropdown from './Components/Dropdown.js'
import Translate from './Components/Translate.js'
import Route from './Components/Route.js'
import Header from "./Components/Header.js";
const itemArray = [
    { id: "0", title: "title0", body: "body0" },
    { id: "1", title: "title1", body: "body1" },
    { id: "2", title: "title2", body: "body2" },
    { id: "3", title: "title3", body: "body3" },
]

const dropdownOptions = [
    { lable: "Green", value: "This is Green Color" },
    { lable: "Blue", value: "This is Blue Color" },
    { lable: "Red", value: "This is Red Color" },
    { lable: "Orange", value: "This is Orange Color" },
]


export default () => {
    const [selected, setselected] = useState(dropdownOptions[0]);

    return (
        <div className="homePading">
            <Header/>
            <Route path='/'>
                <Accordion itemArray={itemArray} />
            </Route>
            <Route path='/search'>
                <SearchComponent />
            </Route>
            <Route path='/translate'>
                <Translate />
            </Route>
            <Route path='/dropdown'>
                <Dropdown selected={selected} onSelectedchange={setselected} optionArray={dropdownOptions} lable={'Select Color'} />
            </Route>

            
        </div>);
}