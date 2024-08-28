import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import './CSS/SignUp/signUp.css';

function SignUp({ signup, isAuthenticated }) {
	const [accountCreated, setAccountCreated] = useState(false);
	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		phone_number: '',
		password: '',
		re_password: '',
		user_type: 'FC',
	});

	const { first_name, last_name, email, phone_number, password, re_password, user_type} = formData;

	const onChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	const onSubmit = e => {
		e.preventDefault();
		if (password === re_password) {
			signup(first_name, last_name, email, phone_number, password, re_password, user_type);
			setAccountCreated(true);
		}
	};

	if (accountCreated) {
		return <Navigate to="/login"></Navigate>
	}

	return (
		<div className='signUpPage'>
			<div className="signUpContainer">
				<div className="signUpContent" style={{ gridArea: 'signUpContent' }}>
					<div className="signUpHead" style={{ gridArea: 'signUpHead' }}>
						<div className="signUpHead1">
							<h1 className='signUpHeadTxt1'>
								Sign Up for AttendEase
							</h1>
							<h5 className='signUpHeadTxt2'>
								Create an Account.
							</h5>
						</div>
					</div>
					<form onSubmit={e => onSubmit(e)} className='signUpIp my-4' style={{ gridArea: 'signUpIp' }}>
						
						<div className="signUpIp1" style={{gridArea:'signUpIp1'}}>
							<input type="text" name='first_name'
								value={first_name} required className='signUpName'
								onChange={e => onChange(e)} placeholder='FIRST NAME'
							/>
						</div>

						<div className="signUpIp2" style={{gridArea:'signUpIp2'}}>
							<input type="text" name='last_name'
								value={last_name} required className='signUpName'
								onChange={e => onChange(e)} placeholder='LAST NAME'
							/>
						</div>


						<div className="signUpIp3" style={{gridArea:'signUpIp3'}}>
							<input type="email" name="email" required className='signUpEmail' value={email}
								onChange={e => onChange(e)} placeholder='EMAIL'
							/>
						</div>


						<div className="signUpIp4" style={{gridArea:'signUpIp4'}}>
							<input type="text" name="phone_number" required className='signUpPhNum' value={phone_number}
								onChange={e => onChange(e)} placeholder='PHONE NUMBER'
							/>
						</div>

						
						<div className="signUpIp5" style={{gridArea:'signUpIp5'}}>
							<input type="password" name="password" required className='signUpPass' value={password}
								onChange={e => onChange(e)} placeholder='PASSWORD'
							/>
						</div>


						<div className="signUpIp6" style={{gridArea:'signUpIp6'}}>
							<input type="password" name="re_password" required className='signUpRePass' value={re_password}
								onChange={e => onChange(e)} placeholder='CONFIRM PASSWORD'
							/>
						</div>

						<br />
						
						<div className="signUpBtn" style={{gridArea:'signUpBtn'}}>
							<button className='signUpBtn1' type='submit'>Register</button>
						</div>
					</form>

					<div className="signUpLink1" style={{ gridArea: 'signUpLink1' }}>
						<p className='signUpSubs'>Already have an Account?</p>
						<Link className='signUpBtn2' to='/login'>Login</Link>
					</div>

				</div>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(SignUp);
