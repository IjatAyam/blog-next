import Head from 'next/head';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import PostContent from '../../components/posts/post-detail/post-content';
import { getPostData, getPostFiles } from '../../lib/posts-util';
import { PostData } from '../../model/post';

interface PostDetailPageProps {
  post: PostData;
}

const PostDetailPage: NextPage<PostDetailPageProps> = (props) => {
  return (
    <>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </>
  );
};

export const getStaticProps: GetStaticProps<PostDetailPageProps> = (context) => {
  const { params } = context;
  const slug = params!.slug as string;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const postFilenames = getPostFiles();

  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ''));
  const pathsParams = slugs.map((slug) => ({ params: { slug: slug } }));

  return {
    paths: pathsParams,
    fallback: 'blocking',
  };
};

export default PostDetailPage;
