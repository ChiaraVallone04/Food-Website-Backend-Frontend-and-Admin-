import React, { useState, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const { token, logout } = useContext(StoreContext); 

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    return (
        <div className='navbar'>
            <Link to='/'>
                <img src={assets.logo} alt='logo' className='logo' />
            </Link>
            <ul className='navbar-menu'>
                <li>
                    <Link
                        to='/'
                        onClick={() => setMenu("home")}
                        className={menu === "home" ? "active" : ""}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <a
                        href='#explore-menu'
                        onClick={() => setMenu("menu")}
                        className={menu === "menu" ? "active" : ""}
                    >
                        Menu
                    </a>
                </li>
                <li>
                    <a
                        href='#app-download'
                        onClick={() => setMenu("mobile-app")}
                        className={menu === "mobile-app" ? "active" : ""}
                    >
                        Mobile App
                    </a>
                </li>
                <li>
                    <a
                        href='#footer'
                        onClick={() => setMenu("contact-us")}
                        className={menu === "contact-us" ? "active" : ""}
                    >
                        Contact Us
                    </a>
                </li>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt='search icon' className='search-icon' />
                <Link to='/cart'>
                    <img src={assets.basket_icon} alt='basket icon' className='basket-icon' />
                </Link>
                {!token ? (
                    <button onClick={() => setShowLogin(true)} className='signin-button'>
                        Sign In
                    </button>
                ) : (
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt='profile icon' />
                        <ul className='nav-profile-dropdown'>
                            <li onClick={()=>navigate('/myorders')}>
                                <Link to='/orders'>
                                    <img src={assets.bag_icon} alt='bag icon' />
                                    Orders
                                </Link>
                            </li>
                            <hr />
                            <li onClick={handleLogout}>
                                <img src={assets.logout_icon} alt='logout icon' />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
