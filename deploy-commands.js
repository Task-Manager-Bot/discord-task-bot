require("dotenv").config();
const { SlashCommandBuilder, Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
const fs = require("node:fs");
const path = require("node:path");

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandsFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandsFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

rest
  .put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
    body: commands,
  })
  .then((data) =>
    console.log(`Successfully registered ${data.length} application commands.`)
  )
  .catch(console.error);

// rest
//   .put(
//     Routes.applicationGuildCommands(
//       process.env.DISCORD_CLIENT_ID,
//       "829566886206373908"
//     ),
//     { body: [] }
//   )
//   .then(() => console.log("Successfully deleted all guild commands."))
//   .catch(console.error);
