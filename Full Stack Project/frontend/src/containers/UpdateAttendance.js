import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CSS/UpdateAttendance/updateAttend.css'

export default function UpdateAttendance() {
  const [students, setStudents] = useState([]);
  const [subject, setSubject] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [dateSet, setDateSet] = useState('');
  const [subjects, setSubjects] = useState([]);

  const navigate = useNavigate();

  const onSubjectChange = (e) => {
    setSubject(e.target.value);
    setShowTable(true);
  };

  const onDateChange = (e) => {
    setDateSet(e.target.value);
  }

  const fetchSubjects = async () => {
    try {
      const token = localStorage.getItem('access');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/accounts/api/get_subjects/`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      setSubjects(response.data.subjects);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  }

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('access');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/accounts/api/get_added_student_list/`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
        params: { subject: subject }
      });
      const data = response.data.filter((student) => student.user_type === 'ST');
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('access');
      const updatedAttendance = students.map(student => ({
        student_id: student.student_id,
        checked: selectedStudents.includes(student.student_id)
      }));

      await axios.post(
        `${process.env.REACT_APP_API_URL}/accounts/api/update_student_attendace/`,
        {
          attendance: updatedAttendance,
          subject_selected: subject,
          class_held_date: dateSet
        },
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCheckboxChange = (studentId) => {
    setSelectedStudents((prevSelectedStudents) => {
      if (prevSelectedStudents.includes(studentId)) {
        return prevSelectedStudents.filter((id) => id !== studentId);
      } else {
        return [...prevSelectedStudents, studentId];
      }
    });
  };

  useEffect(() => {
    if (subject) {
      fetchData();
    }
    fetchSubjects()
  }, [subject]);

  return (
    <div>
      <div className="AddStudentMainForm">
        <form onSubmit={handleSubmit}>
          <select className='updAttendSelect1' value={subject} onChange={onSubjectChange}>
            <option value="" disabled>Select Subject</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject} className='updAttendIpOp1'>{subject}</option>
            ))}
          </select>
          <input type="date" className='updAttendSelect1 my-4' value={dateSet} onChange={onDateChange} />
          {showTable && (
            <table className="student-table">
              <thead>
                <tr className='updAttendTr'>
                  <th className='updAttendTh'>Student ID</th>
                  <th className='updAttendTh'>Student Name</th>
                  <th className='updAttendTh'>Present</th>
                </tr>
              </thead>
              <tbody className='updAttendTBody'>
                {students.map((student, index) => (
                  <tr key={student.studentId} className='updAttendTr'>
                    <td className='updAttendTd'>{student.student_id}</td>
                    <td className='updAttendTd'>{student.student_first_name} {student.student_last_name}</td>
                    <td className='updAttendTd'>
                      <input
                        type="checkbox"
                        className="ui-checkbox"
                        checked={selectedStudents.includes(student.student_id)}
                        onChange={() => handleCheckboxChange(student.student_id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {showTable && (
            <button className='updAttendBtn1' type='submit'>Update Attendance</button>
          )}
        </form>
      </div>
    </div>
  )
}
