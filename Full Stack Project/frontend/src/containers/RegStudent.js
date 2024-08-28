import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import './CSS/RegisterStudent/regStud.css'
import { connect } from 'react-redux';
import { studentSignup } from '../actions/auth';

function RegStudent({ studentSignup, isAuthenticated }) {

    const [accountCreated, setAccountCreated] = useState(false);

    const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		phone_number: '',
		password: '',
		re_password: '',
		user_type: 'ST',
	});

    const { first_name, last_name, email, phone_number, password, re_password, user_type} = formData;
    
    const onChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    
    const onSubmit = e => {
		e.preventDefault();
		if (password === re_password) {
            studentSignup(first_name, last_name, email, phone_number, password, re_password, user_type);
            setAccountCreated(true);
		}
    };

    if (accountCreated) {
		return <Navigate to="/"></Navigate>
	}
    
    return (
        <div className='regStudPage'>
            <div className="regStudContainer">
                <div className="regStudContent" style={{ gridArea: 'regStudContent' }}>
                    <div className="regStudHead" style={{ gridArea: 'regStudHead' }}>
                        <div className="regStudHead1">
                            <h1 className='regStudHeadTxt1'>
                                Register Student for AttendEase
                            </h1>
                        </div>
                    </div>
                    <form onSubmit={e => onSubmit(e)} className='regStudIp my-4' style={{ gridArea: 'regStudIp' }}>

                        <div className="regStudIp1" style={{ gridArea: 'regStudIp1' }}>
                            <input type="text" name='first_name'
                                value={first_name} required className='regStudName'
                                onChange={e => onChange(e)} placeholder='FIRST NAME'
                            />
                        </div>

                        <div className="regStudIp2" style={{ gridArea: 'regStudIp2' }}>
                            <input type="text" name='last_name'
                                value={last_name} required className='regStudName'
                                onChange={e => onChange(e)} placeholder='LAST NAME'
                            />
                        </div>


                        <div className="regStudIp3" style={{ gridArea: 'regStudIp3' }}>
                            <input type="email" name="email" required className='regStudEmail' value={email}
                                onChange={e => onChange(e)} placeholder='EMAIL'
                            />
                        </div>


                        <div className="regStudIp4" style={{ gridArea: 'regStudIp4' }}>
                            <input type="text" name="phone_number" required className='regStudPhNum' value={phone_number}
                                onChange={e => onChange(e)} placeholder='PHONE NUMBER'
                            />
                        </div>


                        <div className="regStudIp5" style={{ gridArea: 'regStudIp5' }}>
                            <input type="password" name="password" required className='regStudPass' value={password}
                                onChange={e => onChange(e)} placeholder='PASSWORD'
                            />
                        </div>

                        <div className="regStudIp6" style={{ gridArea: 'regStudIp6' }}>
                            <input type="password" name="re_password" required className='regStudRePass' value={re_password}
                                onChange={e => onChange(e)} placeholder='CONFIRM PASSWORD'
                            />
                        </div>

                        <div className="regStudBtnCont" style={{gridArea:'regStudBtn'}}>
							<button className='regStudBtn1' type='submit'>Register</button>
						</div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { studentSignup })(RegStudent);