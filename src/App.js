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
import signup from "./routes/signup/signup";
import start from "./components/create/create/start";
import description from "./components/create/create/description";
import groupName from "./components/create/create/groupName";
import topics from "./components/create/create/topics";
import createEvent  from "./components/createEvent/createEvent";

//npm install sweetalert2

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
        <Route path="/signup" component={signup} />
        <Route path="/start" component={start} />
        <Route path="/description" component={description} />
        <Route path="/groupName" component={groupName} />
        <Route path="/topics" component={topics} />
        <Route path="/createEvent" component={createEvent} />
      </Switch>
      <Footer />
    </BrowserRouter>
  </div>
  )
}

export default App;