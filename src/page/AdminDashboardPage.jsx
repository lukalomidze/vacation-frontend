import { useEffect, useState } from "react";

import ExpandableEmployee from "../component/ExpandableEmployee";
import SearchBar from "../component/SearchBar";

import './AdminDashboardPage.css';

export default function AdminDashboardPage() {
    const [employees, setEmployees] = useState([]);
    const [searchParam, setSearchParam] = useState('');

    const fetchAllEmployees = async () => {
        const response = await fetch("http://127.0.0.1:8080/employee/all", {
            credentials: 'include',
            mode: 'same-origin'
        });

        const employees = await response.json();

        return employees;
    }

    useEffect(() => {
        fetchAllEmployees().then(employees => setEmployees(employees))
    }, []);

    if (!employees.length) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <SearchBar setSearchParam={ setSearchParam } />

            <h2 className="i-name">Dashboard</h2>

            <div className="values">
                <div className="val-box">
                    <i className='bx bx-notepad'></i>
                    <div>
                        <h3>
                            { employees.reduce((n, { vacations }) => n + vacations.length, 0) }
                        </h3>
                        <span>Vacations</span>
                    </div>
                </div>
                <div className="val-box">
                    <i className='bx bxs-user'></i>
                    <div>
                        <h3>{ employees.length }</h3>
                        <span>Employees</span>
                    </div>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Rank</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees
                            .filter(
                                employee => new RegExp(`${searchParam}.+`, 'i').test(`${employee.firstName} ${employee.lastName}`)
                            )
                        .map(
                            employee =>
                            <ExpandableEmployee
                                key={employee.id}
                                employee={employee}
                            />
                        )
                    }
                </tbody>
            </table>
        </>
    );
}
