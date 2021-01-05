import Timer from "./components/Timer";
import Customizer from "./components/Customizer";

function App() {
  return (
    <div className="container mx-auto md:mt-6">
      <h1 className="text-center text-4xl md:text-7xl p-6 w-full md:w-1/2 mx-auto border-b">
        <span className="text-red-400">Pomodoro</span> App
      </h1>
      <div>
        <Customizer>
          <Timer />
        </Customizer>
      </div>
    </div>
  );
}

export default App;
