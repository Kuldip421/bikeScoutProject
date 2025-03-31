import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Slide, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomLoader from '../../hooks/CustomLoader';

const UserDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem("id");
                if (!userId) return;

                const orderResponse = await axios.get(`/order/getOrders/${userId}`);
                setOrders(orderResponse.data.orders || []);

                const response = await axios.get(`/wishlist/user/${userId}`);
                if (response.data.success && Array.isArray(response.data.data)) {
                    setWishlist(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

     const handleRemove = async (id) => {
            try {
                console.log(`Removing wishlist item with ID: ${id}`);
        
                const response = await axios.delete(`/wishlist/wishlist/${id}`);
        
                console.log("Remove Response:", response.data);
        
                if (response.data.success) {
                    setWishlist(wishlist.filter(item => item._id !== id));
                    toast.success("Removed from wishlist!");
                } else {
                    toast.error("Failed to remove item.");
                }
            } catch (error) {
                console.error("Error removing from wishlist:", error);
                toast.error("Error removing item.");
            }
        };

    const filteredOrders = filter === "all" ? orders : orders.filter(order => order.status === filter);

    return (
        <div style={{ padding: '40px', fontFamily: 'Poppins, sans-serif', backgroundColor: '#f9fafc', minHeight: '100vh' }}>
            <h1 style={{ textAlign: 'center', color: '#222', fontWeight: 'bold', fontSize: '32px', marginBottom: '20px' }}>User Dashboard</h1>
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} transition={Slide} theme="colored" />
            {loading ? <CustomLoader /> : (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
                        <div style={{ padding: '25px', background: '#ffffff', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                            <h2 style={{ marginBottom: '15px', color: '#333' }}>Recent Orders</h2>
                            <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%', maxWidth: '250px', marginBottom: '15px' }}>
                                <option value="all">All Orders</option>
                                <option value="pending">Pending</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                            </select>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {filteredOrders.length > 0 ? filteredOrders.map(order => (
                                    <div key={order._id} style={{ padding: '15px', backgroundColor: '#f1f5f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.05)', transition: '0.3s', cursor: 'pointer', hover: { transform: 'scale(1.03)' } }}>
                                        <h3 style={{ color: '#007bff', fontSize: '20px' }}>{order.model}</h3>
                                        <p style={{ fontWeight: 'bold', color: '#555' }}>Status: {order.status}</p>
                                    </div>
                                )) : <p>No orders found.</p>}
                            </div>
                        </div>

                        <div style={{ padding: '25px', background: '#ffffff', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                            <h2 style={{ color: '#333' }}>Wishlist History</h2>
                            {wishlist.length === 0 ? (
                                <p style={{ textAlign: 'center', color: '#666' }}>No items in wishlist.</p>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '15px' }}>
                                    {wishlist.map((item) => (
                                        <div key={item._id} style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                                            {item.bikeId ? (
                                                <>
                                                    <img src={item.bikeId.bikeURL} alt={item.bikeId.model} style={{ width: '100%', borderRadius: '8px', height: '150px', objectFit: 'cover' }} />
                                                    <h3 style={{ color: '#ff6200', fontSize: '18px', marginTop: '10px' }}>{item.bikeId.model}</h3>
                                                    <p style={{ fontSize: '14px', color: '#666' }}>Brand: {item.bikeId.brand}</p>
                                                    <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>Price: ₹{item.bikeId.price}</p>
                                                    <button onClick={() => handleRemove(item._id)} style={{ marginTop: '10px', padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: '#ff4d4d', color: '#fff', fontWeight: 'bold', cursor: 'pointer', width: '100%', transition: '0.3s', hover: { backgroundColor: '#cc0000' } }}>Remove</button>
                                                </>
                                            ) : (
                                                <p style={{ color: 'red' }}>Bike details not available</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserDashboard;
