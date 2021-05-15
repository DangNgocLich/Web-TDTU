async function postData(url = '', data = {}, requestOptions) {
    // Default options are marked with *
    const response = await fetch(url, requestOptions);
    return response.json(); // parses JSON response into native JavaScript objects
}