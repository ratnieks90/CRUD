import {NOTIFICATION_TYPE} from '../constants';

class Notification {
    constructor() {
        const notificationsContainer = document.createElement('ul');
        notificationsContainer.classList.add('notification-container');
        this.notificationsContainer = notificationsContainer;
        const body = document.querySelector('body');
        body.appendChild(this.notificationsContainer);
    }
    pushNotification(text, type) {
        this.notificationsContainer.appendChild(this.renderNotification(text, type));
    }
    renderNotification(text, type) {
        const notification = document.createElement('li');
        notification.classList.add(type === NOTIFICATION_TYPE.success ? 'success' : 'warning');
        notification.textContent = text;

        setTimeout(() => {notification.classList.add('visible')}, 300);
        setTimeout(() => {notification.remove()}, 3000);

        return notification;
    }
}

export default new Notification();