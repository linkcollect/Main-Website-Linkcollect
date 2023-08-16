import http from "./httpService";
import api from "./apiConfig.json";

const apiEndpoint = api.baseUrl + "/collections";

const boundary = "---------------------------" + Date.now().toString(16);

// With Timelines
export function getAllCollections() {
  return http.get(`${apiEndpoint}/`);
}

// With Timelines
export function getCollection(collectionId) {
  return http.get(`${apiEndpoint}/${collectionId}`);
}

export function createCollection(collectionData) {
  return http.post(`${apiEndpoint}`, collectionData);
}

export function updateCollection(collectionId, collectionData) {
  return http.patch(`${apiEndpoint}/${collectionId}`, collectionData);
}

export function deleteCollection(collectionId) {
  return http.delete(`${apiEndpoint}/${collectionId}`);
}

// Special API call
// Without timelines
export function getAllCollectionsWithoutTimelines() {
  return http.get(`${apiEndpoint}/without-timelines`);
}

export function getAllByUsername(username) {
  return http.get(`${apiEndpoint}/user/${username}`);
}

export function checkLinkExist(collectionId, link) {
  return http.post(`${apiEndpoint}/${collectionId}/check-duplicate-link`, { link });
}

export function getExplore(page = 1, pageSize = 20) {
  return http.get(`${apiEndpoint}/page/explore`,{params: {
    page,
    pageSize
  }});
}


export function getSearch(queryFor,page=1,pageSize=20){
  return http.get(`${apiEndpoint}/explore/search`,{ params:{  
    queryFor,
    page,
    pageSize
  }
  })
}

export function upvoteCollection(id){
  return http.post(`${apiEndpoint}/${id}/upvote`);
}

export function downvoteCollection(id){
  return http.post(`${apiEndpoint}/${id}/downvote`);
}

export function getSavedCollection(userId){
  return http.get(`${apiEndpoint}/${userId}/getsaved`);
}

export function saveCollection(id){
  return http.post(`${apiEndpoint}/${id}/save`)
}

export function unsaveCollection(id){
  return http.post(`${apiEndpoint}/${id}/unsave`)
}

