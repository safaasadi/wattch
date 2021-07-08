import React, { useState } from 'react'
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

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = (site_id) => {
        setAnchorEl(null);
        // history.push(`/sites/${site_id}`)
        // had to disable history here, couldn't get repeating thread in site page to stop when navigating to diff. site
        window.location.href = `/sites/${site_id}`
    }

    return (
        <div className="navbar">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className="menu-button" color="inherit" aria-label="menu" onClick={handleClick}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className="title">
                        Safa Asadi
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