// In a file in the 'embeds' directory
const { MessageEmbed } = require('discord.js');

const embed = new MessageEmbed()
  .setTitle('Goons are in SHORELINE')
  .setDescription('At the weather station on the hill in the southeast.')
  .setImage('https://ibb.co/Th3nd9H');

module.exports = embed;