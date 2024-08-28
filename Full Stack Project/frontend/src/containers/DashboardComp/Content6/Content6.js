import React from 'react';
import './Content6.css'
import { Link } from 'react-router-dom';
import animationData from '../../Animations/studAnimation.json'
import Lottie from 'lottie-react';

export default function Content6(props) {
  return (
    <>
      {
        props.showCon6Content === true ?
          (
            <>
              <div className='con6_1' style={{ gridArea: 'con6' }}>
                <div className="registerStudent" style={{ gridArea: 'registerStudent' }}>
                  <Link to='/regStudent' className='regStudBtn'>Register Student</Link>
                </div>
                <div className="addStudent" style={{ gridArea: 'addStudent' }}>
                  <Link to='/addStudent' className='addStudBtn'>Add Student</Link>
                </div>
              </div>
            </>
          )

          :

          (
            <div className='con6_2' style={{ gridArea: 'con6' }}>
              <Lottie
                animationData={animationData}
                loop
                autoplay
              />
            </div>
          )
      }
    </>
  )
}
