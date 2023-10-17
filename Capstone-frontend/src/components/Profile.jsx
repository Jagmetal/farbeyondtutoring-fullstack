import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { fetchUserBookings, deleteBooking, editBooking } from '../services/api.js';
import '../styles/Profile.css';
import EditBookingForm from '../components/EditBookingForm';

const Profile = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [editingBooking, setEditingBooking] = useState(null);

    useEffect(() => {
        const loadBookings = async () => {
            try {
                const data = await fetchUserBookings();
                setBookings(data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        loadBookings();
    }, []);

    const handleSignOut = async () => {
        try {
            await Auth.signOut();
            navigate('/login');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    const handleDelete = async (bookingId) => {
        try {
            await deleteBooking(bookingId);
            setBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId));
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()} ${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
    };

    const handleEdit = (booking) => {
        setEditingBooking(booking);
    };

    const handleEditSubmit = async (editedBooking) => {
        try {
            await editBooking(editedBooking._id, editedBooking);
            setBookings(prevBookings => prevBookings.map(booking => (booking._id === editedBooking._id ? editedBooking : booking)));
            setEditingBooking(null);
        } catch (error) {
            console.error("Error editing booking:", error);
        }
    };

    const cancelEdit = () => {
        setEditingBooking(null);
    };

    return (
        <div className="profile-container mt-3">

            <h3 className="booking-header">Your Bookings:</h3>
            {bookings.map(booking => (
                <div key={booking._id} className="booking-item">
                    <span>{booking.tutorName} - {formatDate(booking.serviceDate)}</span>
                    <div className="booking-actions">
                        <button className="btn btn-warning booking-button" onClick={() => handleEdit(booking)}>Edit</button>
                        <button className="btn btn-danger booking-button" onClick={() => handleDelete(booking._id)}>Delete</button>
                    </div>
                </div>

            ))}

            {editingBooking && (
                <EditBookingForm
                    booking={editingBooking}
                    onSubmit={handleEditSubmit}
                    onCancel={cancelEdit}
                    bookedDates={bookings.map(booking => new Date(booking.serviceDate))}

                />
            )}

            <button className="btn btn-primary" onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default Profile;
