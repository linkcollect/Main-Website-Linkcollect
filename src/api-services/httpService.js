import axios from "axios";

// For server internal error handling status-code(500)
axios.interceptors.response.use(null, (error) => {
  console.log(error)
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("An unexpected error occured");
  }

  return Promise.reject(error);
});

// ----------- Setting JWT token on every request ------------ //
export function setJwtInRequestHeader(jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  // console.log(jwt, "hey")
}

// Please use http.get,post....instead of using axios everywhere
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
