const Task = require("../models/Task");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "done",
  description: "ticks off the completed task",
  data: new SlashCommandBuilder()
    .setName("done")
    .setDescription("Done")
    .addIntegerOption((option) =>
      option
        .setName("taskid")
        .setDescription("ID of the task you want to tick off")
        .setRequired(true)
    ),
  async execute(interactions) {
    const id = interactions.options.getInteger("taskid");

    await interactions.reply("Checking...");
    const task = await Task.findByPk(id);

    if (!task) {
      await interactions.followUp("Task does not exist.");
    }

    if (task.serverId === interactions.guild.id) {
      await Task.update(
        { isDone: true },
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
      `Task with id ${id} has been ticked off from your todo list`
    );
  },
};
