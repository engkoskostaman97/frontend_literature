import React, { useState, useEffect } from "react";
import Navbars from '../component/Navbars'
import Searchresault from '../component/Searchresault'
import { PageLoading } from '../component/Loading';
function Search() {
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])

    if (isLoading) {
        return <PageLoading />
    }
    return (
        <>

            <div><Navbars /></div>
            <div><Searchresault /></div>
        </>
    )
}

export default Search