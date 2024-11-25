import { useEffect, useState } from "react";

import Employee from "../component/Employee";

import './ProfilePage.css'

export default function ProfilePage() {
    const [employee, setEmployee] = useState({});

    const getEmployee = async () => {
        const response = await fetch('http://127.0.0.1:8080/employee', {
            credentials: "include",
            mode: 'same-origin',
        });

        const employee = await response.json();

        return employee;  
    }

    useEffect(() => {
        getEmployee().then(employee => setEmployee(employee))
    }, []);

    if (Object.keys(employee).length === 0) {
        return <div>Loading...</div>;
    }

    const { supervisor, vacations } = employee;
    
    return (
        <>
            <h2>Your Info</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    <Employee employee={employee} />
                </tbody>
            </table>
            {
                supervisor !== undefined &&
                <>
                    <h2>Supervisor Info</h2>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Email</th>
                                <th>Gender</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Employee employee={supervisor} />
                        </tbody>
                    </table>
                </>
            }
            {
                vacations.length > 0 &&
                <>
                    <h2>Vacations</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>From</th>
                                <th>To</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                vacations.map(
                                    ({ startDate, endDate, status }, i) =>
                                    <tr key={i}>
                                        <td>{ startDate }</td>
                                        <td>{ endDate }</td>
                                        <td>{ status }</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </>
            }
        </>
    );
}
