import http from "./httpService";
import api from "./apiConfig.json";

const apiEndpoint = api.baseUrl + "/collections";

export function createTimeline(collectionId, timeline) {
  return http.post(`${apiEndpoint}/${collectionId}/timelines`, timeline);
}

export function updateTimeline(collectionId, timelineId, timeline) {
  return http.patch(
    `${apiEndpoint}/${collectionId}/timelines/${timelineId}`,
    timeline
  );
}

export function deleteTimeline(collectionId, timelineId) {
  return http.delete(`${apiEndpoint}/${collectionId}/timelines/${timelineId}`);
}

// ---------------------------------- SPECIAL ROUTE -------------------------------------- //

// for multiple timelines/links creation from left click
export function createMultipleTimelines(collectionId, timelinesArray) {
  return http.post(`${apiEndpoint}/${collectionId}/timelines/create-multiple`, timelinesArray);
}