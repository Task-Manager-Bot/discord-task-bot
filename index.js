require("dotenv").config();
const Discord = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

const client = new Discord.Client({
  intents: [Discord.GatewayIntentBits.Guilds],
});

client.commands = new Discord.Collection();

const commandsPath = path.join(__dirname, "commands");
const commandsFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandsFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  client.commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log("Bot is ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.on("error", console.error);
client.login(process.env.DISCORD_TOKEN);
