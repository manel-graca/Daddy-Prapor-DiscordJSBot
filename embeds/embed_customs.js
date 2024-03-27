// In a file in the 'embeds' directory
const { EmbedBuilder } = require('discord.js');

const embed = new EmbedBuilder()
  .setTitle('Goons are in CUSTOMS')
  .setDescription('At Skeleton, near the gas station and crackhouse.')
  .setImage('https://ibb.co/1MC4tGc');

module.exports = embed;
