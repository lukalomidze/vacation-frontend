import { Link } from "react-router-dom";

import './SearchBar.css';

export default function SearchBar({ setSearchParam }) {
    return (
        <div className="searchbar">
            <div className="n1">
                <div className="search">
                    <input type="text" placeholder="Search..." onChange={ (event) => setSearchParam(event.target.value)}/>
                </div>
            </div>

            <Link to={'/profile'}>
                <div className="profile">
                    <img src="./public/pfp.png" alt="profile picture"/>
                </div>
            </Link>
        </div>
    );
}