import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../actions/auth';
import './CSS/ResetPasswordConfirm/reset_pass_confirm.css'

function ResetPassConfirm({ reset_password_confirm }) {
  const [requestSent, setRequestSent] = useState(false);

  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: '',
  });

  const { new_password, re_new_password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const routeParams = useParams();

  const onSubmit = e => {
    e.preventDefault();

    const uid = routeParams.uid;
    const token = routeParams.token;

    reset_password_confirm(uid, token, new_password, re_new_password);
    setRequestSent(true);
  };

  if (requestSent) {
    return <Navigate to="/login"></Navigate>
  }

  return (
    <div className='resetPasswordConfirmPage'>
      <div className="resetPasswordConfirmContainer">
        <div className="resetPasswordConfirmContent" style={{ gridArea: 'resetPasswordConfirmContent' }}>
          <div className="resetPasswordConfirmHead" style={{ gridArea: 'resetPasswordConfirmHead' }}>
            <div className="resetPasswordConfirmHead1">
              <h1 className='resetPasswordConfirmHeadTxt1'>
                Password Reset Confirmation
              </h1>
              <h5 className='resetPasswordConfirmHeadTxt2'>
                Reset Your Password.
              </h5>
            </div>
          </div>
          <form onSubmit={e => onSubmit(e)} className='my-4' style={{ gridArea: 'resetPasswordConfirmIp' }}>
            <div className="resetPasswordConfirmIp1" >
              <input type="password" id="new_password" name="new_password" required className='resetPasswordConfirmPassword' value={new_password}
                onChange={e => onChange(e)} placeholder='New Password'
              />
            </div>
            <div className="resetPasswordConfirmIp1" >
              <input type="password" id="re_new_password" name="re_new_password" required className='resetPasswordConfirmPassword' value={re_new_password}
                onChange={e => onChange(e)} placeholder='Confirm New Password'
              />
            </div>
            <br />
            <div className="resetPasswordConfirmBtn my-3">
              <button className='resetPasswordConfirmBtn1' type='submit'>Reset Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


export default connect(null, { reset_password_confirm })(ResetPassConfirm);

