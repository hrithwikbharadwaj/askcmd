#!/usr/bin/env node
import { program } from 'commander';
import { mkdirSync, writeFileSync, existsSync, readFileSync } from "fs";
const path = require('path');
import Utils from "../src/Utils";
import { Color } from "../src/Enums/Color";
import 'dotenv/config'

async function main() {
  program
    .name('askcmd')
    .version('1.0.0')
    .description('A CLI tool to ask for commands in english')
    .usage('[question]')
    .option('-s, --set <apiKey>', 'Set the API key');

  program.parse(process.argv);

  const options = program.opts();
  const question = program.args.join(' ');

  if (options.set) {
    const homeDir = process.env.HOME || process.env.USERPROFILE;
    const credentialsPath = path.join(homeDir, '.askcmd', 'credentials');
    mkdirSync(path.dirname(credentialsPath), { recursive: true });
    writeFileSync(credentialsPath, options.set);
    console.log('API key set successfully!');
  } else {
    const homeDir = process.env.HOME || process.env.USERPROFILE;
    const credentialsPath = path.join(homeDir, '.askcmd', 'credentials');

    if (existsSync(credentialsPath)) {
      const apiKey = readFileSync(credentialsPath, 'utf-8');
      if (question) {
        try{
          const response: string = await Utils.getCommandFromAI(question, apiKey);
          if (response) {
            const lineSplit = response.split("\n");
            console.log(Color.Pink, lineSplit[0]);
            let clipBoardMessage = "";
            for (let i = 1; i < lineSplit.length; i++) {
              clipBoardMessage = clipBoardMessage + lineSplit[i] + "\n";
              console.log("\n" + Color.Green, "$", lineSplit[i]);
            }
            console.log("\n" + Color.Yellow, `(the ${lineSplit.length > 2 ? `commands are` : `command is`} copied to your clipboard)`)
            Utils.copyToCliboard(clipBoardMessage);
        }
        }
        catch(error){
          console.error(Color.Red, `Error: error.message`);
        }
      } else {
        console.log('You can ask a question directly, e.g., `askcmd create and active a python venv`');
      }
    } else {
      console.error(Color.Red, 'Error: API key not set. Please run `askcmd -s <GROQ_API_KEY>` first.');
      console.log(Color.Yellow, `\nVisit Docs: https://tapthe.link/askcmd-docs`)
    }
  }
}


main();
