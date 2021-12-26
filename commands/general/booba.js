const {SlashCommandBuilder} = require('@discordjs/builders');

// module.exports is how you export data in Node.js so that you can require() it in other files.
module.exports = {
  name: 'booba',
  description: 'III LLLLLOST',
  permission: 'SEND_MESSAGES',

  execute(interaction) {
    interaction.reply({
      content:
        'https://media2.giphy.com/media/Zacr2vR0H55QGV5ken/giphy.gif?cid=ecf05e47fj05z1ng8npyaz5ojoy6n6rj93zz25hhwyxvwo1n&rid=giphy.gif&ct=g',
    });
  },
};
