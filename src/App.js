import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import data from './data.js';

function App() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(data);
    }, []);

    const changeRating = e => {
        // setPosts([...posts, { ...post, rating: rating + userRating }]);
    };

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
