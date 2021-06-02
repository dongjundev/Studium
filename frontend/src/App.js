import React from "react";
import { HashRouter, Route } from "react-router-dom"
import Main from "./routes/main/main"
import Navigation from "./components/navigation/Navigation"
import Footer from "./components/footer/Footer"

function App(){
  return <HashRouter>
    <Navigation />
    <Route path="/" exact={true} component={Main} />
    <Footer />
  </HashRouter>
}

export default App;