import { Link } from "react-router-dom";

const EventPopup = (
    // { event = {
    //     title: 'my event',
    //     description: 'this is my event',
    //     pos: [39.742043, -104.991531],
    //     address: {
    //         street: '31415 pie st',
    //         city: 'denver',
    //         state: 'CO',
    //         zip: 80012,
    //     },
    //     image: 'assets/reacticon.png',
    //     host: {
    //         firstname: 'alice',
    //         lastname: 'wonderland',
    //         username: 'aw',
    //         _id: '123' // use to link to profile pg
    //     }
    // }
    // }
    { event }
) => {
    return (
        <div>
            <div>
                <div>{event.title}</div>
            </div>
            <div>
                <label htmlFor="date">
                    Date
                </label>
                <span id="date">
                    <div>{event.date.when}</div>
                </span>
            </div>
            <div>
                <label htmlFor="address">
                    Address
                </label>
                <span id="address">
                    <div>{event.address[0]}</div>
                    <div>{event.address[1]}</div>
                </span>
            </div>
        </div>
    )
}

export default EventPopup