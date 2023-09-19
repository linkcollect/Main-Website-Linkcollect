import http from "./httpService";
import api from "./apiConfig.json";

const apiEndpoint = api.baseUrl + "/user";

export function getByUsername(username) {
    return http.get(`${apiEndpoint}/get_user/${username}`);
}

export function getCheckUsername(username) {
    return http.get(`${apiEndpoint}/check-username/`, {params: {
        username
      }})
}

export function patchUser(userObject) {
    return http.patch(`${apiEndpoint}/userInfo/`, userObject)
}