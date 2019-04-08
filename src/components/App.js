import React from "react";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
