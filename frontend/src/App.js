import React from "react";
import { BrowserRouter, Switch, HashRouter, Route } from "react-router-dom"
import Navigation from "./components/navigation/Navigation"
import Footer from "./components/footer/Footer"
import ScrollToTop from './components/ScrollToTop'
import Main from "./routes/main/main"
import EventDetail from "./routes/event-detail/event-detail"
import GroupDetail from "./routes/group-detail/group-detail"
import Search from './routes/search/search'
import Login from "./routes/login/login";
import signup from "./routes/signup/signup";
import start from "./components/create/start"; //create group first step
import topics from "./components/create/topics";
import groupName from "./components/create/groupName";
import description from "./components/create/description";


function App(){
  return (
  <div>
    <BrowserRouter>
      <Navigation />
      <ScrollToTop />
      <Switch>
        <Route path="/" exact={true} component={Main} />
        <Route path="/event-detail" component={EventDetail} />
        <Route path="/group-detail" component={GroupDetail} />
        <Route path="/search" component={Search} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={signup} />
        <Route path="/start" component={start} />
        <Route path="/topics" component={topics} />
        <Route path="/groupName" component={groupName} />
        <Route path="/description" component={description} />
      </Switch>
      <Footer />
    </BrowserRouter>
  </div>
  )
}

export default App;