import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloudIcon from '@mui/icons-material/Cloud';
import Slide from '@mui/material/Slide';

function Header() {
    return (
        <header>
            <AppBar sx={{backgroundImage:"Url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKbMMfrh4j5BIGWGv2i0lTzvuZvY1aPy7gWw&s)",backgroundRepeat:"no-repeat",backgroundSize:"100vw"}}>
                <Toolbar>
                <Slide in={true}>
                    <h1 id="header-title"> <CloudIcon/> The Weather App </h1>
                    </Slide>
                    </Toolbar>
                </AppBar>
                </header>
    )
}

export default Header;