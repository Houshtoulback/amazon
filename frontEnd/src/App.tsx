import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
    return (
        <BrowserRouter>
            <div>
                <header className="bg-gray-500 p-4">
                    <Link to="/">amazona</Link>
                </header>
                <Routes>
                    <Route path="/product/:slug" element={<ProductScreen />} />
                    <Route path="/" element={<HomeScreen />} />
                </Routes>
                <main className="p-4"></main>
            </div>
        </BrowserRouter>
    );
}

export default App;
