import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReviewList from '../reviews/ReviewList';
import CustomLoader from '../../hooks/CustomLoader';

export const ViewMyBike = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for the loader

  useEffect(() => {
    const getBikesByUserId = async () => {
      try {
        const res = await axios.get(`/bike/getbikesbyuserid/${localStorage.getItem("id")}`);
        setBikes(res.data.data); // Assuming bikes are inside 'data'
      } catch (error) {
        console.error('Error fetching bikes:', error);
      } finally {
        setLoading(false); // Turn off loading once data is fetched
      }
    };

    getBikesByUserId();
  }, []); // Empty array ensures this only runs once on component mount

  if (loading) {
    return <CustomLoader />;
  }

  if (bikes.length === 0) {
    return <div className="text-center mt-5">No bikes available.</div>;
  }

  return (
    <div style={pageBackgroundStyle}>
      <h3 style={titleStyle}>My Bike Collection</h3>
      {/* Full width container with no padding */}
      <div className="container-fluid" style={{ padding: 0 }}>
        <div className="row" style={rowStyle}>
          {/* Loop through the bikes array and create a card for each bike */}
          {bikes.map((bike) => (
            <div key={bike.id} className="col-lg-3 col-md-4 col-sm-6" style={colStyle}>
              <div className="card h-100" style={cardStyle}>
                <div className="card-header text-center" style={cardHeaderStyle}>
                  <h4 style={cardTitleStyle}>{bike.model}</h4>
                  <p style={cardBrandStyle}>{bike.brand}</p>
                </div>
                <div className="card-body" style={cardBodyStyle}>
                  <div className="text-center">
                    <img
                      src={bike.bikeURL || '/path/to/placeholder-image.jpg'}
                      alt={bike.model}
                      className="img-fluid"
                      style={imageStyle}
                    />
                  </div>
                  <div className="bike-details mt-4" style={bikeDetailsStyle}>
                    <p><strong>Year:</strong> {bike.year}</p>
                    <p><strong>Variant:</strong> {bike.variant}</p>
                    <p><strong>Mileage:</strong> {bike.mileage}</p>
                    <p><strong>Fuel Type:</strong> {bike.fuelType}</p>
                    <p><strong>Type:</strong> {bike.type}</p>
                    <p><strong>Listing Date:</strong> {bike.listingDate}</p>
                    <p><strong>Description:</strong> {bike.descripiton}</p>
                    <p><strong>Color:</strong> {bike.color}</p>
                    <p><strong>Price:</strong> ${bike.price}</p>
                    <p><strong>Registration Number:</strong> {bike.registationNum}</p>
                  </div>
                  <div className="mt-3">
                    <h5>Customer Reviews</h5>
                    <ReviewList bikeId={bike._id} /> 
                  </div>

                </div>
                <div className="card-footer text-center" style={cardFooterStyle}>
                  <Link to={`/seller/updatebike/${bike._id}`}  
                    className="btn" 
                    style={editButtonStyle}
                    onClick={() => handleEdit(bike.id)}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#2ecc71"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#27ae60"}
                  >
                    Update
                  </Link>
                  <button 
                    className="btn btn-danger" 
                    style={deleteButtonStyle}
                    onClick={() => handleDelete(bike.id)}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#e74c3c"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#c0392b"}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

 
};


const pageBackgroundStyle = {
  background: 'linear-gradient(135deg, #4e54c8, #8f94fb)', 
  minHeight: '100vh',
  padding: '0', 
  fontFamily: 'Arial, sans-serif',
  boxSizing: 'border-box',
};

const titleStyle = {
  fontFamily: 'Poppins, sans-serif',
  color: '#fff',
  fontSize: '36px',
  fontWeight: '700',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  textShadow: '3px 3px 8px rgba(0, 0, 0, 0.3)',
  margin: '20px auto',
  padding: '10px 20px',
  background: 'rgba(0, 0, 0, 0.5)', 
  borderRadius: '10px',
  maxWidth: 'fit-content',
};

const rowStyle = {
  margin: '0', 
};

const colStyle = {
  padding: '10px', 
};

const cardStyle = {
  borderRadius: '15px',
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  overflow: 'hidden',
  backgroundColor: '#fff',
  border: 'none',
};

const cardHeaderStyle = {
  backgroundColor: '#2C3E50',
  color: 'white',
  borderTopLeftRadius: '15px',
  borderTopRightRadius: '15px',
  padding: '20px',
};

const cardTitleStyle = {
  fontFamily: 'Poppins, sans-serif',
  fontWeight: '700',
  fontSize: '1.5rem',
  letterSpacing: '1px',
  margin: '0',
};

const cardBrandStyle = {
  fontStyle: 'italic',
  fontWeight: '500',
  color: '#bdc3c7',
  margin: '0',
};

const cardBodyStyle = {
  backgroundColor: '#f9f9f9',
  color: '#333',
  borderRadius: '0 0 15px 15px',
  padding: '20px',
  height: '100%',
};

const imageStyle = {
  maxHeight: '200px',
  width: 'auto',
  borderRadius: '12px',
};

const bikeDetailsStyle = {
  fontFamily: 'Roboto, sans-serif',
  color: '#333',
  lineHeight: '1.6',
  padding: '10px',
  background: '#ecf0f1', 
  borderRadius: '8px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
};

const cardFooterStyle = {
  backgroundColor: '#34495e', 
  padding: '10px 0',
};

const editButtonStyle = {
  height: '40px',
  width: '100px',
  borderRadius: '30px',
  fontWeight: 'bold',
  backgroundColor: '#27ae60', 
  border: 'none',
  transition: 'all 0.3s ease',
  padding: '0 20px',
  paddingTop:"8px",
  boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
};

const deleteButtonStyle = {
  height: '40px',
  width: '100px',
  borderRadius: '30px',
  fontWeight: 'bold',
  backgroundColor: '#c0392b', 
  color: 'white',
  border: 'none',
  transition: 'all 0.3s ease',
  padding: '0 20px',
  boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
};


const styleSheet = document.styleSheets[0];
styleSheet.insertRule('.card:hover { transform: scale(1.05); box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3); }', styleSheet.cssRules.length);

export default ViewMyBike;
