import React, { useState, useRef, useEffect } from "react";
import {NavLink} from "react-router-dom";
import {styleLogo, styleNavLink} from "../../css/Nav.style";
import logo from '../../img/logo.svg';

const Nav = () => {
    const [show, setShow] = useState(false);
    const ref = useRef()

    useEffect(() => {
        const checkIfClickedOutside = e => {
            // Check If the menu is open and the clicked target is not within the menu, then close the menu
            if (show && ref.current && !ref.current.contains(e.target)) {
                setShow(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            // Remove event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [show])

    //Handle mobile menu button
    const handleMobile = ()=>{
        setShow(prevCheck => !prevCheck)
    }

    return (
        <nav ref={ref} className="navbar navbar-expand-lg bg-primary shadow justify-content-between bg-zebrands">
            <div className="container-fluid">
                <NavLink to="/" style={styleLogo}>
                    <img className='logo' src={logo} alt='logo'/>
                </NavLink>
                <button className="navbar-toggler" type="button" onClick={handleMobile}>
                    <i className="fa-solid fa-bars c-white"> </i>
                </button>
                <div className={`${show ? ' ': 'collapse'} navbar-collapse`}>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink to="/" style={styleNavLink}>Home</NavLink>
                        </li>
                        <div className="vr bg-white d-none d-lg-block"> </div>
                        <li className="nav-item">
                            <NavLink to="/users" style={styleNavLink}>users</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;