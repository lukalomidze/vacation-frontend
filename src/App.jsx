import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'

import AdminDashboardPage from './page/AdminDashboardPage'
import SupervisorPage from './page/SupervisorPage'
import RegisterEmployeePage from './page/RegisterEmployeePage'
import ProfilePage from './page/ProfilePage'
import NavDashboard from './component/NavBar'
import BookingPage from './page/BookingPage'

import './App.css'

function App() {
    const [currentRole, setCurrentRole] = useState('');

    const getCurrentUserRole = async () => {
        const response = await fetch('http://127.0.0.1:8080/current-user-role', {
            credentials: "include",
            mode: "same-origin",
        });

        const data = await response.json();

        return data.roles[0].authority;
    };

    useEffect(() => {
        getCurrentUserRole().then(role => setCurrentRole(role));
    }, []);

    if (currentRole === '') {
        return <div>Loading...</div>;
    }

    return (
        <BrowserRouter>
            <NavDashboard currentRole={ currentRole } />
            <main>
                <Routes>
                    { currentRole === 'ROLE_ADMIN' && <Route path='/admin' element={ <AdminDashboardPage /> } /> }
                    { currentRole === 'ROLE_ADMIN' && <Route path='/register' element={ <RegisterEmployeePage /> } /> }
                    { currentRole === 'ROLE_SUPERVISOR' && <Route path='/supervisor' element={ <SupervisorPage /> } /> }
                    { currentRole !== 'ROLE_ADMIN' && <Route path='/profile' element={ <ProfilePage /> } /> }
                    { currentRole !== 'ROLE_ADMIN' && <Route path='/vacation' element={ < BookingPage /> } /> }
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
