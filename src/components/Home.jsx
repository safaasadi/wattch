import React from 'react';
import {Link, useHistory, withRouter} from "react-router-dom"

const Home = props => {
    return (
        <div className="home-bg">
            <div className="anime-text">
            <Link to='/sites/DhHCwgUy'>
                <span className="animatedText">
                    Hartwell
                </span>
            </Link>
            </div>
            <div className="anime-text2">
                <Link to='/sites/1swwe8FB'>
                    <span className="animatedText">
                        23rd
                    </span>
                </Link>
            </div>
            <div className="anime-text3">
                <Link to='/sites/5xoDk1WR'>
                    <span className="animatedText">
                        Boulder
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default Home