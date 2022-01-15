import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../lib/posts-util';
import { PostData } from '../../model/post';

interface AllPostsPageProps {
  posts: PostData[];
}

const AllPostsPage: NextPage<AllPostsPageProps> = (props) => {
  return (
    <>
      <Head>
        <title>All My Posts</title>
        <meta name="description" content="A list of all programming-related tutorials and post!" />
      </Head>
      <AllPosts posts={props.posts} />
    </>
  );
};

export const getStaticProps: GetStaticProps<AllPostsPageProps> = () => {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
    revalidate: 1800,
  };
};

export default AllPostsPage;
