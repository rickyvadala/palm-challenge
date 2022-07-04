import logo from '../../assets/img/wallet-icon.svg'
import React, {ImgHTMLAttributes} from "react";


export const Logo: React.FC<ImgHTMLAttributes<any>> = (props) => {
    return (
        <img alt="Logo" {...props} src={logo}/>
    )
}