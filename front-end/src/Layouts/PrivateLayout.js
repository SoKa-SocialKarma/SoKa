import React from 'react';
import NavBar from '../Components/Navbar'


const PrivateLayout = ({component}) => {
    return (
        <>
            <NavBar  children={component}/>
        </>
    );
};

export default PrivateLayout;