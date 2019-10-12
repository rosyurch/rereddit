import React, { useState, useEffect } from 'react';
import { createStore } from 'redux';
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

function App() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(data);
    }, []);

    return (
        <main className="main">
            {posts
                .sort((a, b) => a - b)
                .map(post => {
                    return <Post key={post.id} {...post} />;
                })}
        </main>
    );
}

export default App;
