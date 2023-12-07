# dazn-quiz-task

# how to run the project

# install projets dependencies

pnpm install

# will run the dev and the server parallel

pnpm run dev

# Common pnpm tasks

pnpm run --filter server dev
pnpm run --filter client dev

pnpm run --filter server build
pnpm run --filter client build

# Query mock server to get quiz

http://localhost:[REPLACE_WITH_ENV_PORT]/api/quiz?size=5

# [size] is optinal default value 5

# Response example

[
{
"id": 16,
"question": "What was the name of the famous Roman general who defeated the Greek city-state of Corinth in 146 BC and sacked the city?",
"answer": "Lucius Mummius",
"choices": [
"Pompey",
"Lucius Mummius",
"Gnaeus Domitius Ahenobarbus",
"Scipio Aemilianus"
],
"hint": "He was also known for his patronage of the arts."
}
]
