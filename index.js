require("dotenv").config();
const Discord = require("discord.js");

const client = new Discord.Client();
// const sequelize = require("./config/sequelize");
const Task = require("./models/Task");

const PREFIX = "t!";

client.once("ready", () => Task.sync());

client.on("message", async (message) => {
  if (message.content.startsWith(PREFIX)) {
    const input = message.content.slice(PREFIX.length).trim().split(" ");
    const command = input.shift();
    const commandArgs = input.join(" ");

    if (command === "add") {
      try {
        const splitArgs = commandArgs.split(" ");
        const textWithTaggedUser = splitArgs.join(" ");
        // Replace tagged users with ""
        const rg = /<@\![0-9]{1,}>/;
        const text = textWithTaggedUser.replace(rg, "");

        // Get Tagged User (first) to assign
        const taggedUser = message.mentions.users.first();
        let taggedUserId = "";
        if (taggedUser) {
          taggedUserId = taggedUser.id;
        }

        const serverId = message.guild.id;

        const newTask = await Task.create({
          text,
          serverId,
          assignTo: taggedUserId,
        });

        const embed = new Discord.MessageEmbed()
          .setColor("#0099ff")
          .setTitle("Added")
          .setDescription(`Task ${newTask.text} was added`);
        return message.channel.send(embed);
      } catch (error) {
        console.error(error.toString());
        return message.channel.send("Couldn't create task");
      }
    }

    if (command === "list") {
      const tasks = await Task.findAll({
        where: {
          archive: false,
          isDone: false,
          serverId: message.guild.id,
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

      const embed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Task List (Not Done)")
        .setDescription(
          messageContent +
            "\n To tick of a task, send `t!done 1`. Replace 1 with the ID(last digit)" +
            "\n To view tasks done, send `t!done-list`"
        );

      return message.channel.send(embed);
    }

    if (command === "done") {
      const splitArgs = commandArgs.split(" ");
      const id = parseInt(splitArgs.shift());

      await Task.update(
        { isDone: true },
        {
          where: {
            id,
          },
        }
      );

      const embed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Done ✅")
        .setDescription(
          `Task with id ${id} has been ticked off your todo list`
        );
      message.channel.send(embed);
      return message.react("👍");
    }

    if (command === "done-list") {
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
    }

    if (command === "undo") {
      const splitArgs = commandArgs.split(" ");
      const id = parseInt(splitArgs.shift());

      await Task.update(
        { isDone: false },
        {
          where: {
            id,
          },
        }
      );
      const embed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Undo")
        .setDescription(
          `Task with id ${id} has been added back to your todo list`
        );
      return message.channel.send(embed);
    }

    if (command === "help") {
      const embed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Help")
        .setDescription(
          `
            1. \`t!add <text>\` - Add a new task (Mention someone to assign to them)
            2. \`t!list\` - List all tasks(not done)
            3. \`t!done <id in list>\` - Mark a task as done
            4. \`t!done-list\` - List all tasks(done)
            5. \`t!undo <id in list>\` - Unmark a task as done
          `
        );

      return message.channel.send(embed);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
