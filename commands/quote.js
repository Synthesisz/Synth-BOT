const {SlashCommandBuilder} = require('@discordjs/builders');
const fetch = require('isomorphic-unfetch');
const {getQuote} = require('../utility/fetch-quote');
const {commandInfo, errorResponse, formatResponse} = require('../utility/format quote');

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
    .setDescription('Get a random quote or get a specific one by anime/character name.'),
  //.addStringOption(random => random.setName('random').setDescription('all random'))
  /**
   *
   * @param {SlashCommandBuilder}
   */
  //args: true,

  async execute(interaction, args) {
    /**
     * !quote random
     * When only !quote has been passed with no arguments
     */
    if (args === 'random' || !args) {
      const response = await getQuote('random');
      const rng = await `**Anime:** ${response.anime}
**Character:** ${response.character}
**Quote:** ${response.quote}`;
      return interaction.reply(rng);
    }

    /**
     * !quote anime <anime_title>
     * When the second argument is anime followed by the Anime title
     */
    if (args === 'anime') {
      const animeName = args.slice(1).join(' ');
      if (!animeName) {
        return interaction.reply(
          errorResponse('No anime name is provided. Please provide a valid anime name')
        );
      }

      const response = await getQuote(`quotes/anime?title=${animeName}`);
      const animeresult = await `**Anime:** ${response.anime}
**Character:** ${response.character}
**Quote:** ${response.quote}`;
      if (!response) {
        return interaction.reply(
          errorResponse(`No quotes from "${animeName}" are available now !`)
        );
      }

      return interaction.reply(formatResponse(animeresult));
    }

    /**
     * !quote char <character_name>
     *  When the second argument is char followed by the Character name
     */
    if (args[0] === 'char') {
      const characterName = args.slice(1).join(' ');
      if (!characterName) {
        return interaction.reply(
          errorResponse('No anime name is provided. Please provide a valid anime name')
        );
      }

      const response = await getQuote(`quotes/character?name=${characterName}`);

      if (!response)
        return interaction.reply(
          errorResponse(`No quotes from "${characterName}" are available now !`)
        );

      return interaction.reply(formatResponse(response));
    }

    return interaction.reply('⚠️ **That is not a valid command!');
  },
};
