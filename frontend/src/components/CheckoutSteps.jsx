// frontend/src/components/CheckoutSteps.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    const stepStyle = (isActive) => ({
        padding: '5px 10px',
        margin: '0 5px',
        border: '1px solid #ccc',
        backgroundColor: isActive ? '#007bff' : '#f8f9fa',
        color: isActive ? 'white' : '#6c757d',
        textDecoration: 'none',
        borderRadius: '5px'
    });

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
            
            {/* 1. Sign In (الافتراض دائماً تم) */}
            <Link to='/login' style={stepStyle(true)}>
                Sign In
            </Link>

            {/* 2. Shipping */}
            {step1 ? (
                <Link to='/shipping' style={stepStyle(true)}>
                    Shipping
                </Link>
            ) : (
                <span style={stepStyle(false)}>Shipping</span>
            )}

            {/* 3. Payment */}
            {step2 ? (
                <Link to='/payment' style={stepStyle(step2)}>
                    Payment
                </Link>
            ) : (
                <span style={stepStyle(false)}>Payment</span>
            )}

            {/* 4. Place Order */}
            {step3 ? (
                <Link to='/placeorder' style={stepStyle(step3)}>
                    Place Order
                </Link>
            ) : (
                <span style={stepStyle(false)}>Place Order</span>
            )}
        </div>
    );
};

export default CheckoutSteps;