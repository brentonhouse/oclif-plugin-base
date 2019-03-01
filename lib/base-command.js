const errors = require('@oclif/parser/lib/errors');
const _ = require('lodash');
const { Command } = require('@oclif/command');

class BaseCommand extends Command {
	checkRequiredArgs(commandArgs, args, flags, requiredArgs = []) {
	  console.error('you are here → checkRequiredArgs');
	   _.forEach(requiredArgs, arg => {
		   console.error(`args: ${JSON.stringify(args, null, 2)}`);
		   args[arg] = args[arg] || flags[arg];
		   if (args[arg]) {
			   // console.error('arg: ' + JSON.stringify(arg, null, 2));
			   _.pull(requiredArgs,  arg);
			   console.error(`requiredArgs: ${JSON.stringify(requiredArgs, null, 2)}`);
		   }
	   });

	   const filteredRequiredArgs = _.filter(commandArgs, o => {
		   return _.includes(requiredArgs, o.name);
	   });

	   if (filteredRequiredArgs.length) {
		   // console.error('filteredRequiredArgs: ' + JSON.stringify(filteredRequiredArgs, null, 2));
		   throw new errors.RequiredArgsError({ parse: {  }, args: filteredRequiredArgs });
	   }
	}
}

module.exports = BaseCommand;
