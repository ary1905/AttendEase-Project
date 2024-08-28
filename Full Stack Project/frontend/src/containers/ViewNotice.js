import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/ViewNotice/viewNotice.css'

export default function ViewNotice() {
  const [notices, setNotices] = useState([]);

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
    fetchData();
  }, []);

  return (
    <div className="con1MainForm">
      <table className="notices-table">
        <thead>
          <tr className='viewNoticeTr'>
            <th className='viewNoticeTh'>Notice ID</th>
            <th className='viewNoticeTh'>Notice Title</th>
          </tr>
        </thead>
        <tbody className='viewNoticeTBody'>
          {notices.map(notice => (
            <tr key={notice.noticesId} className='viewNoticeTr'>
              <td className='viewNoticeTd'>{notice.notice_id}</td>
              <td className='viewNoticeTd'>{notice.notice_title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
  
}
