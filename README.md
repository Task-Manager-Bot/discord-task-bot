# Discord Task Manager Bot

## Usage

To use directly, click on this [link](https://discord.com/api/oauth2/authorize?client_id=829723733966979142&permissions=8&scope=bot)

## How to use?

Just add, assign(if needed) and mark as done(tick off)

1. t!add <text> - Add a new task (Mention someone to assign to them)
2. t!list - List all tasks(not done)
3. t!done <id in list> - Mark a task as done
4. t!done-list - List all tasks(done)
5. t!undo <id in list> - Unmark a task as done

## Setup

### With Docker

1. Clone

```sh
git clone git@github.com:Task-Manager-Bot/discord-task-bot.git
```

2. Install Dependencies

```sh
npm install
yarn
```

3. Fill .env with Discord Bot Token (Developer Portal)

```sh
cp .env.docker.example .env
```

4. Run docker compose

```sh
docker-compose up
```

### Without Docker

1. Clone

```sh
git clone git@github.com:Task-Manager-Bot/discord-task-bot.git
```

2. Install Dependencies

```sh
npm install
yarn
```

3. Fill .env with Discord Bot Token (Developer Portal)

```sh
cp .env.example .env
```

4. Change DB host in `db` to `localhost` in `config/sequelize.js`

5. Run locally (using nodemon)

```sh
npm run dev
yarn dev
```

## Contributing

Read the [CONTRIBUTING.md](CONTRIBUTING.md) file
