const axios = require('axios');
const fs = require('fs');

const username = 'Bebi Gorl'; // Your Valorant username
const platform = 'riot'; // Use 'riot' for Riot Games platform

async function fetchRank() {
    try {
        // Fetch data from Tracker.gg API
        const response = await axios.get(`https://api.tracker.gg/api/v2/valorant/standard/profile/${platform}/${username}`, {
            headers: {
                'TRN-API-KEY': 'YOUR_TRACKER_API_KEY'  // Replace with your Tracker.gg API key
            }
        });

        const rank = response.data.data.segments[0].stats.combat.score.value; // Adjust if necessary
        return rank;
    } catch (error) {
        console.error('Error fetching rank:', error);
        return 'Unknown';
    }
}

async function generateBadge() {
    const rank = await fetchRank();

    const badgeUrl = `https://img.shields.io/badge/Valorant%20Rank-${rank}-blue`;

    // Update the README file with the new badge URL
    const readme = fs.readFileSync('./README.md', 'utf8');
    const updatedReadme = readme.replace(/(https:\/\/img\.shields\.io\/badge\/Valorant%20Rank-)[^ ]+(?=-blue)/, `$1${rank}`);

    fs.writeFileSync('./README.md', updatedReadme);
}

generateBadge();
