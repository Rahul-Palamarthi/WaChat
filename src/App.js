import "./App.css";
import Home from "./Home";
import History from "./History";
import Header from "./components/Header";

function App() {
    return (
        <>
            <Header />
            <main>
                <Home />
                <History />
            </main>
        </>
    );
}

export default App;
