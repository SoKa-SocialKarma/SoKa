import React from 'react';
import NavBar from '../Components/Navbar'

const PublicLayout = ({ component,...rest}) => {
    return (
        <>
          <NavBar children={component}/> 
        

        </>
    );
};

export default PublicLayout;