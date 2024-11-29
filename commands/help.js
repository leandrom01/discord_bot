const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("List all commands or get info about a specific command")
    .addStringOption((option) =>
      option
        .setName("command")
        .setDescription("The command to get info about")
        .setRequired(false)
    ),

  async execute(interaction) {
    const commandName = interaction.options.getString("command");
    const { commands } = interaction.client;

    if (!commandName) {
      // List all commands
      const helpEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Available Commands")
        .setDescription("Here is a list of all available commands:");

      commands.forEach((command) => {
        helpEmbed.addFields({
          name: `/${command.data.name}`,
          value: command.data.description,
        });
      });

      await interaction.reply({ embeds: [helpEmbed] });
    } else {
      // Get info about a specific command
      const command = commands.get(commandName.toLowerCase());

      if (!command) {
        await interaction.reply({
          content: "That command does not exist!",
          ephemeral: true,
        });
        return;
      }

      const commandEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`/${command.data.name}`)
        .setDescription(command.data.description)
        .addFields(
          {
            name: "Description",
            value: command.data.description || "No description provided.",
          },
          { name: "Usage", value: `/${command.data.name}` }
        );

      await interaction.reply({ embeds: [commandEmbed] });
    }
  },
};
