const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .addStringOption((option) =>
      option
        .setName("command")
        .addChoices(
          {
            name: "list",
            value: "list",
          },
          {
            name: "done-list",
            value: "done-list",
          },
          {
            name: "add",
            value: "add",
          },
          {
            name: "mention",
            value: "mention",
          },
          {
            name: "done",
            value: "done",
          },
          {
            name: "undo",
            value: "undo",
          }
        )
        .setDescription("The command for which you need the help menu")
    )
    .setDescription("List all commands"),
  async execute(interactions) {
    const commandString = interactions.options.getString("command");
    let command;
    const commandsPath = path.join(__dirname, "../commands");
    const commandsFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandsFiles) {
      const filePath = path.join(commandsPath, file);
      const fileCommand = require(filePath);
      if (fileCommand.data.name === commandString) {
        command = fileCommand.data;
      }
    }

    const replyEmbed = new EmbedBuilder()
      .setTitle(
        "Task Manager Bot's Help Page" +
          (commandString ? ` for ${commandString} command` : "")
      )
      .setDescription(
        "Task Manager is a very simple and easy to use task manager for your server. In order to use the Task Manager Bot, type `/` and checkout the slash commands."
      )
      .addFields(
        commandString
          ? [
              {
                name: "Task Name",
                value: commandString,
                inline: true,
              },
              {
                name: "Description",
                value: command.description,
                inline: true,
              },
              {
                name: "Options",
                value:
                  command.options.length > 0
                    ? command.options
                        .map(
                          (option) =>
                            `**${option.name}** - ${option.description} (${
                              option.required ? "Required" : "Optional"
                            })`
                        )
                        .join("\n")
                    : "No Options",
              },
            ]
          : [
              {
                name: "🔎 List",
                value: "`/list` `/done-list`",
                inline: true,
              },
              {
                name: "📝 Create and Assign",
                value: "`/add` `/mention`",
                inline: true,
              },
              {
                name: "✅ Mark Tasks",
                value: "`/done` `/undo`",
                inline: true,
              },
            ]
      )
      .addFields([
        {
          name: "Links",
          value:
            "[Invite Me](https://discord.com/api/oauth2/authorize?client_id=829723733966979142&permissions=268462160&scope=bot) - [Visit](https://task-manager-bot.github.io/) - [Vote for Us!](https://top.gg/bot/829723733966979142)",
        },
      ])
      .addFields([
        {
          name: "\u200B",
          value: commandString
            ? "To view other commands, type `/help`"
            : "For detailed info into a specific command, type `/help commandname`",
        },
      ])
      .setThumbnail("https://task-manager-bot.github.io/img/Logo.png")
      .setURL("https://task-manager-bot.github.io/");

    await interactions.reply({ embeds: [replyEmbed] });
  },
};
