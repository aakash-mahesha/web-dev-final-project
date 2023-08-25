import axios from "axios";
import dayjs from "dayjs";
import { getIfExists, reformatEvent } from './service-utils';

// const dayjs = require('dayjs');
// const axios = require('axios');

// const exampleApiCall = 'https://app.ticketmaster.com/discovery/v2/events?apikey=pCKILJrFzfEJbfLpAXeawuyAnpFgMCPo&keyword=music&locale=*&startDateTime=2023-08-15T14:00:00Z&endDateTime=2023-08-26T14:00:00Z&city=new%20york';
// const apiCallZip = 'https://app.ticketmaster.com/discovery/v2/events?apikey=pCKILJrFzfEJbfLpAXeawuyAnpFgMCPo&keyword=music&postalCode=02114&locale=*&startDateTime=2023-08-15T14:00:00Z&endDateTime=2023-10-31T14:00:00Z';

// const request = axios.create(); //add with credentials

const TICKEMASTER_API_BASE = 'https://app.ticketmaster.com/discovery/v2';
const API_KEY = process.env.REACT_APP_TICKETMASTER_API_KEY;
const TICKEMASTER_SEARCH_API = `${TICKEMASTER_API_BASE}/events?apikey=${API_KEY}`;

// const REACT_APP_API_BASE = 'https://mapverse-server.onrender.com/api';
const REACT_APP_API_BASE = process.env.REACT_APP_API_BASE;
// const REACT_APP_API_BASE = 'http://localhost:4000/api';


const exquery = {
    // savedEvents: true,
    // publicEvents: true,
    keyword: "test",
    // postalCode: "02114",
    // startDateTime: "Tue, 15 Aug 2023 08:13:09 GMT",
    // endDateTime: "Tue, 31 Oct 2023 08:13:09 GMT",
    // tags: "tag1-tag2"
}

const exdbquery = {
    keyword: "music",
    postalCode: "02114",
    startDateTime: "Tue, 15 Aug 2023 08:13:09 GMT",
    endDateTime: "Tue, 31 Oct 2023 08:13:09 GMT",
    tags: ["tag1", "tag2"]
}

// const exurl = 'http://localhost:3000/#/search?savedEvents=true&publicEvents=true&keyword=music&location=02114&startDateTime=Tue%2C+15+Aug+2023+08%3A13%3A09+GMT&endDateTime=Tue%2C+31+Oct+2023+08%3A13%3A09+GMT&tags=tag1-tag2'

// !!!!!TO DO: make api and db search two seperate services/thunks
// have them each concat onto the current results (see create tuit)
// handle which thunk to call in search form 
//( scope no longer passed as part of query)
// export const fullSearch = async (query) => {
// // const fullSearch = async (query) => {
//     const db = query.savedEvents;
//     const api = query.publicEvents;
//     console.log(api)
//     // let response = [];
//     if (db) {
//         // const dbResponse = await dbSearch(query);
//         // response = response.concat(dbResponse);
//         console.log('db')
//     }
//     // if (api) {
//         const apiResponse = await apiSearch(query);
//         console.log('api response', apiResponse)

//         // response = response.concat(apiResponse);
//     //}
//     // console.log('service response', response)
//     // return response;
//     return apiResponse
// }

export const dbSearch = async (query) => {
// const dbSearch = async (query) => {

    const searchBody =
    {
        ...query,
    };
    if (query.tags) {
        searchBody.tags = query.tags.split('-');

    }
    if (query.startDateTime) {
        // searchBody.startDateTime = `"${dayjs(query.startDateTime).toString()}"`;
        searchBody.startDateTime = dayjs(query.startDateTime).toISOString();
    }
    // if (query.endDateTime) {
    //     // searchBody.endDateTime = `"${dayjs(query.endDateTime).toString()}"`;
        searchBody.endDateTime = dayjs(query.endDateTime).toISOString();
    // }
    console.log(searchBody)
    const searchUrl = `${REACT_APP_API_BASE}/events`;
    const response = await axios.get(searchUrl, { params: searchBody });

    // console.log(response)

    const parsedResponse = [];
    for (var key in response.data) {
        const event = response.data[key];
        parsedResponse.push({
            image: getIfExists(event, 'imgs')[0] || '',
            ...event,
            coordinates: event.coordinates.map((coord) => coord.$numberDecimal)
        });
    }

    console.log(parsedResponse)
    return parsedResponse;
    // console.log('db search:', searchBody);
    // return [];
}

// dbSearch(exquery);

export const apiSearch = async (query) => {
    const searchParams = formatApiQuery(query);
    const searchUrl = `${TICKEMASTER_SEARCH_API}&${searchParams}`;
    console.log('searchUrl', searchUrl)
    const response = await axios.get(searchUrl);
    const parsedResponse = parseApiResponse(response);
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

const parseApiResponse = (response) => {
    const embedded = getIfExists(response.data, "_embedded");
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
        // const reformattedEvents = events.reduce((result, event) => {
        //     const embedded = _getIfExists(event, "_embedded");
        //     if (embedded) {
        //         if (embedded.venues) {
        //             if (embedded.venues[0].location) {
        //                 const dates = _parseDate(event);
        //                 const reformatted = {
        //                     _id: event.id,
        //                     eventName: _getIfExists(event, "name"),
        //                     url: _getIfExists(event, "url"),
        //                     startDate: dates[0],
        //                     endDate: dates[1],
        //                     image: _chooseImage(event),
        //                     coordinates: _parsePos(embedded),
        //                     // ...embedded && { venues: embedded.venues },
        //                     address: _parseAddress(embedded),
        //                     description: _generateDescriptionObject(event, embedded),
        //                     imgs: _parseImages(event),
        //                     hostDetails: {
        //                         name: "Ticketmaster",
        //                         email: "customer_support@ticketmaster.com"
        //                     }
        //                 };
        //                 result.push(reformatted);
        //             }
        //         }
        //     }
        //     return result;
        // }, []);

        const reformattedEvents = events.reduce((result, event) => {
            const embedded = getIfExists(event, "_embedded");
            const reformatted = reformatEvent(event);
            if (reformatted) {
                result.push(reformatted);
            }
            return result;
        }, []);
        return reformattedEvents;
    }
}

// const _chooseImage = (event) => {
//     const images = _getIfExists(event, "images");
//     if (!images) {
//         return '';
//     }
//     const selectedImage = images.find((image) => image.ratio === '3_2');

//     if (selectedImage) {
//         return selectedImage.url;
//     } else {
//         return images[0].url;
//     }
// }

// const _parseDate = (event) => {
//     const dates = _getIfExists(event, "dates");
//     if (!dates) {
//         return [];
//     }
//     const startDateTime = dates.start.dateTime;
//     if (dates.spanMultipleDays) {
//         const endDateTIme = dates.date.dateTime;
//         return [startDateTime, endDateTIme];
//     }
//     return [startDateTime, '']; // CHECK WHETHER THIS STILL WORKS?!?!
// }

// const _parsePos = (embedded) => {
//     // if (embedded) {
//     const location = embedded.venues[0].location;
//     return [location.latitude, location.longitude];
//     // }
// }

// const _parseAddress = (embedded) => {
//     const venue = embedded.venues[0];
//     const venueName = venue.name;
//     const street = _getIfExists(venue.address, "line1")
//         + ' ' + _getIfExists(venue.address, "line2");
//     const city = _getIfExists(venue.city, "name");
//     const state = _getIfExists(venue.state, "name");
//     const country = _getIfExists(venue.country, "name");
//     const zipcode = _getIfExists(venue, "postalCode");

//     const addressObject = {
//         venueName,
//         street,
//         city,
//         state,
//         country,
//         zipcode
//     };

//     return addressObject;
// }

// const _parseImages = (event) => {
//     const images = _getIfExists(event, 'images');
//     if (images) {
//         return images.map((image) => image.url);
//     }
//     return [];
// }

// const _generateDescriptionObject = (event, embedded) => {
//     let classifications = _getIfExists(event, "classifications");
//     if (!classifications) {
//         return [];
//     }
//     classifications = classifications[0];
//     let eventType = _filterOutUndefined([classifications.segment, classifications.genre, classifications.subGenre]);
//     if (eventType) {
//         eventType = eventType.map((element) => element.name)
//     }
//     let featured = [];
//     if (embedded) {
//         featured = embedded.atttractions;
//     }
//     const info = _filterOutUndefined([event.description, event.info, event.pleaseNote, 'None'])[0];

//     const description = {
//         eventType: eventType,
//         featured: featured,
//         info: info
//     };

//     return description;
// }

// const _filterOutUndefined = (array) => {
//     if (!array) {
//         return [];
//     }
//     return array.filter((item) => item);
// }

// const getIfExists = (object, key) => {
//     try {
//         const value = object[key];
//         return value || '';
//     } catch (error) {
//         console.log(error);
//         return '';
//     }
// }