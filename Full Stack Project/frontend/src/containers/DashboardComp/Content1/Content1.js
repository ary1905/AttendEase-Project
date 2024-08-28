import React, { useEffect, useState } from 'react';
import './Content1.css';
import axios from 'axios';
import viewBtn from '../../Images/viewBtn.png'
import { Link } from 'react-router-dom';

export default function Content1(props) {
  const [firstName, setFirstName] = useState('');
  const [notices, setNotices] = useState([]);

  const topNotices = notices.length > 4 ? notices.slice(0, 4) : notices;

  const fetchFirstName = async () => {
    try {
      const token = localStorage.getItem('access');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/accounts/api/get_first_name/`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });

      setFirstName(response.data.first_name);
    } catch (error) {
      console.error('Error fetching first name:', error);
    }
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('access');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/accounts/api/get_notices/`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      const data = response.data;
      setNotices(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchFirstName();
    fetchData();
  }, []);

  return (
    <>
      <div className="con1" style={{ gridArea: 'con1' }}>
        <div className="con1Head">
          <div className="con1HeadText">
            <h1 className='con1_heading1'>Good Day, {firstName}</h1>
            <h5 className='con1_heading5'>Let's synchronize attendance with ease!</h5>
          </div>
        </div>
        <div className="con1Main">
          <div className="con1MainHead">
            <h2 className='con1MainHeadH2'>Notice Board</h2>
            {
              props.showAdd === true ? (
                <Link className='noticeBtn1' to='/addNotice'>+</Link>
              )
                :
                (
                  <></>
                )
            }
          </div>
          <div className="con1MainForm">
            <ul className="notices-list">
              {topNotices.map((notice, index) => (
                <li key={notice.noticesId} className="notice-item">
                  <div className="notice-column">{notice.notice_id}</div>
                  <div className="notice-column">{notice.notice_title}</div>
                  <div className="notice-column">
                    <Link to='/viewNotice'><img src={viewBtn} alt="viewButton" style={{ width: '30px', height: '30px' }} /></Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
