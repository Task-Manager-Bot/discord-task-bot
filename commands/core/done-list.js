const Task = require("../../models/Task");
const Discord = require("discord.js");
module.exports = {
  name: "done-list",
  description: "ticks off the completed task",
  async run(client, message, args) {
    const tasks = await Task.findAll({
      where: {
        archive: false,
        isDone: true,
        serverId: message.guild.id,
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

    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Task List (Done)")
      .setDescription(
        messageContent +
          "\n To Add a task back, send `t!undo 1`. Replace 1 with the ID(last digit)"
      );

    return message.channel.send(embed);
  },
};
