import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { GetStaticProps, GetStaticPaths } from 'next';

//Alternative: pages/posts/[...id].js matches /posts/a, but also /posts/a/b, /posts/a/b/c and so on.
// [id].js => params:{id: 'a'}
// [...id].js => params:{ id: ['a', 'b', 'c'] }

//If you want to access the Next.js router, you can do so by importing the useRouter hook from next/router.

export default function Post({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};
// paths => contains the array of known paths returned by getAllPostIds(), which include the params defined by pages/posts/[id].js.
// fallback: false => If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page. See other options: https://nextjs.org/learn/basics/dynamic-routes/dynamic-routes-details

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData,
    },
  };
};
