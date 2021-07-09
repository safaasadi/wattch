import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import {Menu, MenuItem} from "@material-ui/core"
import {useHistory, withRouter} from "react-router-dom"

const Navbar = React.memo(props => {

    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null)

    useEffect(() => {
        getNavbarColor()
    }, [])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = (site_id) => {
        setAnchorEl(null);
        // history.push(`/sites/${site_id}`)
        // had to disable history here, couldn't get repeating thread in site page to stop when navigating to diff. site
        if (typeof site_id !== 'object') window.location.href = `/sites/${site_id}`
    }

    const getNavbarColor = () => {
        let root = document.getElementsByClassName('MuiAppBar-root')
        if (root && window.location.href.includes('DhHCwgUy')) {
            for (var i = 0; i < root.length; i++) {
                root[i].classList.add('DhHCwgUy')
            }
        }
        if (root && window.location.href.includes('1swwe8FB')) {
            for (var i = 0; i < root.length; i++) {
                root[i].classList.add('swwe8FB')
            }
        }
        if (root && window.location.href.includes('5xoDk1WR')) {
            for (var i = 0; i < root.length; i++) {
                root[i].classList.add('xoDk1WR')
            }
        }
    }

    return (
        <div className="navbar">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className="menu-button" color="inherit" aria-label="menu" onClick={handleClick}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className="title">
                        <img src={"/logos/Wattch2-01.svg"} />
                    </Typography>
                </Toolbar>

                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => handleClose('DhHCwgUy')}>Hartwell</MenuItem>
                    <MenuItem onClick={() => handleClose('1swwe8FB')}>63rd St Water Treatment Plant</MenuItem>
                    <MenuItem onClick={() => handleClose('5xoDk1WR')}>Boulder Municipal Services Center</MenuItem>
                </Menu>
            </AppBar>
        </div>
    );
})

export default withRouter(Navbar)