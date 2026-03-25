// Notifications selectors
// Get the array of notifications
export const selectAllNotifications = (state) => state.notifications.items;

// Get the unread count (For the Red Dot on the Bell Icon)
export const selectUnreadCount = (state) => state.notifications.unreadCount;

// Loading & Error states
export const selectNotificationsLoading = (state) => state.notifications.isLoading;
export const selectNotificationsError = (state) => state.notifications.error;
export const selectHasMoreNotifications = (state) => state.notifications.hasMore;
export const selectCurrentPage = (state) => state.notifications.currentPage;
export const selectIsFetchingMore = (state) => state.notifications.isFetchingMore;