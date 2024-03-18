const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeJobPost(url) {
    try {
        // Fetch HTML content of the job post page
        const response = await axios.get(url);
        const htmlContent = response.data;

        // Parse HTML using Cheerio
        const $ = cheerio.load(htmlContent);

        // Extract relevant information
        const jobDetails = {};

        // Title
        jobDetails.title = $('title').text().trim();

        // Description
        jobDetails.description = $('.job-description').text().trim();

        // Salary (if available)
        jobDetails.salary = $('.salary').text().trim() || "Not specified";

        // Qualifications
        jobDetails.qualifications = $('.qualifications').text().trim();

        return jobDetails;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

// Example usage
const jobPostUrl = 'https://example.com/job-post';
scrapeJobPost(jobPostUrl)
    .then(jobDetails => {
        if (jobDetails) {
            console.log(jobDetails);
        } else {
            console.log("Failed to scrape job post.");
        }
    })
    .catch(error => console.error("Error:", error));
