import React, { useState } from "react";

const Accordion = ({ itemArray }) => {

    const [activeIndex, setActiveIndex] = useState(null);

    const titleClick = (id) => {
        setActiveIndex(id);
    }

    const renderitem = itemArray.map(item => {
        const active = item.id == activeIndex ? 'active' : '';
        return <React.Fragment key={item.id}>
            <div className={`title ` + active} onClick={() => titleClick(item.id)}>
                <i className="dropdown icon"></i>
                {item.title}
            </div>
            <div className={`content ` + active}>
                <p> {item.body}</p>
            </div>
        </React.Fragment>
    });

    return (
            <div className="ui styled accordion">
                <h3>Accordion Component</h3>
                {renderitem}
            </div>
        )

}
export default Accordion 