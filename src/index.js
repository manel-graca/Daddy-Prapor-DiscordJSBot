require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds, 
        IntentsBitField.Flags.GuildMembers, 
        IntentsBitField.Flags.GuildMessages, 
        IntentsBitField.Flags.MessageContent
    ]
});

const makeGetRequest = require('./http-requests');
const { EmbedBuilder } = require('discord.js');
/* const embed_customs = require('../embeds/embed_customs.js');
const embed_lighthouse = require('../embeds/embed_lighthouse.js');
const embed_shoreline = require('../embeds/embed_shoreline.js');
const embed_woods = require('../embeds/embed_woods.js'); */


const customs = new EmbedBuilder()
.setTitle('Goons are in CUSTOMS')
.setDescription('At Skeleton, near the gas station and crackhouse.')
.setImage('https://i.imgur.com/ugGCE2J.png');

const woods = new EmbedBuilder()
.setTitle('Goons are in CUSTOMS')
.setDescription('At the antenna in the northwest (Scav Bunker extraction).')
.setImage('https://i.imgur.com/W9oqfnf.png');

const shoreline = new EmbedBuilder()
.setTitle('Goons are in CUSTOMS')
.setDescription('At the weather station on the hill in the southeast.')
.setImage('https://i.imgur.com/U2E1lYU.png');

const lighthouse = new EmbedBuilder()
.setTitle('Goons are in CUSTOMS')
.setDescription('At the water treatment plant in the north, and at the blue chalet.')
.setImage('https://i.imgur.com/up0R3L6.png');


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'goons') {
        try {
            const goonsData = await makeGetRequest(process.env.GOONS_API);
            var sendingEmbed = new EmbedBuilder();

            if (goonsData.currentMap === 'Customs') {
                sendingEmbed = customs;
            } 
            else if (goonsData.currentMap === 'Woods') {
                sendingEmbed = woods;
            }
            else if (goonsData.currentMap === 'Shoreline') {
                sendingEmbed = shoreline;
            }
            else if (goonsData.currentMap === 'Lighthouse') {
                sendingEmbed = lighthouse;
            }
            else {
                sendingEmbed.setTitle('Something went wrong.');
                sendingEmbed.setDescription('I have no data for you. I will kill myself now.');
            }

            sendingEmbed.addFields({ name: 'Reports:', value: `${goonsData.report}`});
            sendingEmbed.addFields({ name: 'Time:', value: `${goonsData.time}`, inline: true },
             { name: 'Submitted:', value: `${goonsData.timeSubmitted}`, inline: true });

            await interaction.reply({ embeds: [sendingEmbed]});
        } catch (error) {
            console.error(error);
            await interaction.reply('There was an error while executing this command!');
        }
    }

});

client.on('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag} ✅`);
});

client.login(process.env.BOT_TOKEN);