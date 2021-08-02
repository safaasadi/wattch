import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom';
import InvalidSite from "./InvalidSite";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Sunny from '../backgrounds/sunny.jpg';
import ClearNight from '../backgrounds/clear night.jpg';
import Cloudy from '../backgrounds/cloudy.jpg';
import CloudyNight from '../backgrounds/cloudy.png';
import Windy from '../backgrounds/windy.jpg';
import Fog from '../backgrounds/fog.jpg';

const Site = props => {
    
    const validSiteIds = ['DhHCwgUy', '1swwe8FB', '5xoDk1WR']
    const [validSite, setValidSite] = useState(true)
    const [siteInfo, setSiteInfo] = useState(null)
    const [siteData, setSiteData] = useState(null)
    const {site_id} = props?.match.params;
    const [weatherIcon, setWeatherIcon] = useState("");
    const [bodyColor, setBodyColor] = useState("");

    useEffect(() => {
        if (!validSiteIds.includes(site_id)) {
            setValidSite(false)
            return
        }
        setValidSite(true)
        getSiteInfo()
        refreshLiveData()
    }, [site_id, weatherIcon])

    const getSiteInfo = async () => {
        try {
            let {data: site_info} = await axios.get(`https://kiosk.staging.wattch.io/api/${site_id}/info`)
            let {data: site_data} = await axios.get(`https://kiosk.staging.wattch.io/api/${site_id}/data`)
            setSiteInfo(site_info)
            setSiteData(site_data)
            getWeatherIcon()
        } catch (err) {
            console.log(err)
        }
    }

    const refreshLiveData = async () => {
        while (true) {
            try {
                let {data} = await axios.get(`https://kiosk.staging.wattch.io/api/${site_id}/data`)
                setSiteData(data)
                await wait();
            } catch (err) {
                console.log(err)
            }
        }
    }

    function wait() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('resolved');
            }, 30000);
        });
    }

    const toFahrenheit = celsius => {
        return (celsius * (9 / 5)) + 32
    }

    const addCommas = (x) => {
        return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x
    }

    const getEnergyProducedToday = () => {
        return siteData?.energy?.production?.daily?.values[siteData?.energy?.production?.daily?.values.length - 1]
    }

    const getAllTimeKWH = () => {
        return siteData?.energy?.production?.allTime?.value / 1000
    }
    const getWeatherIcon = () => {
        switch (siteData?.meteo?.icon?.value) {
            case "clear-day": {
                setWeatherIcon(Sunny);
                break;
            }
            case "clear-night": {
                setWeatherIcon(ClearNight);
                break;
            }
            case "rain": {
                setWeatherIcon(Cloudy);
                break;
            }
            case "snow": {
                setWeatherIcon(ClearNight);
                break
            }
            case "sleet": {
                setWeatherIcon(Cloudy);
                break
            }
            case "wind": {
                setWeatherIcon(Windy);
                break
            }
            case "fog": {
                setWeatherIcon(Fog);
                break
            }
            case "cloudy": {
                setWeatherIcon(Cloudy);
                break;
            }
            case "partly-cloudy-day": {
                setWeatherIcon(Cloudy);
                break;
            }
            case "partly-cloudy-night": {
                setWeatherIcon(CloudyNight);
                break;
            }
            default: {
                setWeatherIcon(Sunny);
            }
        }
    }

    if (!validSite) return <InvalidSite/>

    return (
        <>
        <div className="site-title">
            <div className={`bg site${validSiteIds.indexOf(site_id)}`}>
                <div className="overlay">
                    <h1>{`${siteInfo?.name}`}</h1>
                    <h4>{`Capacity: ${parseInt(siteInfo?.capacity) / 1000} kW`}</h4>
                </div>
            </div>
        </div>

        <div className={`site-data ${props.siteColor}`}>

            <div className="property-card">
                <div className="property-image" style={{ backgroundImage: `url("${weatherIcon}")` }}></div>
                    <div className="property-description">
                        <Typography className="heading">Current Site Data</Typography>
                
                        <Typography>
                            <h4>{`Power Production: ${addCommas(siteData?.power?.production?.value)} W`}</h4>
                            <h4>{`Temperature: ${parseInt(toFahrenheit(siteData?.meteo?.temperature?.value))} F`}</h4>
                            <h4>{`Cloud Coverage: ${parseInt(siteData?.meteo?.cloudCover?.value * 100)}%`}</h4>
                        </Typography>
                    </div>
            </div>
            
            <div className="property-card">
                <div className="property-image" style={{ backgroundImage: `url("${weatherIcon}")` }}></div>
                    <div className="property-description">
                        <Typography className="heading">Energy Production</Typography>
                
                        <Typography>
                        <h4>{`Today: ${addCommas(parseInt(getEnergyProducedToday()?.value) / 1000)} kWh`}</h4>
                        <h4>{`All Time: ${addCommas(parseInt(getAllTimeKWH()))} kWh`}</h4>
                        </Typography>
                    </div>
            </div>
            
            <div className="property-card">
                <div className="property-image" style={{ backgroundImage: `url("${weatherIcon}")` }}></div>
                    <div className="property-description">
                        <Typography className="heading">Sustainability</Typography>
            
                        <Typography>
                        <h4>{`CO2 emissions saved from smartphones being charged: ${addCommas(parseInt((getAllTimeKWH() / 1000) * 86206))}`}</h4>
                        <h4>{`CO2 emissions saved from pounds of coal burned: ${addCommas(parseInt((getAllTimeKWH() / 1000) * 783))}`}</h4>
                        <h4>{`Greenhouse gas emissions saved from miles driven by an average passenger vehicle: ${addCommas(parseInt((getAllTimeKWH() / 1000) * 1781))}`}</h4>
                        </Typography>
                    </div>
            </div>
        </div>
        </>
    )

}

export default withRouter(Site)