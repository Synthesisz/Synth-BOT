// module.exports is how you export data in Node.js so that you can require() it in other files.
module.exports = {
  name: 'cringe',
  description: 'cringe',
  // permission: 'SEND_MESSAGES',
  async execute(interaction) {
    await interaction.reply({
      content: `https://media1.giphy.com/media/28B7EP5TnfHBSXt5Qn/giphy.gif?cid=ecf05e474kmyobefsd2kc3ua5i44y0kitbuyf8im8edyzv1v&rid=giphy.gif&ct=g`,
    });
  },
};
