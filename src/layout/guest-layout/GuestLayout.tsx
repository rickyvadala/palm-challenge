import {Outlet} from "react-router-dom";
import './GuestLayout.scss'
import {Logo} from "../../components/atom/Logo";

export const GuestLayout = () => {
    return (
        <div className="guest-layout">
            <div className={"guest-layout__card"}>
                <Logo className={"guest-layout__logo"}/>
                <Outlet/>
            </div>
        </div>
    )
}