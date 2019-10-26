export const upvote = id => ({
    type: 'UPVOTE',
    id,
});

export const downvote = id => ({
    type: 'DOWNVOTE',
    id,
});
