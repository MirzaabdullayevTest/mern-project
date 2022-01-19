import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()  // redirect f-ya bajarilgandan keyin

    const logoutHandler = (e) => {
        e.preventDefault()
        auth.logout()
        navigate('/')
    }

    return (
        <nav>
            <div className="nav-wrapper darken-1 blue" style={{ padding: '0 32px' }}>
                <span href="/" className="brand-logo">Generate Links</span>

                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to={'/create'} >Create</Link></li>
                    <li> <Link to={'/links'} >Links</Link></li>
                    <li><a href="/" onClick={logoutHandler}>Logout</a></li>
                </ul>
            </div>
        </nav >
    );
};
