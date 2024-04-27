# Encli

ENCLI is a fast CLI tool that allows you to ask for commands in english and responds with commands according to your operating system.

## Installation

`npm i -g encli`

## Usage 

### Setup your groq api key

1. Visit https://console.groq.com and generate a new api key
2. `encli -s <apikey>`


### Ask the commands you forget to the ai
`encli <your-question>`

## Examples:

`encli kill all apps running on port 4000`

`encli download hello.txt from src/submissions on the ubuntu machine 172.3.2.1`


This was inspired by this [tweet](https://x.com/ImSh4yy/status/1783594370563715514). 