import axios from "axios";

export const postreq = (apiUrl, data, headers) => {
    const api = apiUrl;
    const data = data;
    const defaultHeader = {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    const headers = headers ? headers : defaultHeader;

    axios.post(api, data, headers).then((res) => {return res;}).catch((err) => {return err;});
}