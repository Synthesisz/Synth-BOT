const {SlashCommandBuilder} = require('@discordjs/builders');
const {Interaction} = require('discord.js');
const {getQuote} = require('../utility/fetch-quote');
const {errorResponse} = require('../utility/format quote');

// module.exports = {
//   data: new SlashCommandBuilder()
//     .setName('quote')
//     .setDescription('Get a random quote or get a specific one by anime/character name.'),
//   async execute(interaction, args) {
//     //const response = await getQuote('random');

//     await interaction.reply(await getQuote('random'));
//   },
//   /**
//    *
//    * @param {SlashCommandBuilder}
//    */
// };

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quote')
    .setDescription('Get a random quote or get a specific one by anime/character name.')
    .addStringOption(option =>
      option.setName('anime').setDescription('Search for quotes by anime name.')
    ),

  async execute(interaction) {
    const isanime = interaction.options.getString('anime');
    console.log(isanime);
    if (!isanime) {
      const response = await getQuote('random');
      const rng = `**Anime:** ${response.anime}
**Character:** ${response.character}
**Quote:** ${response.quote}`;
      return interaction.reply(rng);
    }
    if (isanime) {
      const response = await getQuote(`quotes/anime?title=${isanime}`);
      if (response.error) {
        await interaction.reply(`No quotes from "${isanime}" are available now !`);
      }
      const randomnumber = Math.floor(Math.random() * 10);
      const animeresult = `**Anime:** ${response[randomnumber].anime}
**Character:** ${response[randomnumber].character}
**Quote:** ${response[randomnumber].quote}`;
      await interaction.reply(animeresult);
    }
  },
};
