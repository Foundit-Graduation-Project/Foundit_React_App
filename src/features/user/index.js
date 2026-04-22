// User exports

// 1. Export the Reducer (Used in store)
import userReducer from "./userSlice";
export default userReducer;

// 2. Export Actions & Thunks
export * from "./userSlice";

// 3. Export Selectors
export * from "./userSelectors";

// 4. Export APIs (optional but clean for reuse)
export * from "./userAPI";
