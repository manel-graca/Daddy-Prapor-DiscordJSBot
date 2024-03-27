// In a file in the 'embeds' directory
const { MessageEmbed } = require('discord.js');

const embed = new MessageEmbed()
  .setTitle('Goons are in WOODS')
  .setDescription('At the antenna in the northwest (Scav Bunker extraction).')
  .setImage('https://ibb.co/L1vj4X4');

module.exports = embed;