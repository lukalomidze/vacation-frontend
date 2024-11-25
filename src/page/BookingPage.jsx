import { useState } from "react";

export default function BookingPage() {
    const [message, setMessage] = useState('')

    const bookingVacation = async (event) => {
        event.preventDefault()

        const formData = Object.fromEntries(new FormData(event.target))
        
        let response = await fetch("http://127.0.0.1:8080/book-vacation", {
            method: "POST",
            body: JSON.stringify(formData),
            credentials: "include",
            mode: 'same-origin',
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status === 401) {
            setMessage('Incorrect email/password')
        } else if (response.status === 409) {
            setMessage('Duplicate vacation requrst')
        } else if (response.status === 400) {
            setMessage('Please select a future timeframe')
        } else {
            setMessage('Request successful')
        }
    }

    return (
        <>
            <h2>Request vacation</h2>
            <form onSubmit={ bookingVacation }>
                <label htmlFor="startDate">From:</label>
                <input type="date" id="startDate" name="startDate" required/>
                <label htmlFor="endDate">To:</label>
                <input type="date" id="endDate" name="endDate" required/>
                <button type="submit">Submit</button>
            </form>
            { message.length > 0 && message }
        </>
    )
}