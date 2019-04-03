import React from 'react';
import axios from 'axios';
import spinner from './lg.comet-spinner.gif';
import { Link } from "react-router-dom";

export default class ShowAuthor extends React.Component{
    constructor(props){
    super(props)
    this.state = {
        user: {},
        isLoaded: false,
        count: 0,
        nextId: 0,
        posts: []
    }
   }
   
   componentDidMount() {
    this.fetchPost(this.props.match.params.id);
   }

   fetchPost(id){
    Promise.all([axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`),
                 axios.get(`http://jsonplaceholder.typicode.com/users/${id}`)]).then(values => {
                    this.setState(() => ({posts: values[0].data, user: values[1].data, isLoaded: true}))
                 })
   }
   componentWillReceiveProps(nextProps){
    console.log('componentWillReceiveProps');
    const id = nextProps.match.params.id;
    this.fetchPost(id);
       
   }

    render(){
        let count = 0;
        return(
            <div className="author-header">
                {this.state.isLoaded ? (<div>
                    <div className="author-details">
                        <h2>Author Info</h2>
                        <div className="nav">
                            {this.state.user.id !== 1 ? <Link className="Link" to={`/users/${this.state.user.id-1}`}>Previous</Link>  : ''}
                            <Link to={`/users/${this.state.user.id+1}`}>Next</Link>
                        </div>
                        <div className="author-info">
                            <h5>{this.state.user.name}</h5>
                        </div>
                        <label>{this.state.user.email}</label><br/>
                        <label>{this.state.user.address.city}</label><br/>    
                    </div>
                    <div className="authors-post">
                        <h5>Posts Written by this author</h5>
                        <ul>
                          {this.state.posts.map(post => {
                            count++
                             return(
                                <li className="list-view-post" key={post.id}>{count} <Link to={`/posts/${post.id}`}>{post.title}</Link>
                                </li>
                                )
                          })}
                        </ul>
                    </div>
                </div>) : <img src={spinner} alt="spinner" className="spinner-img"/>}
            </div>
            )
    }
}
