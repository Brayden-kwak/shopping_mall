import React from 'react'
import axios from 'axios'

const useFetchApi = (url) => {
    const [data, setData] = React.useState([])

    React.useEffect(() => {
        const getData = async() => {
            axios.get(url)
            .then(res => setData(res.data))
            .catch(error => console.log(error))
        }
       getData()
    }, [url])
  return data
}

export default useFetchApi