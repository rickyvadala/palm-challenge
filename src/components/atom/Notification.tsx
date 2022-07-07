import {notification} from 'antd';
import {IconType} from "antd/lib/notification";

export type NotificationType = {
    message?: string,
    description?: string,
    type?: IconType | undefined
}
export const openNotification = ({
                                     type = "error",
                                     message = 'Error',
                                     description = 'Something happened :(',
                                     ...props
                                 }: NotificationType) => {
    notification.open({
        message: message,
        description: description,
        type: type,
        ...props
    });
};