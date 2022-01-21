import React,{useState} from 'react';
import { Typography } from '@mui/material';
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Navbar() {
    const[anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
    setAnchorEl(null);
    };
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}} onClick={handleMenu}>
                    <MenuIcon></MenuIcon>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>FairProfit</Typography>
                </Toolbar>
                <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <a href="/home" className="nav-link"><MenuItem onClick={handleClose}>Home</MenuItem></a>
                        <a href="/about" className="nav-link"><MenuItem onClick={handleClose}>About Us</MenuItem></a>
                        <a href="/" className="nav-link"><MenuItem onClick={handleClose}>Start Now</MenuItem></a>
                </Menu>
            </AppBar>
        </>
    )
}

export default Navbar;
