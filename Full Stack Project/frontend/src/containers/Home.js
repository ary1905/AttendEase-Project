import React, { Fragment } from 'react';
import Lottie from 'lottie-react';
import animationData from './Animations/HomeAni.json';
import './CSS/Home/home.css'
import './CSS/Home/homeComp.css'
import { Link } from 'react-router-dom'
import HomeSVGComp1 from './SVG/HomeSVGComp1'
import HomeSVGComp2 from './SVG/HomeSVGComp2'
import HomeSVGComp3 from './SVG/HomeSVGComp3'
import HomeSVGComp4 from './SVG/HomeSVGComp4'
import { connect } from 'react-redux';
import HomeCont from './DashboardComp/Home'



const Home = ({ isAuthenticated, userType }) => {
  const guestHome = () => (
    <Fragment>
      <div className='homeCont'>
        <div className="homeHead">
          <h1 className='homeHeadComp'>Effortlessly Manage Attendance, Every Time</h1>
        </div>
        <div className="homeSub">
          <h6 className='homeSubComp'>Simplifying Tracking for Enhanced Efficiency and Productivity <br></br>Across Every Operation</h6>
        </div>
        <div className="homeBtns">
          <Link className="btn1 mx-5" to='/login'>Login</Link>
          <Link className="btn2 mx-5" to='/signup'>Sign Up</Link>
        </div>
        <div className="homePic">
          <Lottie
            animationData={animationData}
            loop
            autoplay
          />
        </div>

        <div className="homeComp1">
          <div className="Comp1Comp">
            <div className="Comp1Img" style={{ gridArea: 'Comp1Img' }}>
              <HomeSVGComp1 />
            </div>
            <div className="Comp1Head" style={{ gridArea: 'Comp1Head' }}>
              <p>10</p>
            </div>
            <div className="Comp1Sub" style={{ gridArea: 'Comp1Sub' }}>
              <p>Important</p>
            </div>
          </div>
        </div>

        <div className="homeComp2">
          <div className="Comp2Comp">
            <div className="Comp2Img" style={{ gridArea: 'Comp2Img' }}>
              <HomeSVGComp2 />
            </div>
            <div className="Comp2Head" style={{ gridArea: 'Comp2Head' }}>
              <p>8</p>
            </div>
            <div className="Comp2Sub" style={{ gridArea: 'Comp2Sub' }}>
              <p>Scheduled</p>
            </div>
          </div>
        </div>

        <div className="homeComp3">
          <div className="Comp3Comp">
            <div className="Comp3Img" style={{ gridArea: 'Comp3Img' }}>
              <HomeSVGComp3 />
            </div>
            <div className="Comp3Head" style={{ gridArea: 'Comp3Head' }}>
              <p>23</p>
            </div>
            <div className="Comp3Sub" style={{ gridArea: 'Comp3Sub' }}>
              <p>Students</p>
            </div>
          </div>
        </div>

        <div className="homeComp4">
          <div className="Comp4Comp">
            <div className="Comp4Img" style={{ gridArea: 'Comp4Img' }}>
              <HomeSVGComp4 />
            </div>
            <div className="Comp4Head" style={{ gridArea: 'Comp4Head' }}>
              <p>5</p>
            </div>
            <div className="Comp4Sub" style={{ gridArea: 'Comp4Sub' }}>
              <p>Today</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );

  const authHome = () => (
    <div>
      <div className='dashboard' style={{ backgroundColor: '#F0F0F0', height: '100vh' }}>
        <HomeCont className="home"></HomeCont>
      </div>
    </div>

  );

  return (
    <div>
      {isAuthenticated ? authHome() : guestHome() }
      {/* {isAuthenticated ? guestHome() : authHome() } */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userType: state.auth.userType
});

export default connect(mapStateToProps, { })(Home);

