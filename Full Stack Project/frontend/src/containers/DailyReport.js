import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './CSS/ReportGen/dailyReport.css';

export default function DailyReport() {
    const [studAttend, setStudAttend] = useState([]);
    const [originalData, setOriginalData] = useState([]);

    const [subjectSelected, setSubjectSelected] = useState("");

    const onSubjectChange = e => {
        const selectedSubject = e.target.value;
        setSubjectSelected(selectedSubject);
        if (selectedSubject === "") {
            setStudAttend(originalData);
        } else {
            const filteredData = originalData.filter(attendance => attendance.subject === selectedSubject);
            setStudAttend(filteredData);
        }
    };

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('access');
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/accounts/api/get_student_daily_report/`, {
                headers: {
                    Authorization: `JWT ${token}`,
                },
            });
            const data = response.data;
            setStudAttend(data);
            setOriginalData(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='dailyContainer'>
            <select className='studSubjectSelect' value={subjectSelected} onChange={onSubjectChange} style={{gridArea:'studSubjectSelect'}}>
                <option value="" disabled>Select Subject</option>
                <option value="CSE-3019 Distibuted Systems" className='subjectIpOp1'>CSE-3019 Distibuted Systems</option>
                <option value="CSE-3012 Parallel Computing" className='subjectIpOp1'>CSE-3012 Parallel Computing</option>
                <option value="HUM-1021 Engineering Economics" className='subjectIpOp1'>HUM-1021 Engineering Economics</option>
            </select>
            <table className="noticesTable1" style={{gridArea:'notices-table'}}>
                <thead>
                    <tr className='studDailyAttdTr'>
                        <th className='studDailyAttdTh' style={{width:'180px'}}>Student ID</th>
                        <th className='studDailyAttdTh' style={{width:'180px'}}>Student Name</th>
                        <th className='studDailyAttdTh' style={{width:'350px'}}>Subject</th>
                        <th className='studDailyAttdTh'>Date</th>
                        <th className='studDailyAttdTh'>Present</th>
                    </tr>
                </thead>
                <tbody className='studDailyAttdTBody'>
                    {studAttend.map(attendance => (
                        <tr key={attendance.attendId} className='studDailyAttdTr'>
                            <td className='studDailyAttdTd'>{attendance.student_id}</td>
                            <td className='studDailyAttdTd'>{attendance.student_name}</td>
                            <td className='studDailyAttdTd'>{attendance.subject}</td>
                            <td className='studDailyAttdTd'>{attendance.date}</td>
                            <td className='studDailyAttdTd'>{attendance.present}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
