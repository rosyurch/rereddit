import React from 'react';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import './App.css';
import Post from './Post';
import data from './data.js';

const posts = (state = [], action) => {
    if (action.type === 'UPVOTE') {
        return state.map(p => {
            if (p.id !== action.id) return p;
            return {
                id: p.id,
                title: p.title,
                author: p.author,
                comments: p.comments,
                rating: p.rating + 1,
            };
        });
    } else if (action.type === 'DOWNVOTE') {
        return state.map(p => {
            if (p.id !== action.id) return p;
            return {
                id: p.id,
                title: p.title,
                author: p.author,
                comments: p.comments,
                rating: p.rating - 1,
            };
        });
    } else return state;
};

const store = createStore(posts);

class App extends React.Component {
    state = { posts: [] };

    componentDidMount() {
        // this.setState({ posts: data });
        // store.dispatch();
    }

    // vote = (curPost, userRating) => {
    //     const updPosts = this.state.posts.map(p => {
    //         if (p.id !== curPost.id) return p;
    //         return {
    //             id: curPost.id,
    //             title: curPost.title,
    //             flair: curPost.flair,
    //             author: curPost.author,
    //             comments: curPost.comments,
    //             rating: curPost.rating + userRating,
    //         };
    //     });
    //     this.setState({ posts: updPosts });
    // };

    render() {
        return (
            <Provider store={store}>
                <main className="main">
                    {[...store.getState()] // avoid mutation by sort()
                        .sort((a, b) => b.rating - a.rating)
                        .map(post => {
                            return <Post key={post.id} vote={this.vote} {...post} />;
                        })}
                </main>
            </Provider>
        );
    }
}

export default App;
