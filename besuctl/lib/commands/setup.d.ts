import { Command } from '@oclif/command';
export default class Add extends Command {
    static description: string;
    static aliases: string[];
    run(): Promise<void>;
}
