import publicRoutes from "./routes";
import { Routes, Route, BrowserRouter } from "react-router-dom";

// import share Component
import Header from "./share/components/layout/Header";
import Navigation from "./share/components/layout/Navigation";
import Footer from "./share/components/layout/Footer";
import Banner from "./share/components/layout/Banner";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Navigation />
      <main>
        <Banner />
        <Routes>
          {publicRoutes.map((route) => {
            return (
              <Route
                path={route.path}
                element={route.element}
                key={route.path}
              />
            );
          })}
          <Route />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
