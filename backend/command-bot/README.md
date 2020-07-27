# command-bot

It is the bot worker that listens to the `commands` queue and posts on the `messages` queue the processed commands.

## Architecture

This project has the following modules:

- `bin`: contains the entrypoint of the application
- `commands`: has code for each type of command that can be handled by the bot
