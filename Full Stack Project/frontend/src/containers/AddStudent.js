import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/AddStudent/addStud.css';
import './CSS/AddStudent/checkBox.css';
import { useNavigate } from 'react-router-dom';

export default function AddStudent() {
  const [students, setStudents] = useState([]);
  const [subject, setSubject] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [subjects, setSubjects] = useState([]);

  const navigate = useNavigate();

  const onSubjectChange = (e) => {
    setSubject(e.target.value);
    setShowTable(true);
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('access');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/accounts/api/get_students/`, {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('access');
      await axios.post(
        `${process.env.REACT_APP_API_URL}/accounts/api/add_faculty_student/`,
        {
          student_ids: selectedStudents,
          subject_selected: subject,
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
    <div className="AddStudentMainForm">
      <form onSubmit={handleSubmit}>
        <select className='subjectSelect1' style={{ gridArea: 'subjectSelect' }} value={subject} onChange={onSubjectChange}>
          <option value="" disabled>Select Subject</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject} className='updAttendIpOp1'>{subject}</option>
          ))}
        </select>
        {showTable && (
          <table className="student-table">
            <thead>
              <tr className='viewStudTr'>
                <th className='viewStudTh'>Student ID</th>
                <th className='viewStudTh'>Student Name</th>
                <th className='viewStudTh'>Select</th>
              </tr>
            </thead>
            <tbody className='viewStudTBody'>
              {students.map((student, index) => (
                <tr key={student.studentId} className='viewStudTr'>
                  <td className='viewStudTd'>{student.student_id}</td>
                  <td className='viewStudTd'>{student.student_first_name} {student.student_last_name}</td>
                  <td className='viewStudTd'>
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
          <button className='addStudBtn1' type='submit'>Add</button>
        )}
      </form>
    </div>
  );
}
