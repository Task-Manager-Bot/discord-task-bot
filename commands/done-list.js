const Task = require("../models/Task");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("done-list")
    .setDescription("List of all the completed tasks"),
  async execute(interactions) {
    const tasks = await Task.findAll({
      where: {
        archive: false,
        isDone: true,
        serverId: interactions.guild.id,
      },
      attributes: ["id", "text", "assignTo"],
    });
    console.log(tasks);
    // return console.log(tasks);
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
        "\n To Add a task back, send `/undo 1`. Replace 1 with the ID(last digit)"
    );
  },
};
