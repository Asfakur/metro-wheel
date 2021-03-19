import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div>
            <div className="header">
                <nav className="nav">
                    <ul>
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link className="btn-book" to="/book">Book</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Header;