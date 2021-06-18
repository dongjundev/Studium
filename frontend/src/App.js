import React from "react";
import { BrowserRouter, Switch, HashRouter, Route } from "react-router-dom"
import Navigation from "./components/navigation/Navigation"
import Footer from "./components/footer/Footer"
import ScrollToTop from './components/ScrollToTop'
import Main from "./routes/main/main"
import EventDetail from "./routes/event-detail/event-detail"
import GroupDetail from "./routes/group-detail/group-detail"
import Search from './routes/search/search'
import Member from "./routes/group-member-detail/group-member-detail";
import GroupMemberDetail from "./routes/group-member-detail/group-member-detail";


function App(){
  return (
  <div>
    <BrowserRouter>
      <Navigation />
      <ScrollToTop />
      <Switch>
        <Route path="/" exact={true} component={Main} />
        <Route path="/event/:eventId" component={EventDetail} />
        <Route path="/study/:studyId" exact={true} component={GroupDetail} />
        <Route path="/member/:memberId" exact={true} component={GroupMemberDetail} />
        <Route path="/search" component={Search} />
      </Switch>
      <Footer />
    </BrowserRouter>
  </div>
  )
}

export default App;