import { PatreonAPI } from '../src'
import { config } from 'dotenv'
config();

const accessToken = process.env.PATREON_TOKEN;
if (accessToken === undefined) {
    throw new Error('Access token undefined!');
}

const api = new PatreonAPI(accessToken);

async function dump() {
    const user = await api.getCurrentUser();
    console.log(`Current user: ${user.firstName} ${user.lastName} (${user.url})`);

    const campaigns = await api.getCurrentUserCampaigns();
    console.log(`Owned campaigns: ${campaigns.length}`);

    for (const campaign of campaigns) {
        console.log(`- '${campaign.creationName}' with ${campaign.patronCount} patrons and ${campaign.rewards.length} rewards (${campaign.id})`);
        
        const pledges = await campaign.getAllPledges();
        for (const pledge of pledges) {
            console.log(`  * ${pledge.amount} cents (${pledge.currency}) from ${pledge.patron.firstName} ${pledge.patron.lastName} (${pledge.id})`);
        }
    }
}

dump();
