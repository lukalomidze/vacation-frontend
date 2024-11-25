import { useState } from 'react'

import './Employee.css'

export default function ExpandableEmployee({ employee }) {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const { firstName, lastName, email, gender, vacations } = employee;

    const changeVacationStatus = async (event, id) => {
        await fetch('http://127.0.0.1:8080/alter-vacation-request', { 
            method: 'PUT',
            body: JSON.stringify({
                'vacationId': id,
                'status': event.target.value
            }),
            credentials: 'include',
            mode: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }

    const pendingVacationCount = vacations.filter(vacation => vacation.status === 'PENDING').length;

    return (
        <>
            <tr className='employee'>
                <td>
                    <img src="./public/pfp.png" alt=""/>
                </td>
                <td>{ firstName }</td>
                <td>{ lastName }</td>
                <td>{ email }</td>
                <td>{ gender }</td>
                <td>{ employee.supervisor === undefined ? 'S' : 'E' }</td>
                <td style={ { userSelect: 'none', position: 'relative' } } onClick={ () => setIsExpanded(!isExpanded) }>
                    { isExpanded ? '▲' : '▼' }
                    { pendingVacationCount > 0 &&
                        <div class="notification" role="status">{ pendingVacationCount }</div>
                    }
                </td>
            </tr>
            {
                (isExpanded && vacations.length > 0) &&
                <tr>
                    <th colSpan={2}></th>
                    <th>from</th>
                    <th>to</th>
                    <th>status</th>
                    <th></th>
                    <th></th>
                </tr>
            }
            {
                isExpanded &&
                vacations.map(
                    ({ startDate, endDate, status, id }) =>
                    <tr key={id}>
                        <td colSpan={2}></td>
                        <td>{ startDate }</td>
                        <td>{ endDate }</td>
                        <td>
                            <select
                              defaultValue={status}
                              onChange={(event) => changeVacationStatus(event, id)}
                            >
                                <option value='REJECTED'>REJECTED</option>
                                <option value='APPROVED'>APPROVED</option>
                                <option value='PENDING'>PENDING</option>
                                <option value='CANCELED'>CANCELED</option>
                            </select>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                )
            }
        </>
    );
}