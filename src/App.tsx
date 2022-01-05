import { useState } from "react";
import "./App.css";
import { ChakraProvider, Button } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

import theme from "./theme/theme";
import {Router} from './router/Router'

function App() {
  const [count, setCount] = useState(0);

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
