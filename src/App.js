import './App.css';

import Menu from "./components/Menu/Menu";
import Header from "./components/Header/Header";
import Slider from "./components/Slider/Slider";

import { MenuContextProvider } from './context/MenuContext';
function App() {
  console.info("App.js");
  return (
    <MenuContextProvider>
      <Header></Header>
      <Slider></Slider>
      <Menu/>
    </MenuContextProvider>
  );
}

export default App;
