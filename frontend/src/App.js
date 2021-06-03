import React from "react";
import { HashRouter, Route } from "react-router-dom"
import Navigation from "./components/navigation/Navigation"
import Footer from "./components/footer/Footer"
import Main from "./routes/main/main"
import EventDetail from "./routes/event-detail/event-detail"

function App(){
  return <HashRouter>
    <Navigation />
    <Route path="/" exact={true} component={Main} />
    <Route path="/event-detail" component={EventDetail} />
    <Footer />
  </HashRouter>
}

export default App;