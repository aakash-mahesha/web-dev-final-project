import axios from "axios";
import dayjs from "dayjs";
import { getIfExists, reformatEvent } from './service-utils';

// const dayjs = require('dayjs');
// const axios = require('axios');

// const request = axios.create(); //add with credentials

const TICKEMASTER_API_BASE = 'https://app.ticketmaster.com/discovery/v2';
const API_KEY = process.env.REACT_APP_TICKETMASTER_API_KEY;
const TICKEMASTER_DETAILS_API = (id) => (`${TICKEMASTER_API_BASE}/events/${id}?apikey=${API_KEY}`);

// const REACT_APP_API_BASE = 'https://mapverse-server.onrender.com/api';
// const REACT_APP_API_BASE = 'http://localhost:4000/api';
const REACT_APP_API_BASE = process.env.REACT_APP_API_BASE;


// export const dbDetails = async (id) => {
export const dbDetails = async (id) => {

    const detailsUrl = `${REACT_APP_API_BASE}/events`;
    const response = await axios.get(detailsUrl, { params: { _id: id } });
    console.log(response.data)
    // const parsedResponse = {
    //     image: _getIfExists(response.data, 'imgs')[0] || '',
    //     ...response.data
    // }
    // console.log(_getIfExists(response.data, 'imgs'));
    // console.log(parsedResponse)
    const event = response.data;
    const parsedResponse = {
        image: getIfExists(event, 'imgs')[0] || '',
        ...event,
        coordinates: event.coordinates.map((coord) => coord.$numberDecimal)
    };
    return parsedResponse;
    // console.log('db details:', id);
    // return [];
}
// dbDetails('64e067a00195e6ed05744303');

export const apiDetails = async (id) => {
    const detailsUrl = TICKEMASTER_DETAILS_API(id);
    console.log('details', detailsUrl)
    const response = await axios.get(detailsUrl);
    const parsedResponse = parseApiResponse(response);
    console.log('api details service',parsedResponse);

    return parsedResponse;
}
// apiDetails("rZ7HnEZ1AK860b")

const parseApiResponse = (response) => {
    const event = response.data;
    return (reformatEvent(event));
}


///////////////
// const reformatEvent = (event) => {
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
//                 return reformatted;
//             }
//         }
//     }
//     return '';
// }

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
//         featured = embedded.atttractions || [];
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