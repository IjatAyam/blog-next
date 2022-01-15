import React from 'react';

import classes from './post-grid.module.css';

import PostItem from './post-item';
import { PostData } from '../../model/post';

interface PostGridProps {
  posts: PostData[];
}

const PostGrid: React.FC<PostGridProps> = (props) => {
  const { posts } = props;

  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
};

export default PostGrid;
