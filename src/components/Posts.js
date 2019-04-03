import React from 'react';
import spinner from './lg.comet-spinner.gif';
import { Link } from "react-router-dom";

export default class Posts extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          posts: props.posts,
          isLoaded: props.posts? true : false
        }
    }

    componentWillReceiveProps(nextProps){
      const posts = nextProps.posts;
      this.setState(() => ({posts: posts, isLoaded: true}))
    }
    render() {
        // console.log(this.props.posts)
        console.log(this.props.posts,this.state.isLoaded);
        return(
            <div>
             {this.state.isLoaded ? (<div>
                <h1 className="header">Listing Posts</h1>
                <ul>{this.state.posts.map(post => {
                   return(
                       <li className="list-view" key={post.id}>{post.id}. <Link to={`/posts/${post.id}`}>{post.title}</Link></li>
                      )
                  })}
                </ul>
              </div>): <img src={spinner} alt="spinner"/>}
            </div>
          )
    }
}