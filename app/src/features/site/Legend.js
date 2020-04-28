import React from 'react';
import './Legend.css';
import {  Checkbox  } from 'antd';


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
                    onChange={() => props.setViewDriveIns(!props.viewDriveIns)} />
                </label>
                <span>
                    {' '}
                    Rodyti patikros punktus
                </span>
              </li>
              <li>
              <label>
                <Checkbox
                    name="showMarkers"
                    type="checkbox"
                    checked={props.viewMarkers} 
                    onChange={() => props.setViewMarkers(!props.viewMarkers)} />
                </label>
                <span>
                    {' '}
                    Rodyti nustatytus atvejus
                </span>
              </li>
          </ul>
      </div>
    </div>
  );
}
