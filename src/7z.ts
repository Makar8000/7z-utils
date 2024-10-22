import * as path from "@std/path";
const decoder = new TextDecoder();

export interface CommandOutput extends Deno.CommandOutput {
  output: string;
  error: string;
}

export type ArchiveOptions = {
  inputPath: string;
  outputPath: string;
  fileName: string;
};

export function runProcess(cmd: string, args: string[], cwd: string): CommandOutput {
  const command = new Deno.Command(cmd, { args, cwd });
  const ret = command.outputSync() as CommandOutput;
  ret.output = decoder.decode(ret.stdout);
  ret.error = decoder.decode(ret.stderr);
  return ret;
}

export function createArchive(options: ArchiveOptions): CommandOutput {
  const output = path.resolve(options.outputPath, options.fileName);
  const input = path.join(options.inputPath, "*");
  const cwd = options.inputPath;
  return runProcess("7z", ["a", "-mx5", "-aoa", output, input], cwd);
}
