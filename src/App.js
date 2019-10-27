import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './App.css';
import Post from './Post';
import data from './data.js';

const posts = (state = [], action) => {
    if (action.type === 'UPVOTE') {
        return state.map(p => {
            if (p.id !== action.id) return p;
            return {
                ...p,
                voteStatus: 'up',
                rating: p.rating + 1,
            };
        });
    } else if (action.type === 'DOWNVOTE') {
        return state.map(p => {
            if (p.id !== action.id) return p;
            return {
                ...p,
                voteStatus: 'down',
                rating: p.rating - 1,
            };
        });
    } else return state;
};

const store = createStore(posts, data, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class App extends React.Component {
    state = { posts: [] };

    componentDidMount() {
        // this.setState({ posts: data });
    }

    render() {
        return (
            <Provider store={store}>
                <main className="main">
                    {[...store.getState()] // avoid mutation by sort()
                        .sort((a, b) => b.rating - a.rating)
                        .map(post => {
                            return <Post key={post.id} id={post.id} />;
                        })}
                </main>
            </Provider>
        );
    }
}

export default App;
