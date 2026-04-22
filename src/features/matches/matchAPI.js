// Your axios instance

import api from "../../services/axios";


/**
 * Match API Service
 * Facilitates communication with the backend Matching Engine.
 */
export const matchAPI = {
  /**
   * Triggers the matching algorithm for a specific report.
   * POST /match/:reportId
   */
  findMatchesForReport: async (reportId) => {
    const response = await api.post(`/match/${reportId}`);
    return response.data; // Returns the matchesCreated array
  },

  /**
   * Fetches all matches related to the logged-in user.
   * GET /match/my-matches
   */
  getMyMatches: async () => {
    const response = await api.get('/match/my-matches');
    return response.data; 
  },

  /**
   * Accepts a proposed match. If both parties accept, status becomes 'ACCEPTED'.
   * PATCH /match/accept/:matchId
   */
  acceptMatch: async (matchId) => {
    const response = await api.patch(`/match/accept/${matchId}`);
    return response.data;
  },

  /**
   * Rejects a proposed match.
   * PATCH /match/reject/:matchId
   */
  rejectMatch: async (matchId) => {
    const response = await api.patch(`/match/reject/${matchId}`);
    return response.data;
  },

  /**
   * Resolves an accepted match and marks items retrieved securely.
   * PATCH /match/resolve/:matchId
   */
  resolveMatch: async (matchId) => {
    const response = await api.patch(`/match/resolve/${matchId}`);
    return response.data;
  }
};