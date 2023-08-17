import axios from "axios";
import dayjs from "dayjs";
// const dayjs = require('dayjs');
// const axios = require('axios');

const exampleApiCall = 'https://app.ticketmaster.com/discovery/v2/events?apikey=pCKILJrFzfEJbfLpAXeawuyAnpFgMCPo&keyword=music&locale=*&startDateTime=2023-08-15T14:00:00Z&endDateTime=2023-08-26T14:00:00Z&city=new%20york';
const apiCallZip = 'https://app.ticketmaster.com/discovery/v2/events?apikey=pCKILJrFzfEJbfLpAXeawuyAnpFgMCPo&keyword=music&postalCode=02114&locale=*&startDateTime=2023-08-15T14:00:00Z&endDateTime=2023-10-31T14:00:00Z';

// const request = axios.create(); //add with credentials

const TICKEMASTER_API_BASE = 'https://app.ticketmaster.com/discovery/v2';
const API_KEY = process.env.REACT_APP_TICKETMASTER_API_KEY || 'pCKILJrFzfEJbfLpAXeawuyAnpFgMCPo';
const TICKEMASTER_SEARCH_API = `${TICKEMASTER_API_BASE}/events?apikey=${API_KEY}`;


const exquery = {
    // savedEvents: true,
    // publicEvents: true,
    keyword: "music",
    postalCode: "02114",
    startDateTime: "Tue, 15 Aug 2023 08:13:09 GMT",
    endDateTime: "Tue, 31 Oct 2023 08:13:09 GMT",
    tags: "tag1-tag2"
}

const exurl = 'http://localhost:3000/#/search?savedEvents=true&publicEvents=true&keyword=music&location=02114&startDateTime=Tue%2C+15+Aug+2023+08%3A13%3A09+GMT&endDateTime=Tue%2C+31+Oct+2023+08%3A13%3A09+GMT&tags=tag1-tag2'

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
    return [];
}

export const apiSearch = async (query) => {
    const searchParams = formatApiQuery(query);
    const searchUrl = `${TICKEMASTER_SEARCH_API}&${searchParams}`;
    console.log('searchUrl',searchUrl)
    const response = await axios.get(searchUrl);
    const parsedResponse = _parsedApiResponse(response);
    // console.log(parsedResponse[0]);

    return parsedResponse;
}

const formatApiQuery = (query) => {
    const queryList = [];
    const acceptedParams = ['keyword', 'postalCode', 'startDateTime', 'endDateTime']
    acceptedParams.map((param) => {
        let value = query[param];
        if (value) {
            if (param.includes('DateTime')) {
                value = dayjs(value).format('YYYY-MM-DDTHH:mm:ssZ');
            }
            queryList.push(`${param}=${value}`);
        }
    })
    const searchParams = queryList.join('&').replace(/ /g, '+');
    
    console.log('searchParams',searchParams)

    return searchParams;
}

const _parsedApiResponse = (response) => {
    const embedded = _getIfExists(response.data, "_embedded");
    if (!embedded) {
        console.log('houston, we have a problem')
        return [];
    } else {
        const events = embedded.events;
        console.log('response events', events)
        const reformattedEvents = events.map((event) => ({
            _id: event.id,
            name: event.name,
            url: event.url,
            dates: _parseDate(event),
            image: _chooseImage(event),
            pos: event._embedded.venues[0].location,
            venues: event._embedded.venues,
            description: _generateDescriptionObject(event),
        }));
        return reformattedEvents;
    }
}

const _chooseImage = (event) => {
    const images = event.images;
    const selectedImage = images.find((image) => image.ratio === '3_2');

    if (selectedImage) {
        return selectedImage;
    } else {
        return images[0];
    }
}

const _parseDate = (event) => {
    const dates = event.dates;
    const startDateTime = dates.start.dateTime;
    if (dates.spanMultipleDays) {
        const endDateTIme = dates.date.dateTime;
        return [startDateTime, endDateTIme];
    }
    return [startDateTime, startDateTime];
}

const _generateDescriptionObject = (event) => {
    const classifications = event.classifications[0];
    let eventType = _filterOutUndefined([classifications.segment, classifications.genre, classifications.subGenre]);
    if (eventType) {
        eventType = eventType.map((element) => element.name)
    }
    let featured = [];
    const embedded = _getIfExists(event, "_embedded");
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
        return object[key];
    } catch (error) {
        console.log(error);
        return [];
    }
}