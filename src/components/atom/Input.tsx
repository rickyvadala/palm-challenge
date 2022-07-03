import {Input as AntInput, InputProps} from 'antd';
import React from "react";

const Input: React.FC<InputProps> = ({placeholder, status, ...props}) => {
    return (
        <AntInput status={status} placeholder={placeholder} {...props}/>
    )
};

export default Input;
