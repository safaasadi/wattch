import React, { useState, useEffect, useRef } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import {Menu, MenuItem} from "@material-ui/core"
import {Link, useHistory, withRouter} from "react-router-dom"
import HomeIcon from '@material-ui/icons/Home';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import PowerIcon from '@material-ui/icons/Power';
import BatteryChargingFullIcon from '@material-ui/icons/BatteryChargingFull';

const Navbar = React.memo(props => {

    const history = useHistory();
    const menuRef = useRef()
    const [siteName, setSiteName] = useState("Welcome");
    const [navbarColor, setNavbarColor] = useState("");

    useEffect(() => {
        getNavbarColor()
    }, [siteName, navbarColor, ])

    const openMenu = () => {
        props.modifyOpenNav(true)
    }

    const closeMenu = () => {
        props.modifyOpenNav(false)
    }

    useOnClickOutside(menuRef, closeMenu);
 

    return (
        <div className="navbar">
            <AppBar position="static" className={`${navbarColor}`}>
                <Toolbar>
                    <IconButton edge="start" className="menu-button" color="inherit" aria-label="menu" onClick={() => openMenu()}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className="title">
                        <img src={"/logos/Wattch2-01.svg"} />
                    </Typography>
                    <h1>
                        {siteName}
                    </h1>
                </Toolbar>

                <div ref={menuRef} className={`menu${props.isNavOpen ? ' active' : ''}`}>
                    <ul>
                        <li><Link to='/' onClick={() => {
                            closeMenu() 
                            setSiteName("Home")
                        }}><div><HomeIcon className="home-button" /></div><p>Home</p></Link></li>
                        <li><Link to='/sites/DhHCwgUy' onClick={() => {
                            closeMenu() 
                            setSiteName("Hartwell")
                        }}><div><EmojiObjectsIcon className="light-button" /></div><p>Hartwell</p></Link></li>
                        <li><Link to='/sites/1swwe8FB' onClick={() => {
                            closeMenu() 
                            setSiteName("63rd St Water Treatment Plant")
                        }}><div><PowerIcon className="power-icon" /></div><p>63rd St Water Treatment Plant</p></Link></li>
                        <li><Link to='/sites/5xoDk1WR' onClick={() => {
                            closeMenu() 
                            setSiteName("Boulder Municipal Services Center")
                        }}><div><BatteryChargingFullIcon className="battery-icon" /></div><p>Boulder Municipal Services Center</p></Link></li>
                    </ul>
                </div>
                {/* <Menu 
                    className="menu"
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => handleClose('DhHCwgUy')}>Hartwell</MenuItem>
                    <MenuItem onClick={() => handleClose('1swwe8FB')}>63rd St Water Treatment Plant</MenuItem>
                    <MenuItem onClick={() => handleClose('5xoDk1WR')}>Boulder Municipal Services Center</MenuItem>
                </Menu> */}
            </AppBar>
        </div>
    );
    function getNavbarColor() {
        if (window.location.href.includes('DhHCwgUy')) {
                setNavbarColor("darkblue")
                setSiteName('Hartwell')
                props.setSiteColor("darkblue")
        }
        if (window.location.href.includes('1swwe8FB')) {
                setNavbarColor("yellow")
                setSiteName('63rd St Water Treatment Plant')
                props.setSiteColor("yellow")
        }
        if (window.location.href.includes('5xoDk1WR')) {
                setNavbarColor("orange")
                setSiteName('Boulder Municipal Services Center')
                props.setSiteColor("orange")
        }
    }
    // Hook
    function useOnClickOutside(ref, handler) {
    useEffect(
      () => {
        const listener = (event) => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because passed in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      [ref, handler]
    );
  }
})

export default withRouter(Navbar)