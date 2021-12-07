const {SlashCommandBuilder} = require('@discordjs/builders');
const fetch = require('isomorphic-unfetch');
const {getQuote} = require('../utility/fetch-quote');
// const {commandInfo, errorResponse, formatResponse} = require('../utility/format quote');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quote')
    .setDescription('Get a random quote or get a specific one by anime/character name.'),
  async execute(interaction) {
    //const response = await getQuote('random');
    await interaction.reply(await getQuote('random'));
  },
  /**
   *
   * @param {SlashCommandBuilder}
   */
};

// module.exports = {
//   data: new SlashCommandBuilder()
//     .setName('quote')
//     .setDescription('Get a random quote or get a specific one by anime/character name.'),

//   /**
//    *
//    * @param {SlashCommandBuilder}
//    */
//   args: true,
//   usage: commandInfo,
//   async execute(interaction, args) {
//     /**
//      * !quote random
//      * When only !quote has been passed with no arguments
//      */
//     if (args[0] === 'random') {
//       const response = await getQuote('/random');
//       return interaction.channel.send(formatResponse(response));
//     }

//     /**
//      * !quote anime <anime_title>
//      * When the second argument is anime followed by the Anime title
//      */
//     if (args[0] === 'anime') {
//       const animeName = args.slice(1).join(' ');
//       if (!animeName) {
//         return interaction.channel.send(
//           errorResponse('No anime name is provided. Please provide a valid anime name')
//         );
//       }

//       const response = await getQuote(`/quotes/anime?title=${animeName}`);

//       if (!response) {
//         return interaction.channel.send(
//           errorResponse(`No quotes from "${animeName}" are available now !`)
//         );
//       }

//       return interaction.channel.send(formatResponse(response));
//     }

//     /**
//      * !quote char <character_name>
//      *  When the second argument is char followed by the Character name
//      */
//     if (args[0] === 'char') {
//       const characterName = args.slice(1).join(' ');
//       if (!characterName) {
//         return interaction.channel.send(
//           errorResponse('No anime name is provided. Please provide a valid anime name')
//         );
//       }

//       const response = await getQuote(`/quotes/character?name=${characterName}`);

//       if (!response)
//         return interaction.channel.send(
//           errorResponse(`No quotes from "${characterName}" are available now !`)
//         );

//       return interaction.channel.send(formatResponse(response));
//     }

//     return interaction.channel.send('⚠️ **That is not a valid command!');
//   },
// };
