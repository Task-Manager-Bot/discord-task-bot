const { client } = require("../index.js");
module.exports = {
  name: "ready",
  once: true,
  execute() {
    console.log("I am READY!");
    setInterval(() => {
      const activities = ["Bot is up"];
      const activity =
        activities[Math.floor(Math.random() * activities.length)];
      client.user.setActivity(activity, { type: "WATCHING" });
    }, 5000);
  },
};
