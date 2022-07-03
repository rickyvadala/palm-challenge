import {Alert as AntAlert, AlertProps} from "antd";
import React from "react";

export const Alert: React.FC<AlertProps> =
    ({
         type = 'error',
         message = "Error",
         description = "This is an error",
         ...props
     }) => {
        return (
            <AntAlert
                {...props}
                type={type}
                message={message}
                description={description}
                showIcon
            />
        )
    }