import Head from 'next/head';
import type { GetStaticProps, NextPage } from 'next';

import Hero from '../components/home-page/hero';
import FeaturedPosts from '../components/home-page/featured-posts';
import { getFeaturedPosts } from '../lib/posts-util';
import { PostData } from '../model/post';

interface HomePageProps {
  posts: PostData[];
}

const HomePage: NextPage<HomePageProps> = (props) => {
  return (
    <>
      <Head>
        <title>Ijat&apos;s Blog</title>
        <meta name="description" content="I post about programming and web development." />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
    revalidate: 1800,
  };
};

export default HomePage;
