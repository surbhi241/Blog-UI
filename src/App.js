import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch} from "react-router-dom";
import axios from 'axios';
import logo from './Logo.png'
import About from './components/About.js';
import Home from './components/Home.js';
import Posts from './components/Posts.js';
import ShowPost from './components/ShowPost.js';
import Authors from './components/Authors.js';
import ShowAuthor from './components/ShowAuthor.js';
import RandomPost from './components/Random.js';

import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      posts: []
    }
  }
  componentDidMount(){
      axios.get('https://jsonplaceholder.typicode.com/posts')
           .then(response => {
             this.setState(() => ({posts: response.data}))
           })
  }

  render() {
    return (
      <BrowserRouter classNameName="App-header">
            <div>
              <nav className="navbar navbar-toggleable-md bg-faded navbar-inverse bg-inverse">
                  <button className="navbar-toggler navbar-toggler-right" type="button" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <img src={logo} alt="Logo" className="App-logo"/>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item active">
                        <Link className="nav-link" to="/">Blog-UI</Link>
                      </li>
                      <li className="nav-item">
                       <Link className="nav-link" to="/posts">Posts</Link>
                      </li>
                      <li className="nav-item">
                       <Link className="nav-link" to="/users">Authors</Link>
                      </li>
                      <li className="nav-item">
                       <Link className="nav-link" to="/random">Random</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                      </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                      <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                      <button className="btn btn-outline-secondary my-2 my-sm-0" type="submit">Search</button>
                    </form>
                  </div>
              </nav>
            </div>
            <Switch>
              <Route path="/" component={Home} exact={true}/>
              <Route path="/about" component={About} exact={true}/>
              <Route path='/users' component={Authors} exact={true}/>
              <Route path="/users/:id" component={ShowAuthor} exact={true}/>
              <Route path="/posts" render={(props) => <Posts posts={this.state.posts} {...props}/>} exact={true}/>
              <Route path="/posts/:id" component={ShowPost} exact={true}/>
              <Route path="/random" render={(props) => <RandomPost posts={this.state.posts} {...props}/>} exact={true}/>
            </Switch>
      </BrowserRouter>
    )
  }
}

export default App;


