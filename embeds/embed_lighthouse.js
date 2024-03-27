// In a file in the 'embeds' directory
const { MessageEmbed } = require('discord.js');

const embed = new MessageEmbed()
  .setTitle('Goons are in LIGHTHOUSE')
  .setDescription('At the water treatment plant in the north, and at the blue chalet.')
  .setImage('https://ibb.co/nw28N1R');

module.exports = embed;