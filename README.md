# dazn-quiz-task

# how to run the project

# install projets dependencies

pnpm install

# will run the dev and the server parallel

pnpm rum dev

# Common pnpm tasks

pnpm run --filter server dev
pnpm run --filter client dev

pnpm run --filter server build
pnpm run --filter client build

# Query mock server to get quiz

# [size] is optinal default value 5

http://localhost:4000/api/quiz?size=5

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
