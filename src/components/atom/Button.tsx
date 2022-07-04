import {Button as AntButton, ButtonProps as AntButtonProps} from "antd";
import React from "react";

type ButtonProps = AntButtonProps & { label?: string }

const Button: React.FC<ButtonProps> =
    ({label, type, style, ...props}) => {
        return (
            <AntButton type={type} style={style} {...props}>{label}</AntButton>
        )
    }

export default Button
