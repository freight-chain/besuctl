import Command from '@oclif/command';
export default class Find extends Command {
    static description: string;
    static aliases: string[];
    static args: {
        name: string;
    }[];
    run(): Promise<void>;
}
