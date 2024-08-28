import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './CSS/Navbar1.css';
import { logout } from '../actions/auth';
import { connect } from 'react-redux';


const Navbar = ({ logout, isAuthenticated }) => {

    const guestLinks = () => (
        <Fragment>
            <li className="nav-item">
                <Link
                    className={`nav-link`}
                    to="/login"
                >
                    Login
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className={`nav-link`}
                    to="/signup"
                >
                    SignUp
                </Link>
            </li>
        </Fragment>
    );

    const authLinks = () => (
        <Fragment>
        <li className="nav-item">
            <Link
                className={`nav-link`}
                to='/'
                onClick={() => {
                    logout();
                }}
            >
                Logout
            </Link>
        </li>
        </Fragment>

    );

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light">
                <Link className="navbar-brand" to="/"></Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link
                                className={`nav-link`}
                                to="/"
                            >
                                Home
                            </Link>
                        </li>
                        {isAuthenticated ? authLinks() : guestLinks()}
                    </ul>
                </div>
            </nav>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);