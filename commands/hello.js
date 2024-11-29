const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("Sends a greeting to the user!"),
  async execute(interaction) {
    await interaction.reply(`Hello ${interaction.user.globalName}`);
  },
};
