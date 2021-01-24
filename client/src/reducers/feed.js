import {
  FEED_LOADED,
  FEED_ERR,
  POST_LIKED,
  COMMENT_ADDED,
  COMMENT_DELETED,
} from "../actions/actionTypes";

const feed = (feed = [], action) => {
  const { type, payload } = action;

  if (type === FEED_LOADED) {
    return payload;
  } else if (type === FEED_ERR) {
    return [];
  } else if (type === POST_LIKED) {
    return feed.map((post) => {
      if (post.postId._id === payload._id) {
        return {
          ...post,
          postId: {
            ...post.postId,
            likes: payload.likes,
          },
        };
      } else {
        return post;
      }
    });
  } else if (type === COMMENT_ADDED || type === COMMENT_DELETED) {
    return feed.map((post) => {
      if (post.postId._id === payload._id) {
        return {
          ...post,
          postId: {
            ...post.postId,
            comments: payload.comments,
          },
        };
      } else {
        return post;
      }
    });
  }
  return feed;
};

export default feed;
