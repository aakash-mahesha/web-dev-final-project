const dayjs = require('dayjs');

export const reformatEvent = (event) => {
    const embedded = getIfExists(event, "_embedded");
    if (embedded) {
        if (embedded.venues) {
            if (embedded.venues[0].location) {
                const dates = _parseDate(event);
                const reformatted = {
                    _id: event.id,
                    eventName: getIfExists(event, "name"),
                    url: getIfExists(event, "url"),
                    startDate: dates[0],
                    endDate: dates[1],
                    image: _chooseImage(event),
                    coordinates: _parsePos(embedded),
                    // ...embedded && { venues: embedded.venues },
                    address: _parseAddress(embedded),
                    description: _generateDescriptionObject(event, embedded),
                    imgs: _parseImages(event),
                    hostDetails: {
                        name: "Ticketmaster",
                        email: "customer_support@ticketmaster.com"
                    }
                };
                return reformatted;
            }
        }
    }
    return '';
}

const _chooseImage = (event) => {
    const images = getIfExists(event, "images");
    if (!images) {
        return '';
    }
    const selectedImage = images.find((image) => image.ratio === '3_2');

    if (selectedImage) {
        return selectedImage.url;
    } else {
        return images[0].url;
    }
}

const _parseDate = (event) => {
    const dates = getIfExists(event, "dates");
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
    const street = getIfExists(venue.address, "line1")
        + ' ' + getIfExists(venue.address, "line2");
    const city = getIfExists(venue.city, "name");
    const state = getIfExists(venue.state, "name");
    const country = getIfExists(venue.country, "name");
    const zipcode = getIfExists(venue, "postalCode");

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

const _parseImages = (event) => {
    const images = getIfExists(event, 'images');
    if (images) {
        return images.map((image) => image.url);
    }
    return [];
}

const _generateDescriptionObject = (event, embedded) => {
    let classifications = getIfExists(event, "classifications");
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
        featured = embedded.atttractions || [];
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

export const getIfExists = (object, key) => {
    try {
        const value = object[key];
        return value || '';
    } catch (error) {
        console.log(error);
        return '';
    }
}