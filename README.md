# dazn-quiz-task

<h2>🛠️ Installation Steps:</h2>

<p>1. git clone https://github.com/alonpinto/dazn-quiz-task.git</p>

<p>2. cd ./dazn-quiz-task</p>

<p>3. pnpm install</p>

<p>4. pnpm run dev</p>

# Notice

<p>Changing the server port requires a change to vite.config.ts
</p>
<code>
server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: false,
      },
    },
  },
</code>

# Common pnpm tasks

<p>pnpm run --filter server dev</p>
<p>pnpm run --filter client dev</p>

<p>pnpm run --filter server build</p>
<p>pnpm run --filter client build</p>

# Mock Server

http://localhost:4000/api/quiz?size=5

<p>
the size parameter is optional and set to 5 by default. The size of the quiz can be changed in the quiz settings
</p>

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
