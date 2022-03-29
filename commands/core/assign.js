const Task = require("../../models/Task");
const Discord = require("discord.js");

module.exports = {
  name: "assign",
  description: "assign task to a user",
  async run(client, message, args) {
    try {
      const textWithTaggedUser = args.join(" ");
      // Replace tagged users with ""
      const rg = /<@\![0-9]{1,}>/;
      const taskId = parseInt(textWithTaggedUser.replace(rg, ""));

      if (!taskId) {
        const errorEmbed = new Discord.MessageEmbed()
          .setColor("#0099ff")
          .setTitle("Error")
          .setDescription(
            "You need to enter the id of the task to tick it off\n" +
              "Enter `t!help` for help"
          );
        return message.channel.send(errorEmbed);
      }

      // Get Tagged User (first) to assign
      const taggedUser = message.mentions.users.first();
      if (!taggedUser) {
        const errorEmbed = new Discord.MessageEmbed()
          .setColor("#0099ff")
          .setTitle("Error")
          .setDescription(
            "You need to mention a user to assign them to the task" +
              "Enter `t!help` for help"
          );
        return message.channel.send(errorEmbed);
      }

      const taggedUserId = taggedUser.id;

      const task = await Task.findByPk(taskId);

      if (!task) {
        const errorEmbed = new Discord.MessageEmbed()
          .setColor("#0099ff")
          .setTitle("Error")
          .setDescription("Task does not exist");
        return message.channel.send(errorEmbed);
      }

      if (task.serverId !== message.guild.id) {
        const errorEmbed = new Discord.MessageEmbed()
          .setColor("#0099ff")
          .setTitle("Error")
          .setDescription(
            "You can only tick off a task from the current server"
          );
        return message.channel.send(errorEmbed);
      }

      await Task.update(
        { assignTo: taggedUserId },
        {
          where: {
            id: taskId,
          },
        }
      );

      const embed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Assigned")
        .setDescription(`Assigned successfully`);
      return message.channel.send(embed);
    } catch (error) {
      console.error(error.toString());
      return message.channel.send("Couldn't assign to task");
    }
  },
};
