// Auth exports
// 1. Export the Reducer (Used in src/store/store.js)
import authReducer from './authSlice';
export default authReducer;

// 2. Export Actions & Thunks (From authSlice)
export * from './authSlice';

// 3. Export Selectors (From authSelectors)
export * from './authSelectors';

// 4. Export APIs (Optional, usually Thunks handle this, but good to have)
export * from './authAPI';