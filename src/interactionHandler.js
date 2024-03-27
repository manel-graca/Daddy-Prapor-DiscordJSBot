// interactionHandler.js

const { EmbedBuilder } = require("discord.js");
const makeGetRequest = require("./http-requests");

const customs = new EmbedBuilder()
  .setTitle("Goons are in CUSTOMS")
  .setDescription("At Skeleton, near the gas station and crackhouse.")
  .setImage("https://i.imgur.com/ugGCE2J.png");

const woods = new EmbedBuilder()
  .setTitle("Goons are in WOODS")
  .setDescription("At the antenna in the northwest (Scav Bunker extraction).")
  .setImage("https://i.imgur.com/W9oqfnf.png");

const shoreline = new EmbedBuilder()
  .setTitle("Goons are in SHORELINE")
  .setDescription("At the weather station on the hill in the southeast.")
  .setImage("https://i.imgur.com/U2E1lYU.png");

const lighthouse = new EmbedBuilder()
  .setTitle("Goons are in LIGHTHOUSE")
  .setDescription(
    "At the water treatment plant in the north, and at the blue chalet.",
  )
  .setImage("https://i.imgur.com/up0R3L6.png");

async function handleInteraction(interaction) {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "goons") {
    try {
      const goonsData = await makeGetRequest(process.env.GOONS_API);
      let sendingEmbed;
      let _color = 15418782; // init as red

      switch (goonsData.currentMap) {
        case "Customs":
          sendingEmbed = customs;
          _color = 9807270;
          break;
        case "Woods":
          sendingEmbed = woods;
          _color = 5763719;
          break;
        case "Shoreline":
          sendingEmbed = shoreline;
          _color = 15277667;
          break;
        case "Lighthouse":
          sendingEmbed = lighthouse;
          _color = 3447003;
          break;
        default:
          sendingEmbed = new EmbedBuilder()
            .setTitle("Something went wrong.")
            .setDescription("I have no data for you. I will kill myself now.");
      }
      sendingEmbed.setThumbnail('https://i.imgur.com/UDZyuk7.png');
      sendingEmbed.setColor(_color);
      sendingEmbed.setFields([
        { name: "Reports:", value: `${goonsData.report}` },
        { name: "Time:", value: `${goonsData.time}`, inline: true },
        { name: "Submitted:", value: `${goonsData.timeSubmitted}`, inline: true },
      ]);
      
      await interaction.reply({ embeds: [sendingEmbed] });
    } catch (error) {
      console.error(error);
      await interaction.reply("There was an error while executing this command!");
    }
  }
}

module.exports = { handleInteraction };
