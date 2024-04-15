export const unreadNotifications = (notifications) => {
    return notifications.filter( (n) => n.isRead === false );
}