import React from "react";
import { BrowserRouter, Switch, Router, Route } from "react-router-dom"
import Navigation from "./components/navigation/Navigation"
import Footer from "./components/footer/Footer"
import ScrollToTop from './components/ScrollToTop'
import Main from "./routes/main/main"
import EventDetail from "./routes/event-detail/event-detail"
import GroupDetail from "./routes/group-detail/group-detail"
import Search from './routes/search/search'
import Mypage from './routes/mypage/mypage'
import GroupMemberDetail from "./routes/group-member-detail/group-member-detail";
import Login from "./routes/login/login";


function App(){
  return (
  <div>
    <BrowserRouter>
      <Navigation />
      <ScrollToTop />
      <Switch>
        <Route path="/" exact={true} component={Main} />
        <Route path="/event/:eventId" component={EventDetail} />
        <Route path="/study/:studyId"  component={GroupDetail} />
        <Route path="/member/:memberId" component={GroupMemberDetail} />
        <Route path="/search" component={Search} />
        <Route path="/mypage" component={Mypage} />
        <Route path="/login" component={Login} />
      </Switch>
      <Footer />
    </BrowserRouter>
  </div>
  )
}

export default App;