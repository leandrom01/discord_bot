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
        .setTitle("🌟 Available Commands 🌟")
        .setDescription("Here is a list of all available commands:")
        .setFooter({
          text: "Use /help [command] for more details about a specific command.",
        })
        .setTimestamp();

      commands.forEach((command) => {
        helpEmbed.addFields({
          name: `/${command.data.name}`,
          value: `${command.data.description} \n`,
        });
      });

      await interaction.reply({ embeds: [helpEmbed] });
    } else {
      // Get info about a specific command
      const command = commands.get(commandName.toLowerCase());

      if (!command) {
        await interaction.reply({
          content: "⚠️ That command does not exist! Please try again.",
          ephemeral: true,
        });
        return;
      }

      const commandEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`📝 Command: /${command.data.name}`)
        .addFields(
          {
            name: "Description",
            value: command.data.description || "No description provided.",
          },
          {
            name: "Usage",
            value: `/${command.data.name}`,
          }
        )
        .setFooter({
          text: `Use /help to view all commands.`,
        })
        .setTimestamp();

      await interaction.reply({ embeds: [commandEmbed] });
    }
  },
};
