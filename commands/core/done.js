const Task = require("../../models/Task");
const Discord = require("discord.js");
module.exports = {
  name: "done",
  description: "ticks off the completed task",
  async run(client, message, args) {
    const splitArgs = args.split(" ");
    const id = parseInt(splitArgs.shift());

    if (!id) {
      const errorEmbed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Error")
        .setDescription(
          "You need to enter the id of the task to tick it off\n" +
            "Enter `t!help` for help"
        );
      return message.channel.send(errorEmbed);
    }

    const task = await Task.findByPk(id);
    if (task.serverId === message.guild.id) {
      await Task.update(
        { isDone: true },
        {
          where: {
            id,
          },
        }
      );
    } else {
      const errorEmbed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Error")
        .setDescription("You can only tick off a task from the current server");
      return message.channel.send(errorEmbed);
    }

    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Done ✅")
      .setDescription(`Task with id ${id} has been ticked off your todo list`);
    message.channel.send(embed);
    return message.react("👍");
  },
};
