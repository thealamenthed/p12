import {api, USE_MOCK} from "./client";
import {mockUser, mockActivity, mockSessions, mockPerformance} from "./__mocks__/user";

export async function getUser(id) {
  if (USE_MOCK) return mockUser(id);
  return api.get(`/user/${id}`);
}

export async function getUserActivity(id) {
  if (USE_MOCK) return mockActivity;
  return api.get(`/user/${id}/activity`);
}

export async function getUserSessions(id) {
  if (USE_MOCK) return mockSessions;
  return api.get(`/user/${id}/average-sessions`);
}

export async function getUserPerformance(id) {
  if (USE_MOCK) return mockPerformance;
  return api.get(`/user/${id}/performance`);
}
