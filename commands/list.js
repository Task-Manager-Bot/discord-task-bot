const Task = require("../models/Task");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("List of all tasks"),
  async execute(interactions) {
    const tasks = await Task.findAll({
      where: {
        archive: false,
        isDone: false,
        serverId: interactions.guild.id,
      },
      attributes: ["id", "text", "assignTo"],
    });

    let messageContent = tasks
      .map((task, idx) => {
        if (task.assignTo) {
          return `${idx + 1}. ${task.text} - <@${task.assignTo}> - ${
            task.id
          }\n`;
        } else {
          return `${idx + 1}. ${task.text} - ${task.id}\n`;
        }
      })
      .join("");

    await interactions.reply(
      messageContent +
        "\n To tick off a task, send `/done 1`. Replace 1 with the ID(last digit)" +
        "\n To view tasks done, send `/done-list`"
    );
  },
};
