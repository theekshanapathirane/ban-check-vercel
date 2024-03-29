const express = require('express');
const axios = require('axios');

const app = express();
const VALID_KEYS = new Set(['RamiyaYT', 'HEX', '444S@URN', 'slffnews']);

app.get('/api/ban_check/:uid', async (req, res) => {
    const { uid } = req.params;
    const apiKey = req.query.key;

    if (!apiKey || !VALID_KEYS.has(apiKey)) {
        res.status(403).send(`
            <html>
            <head>
                <title>Redirecting...</title>
                <style>
                    body {
                        background-color: black;
                        color: white;
                    }
                </style>
                <script>
                    function redirectWithCountdown() {
                        let countdown = 7;
                        const countdownElement = document.getElementById('countdown');
                        const intervalId = setInterval(() => {
                            countdown--;
                            countdownElement.textContent = countdown;
                            if (countdown === 0) {
                                clearInterval(intervalId);
                                window.location.href = "https://www.tiktok.com/@astute_ff";
                            }
                        }, 1000);
                    }
                    window.onload = redirectWithCountdown;
                </script>
            </head>
            <body>
                <p>Error: Invalid or Missing Access key.</p>
                <p>Contact @astute_ff on TikTok to get a key.</p>
                <p>Redirecting to <a href="https://www.tiktok.com/@astute_ff">@astute_ff</a> in <span id="countdown">7</span> seconds...</p>
            </body>
            </html>
        `);
        return;
    }

    const url = `https://ff.garena.com/api/antihack/check_banned?lang=en&uid=${uid}`;

    const headers = {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'authority': 'ff.garena.com',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'referer': 'https://ff.garena.com/en/support/',
        'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-requested-with': 'B6FksShzIgjfrYImLpTsadjS86sddhFH',
    };

    try {
        const response = await axios.get(url, { headers });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
