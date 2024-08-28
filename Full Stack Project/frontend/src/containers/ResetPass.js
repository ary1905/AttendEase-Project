import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../actions/auth';
import './CSS/ResetPassword/resetPass.css'

function ResetPass({ reset_password }) {
  const [requestSent, setRequestSent] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
  });

  const { email } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    reset_password(email);
    setRequestSent(true);
  };

  if (requestSent) {
    return <Navigate to="/"></Navigate>
  }

  return (
    <div className='resetPasswordPage'>
      <div className="resetPasswordContainer">
        <div className="resetPasswordContent" style={{ gridArea: 'resetPasswordContent' }}>
          <div className="resetPasswordHead" style={{ gridArea: 'resetPasswordHead' }}>
            <div className="resetPasswordHead1">
              <h1 className='resetPasswordHeadTxt1'>
                Forgot Your Password
              </h1>
              <h5 className='resetPasswordHeadTxt2'>
                Reset Your Password.
              </h5>
            </div>
          </div>
          <form onSubmit={e => onSubmit(e)} className='my-4' style={{ gridArea: 'resetPasswordIp' }}>
            <div className="resetPasswordIp1" >
              <input type="email" id="email" name="email" required className='resetPasswordEmail' value={email}
                onChange={e => onChange(e)} placeholder='Email'
              />
            </div>
            <br />
            <div className="resetPasswordBtn my-3">
              <button className='resetPasswordBtn1' type='submit'>Reset Password</button>
            </div>
          </form>
          <div className="resetPasswordLink" style={{ gridArea: 'resetPasswordLink' }}>
            <p className='resetPasswordSubs'>Back To Login?</p>
            <Link className='resetPasswordBtn2' to='/login'>Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}


export default connect(null, { reset_password })(ResetPass);

