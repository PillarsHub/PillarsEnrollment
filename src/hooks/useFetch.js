import { useState, useEffect } from 'react';
import { BaseUrl, AuthToken } from '../util/baseUrl';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading('loading...')
        setData(null);
        setError(null);
        get_private();
    }, [url])

    function get_private()
    {
        Get(url, (r) =>{
            setLoading(null);
            setData(r);
        }, 
        (error) =>{
            setLoading(null);
            setError(error);
        });
    }

    return { data, loading, error, refetch: get_private }
}

function Get(url, onSuccess, onError)
{
    let xhr = new XMLHttpRequest();
    let fullUrl = BaseUrl + url;
    if (url.startsWith("https")) fullUrl = url;

    // open a connection
    xhr.open("GET", fullUrl, true);

    // Set the request header i.e. which type of content you are sending
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", AuthToken);

    // Create a state change callback
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status <= 205){
                onSuccess(JSON.parse(xhr.response));
            }
            else{
                onError(xhr.response, xhr.status);
            }
        }
    };

    // Sending data with the request
    xhr.send();
}

export { useFetch, Get };