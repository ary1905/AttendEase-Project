import React from 'react'
import './Content4.css'
import { Link } from 'react-router-dom';

export default function Content4() {
    return (
        <div className='con4' style={{ gridArea: 'con2' }} >
            <div className="con4Head" style={{ gridArea: 'con4Head' }}>
                <h3>Attendance Report</h3>
            </div>
            <div className="con4MainBody" style={{ gridArea: 'con4MainBody' }}>
                <div className="dailyReport" style={{ gridArea: 'dailyReport' }}>
                    <div className="ReportHead" style={{ gridArea: 'ReportHead' }}>
                        <h5>Generate Daily Attendance Report</h5>
                    </div>
                    <div className="ReportBtn" style={{ gridArea: 'ReportBtn' }}>
                        <Link to='/daily_report' className='ReportBtn1'>Generate</Link>
                    </div>
                </div>
                <div className="totalReport" style={{ gridArea: 'totalReport' }}>
                    <div className="ReportHead" style={{ gridArea: 'ReportHead' }}>
                        <h5>Generate Total Attendance Report</h5>
                    </div>
                    <div className="ReportBtn" style={{ gridArea: 'ReportBtn' }}>
                        <Link to='/total_report' className='ReportBtn1'>Generate</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
