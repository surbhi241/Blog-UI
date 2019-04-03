import React from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";

export default class Authors extends React.Component{
    constructor(){
        super();
        this.state ={
            users: []
        }
    }

    componentDidMount() {
         axios.get('http://jsonplaceholder.typicode.com/users')
              .then(response => this.setState(() => ({users: response.data})))
    }
    
    render(){
        console.log("rendering", this.state.users);
        return(
              <div className="authors">
                 <h2> Listing Authors </h2>
                 <ul>
                     {this.state.users.map(user => {
                        return (
                             <li key={user.id} className="list-view">
                                <Link to={`users/${user.id}`}>{user.name}</Link>
                             </li>
                            )
                     })}
                 </ul>
              </div>
         )
    }
}