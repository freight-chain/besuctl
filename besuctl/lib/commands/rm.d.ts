import Command from '@oclif/command';
export default class Remove extends Command {
    static description: string;
    static aliases: string[];
    static args: {
        name: string;
        required: boolean;
        description: string;
        hidden: boolean;
    }[];
    run(): Promise<void>;
}
