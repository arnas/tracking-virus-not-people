import React from 'react';
import './Legend.css';
import {Checkbox} from 'antd';
import plus from '../../plus.svg';
import caseImg from '../../case.jpg';


export function Legend(props) {
    return (
        <div className="legend">
            <div className="legend_contents_big">
                <ul style={{listStyle: "none"}}>
                    <li>
                        <label>
                            <Checkbox
                                name="showDriveIns"
                                type="checkbox"
                                checked={props.viewDriveIns}
                                onChange={() => props.setViewDriveIns(!props.viewDriveIns)}/>
                        </label>
                        <span>{' '}Rodyti patikros punktus</span>
                        <img src={plus} alt="" height={24} className="legend-img" />
                    </li>
                    <li>
                        <label>
                            <Checkbox
                                name="showMarkers"
                                type="checkbox"
                                checked={props.viewMarkers}
                                onChange={() => props.setViewMarkers(!props.viewMarkers)}/>
                        </label>
                        <span>{' '}Rodyti nustatytus atvejus</span>
                        <img src={caseImg} alt="" height={24} className="legend-img" />
                    </li>
                </ul>
            </div>
        </div>
    );
}
