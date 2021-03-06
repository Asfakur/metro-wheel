import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';

const Header = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div>
            <div className="nav navbar navbar-dark bg-primary">
                <nav className="nav">
                    <ul>
                        <li>
                            <Link to="/home">Metro-Wheel</Link>
                        </li>
                        <li>
                            <Link to="/destination">Destination</Link>
                        </li>

                        <li>
                            <Link to="/login">{loggedInUser.name ? loggedInUser.name : 'Login'}</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Header;