import React from 'react'
import spinner from './lg.comet-spinner.gif';
import axios from 'axios';

export default class RandomPost extends React.Component{

    constructor() {
        super();
        this.state = {
          post: [] ,
          isLoaded: false
        }
    }

    componentDidMount(){
        const random = Math.floor(Math.random() * 100);

        axios.get('https://jsonplaceholder.typicode.com/posts')
           .then(response => {
             const post = response.data.find(function(post){
                return post.id === random
             })
             this.setState(() => ({post: post, isLoaded: true}))
           })
        console.log(random);
    }

    render() {
        console.log(this.state.posts);
        return(
            <div>
                {this.state.isLoaded ? (<div className="wrapper">
                    <div className="detail">
                      <span>User-id: {this.state.post.id}</span>
                      <h4>{this.state.post.title}</h4>
                      <p>{this.state.post.body}</p>
                    </div>  
                </div>): <img src={spinner} alt="spinner" />}
            </div>
        )
    }
}
