import React, { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomOneDark from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript';

import classes from './post-content.module.css';

import PostHeader from './post-header';
import { PostData } from '../../../model/post';
import { NormalComponents } from 'react-markdown/lib/complex-types';
import { SpecialComponents } from 'react-markdown/lib/ast-to-react';

SyntaxHighlighter.registerLanguage('javascript', js);

type CustomRenderers = Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents>;

type ElementProperties<T extends ElementType> = PropsWithChildren<ComponentPropsWithoutRef<T>>;

interface PostContentProps {
  post: PostData;
}

const PostContent: React.FC<PostContentProps> = (props) => {
  const { post } = props;

  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers: CustomRenderers = {
    // img: (image) => {
    //   return <Image src={`/images/posts/${post.slug}/${image.src}`} alt={image.alt} width={600} height={300} />;
    // },
    p: (paragraph) => {
      const { node } = paragraph;

      const element = node.children[0];

      if (element.type === 'element') {
        if (element.tagName === 'img') {
          const image = element.properties as ElementProperties<'img'>;

          return (
            <div className={classes.image}>
              <Image src={`/images/posts/${post.slug}/${image.src}`} alt={image.alt} width={600} height={300} />
            </div>
          );
        }
      }

      return <p>{paragraph.children}</p>;
    },
    code: (code) => {
      const { className, children } = code;

      const language = className ? className.split('-')[1] : '';

      const newChildren = children.map((child) => {
        const text = child as string;

        return text.replace(/\n$/, '');
      });

      return (
        <SyntaxHighlighter style={atomOneDark} language={language}>
          {newChildren}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
