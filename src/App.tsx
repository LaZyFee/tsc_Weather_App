import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Layouts/Main";
import { ThemeProvider } from "./context/theme-provider";
import CityPage from "./pages/CityPage";
import WeatherDashboard from "./pages/WeatherDashboard";


function App() {

  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Main >
          <Routes>
            <Route path="/" element={<WeatherDashboard />} />
            <Route path="/city/:cityName" element={<CityPage />} />
          </Routes>
        </Main>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
