const {Perms} = require('../Validation/Permissions');
const {Client} = require('discord.js');
const {promisify} = require('util');
const {glob} = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');
/**
 * @param {Client} client
 */
module.exports = async client => {
  const Table = new Ascii('Command Loaded');
  CommandsArray = [];
  (await PG(`${process.cwd()}/commands/*/*.js`)).map(async file => {
    const command = require(file);

    if (!command.name) return Table.addRow(file.split('/')[7], '🔴 FAILED', 'Missing a name.');

    if (!command.description) return Table.addRow(command.name, '🔴 FAILED', 'Missing a description.');

    // if (command.permission) {
    //   if (Perms.includes(command.permission)) command.defaultPermission = false;
    //   else return Table.addRow(command.name, '🔴 FAILED', 'Permission is invalid.');
    // }

    client.commands.set(command.name, command);
    CommandsArray.push(command);
    await Table.addRow(command.name, '🟢 SUCCESSFUL');
  });
  console.log(Table.toString());

  //PERMS CHECK
  client.on('ready', async () => {
    client.guilds.cache.forEach(g => {
      g.commands.set(CommandsArray);
    });
  });

  client.on('guildCreate', async guild => {
    guild.commands.set(CommandsArray);
  });
};
