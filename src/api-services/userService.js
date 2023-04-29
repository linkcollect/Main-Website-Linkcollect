import http from "./httpService";
import api from "./apiConfig.json";

const apiEndpoint = api.baseUrl + "/user";

export function getByUsername(username) {
    return http.get(`${apiEndpoint}/get_user/${username}`);
}