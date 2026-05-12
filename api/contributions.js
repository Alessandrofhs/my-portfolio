export default async function handler(req, res) {
    const { year } = req.query;
    const from = `${year}-01-01T00:00:00Z`;
    const to = `${year}-12-31T23:59:59Z`;

    const query = `{
        user(login: "alessandrofhs") {
            contributionsCollection(from: "${from}", to: "${to}") {
                contributionCalendar {
                    totalContributions
                    weeks {
                        contributionDays {
                            contributionCount
                            date
                        }
                    }
                }
            }
        }
    }`;

    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Authorization': `bearer ${process.env.GITHUB_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    });

    const data = await response.json();
    res.status(200).json(data.data.user.contributionsCollection.contributionCalendar);
}