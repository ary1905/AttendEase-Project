import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import './CSS/Login/login.css'


function Login({ login, isAuthenticated }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        loginType: '',
    });

    const [loginType, setloginType] = useState("");

    const { email, password } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onLoginTypeChange = e => {
        setloginType(e.target.value);
	};

    const onSubmit = e => {
        e.preventDefault();

        login(email, password);
    };


    if (isAuthenticated) {
        return <Navigate to="/"></Navigate>
    }

    return (
        <div className='loginPage'>
            <div className="loginContainer">
                <div className="loginContent" style={{ gridArea: 'loginContent' }}>
                    <div className="loginHead" style={{ gridArea: 'loginHead' }}>
                        <div className="loginHead1">
                            <h1 className='headTxt1'>
                                Login to AttendEase
                            </h1>
                            <h5 className='headTxt2'>
                                Empower Your Productivity.
                            </h5>
                        </div>
                    </div>
                    <form onSubmit={e => onSubmit(e)} className='my-4' style={{ gridArea: 'loginIp' }}>
                        <div className="loginIp1" >
                            <input type="email" id="email" name="email" required className='loginEmail' value={email}
                                onChange={e => onChange(e)} placeholder='Email'
                            />
                        </div>
                        <br />
                        <div className="loginIp2">
                            <input type="password" id="password" name="password" required className='loginPass' value={password}
                                onChange={e => onChange(e)} placeholder='Password'
                            />
                        </div>
                        <div className='loginIp3'>
                            <select className='loginSelect' value={loginType} onChange={onLoginTypeChange}>
                                <option value="" disabled>Select Login Type</option>
                                <option value="Faculty" className='loginIp3Op2'>Faculty</option>
                                <option value="Student" className='loginIp3Op1'>Student</option>
                            </select>
                        </div>
                        <div className="loginBtn my-5">
                            <button className='loginBtn1' type='submit'>Login</button>
                        </div>
                    </form>

                    <div className="loginLink1" style={{ gridArea: 'loginLink1' }}>
                        <p className='loginSubs'>Don't have an Account?</p>
                        <Link className='loginBtn2' to='/signup'>Sign Up</Link>
                    </div>

                    <div className="loginLink2" style={{ gridArea: 'loginLink2' }}>
                        <p className='loginSubs'>Forgot Your Password?</p>
                        <Link className='loginBtn2' to='/reset-password'>Reset Your Password</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
