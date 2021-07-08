import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom';
import InvalidSite from "./InvalidSite";

const Site = props => {

    const validSiteIds = ['DhHCwgUy', '1swwe8FB', '5xoDk1WR']
    const [validSite, setValidSite] = useState(true)
    const [siteInfo, setSiteInfo] = useState(null)
    const [siteData, setSiteData] = useState(null)
    const {site_id} = props?.match.params;

    useEffect(() => {
        if (!validSiteIds.includes(site_id)) {
            setValidSite(false)
            return
        }
        setValidSite(true)
        getSiteInfo()
        refreshLiveData()
    }, [site_id])

    const getSiteInfo = async () => {
        try {
            let {data: site_info} = await axios.get(`https://kiosk.staging.wattch.io/api/${site_id}/info`)
            let {data: site_data} = await axios.get(`https://kiosk.staging.wattch.io/api/${site_id}/data`)
            setSiteInfo(site_info)
            setSiteData(site_data)
        } catch (err) {
            console.log(err)
        }
    }

    const refreshLiveData = async () => {
        while (true) {
            try {
                let { data } = await axios.get(`https://kiosk.staging.wattch.io/api/${site_id}/data`)
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
        return (celsius * (9/5)) + 32
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

    if (!validSite) return <InvalidSite />

    return (
        <div>
            <h1>{`${siteInfo?.name}`}</h1>
            <h4>{`Capacity: ${parseInt(siteInfo?.capacity) / 1000} kW`}</h4>
            <h4>{`Current Power Production: ${addCommas(siteData?.power?.production?.value)} W`}</h4>
            <h4>{`Current Temperature: ${parseInt(toFahrenheit(siteData?.meteo?.temperature?.value))} F`}</h4>
            <h4>{`Current Cloud Coverage: ${parseInt(siteData?.meteo?.cloudCover?.value * 100)}%`}</h4>
            <h4>{`Energy Produced Today: ${addCommas(parseInt(getEnergyProducedToday()?.value))} W`}</h4>
            <h4>{`Energy Produced All Time: ${addCommas(parseInt(getAllTimeKWH()))} kWh`}</h4>

            <h4>{`CO2 emissions saved from smartphones being charged: ${addCommas(parseInt((getAllTimeKWH() / 1000) * 86206))}`}</h4>
            <h4>{`Greenhouse gas emissions saved from miles driven by an average passenger vehicle: ${addCommas(parseInt((getAllTimeKWH() / 1000) * 1781))}`}</h4>
            <h4>{`CO2 emissions saved from pounds of coal burned: ${addCommas(parseInt((getAllTimeKWH() / 1000) * 783))} CO2`}</h4>
        </div>
    )

}

export default withRouter(Site)