import Command from '@oclif/command';
import chalk from 'chalk';
import Table from 'cli-table';
import besuctl from '../api/controllers';

export default class Find extends Command {
  static description = 'Get one or more specific keys';

  static aliases = ['get', 'select'];

  static args = [
    { name: 'input' },
  ];

  async run() {
    const { args: { input } } = this.parse(Find);
    const table = new Table({
      head: [
        chalk.blueBright.bold('#'),
        chalk.blueBright.bold('Alias'),
        chalk.blueBright.bold('Login'),
        chalk.blueBright.bold('Email'),
        chalk.blueBright.bold('Key'),
      ],
    });

    // TODO: Make sure flags have affect here
    if (input) {
      const results = besuctl.search(input);

      results.forEach((o: Key, i: number) => {
        table.push([i, o.alias, o.login, o.email, `**********${o.key.slice(-4)}`]);
      });

      this.log(table.toString());
    }
  }
}
