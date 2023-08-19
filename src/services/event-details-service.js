import axios from "axios";
import dayjs from "dayjs";

// const request = axios.create(); //add with credentials

const TICKEMASTER_API_BASE = 'https://app.ticketmaster.com/discovery/v2';
const API_KEY = process.env.REACT_APP_TICKETMASTER_API_KEY;
const TICKEMASTER_DETAILS_API = (id) => (`${TICKEMASTER_API_BASE}/events/${id}?apikey=${API_KEY}`);


export const dbDetails = async (id) => {
    // const detailsUrl = '';
    // const response = await axios.get(detailsUrl, {_id: id});
    // const parsedResponse = {
    //     image: response.data.imgs[0],
    //     ...response.data
    // }
    // return parsedResponse;
    console.log('db details:', id);
    return [];
}

export const apiDetails = async (id) => {
    const searchParams = formatApiQuery(query);
    const searchUrl = `${TICKEMASTER_SEARCH_API}&${searchParams}`;
    console.log('searchUrl', searchUrl)
    const response = await axios.get(searchUrl);
    const parsedResponse = _parseApiResponse(response);
    // console.log(parsedResponse[0]);

    return parsedResponse;
}

const formatApiQuery = (query) => {
    // const queryList = [];
    // const acceptedParams = ['keyword', 'postalCode', 'startDateTime', 'endDateTime']
    // acceptedParams.map((param) => {
    //     let value = query[param];
    //     if (value) {
    //         if (param.includes('DateTime')) {
    //             value = dayjs(value).format('YYYY-MM-DDTHH:mm:ssZ');
    //         }
    //         queryList.push(`${param}=${value}`);
    //     }
    // })

    const acceptedParams = ['keyword', 'postalCode', 'startDateTime', 'endDateTime']
    const queryList = acceptedParams.reduce((result, param) => {
        let value = query[param];
        if (value) {
            if (param.includes('DateTime')) {
                value = dayjs(value).format('YYYY-MM-DDTHH:mm:ssZ');
            }
            result.push(`${param}=${value}`);
        }
        return result;
    }, []);
    const searchParams = queryList.join('&').replace(/ /g, '+');

    console.log('searchParams', searchParams)

    return searchParams;
}

const _parseApiResponse = (response) => {
    const embedded = _getIfExists(response.data, "_embedded");
    if (!embedded) {
        console.log('houston, we have a problem')
        return [];
    } else {
        // const events = embedded.events;
        // const reformattedEvents = events.map((event) => {
        //     const embedded = _getIfExists(event, "_embedded");

        //     return (
        //         {
        //             _id: event.id,
        //             name: _getIfExists(event, "name"),
        //             url: _getIfExists(event, "url"),
        //             dates: _parseDate(event),
        //             image: _chooseImage(event),
        //             pos: _parsePos(embedded),
        //             ...embedded && { venues: embedded.venues },
        //             description: _generateDescriptionObject(event, embedded),
        //         })
        // }
        // );
        // return reformattedEvents;
        const events = embedded.events;
        const reformattedEvents = events.reduce((result, event) => {
            const embedded = _getIfExists(event, "_embedded");
            if (embedded) {
                if (embedded.venues) {
                    if (embedded.venues[0].location) {
                        const dates = _parseDate(event);
                        const reformatted = {
                            _id: event.id,
                            eventName: _getIfExists(event, "name"),
                            url: _getIfExists(event, "url"),
                            startDate: dates[0],
                            endDate: dates[1],
                            image: _chooseImage(event),
                            coordinates: _parsePos(embedded),
                            // ...embedded && { venues: embedded.venues },
                            address: _parseAddress(embedded),
                            description: _generateDescriptionObject(event, embedded),
                            imgs: event.images || [],
                            hostDetails: {
                                name: "Ticketmaster",
                                email: "customer_support@ticketmaster.com"
                            }
                        };
                        result.push(reformatted);
                    }
                }
            }
            return result;
        }, []);
        return reformattedEvents;
    }
}

const _chooseImage = (event) => {
    const images = _getIfExists(event, "images");
    if (!images) {
        return [];
    }
    const selectedImage = images.find((image) => image.ratio === '3_2');

    if (selectedImage) {
        return selectedImage;
    } else {
        return images[0];
    }
}

const _parseDate = (event) => {
    const dates = _getIfExists(event, "dates");
    if (!dates) {
        return [];
    }
    const startDateTime = dates.start.dateTime;
    if (dates.spanMultipleDays) {
        const endDateTIme = dates.date.dateTime;
        return [startDateTime, endDateTIme];
    }
    return [startDateTime, '']; // CHECK WHETHER THIS STILL WORKS?!?!
}

const _parsePos = (embedded) => {
    // if (embedded) {
    const location = embedded.venues[0].location;
    return [location.latitude, location.longitude];
    // }
}

const _parseAddress = (embedded) => {
    const venue = embedded.venues[0];
    const venueName = venue.name;
    const street = _getIfExists(venue.address, "line1")
        + ' ' + _getIfExists(venue.address, "line2");
    const city = _getIfExists(venue.city, "name");
    const state = _getIfExists(venue.state, "name");
    const country = _getIfExists(venue.country, "name");
    const zipcode = _getIfExists(venue, "postalCode");

    const addressObject = {
        venueName,
        street,
        city,
        state,
        country,
        zipcode
    };

    return addressObject;
}

const _generateDescriptionObject = (event, embedded) => {
    let classifications = _getIfExists(event, "classifications");
    if (!classifications) {
        return [];
    }
    classifications = classifications[0];
    let eventType = _filterOutUndefined([classifications.segment, classifications.genre, classifications.subGenre]);
    if (eventType) {
        eventType = eventType.map((element) => element.name)
    }
    let featured = [];
    if (embedded) {
        featured = embedded.atttractions;
    }
    const info = _filterOutUndefined([event.description, event.info, event.pleaseNote, 'None'])[0];

    const description = {
        eventType: eventType,
        featured: featured,
        info: info
    };

    return description;
}

const _filterOutUndefined = (array) => {
    if (!array) {
        return [];
    }
    return array.filter((item) => item);
}

const _getIfExists = (object, key) => {
    try {
        const value = object[key];
        return value || '';
    } catch (error) {
        console.log(error);
        return '';
    }
}