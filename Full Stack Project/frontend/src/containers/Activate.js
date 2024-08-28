import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';
import './CSS/Activate/activate.css';


function Activate({ verify }) {
	const [verified, setverified] = useState(false);

	const routeParams = useParams();

	const verify_account = e => {
		const uid = routeParams.uid;
		const token = routeParams.token;

		verify(uid, token);
		setverified(true);
	};

	if (verified) {
		return <Navigate to="/login"></Navigate>
	}

	return (
		<div className='activatePage'>
			<div className="activateContainer">
				<div className="activateContent" style={{ gridArea: 'activateContent' }}>
					<div className="activateHead" style={{ gridArea: 'activateHead' }}>
						<h1 className='activateHeadText1'>Verify Your Account</h1>
					</div>
					<div className="activateBtn" style={{ gridArea: 'activateBtn' }}>
						<button className='activateBtn1' onClick={verify_account}>Verify & Activate</button>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { verify })(Activate);
