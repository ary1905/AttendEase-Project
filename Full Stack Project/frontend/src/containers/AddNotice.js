import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './CSS/AddNotice/addNotice.css'

export default function AddNotice() {

    const [noticeTitle, setNoticeTitle] = useState('');
    const [noticeDesc, setNoticeDesc] = useState('');

    const handleNoticeTitleChange = (e) => {
        setNoticeTitle(e.target.value);
    }

    const handleNoticeDescChange = (e) => {
        setNoticeDesc(e.target.value);
    }

    const addNoticeEvent = async () => {
        try {
            const token = localStorage.getItem('access');
            await axios.post(`${process.env.REACT_APP_API_URL}/accounts/api/add_notice/`, {
                notice_title: noticeTitle,
                notice_desc: noticeDesc,
            },
                {
                    headers: {
                        Authorization: `JWT ${token}`,
                    },
                }
            );
        } catch (error) {
            console.error('Error adding Notice:', error);
        }
    }

    return (
        <div className='addNoticePage'>
            <div className="addNoticeContainer">
                <div className="addNoticeContent">
                    <div className="addNoticeHead" style={{ gridArea: 'addNoticeHead' }}>
                        <div className="addNoticeHead1">
                            <h1 className='headTxt1'>
                                Add Notice
                            </h1>
                        </div>
                    </div>
                    <div className='my-4' style={{ gridArea: 'addNoticeIp' }}>
                        <div className="addNoticeIp1" >
                            <input type="text" id="text" name="text" required className='addNoticeTitle' value={noticeTitle}
                                onChange={handleNoticeTitleChange} placeholder='Title'
                            />
                        </div>
                        <br />
                        <div className="addNoticeIp2">
                            <input type="text" id="desc" name="desc" required className='addNoticeDesc' value={noticeDesc}
                                onChange={handleNoticeDescChange} placeholder='Description'
                            />
                        </div>
                        <div className="addNoticeBtn my-5">
                            <Link to='/viewNotice' className='addNoticeBtn1' onClick={addNoticeEvent}>Add Notice</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
