import React, { } from 'react';
import Content1 from './Content1/Content1.js';
import Content2 from './Content2/Content2.js';
import Content3 from './Content3/Content3.js';
import Content4 from './Content4/Content4.js';
import Content6 from './Content6/Content6.js';
import './Home.css';
import { connect } from 'react-redux';

const Home = ({ userType }) => {
  return (
    <div className='subHome'>
      {userType === 'FC' ? (
        <>
          <Content1 className="homeCon1" showAdd = {true}></Content1>
          <Content2 className="homeCon2"></Content2>
          <Content3 className="homeCon3"></Content3>
          <Content6 className="homeCon6" showCon6Content = {true}></Content6>
        </>
      ) : (
        <>
          <Content1 className="homeCon1" showAdd = {false} />
          <Content3 className="homeCon3" />
          <Content4 className="homeCon3" />
          <Content6 className="homeCon6" showCon6Content = {false}></Content6>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  userType: state.auth.userType
});

export default connect(mapStateToProps)(Home);
