import { useEffect, useState } from "react"

import ExpandableEmployee from "../component/ExpandableEmployee";
import SearchBar from "../component/SearchBar";

export default function SupervisorPage() {
    const [employees, setEmployees] = useState([]);
    const [searchParam, setSearchParam] = useState('');

    const getSupervisorEmployees = async () => {
        const response = await fetch(`http://127.0.0.1:8080/get-supervisor-employees`, {
            credentials: 'include',
            mode: 'same-origin'
        });

        const employees = await response.json();

        return employees;
    }

    useEffect(() => {
        getSupervisorEmployees().then(employees => setEmployees(employees));
    }, []);

    return (
        <>
            <SearchBar setSearchParam={ setSearchParam }/>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        employees
                            .filter(
                                employee => new RegExp(`${searchParam}.+`, 'i').test(`${employee.firstName} ${employee.lastName}`)
                            )
                            .sort(
                                (employeeA, employeeB) => {
                                    const pendingVacationsA = employeeA.vacations
                                        .filter(vacation => vacation.status === 'PENDING')
                                    .length;

                                    const pendingVacationsB = employeeB.vacations
                                        .filter(vacation => vacation.status === 'PENDING')
                                    .length;
                                    
                                    if (pendingVacationsA === pendingVacationsB) {
                                        return 0;
                                    }

                                    // Sort by pending desc
                                    return pendingVacationsA > pendingVacationsB ? -1 : 1;
                                }
                            )
                        .map(
                            (employee) =>
                            <ExpandableEmployee
                              key={ employee.id }
                              employee={ employee }
                            />
                        )
                    }
                </tbody>
            </table>
        </>
    );
}
