import axios from "axios";

async function postreq(apiUrl, data, headers) {
    const api = apiUrl;
    const inData = data;
    const defaultHeader = {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    const inHeaders = headers ? headers : defaultHeader;

    let status = '';
    try {
        status = await axios.post(api, inData, inHeaders);
        // console.log("in postreq", status);
    } catch (error) {
        status = error.message;
    }
    return status;
}

export default postreq;