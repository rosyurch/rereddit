import React, { useState } from 'react';
import { connect } from 'react-redux';
import { upvote, downvote } from './actions.js';
import './Post.css';

function Post(props) {
    const [userRating, setUserRating] = useState(0); //   0 - not voted; 1 - up; -1 - down
    const [isClosed, setIsClosed] = useState(true);

    const { upvote, downvote } = props;
    const { id, title, flair, rating, author, comments, voteStatus } = props.post;

    const upvoteHandle = e => {
        // if (userRating === 1) {
        //     setUserRating(0);
        // } else {
        //     setUserRating(1);
        // }
        if (voteStatus === '') upvote(id);
        // else if(voteStatus=== 'down')
    };

    const downvoteHandle = e => {
        // if (userRating === -1) {
        //     setUserRating(0);
        // } else {
        //     setUserRating(-1);
        // }
    };

    const openHandle = e => {
        setIsClosed(isPostOpened => !isPostOpened);
    };

    return (
        <div className="post">
            <div className="rating">
                <button className="upvote-arrow" onClick={upvoteHandle} style={{ color: `${userRating === 1 ? 'red' : '#888'}` }}>
                    &#8593;
                </button>
                <div className="rating-number">{rating}</div>
                <button className="downvote-arrow" onClick={downvoteHandle} style={{ color: `${userRating === -1 ? 'blue' : '#888'}` }}>
                    &#8595;
                </button>
            </div>
            <div className="thumbnail">
                <div className="thumbnail-no-image">
                    <div className="thumb-line"></div>
                    <div className="thumb-line"></div>
                    <div className="thumb-line thumb-line-short"></div>
                </div>
            </div>
            <div className="post-main">
                <div className="post-heading">
                    <span className="post-flair">{flair}</span>
                    <a href="/post" className="post-title-link">
                        <h3 className="post-title">{title}</h3>
                    </a>
                </div>
                <div className="post-author">
                    <span className="post-author-name">
                        Posted by{' '}
                        <a href={'/u/' + author.name} className="post-author-name-link">
                            u/{author.name}
                        </a>
                        <span className="post-author-flair">{author.flair}</span>
                    </span>
                    <span className="post-created-at">19 hours ago</span>
                </div>
                <div className="post-options">
                    <button className="post-open-btn" onClick={openHandle}>
                        <span className="post-open-arrow-up" style={{ transform: `rotate(${isClosed ? 0 : 180}deg)` }}>
                            &#8598;
                        </span>
                        <span className="post-open-arrow-down" style={{ transform: `rotate(${isClosed ? 0 : 180}deg)` }}>
                            &#8600;
                        </span>
                    </button>
                    <a href="/comments" className="post-comments-link">
                        {comments.amount} comments
                    </a>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state, id) => {
    const post = state.filter(post => post.id === id.id)[0];
    return { post };
};

const mapDispatchToProps = {
    upvote,
    downvote,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post);
