import './Employee.css'

export default function Employee({ employee: { firstName, lastName, email, gender } }) {
    return (
        <tr className='employee'>
            <td>
                <img src="./public/pfp.png" alt="profile picture"/>
            </td>
            <td>{ firstName }</td>
            <td>{ lastName }</td>
            <td>{ email }</td>
            <td>{ gender }</td>
        </tr>
    );
}