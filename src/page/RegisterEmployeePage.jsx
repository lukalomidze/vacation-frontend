import { useState } from "react"

import './RegisterEmployeePage.css'

export default function RegisterEmployeePage() {
    const [message, setMessage] = useState('');

    const registerEmployee = async (event) => {
        event.preventDefault();

        const formData = Object.fromEntries(new FormData(event.target));

        const supervisorEmail = event.target.supervisorEmail.value;
        formData.supervisor = { email:  supervisorEmail};

        const response = await fetch('http://127.0.0.1:8080/register-employee', {
            method: 'POST',
            body: JSON.stringify(formData),
            credentials: 'include',
            mode: 'same-origin',
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 401) {
            setMessage('Incorrect email/password');
            return
        }

        if (response.status === 403) {
            setMessage('Insufficient clearance');
            return
        }
        
        if (response.status === 400) {
            setMessage(`Email ${formData.email} is already taken`);
            return
        }

        if (response.status === 404) {
            setMessage(`${supervisorEmail} is not a supervisor`);
            return
        }

        if (response.ok) {
            setMessage('Registration successful');
        }
    }
    
    return (
        <>
            <h1>New Employee</h1>
            <form onSubmit={ registerEmployee }>
                <label htmlFor="firstName">Name:</label>
                <input type="text" name="firstName" id="firstName" required/>
                <label htmlFor="lastName">Surname:</label>
                <input type="text" name="lastName" id="lastName" required/>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" required/>
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" required/>
                <label htmlFor="gender">Gender:</label>
                <select defaultValue="" name="gender" id="gender" required>
                    <option value="" hidden disabled>Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
                <label htmlFor="supervisorEmail">Supervisor email:</label>
                <input type="email" id="supervisorEmail" placeholder="Email" required/>
                <button type="submit" className="btn">Register</button>
            </form> 
            { message.length > 0 && message }
        </>
    );
}
