import { NavLink } from "react-router-dom"

import "./NavBar.css"

export default function NavDashboard({ currentRole }) {
    return (
        <>
            <nav id="navbar">
                <h1 className="logo">Ribas</h1>
                <ul className="items">
                    { currentRole === 'ROLE_ADMIN' &&
                        <li>
                            <NavLink to="/admin" className="nav-item">Admin Dashboard</NavLink>
                        </li>
                    }
                    { currentRole === 'ROLE_ADMIN' &&
                        <li>
                            <NavLink to="/register" className="nav-item">Registration</NavLink>
                        </li>
                    }
                    { currentRole === 'ROLE_SUPERVISOR' &&
                        <li>
                            <NavLink to="/supervisor" className="nav-item">Supervisor Page</NavLink>
                        </li>
                    }
                    { currentRole !== 'ROLE_ADMIN' &&
                        <li>
                            <NavLink to="/profile" className="nav-item">Profile</NavLink>
                        </li>
                    }
                    { currentRole !== 'ROLE_ADMIN' &&
                        <li>
                            <NavLink to="/vacation" className="nav-item">Request a Vacation</NavLink>
                        </li>
                    }
                    <a href="/logout" className="logout">Logout</a>
                </ul>
            </nav>
        </>
    );
}
