import React from "react";
import { HashRouter, Route } from "react-router-dom"
import Navigation from "./components/navigation/Navigation"
import Footer from "./components/footer/Footer"
import Main from "./routes/main/main"
import EventDetail from "./routes/event-detail/event-detail"
import GroupDetail from "./routes/group-detail/group-detail"

function App(){
  return <HashRouter>
    <Navigation />
    <Route path="/" exact={true} component={Main} />
    <Route path="/event-detail" component={EventDetail} />
    <Route paht="/group-detail" component={GroupDetail} />
    <Footer />
  </HashRouter>
}

export default App;