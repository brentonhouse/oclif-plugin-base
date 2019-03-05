const errors = require('@oclif/parser/lib/errors');
const _ = require('lodash');
const { Command  } = require('@oclif/command');
const fs = require('fs-extra');
const path = require('path');
// const { dump  } = require('dumper.js');

class BaseCommand extends Command {
	readUserConfig() {
		if (!BaseCommand.config) {
			BaseCommand.config = fs.readJsonSync(path.join(this.config.configDir, 'config.json')) || {};
		}
	}

	async writeUserConfig(config) {
		// dump(this);
		if (!config) {
			return;
		}
		return await fs.outputJSON(path.join(this.config.configDir, 'config.json'), config);
	}
	get compositeConfig() {
		this.readUserConfig();

		return BaseCommand.config;
	}
	checkRequiredArgs(commandArgs, args, flags, requiredArgs = []) {
		_.forEach(requiredArgs, arg => {
			args[arg] = args[arg] || flags[arg];
			if (args[arg]) {
				_.pull(requiredArgs, arg);
			}
		});

		const filteredRequiredArgs = _.filter(commandArgs, o => {
			return _.includes(requiredArgs, o.name);
		});

		if (filteredRequiredArgs.length) {
			throw new errors.RequiredArgsError({
				parse: {},
				args:  filteredRequiredArgs,
			});
		}
	}
}

BaseCommand.executable = path.basename(process.argv[1]);

module.exports = BaseCommand;
