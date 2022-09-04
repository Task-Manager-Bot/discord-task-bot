const Task = require("../models/Task");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("Add New Task")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("The text describing the task")
        .setRequired(true)
    )
    .addMentionableOption((option) =>
      option
        .setName("assign")
        .setDescription("Mention to assign the task to someone.")
    ),
  async execute(interactions) {
    try {
      const text = interactions.options.getString("text");
      const taggedUser = interactions.options.getMentionable("assign");
      console.log(taggedUser);
      let taggedUserId = "";
      if (taggedUser) {
        taggedUserId = taggedUser.id;
      }

      const serverId = interactions.guild.id;

      await interactions.reply("Creating task...");
      const newTask = await Task.create({
        text,
        serverId,
        assignTo: taggedUserId,
      });

      await interactions.followUp(`task ${newTask.text} was added`);
    } catch (error) {
      console.error(error.toString());
      await interactions.reply(`Something went wrong`);
    }
  },
};
