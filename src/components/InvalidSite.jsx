import React from 'react'

const InvalidSite = React.memo(props => {

    return (
        <>
            <h1>Uh-Oh!</h1>
            <p>Seems you have navigated to an invalid site. Please use the navigation bar to view a site.</p>
        </>
    )

})

export default InvalidSite