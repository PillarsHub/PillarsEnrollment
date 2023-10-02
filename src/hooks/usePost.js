import PropTypes from 'prop-types';
import { BaseUrl, AuthToken } from '../util/baseUrl';

function Post(url, object, onSuccess, onError) {
    SendRequest("POST", url, object, onSuccess, onError);
}

function Put(url, object, onSuccess, onError) {
    SendRequest("PUT", url, object, onSuccess, onError);
}

function SendRequest(method, url, object, onSuccess, onError)
{
    let xhr = new XMLHttpRequest();
    let fullUrl = BaseUrl + url;
    if (url.startsWith("https")) fullUrl = url;
    
    // open a connection
    xhr.open(method, fullUrl, true);

    // Set the request header i.e. which type of content you are sending
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", AuthToken);

    // Create a state change callback
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status <= 205){
                if (xhr.response){
                    onSuccess(JSON.parse(xhr.response));
                }
                else{
                    onSuccess(undefined);
                }
            }
            else{
                onError(xhr.response, xhr.status);
            }
        }
    };

    // Converting JSON data to string
    var data = JSON.stringify(object);

    // Sending data with the request
    xhr.send(data);
}

Post.propTypes = {
    url: PropTypes.string.isRequired,
    object: PropTypes.any.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onError: PropTypes.func
}

Put.propTypes = {
    url: PropTypes.string.isRequired,
    object: PropTypes.any.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onError: PropTypes.func
}

SendRequest.propTypes = {
    method: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    object: PropTypes.any.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onError: PropTypes.func
}

export {Post, Put, SendRequest};