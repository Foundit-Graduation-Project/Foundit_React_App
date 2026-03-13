// Auth selectors
// This file extracts specific pieces of data from the Redux Auth State.

// 1. Get the full user object (Name, Email, Avatar, Credits, etc.)
export const selectCurrentUser = (state) => state.auth.user;

// 2. Check if the user is logged in (Returns true/false)
// Very useful for ProtectedRoutes!
export const selectIsAuthenticated = (state) => !!state.auth.user;

// 3. Get the loading state (For spinners on buttons)
export const selectAuthLoading = (state) => state.auth.isLoading;

// 4. Get any auth errors (To show toast notifications)
export const selectAuthError = (state) => state.auth.error;

// 5. Get specific user roles (Useful for Admin Dashboards later)
export const selectIsAdmin = (state) => state.auth.user?.role === 'community_admin' || state.auth.user?.role === 'super_admin';