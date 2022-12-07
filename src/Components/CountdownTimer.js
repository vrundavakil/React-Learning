import UseCountdown from "./UseCountdown";

const CountdownTimer = () => {

    const dataList = [
        {
            id: '1',
            date: '2022-12-07 15:00:00',
        }, {
            id: '2',
            date: '2022-12-07 15:10:00',
        }, {
            id: '3',
            date: '2022-12-07 15:20:00',
        }, {
            id: '3',
            date: '2022-12-07 15:30:00',
        }, {
            id: '4',
            date: '2022-12-07 15:40:00',
        }, {
            id: '5',
            date: '2022-12-07 15:50:00',
        }, {
            id: '6',
            date: '2022-12-07 15:55:00',
        },

    ];

    return <div>
        <table>
            <thead>
                <th>Id</th>
                <th>Time</th>
            </thead>
            <tbody>
                {dataList.map(data =>
                    <tr className="tr">
                        <td>{data.id}</td>
                        <td> <UseCountdown targetDate={new Date(data.date)} /></td>
                    </tr>
                )}
            </tbody>
        </table>
    </div >

}

export default CountdownTimer