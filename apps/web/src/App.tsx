import "tw-elements-react/dist/css/tw-elements-react.min.css";
import "./App.css";
import Quiz from "./components/Quiz/Quiz";

function App() {
  return (
    <div className="container my-24 mx-auto md:px-6">
      <h2 className="mb-12 text-3xl font-bold">Quiz Game</h2>
      <section className="mb-32 text-center">
        <Quiz />
      </section>
    </div>
  );
}

export default App;
