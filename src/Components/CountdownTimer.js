import React, { useEffect, useState, Fragment } from "react";
import { useCountdown } from "./useCountdown";

const ExpiredNotice = () => {
    return (
        <div className="expired-notice">
            <span>Expired!!!</span>
            <p>Please select a future date and time.</p>
        </div>
    );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
        <div className="show-counter">
            <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
            <p>:</p>
            <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
            <p>:</p>
            <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
            <p>:</p>
            <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
        </div>
    );
};

const DateTimeDisplay = ({ value, type, isDanger }) => {
    return (
        <div className={isDanger ? 'countdown danger' : 'countdown'}>
            <p>{value}</p>
            <span>{type}</span>
        </div>
    );
};

const CountdownTimer = () => {

    const [days, hours, minutes, seconds] = useCountdown(new Date("2022-12-06 11:30:00"));

    if (days + hours + minutes + seconds <= 0) {
        return <ExpiredNotice />;
    } else {
        return (
            <ShowCounter
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
        );
    }
}

export default CountdownTimer