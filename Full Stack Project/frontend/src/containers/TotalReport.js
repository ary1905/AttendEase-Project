import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './CSS/ReportGen/totalReport.css'

export default function TotalReport() {
  const [originalData, setOriginalData] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('access');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/accounts/api/get_student_total_report/`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      const data = response.data;
      setOriginalData(data)
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className='totalContainer'>
        <table className="noticesTable1" style={{ gridArea: 'notices-table' }}>
          <thead>
            <tr className='studDailyAttdTr'>
              <th className='studDailyAttdTh' style={{ width: '180px' }}>Student ID</th>
              <th className='studDailyAttdTh' style={{ width: '200px' }}>Student Name</th>
              <th className='studDailyAttdTh' style={{ width: '350px' }}>Subject</th>
              <th className='studDailyAttdTh'>Total Classes</th>
              <th className='studDailyAttdTh'>Classes Attended</th>
              <th className='studDailyAttdTh'>Attendance</th>
            </tr>
          </thead>
          <tbody className='studDailyAttdTBody'>
            {originalData.map(attendance => (
              <tr key={attendance.attendId} className='studDailyAttdTr'>
                <td className='studDailyAttdTd'>{attendance.student_id}</td>
                <td className='studDailyAttdTd'>{attendance.student_name}</td>
                <td className='studDailyAttdTd'>{attendance.subject}</td>
                <td className='studDailyAttdTd'>{attendance.total_class}</td>
                <td className='studDailyAttdTd'>{attendance.class_attend}</td>
                <td className='studDailyAttdTd'>{attendance.percent_attended}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
