import "./App.css";
import Info from "./components/Info";
import PaginatedItems from "./components/PaginatedItems";

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <Info />
        <PaginatedItems />
      </div>
    </div>
  );
}

export default App;
