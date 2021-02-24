import apiURL from "../../Re-usable/Api Url/apiURL";

const setJWTToken = token => {
    if (token) {
         apiURL.defaults.headers.common["Authorization"] = token;
    } else {
        delete apiURL.defaults.headers.common["Authorization"];
    }
};

export default setJWTToken;