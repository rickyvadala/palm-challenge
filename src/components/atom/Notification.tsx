import {notification} from 'antd';

export type NotificationType = {
    message: string,
    description: string,
    type: string
}
export const openNotification = ({
                                     message = 'Notification Title',
                                     description = 'This is the content of the notification.',
                                     ...props
                                 }) => {
    notification.open({
        message: message,
        description: description,
        ...props
    });
};