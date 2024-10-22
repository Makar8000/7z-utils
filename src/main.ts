import "@std/dotenv/load";
import * as path from "@std/path";
import { createArchive } from "./7z.ts";

const INPUT_PATH = Deno.env.get("INPUT_PATH") ?? "./input";
const OUTPUT_PATH = Deno.env.get("OUTPUT_PATH") ?? "./output";

Array.from(Deno.readDirSync(INPUT_PATH))
  .filter((p) => p.isDirectory)
  .forEach((dir) => {
    createArchive({
      fileName: `${dir.name}.zip`,
      inputPath: path.resolve(INPUT_PATH, dir.name),
      outputPath: OUTPUT_PATH,
    });
  });
