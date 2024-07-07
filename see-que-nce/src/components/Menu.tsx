import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Menu: React.FC = () => {
    return (
        <>
            <div className='d-flex'>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/submit-review">Submit Review</Button>
            </div>
        </>
    );
};  

export default Menu;
