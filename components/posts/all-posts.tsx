import React from 'react';

import classes from './all-posts.module.css';
import PostGrid from './post-grid';
import { PostData } from '../../model/post';

interface AllPostsProps {
  posts: PostData[];
}

const AllPosts: React.FC<AllPostsProps> = (props) => {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostGrid posts={props.posts} />
    </section>
  );
};

export default AllPosts;
