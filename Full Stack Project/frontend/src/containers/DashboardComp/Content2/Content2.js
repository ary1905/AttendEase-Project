import React, { useEffect, useState } from 'react';
import './Content2.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Content2() {

  const [subjects, setSubjects] = useState([]);
  const [email, setEmail] = useState();
  const [subjectSelected, setSubjectSelected] = useState("");

  const onSubjectChange = e => {
    setSubjectSelected(e.target.value);
  };

  const fetchEmail = async () => {
    try {
      const token = localStorage.getItem('access');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/accounts/api/get_email/`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      setEmail(response.data.email);
    } catch (error) {
      console.error('Error fetching email:', error);
    }
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

  const addSubject = async () => {
    try {
      const token = localStorage.getItem('access');
      await axios.post(`${process.env.REACT_APP_API_URL}/accounts/api/add_subject/`, {
        email,
        subject_selected: subjectSelected,
      },
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      fetchSubjects();
    } catch (error) {
      console.error('Error adding Subject:', error);
    }
  }

  useEffect(() => {
    fetchEmail();
    fetchSubjects();
  }, []);

  return (
    <div className="con2" style={{ gridArea: 'con2' }}>
      {subjects.length === 0 ? (
        <div className="con2Subject" style={{ gridArea: 'con2Subject' }}>
          <div className="con2SubjectHead">
            <h3>No Subjects Added Currently</h3>
          </div>
          <div className="con2SubjectButton my-5">
            <form className='con2SubjectIp'>
              <select className='subjectSelect' value={subjectSelected} onChange={onSubjectChange} style={{ gridArea: 'subjectSelect' }}>
                <option value="" disabled>Select Subject</option>
                <option value="CSE-3019 Distibuted Systems" className='subjectIpOp1'>CSE-3019 Distibuted Systems</option>
                <option value="CSE-3012 Parallel Computing" className='subjectIpOp1'>CSE-3012 Parallel Computing</option>
                <option value="HUM-1021 Engineering Economics" className='subjectIpOp1'>HUM-1021 Engineering Economics</option>
              </select>
              <div className="con2SubjectBtn2" style={{ gridArea: 'con2SubjectBtn2' }}>
                <Link className='subjectBtn1' type='submit' onClick={addSubject}>+</Link>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="con2Subject1" style={{ gridArea: 'con2Subject' }}>
          <div className="con2SubjectInner">
            <div className="con2SubjectHead" style={{ gridArea: 'con2SubjectHead' }}>
              <h2>My Subjects</h2>
            </div>
            <div className='con2SubjectList' style={{ gridArea: 'con2SubjectList' }}>
              {subjects.map((subject, index) => (
                <div key={index}>
                  <p>{index + 1}. {subject}</p>
                </div>
              ))}
            </div>
            <div className="con2SubjectButton my-5">
              <form className='con2SubjectIp'>
                <select className='subjectSelect' value={subjectSelected} onChange={onSubjectChange} style={{ gridArea: 'subjectSelect' }}>
                  <option value="" disabled>Select Subject</option>
                  <option value="Distributed_System" className='subjectIpOp1'>CSE-3019 Distibuted Systems</option>
                  <option value="Parallel_Computing" className='subjectIpOp1'>CSE-3012 Parallel Computing</option>
                  <option value="Engg_Economics" className='subjectIpOp1'>HUM-1021 Engineering Economics</option>
                </select>
                <div className="con2SubjectBtn2" style={{ gridArea: 'con2SubjectBtn2' }}>
                  <Link className='subjectBtn1' type='submit' onClick={addSubject}>+</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="con2UpdateAttendace" style={{ gridArea: 'con2UpdateAttendace' }}>
        <div className="con2UpdAttendanceHead">
          <h3>Update Attendance</h3>
        </div>
        <div className="con2UpdAttendanceButton">
          <Link to='/update_attendance' className='UpdAttendanceBtn1' >Update</Link>
        </div>
      </div>
    </div>
  );


}
