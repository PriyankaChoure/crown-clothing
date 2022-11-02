import { Link, Outlet } from "react-router-dom";
import { Fragment } from "react";
import { ReactComponent as CrownLogo  } from "../../assest/crown.svg";

import './navigation.style.scss';
const Navigation = () =>{

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <div><CrownLogo/></div>
                
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop' >SHOP</Link>
                    <Link className="nav-link" to='/auth' >SIGN IN</Link>
                </div>
                
            </div>
            <Outlet/>
        </Fragment>
    )
}
export default Navigation;