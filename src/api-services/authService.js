import http from "./httpService";
import queryString from "query-string";
import api from "./apiConfig.json";

const apiEndpoint = api.baseUrl + "/user";

export function register(name, email, password) {
  return http.post(`${apiEndpoint}/signup`, {
    name,
    email,
    password,
  });
}

export function login(email, password) {
  return http.post(`${apiEndpoint}/signin`, {
    email,
    password,
  });
}

export function getUserById(userId) {
  return http.get(`${apiEndpoint}/get-user/${userId}`);
}

// For logout just nullify token in loaclstorage (token=null)

// Common for Google sign in and Sign up and this generates a link
export function googleAuth() {
  const query = queryString.stringify({
    client_id:
      "333534217481-vi5fkiks31acvki83rrkinnvn7aua4r9.apps.googleusercontent.com",
    redirect_uri: "https://dev.linkcollect.io/api/v1/user/google-auth", // Changes on production
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "), // space seperated string
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${query}`;
}
