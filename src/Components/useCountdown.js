import { useEffect, useState } from 'react';

const UseCountdown = ({ targetDate }) => {
    const countDownDate = new Date(targetDate).getTime();

    const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    // calculate time left
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    if (days + hours + minutes + seconds <= 0) {
        return <div className="">
            <span>Expired!!!</span>
            {/* <p>Please select a future date and time.</p> */}
        </div>

    } else {
        return <div className="show-counter">
            {/* <span>{days} : {hours} : {minutes} : {seconds}</span> */}
            <span> {hours} : {minutes} : {seconds}</span>
        </div>

    }
};


export default UseCountdown