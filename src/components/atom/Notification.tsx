import {notification} from 'antd';

export type NotificationType = {
    message: string,
    description: string,
    type?: string
}
export const openNotification = ({
                                     type = "Error",
                                     message = 'Notification Title',
                                     description = 'This is the content of the notification.',
                                     ...props
                                 }: NotificationType) => {
    notification.open({
        message: message,
        description: description,
        ...props
    });
};