import axios from "axios";
import { useState, useEffect } from "react";

axios.defaults.baseURL = '';

function useAxios({ url, method, body = null, headers = null }) {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    const fetchData = ({ url, method, body = null, headers = null }) => {
        axios[method](url, JSON.parse(headers), JSON.parse(body))
            .then(res => {
                setResponse(res)
            })
            .catch(err => {
                setError(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    useEffect(() => {
        fetchData()
    }, [url, method, body, headers])
    return (response, error, loading)
}
export default useAxios