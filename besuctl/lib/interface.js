import { createInterface as _createInterface } from 'readline';
import {
    showCommandsHelp,
    showBesuInfo,
    showNodeInfo,
    showTxInfo,
    showStakeState,
    showPoolStatus,
    showFragmentLogs, verifyConnection
} from './helpers';


const checkConnection = async nodeAddress => {
    console.log(`Connecting to ${nodeAddress}...`);
    const connected = await verifyConnection(nodeAddress);
    if (connected) {
        return true;
    }

    return false;
};

const connectToNode = async restPort => {
    const nodeAddress = `http://localhost:${restPort}`;
    const couldConnect = await checkConnection(nodeAddress);

    if (couldConnect) {
        console.log('Connected!');
        console.log('');
        console.log('Please input a command:');
        createInterface(nodeAddress);
    } else {
        console.log(
            `Could not connect to ${nodeAddress}. Network Connectivity Issue Ref #401`
        );
    }
};

const commands = [
    { command: 'help', action: showCommandsHelp },
    { command: 'exit', action: ({ rl }) => rl.emit('SIGINT') },
    {
        command: 'besu-info',
        action: ({ nodeAddress }) => showBesuInfo(nodeAddress)
    },
    {
        command: 'node-info',
        action: ({ nodeAddress }) => showNodeInfo(nodeAddress)
    },
    { command: 'tx', action: ({ nodeAddress }) => showTxInfo(nodeAddress) },
    {
        command: 'stake-state',
        action: ({ nodeAddress }) => showStakeState(nodeAddress)
    },
    {
        command: 'pool-status',
        action: ({ nodeAddress }) => showPoolStatus(nodeAddress)
    },
    {
        command: 'fragment-logs(.*)?',
        action: ({ nodeAddress, query }) => showFragmentLogs(nodeAddress, query)
    }
];

const createInterface = nodeAddress => {
    const rl = _createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'besuctl > ',
        completer: line => {
            const completions = [
                'help',
                'besu-info',
                'node-info',
                'tx',
                'stake-state',
                'pool-status',
                'fragment-logs',
                'exit'
            ];
            const hits = completions.filter(c => c.startsWith(line));
            // Show all completions if none found
            return [hits.length ? hits : completions, line];
        }
    });
    rl.prompt();
    rl.on('line', async cmd => {
        const found = commands.find(c => new RegExp(c.command).test(cmd));
        if (found) {
            const query = new RegExp(found.command).exec(cmd)[1];
            await found.action({
                nodeAddress,
                query: query ? query.trim() : query,
                rl
            });
        } else {
            console.log(
                `${cmd} is not a valid command. Write 'help' to list all available commands`
            );
        }
        rl.prompt();
    });
    rl.on('SIGINT', () => {
        rl.question('Are you sure you want to exit? (`yes` to exit) ', answer => {
            if (answer.match(/^y(es)?$/i)) {
                rl.close();
            } else {
                rl.resume();
                rl.prompt();
            }
        });
    });
    rl.on('close', () => console.log('')); // enter new line
};

const agreeTOS = () => {
    const rl = _createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const question = () => {
        rl.question('DO YOU ACCEPT THE TERMS? (Y/N): ', async answer => {
            if (answer.toLowerCase() === 'n' || answer.toLowerCase() === 'no') {
                process.exit(1);
            }

            if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
                process.exit(0);
            } else {
                question();
            }
        });
    };
    question();
    rl.on('SIGINT', () => process.exit(1));
};

export default {
    checkConnection,
    connectToNode,
    createInterface,
    agreeTOS
};