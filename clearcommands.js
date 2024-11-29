const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { token, clientId } = require("./config.json");

const rest = new REST({ version: "9" }).setToken(token);

(async () => {
  try {
    console.log("Started clearing application (/) commands.");

    await rest.put(Routes.applicationCommands(clientId), { body: [] });

    console.log("Successfully cleared application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
