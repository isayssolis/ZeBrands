import React, { useState } from "react";
import logo from '../../img/logo.svg';

const Nav = () => {
    const [show, setShow] = useState(false);

    const handleMobile = ()=>{
        setShow(prevCheck => !prevCheck)
    }


    return (
        <nav className="navbar navbar-expand-lg bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"> <img className='logo' src={logo}/> </a>
                <button className="navbar-toggler" type="button" onClick={handleMobile}>
                    <i className="fa-solid fa-bars c-white"></i>
                </button>
                <div className={`${show ? ' ': 'collapse'} navbar-collapse`}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Search users</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Search repositories </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;