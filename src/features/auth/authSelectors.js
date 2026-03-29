// Auth selectors
// This file extracts specific pieces of data from the Redux Auth State.

export const selectCurrentUser = (state) => state.auth.user;

export const selectIsAuthenticated = (state) => !!state.auth.user;

export const selectAuthLoading = (state) => state.auth.isLoading;

export const selectAuthError = (state) => state.auth.error;

export const selectIsAdmin = (state) => state.auth.user?.role === 'community_admin' || state.auth.user?.role === 'super_admin';

export const selectUnverifiedEmail = (state) => state.auth.unverifiedEmail;