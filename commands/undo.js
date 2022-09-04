const Task = require("../models/Task");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("undo")
    .setDescription("Undo a done command")
    .addIntegerOption((option) =>
      option
        .setName("taskid")
        .setDescription("ID of the task you want to undo")
        .setRequired(true)
    ),
  async execute(interactions) {
    const id = interactions.options.getInteger("taskid");

    await interactions.reply("Checking...");
    const task = await Task.findByPk(id);

    if (task.serverId === interactions.guild.id) {
      await Task.update(
        { isDone: false },
        {
          where: {
            id,
          },
        }
      );
    } else {
      await interactions.followUp(
        "You can only tick off a task from the current server"
      );
    }

    await interactions.followUp(
      `Task with id ${id} has been added back to your todo list`
    );
  },
};
