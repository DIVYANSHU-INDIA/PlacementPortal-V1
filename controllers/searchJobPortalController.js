// Import the axios library for making HTTP requests
const axios = require('axios');

// Controller to render the 'searchJob' page
module.exports.searchJob = async function(req, res){
    // Render the 'searchJob' view
    return res.render('searchJobView');
}

// Controller for handling the search job result action at the URL '/search-job/result'
module.exports.searchJobResult = async function(req, res){
    try {
        // Set up the options for the HTTP request to the job search API
        const options = {
            method: 'GET',
            url: 'https://jsearch.p.rapidapi.com/search',
            params: {
                query: `${req.body.job} ${req.body.location}`,
                page: '1',
                num_pages: '1'
            },
            headers: {
                'X-RapidAPI-Key': 'd32026fca5msh4f6a6620e68ca14p14d327jsn935f682946ea',
                'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
            }
        };

        // Make the HTTP request to the job search API using axios
        const response = await axios.request(options);

        // Render the 'searchJobResult' view and pass the API response data
        return res.render('searchJobResult', {
            jobs: response.data.data
        });
    } catch (error) {
        // Log and handle any errors that occur during the process
        console.error(error);
        // You might want to handle errors more gracefully, such as rendering an error page
    }
}
