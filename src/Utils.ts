const clipboardy = require("clipboardy");
const os = require('os');
const fetch = require("node-fetch");

export default class Utils {
    public static async getCommandFromAI(question: string, apiKey: string) {
        const body = {
            messages: [
                {
                    "role": "system",
                    "content": `You are askcmd, a CLI code generator. Respond with the CLI command to generate the code with only one short sentence description in first line.\n\t\tIf the user asks for a specific language, respond with the CLI command to generate the code in that language.\n\t\tIf CLI command is multiple lines, separate each line with a newline character.\n\t\tDo not write any markdown. Do not write any code.\nSystem Info: OS: ${os.platform()}, Arch: ${os.arch()}\n\t\tFirst line is the description in one sentence.\n\t\tExample output:\n\t\tHere is how you Build and install GO binary\n\t\tgo build main.go\n\t\tgo install main`
                },
                {
                    "role": "user",
                    "content": question
                }
            ],
            model: 'llama3-70b-8192'
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', requestOptions);
        const data = await response.json();
        return data?.choices[0]?.message?.content;

    }

    public static copyToCliboard(message: string) {
        try {
            clipboardy.writeSync(message);
        } catch (err) {
        }
    }
}