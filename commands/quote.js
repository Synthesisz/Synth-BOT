const {SlashCommandBuilder} = require('@discordjs/builders');
const {getQuote} = require('../utility/fetch-quote');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quote')
    .setDescription('Get a random quote or get a specific one by anime/character name.')
    .addStringOption(option =>
      option.setName('anime').setDescription('Search for quotes by anime name.')
    )
    .addStringOption(option =>
      option.setName('character').setDescription('Search for quotes by character name.')
    ),

  async execute(interaction) {
    const isanime = interaction.options.getString('anime');
    const ischaracter = interaction.options.getString('character');
    console.log(isanime);
    console.log(ischaracter);

    //GET RANDOM
    if (!isanime && !ischaracter) {
      const response = await getQuote('random');
      const result = `**Anime:** ${response.anime}
**Character:** ${response.character}
**Quote:** ${response.quote}`;
      return interaction.reply(result);
    }
    //GET BY ANIME NAME
    if (isanime) {
      const response = await getQuote(`quotes/anime?title=${isanime}`);

      if (response.error) {
        await interaction.reply(`No quotes from "${isanime}" are available now !`);
      }
      const randomnumber = Math.floor(Math.random() * response.length);
      const animeresult = `**Anime:** ${response[randomnumber].anime}
**Character:** ${response[randomnumber].character}
**Quote:** ${response[randomnumber].quote}`;
      await interaction.reply(animeresult);
    }
    // GET BY CHARACTER NAME
    if (ischaracter) {
      const response = await getQuote(`quotes/character?name=${ischaracter}`);

      if (response.error) {
        await interaction.reply(`No quotes from "${ischaracter}" are available now !`);
      }
      const randomnumber1 = Math.floor(Math.random() * response.length);
      const result = `**Anime:** ${response[randomnumber1].anime}
**Character:** ${response[randomnumber1].character}
**Quote:** ${response[randomnumber1].quote}`;
      await interaction.reply(result);
    }
  },
};
