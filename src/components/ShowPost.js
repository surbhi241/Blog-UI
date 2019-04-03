import React from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import blog from '../blogbanner.jpg';
import spinner from './lg.comet-spinner.gif';
const API_HOST = 'https://jsonplaceholder.typicode.com';

export default class ShowPost extends React.Component{
    constructor() {
        super();
        this.state = {
          post: {},
          comments: [],
          author: {},
          isLoaded: false
        }
    }
   
    componentDidMount(){
        const id = this.props.match.params.id;
        Promise.all([axios.get(`${API_HOST}/posts/${id}`), 
                     axios.get(`${API_HOST}/comments?postId=${id}`)]).then(values => {
                      const postData = values[0].data
                      const userId = postData.userId;
                      axios.get(`${API_HOST}/users/${userId}`)
                           .then(response => {
                              this.setState(() => ({post: values[0].data, comments: values[1].data, author: response.data, isLoaded: true}))
                           })
                            .catch(function(err){
                              console.log(err)
                            })
                          
                    })
                    .catch(function(err){
                        console.error(err)
                    })
    }

    render() {
        console.log(this.state.post, this.state.author, this.state.comments)
        var count = 0;
        return(
            <div>
                {this.state.isLoaded ? (<div className="wrapper"><div className="detail">
                  <h3>{this.state.post.title}</h3>
                    <span>by <Link to={`/users/${this.state.author.id}`}>{this.state.author.name}</Link></span>
                  <p>{this.state.post.body}</p>
                  <img src={blog} alt="blogging"/>
                </div>
                <h5 className="post-heading">{this.state.comments.length} Comments </h5>
                  {this.state.comments.map(comment => {
                    count++;
                     return(
                     <li className="list-view" key={comment.id}>{count}. {comment.body}</li>
                    )
                  })} </div>) : <img src={spinner} alt="spinner" className="spinner-img"/>}
            </div>
            )
    }
}