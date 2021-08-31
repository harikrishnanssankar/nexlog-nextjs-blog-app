import Head from "next/head";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { supabase } from "../../api";


export default function Post({ post }) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <div>Loading...</div>
    )
  }
  if (!post) {
    return (
      <div>Error</div>
    )
  }
  function rectifyFormat(s) {
    let b = s.split(/\D/);
    return b[0] + '-' + b[1] + '-' + b[2] + 'T' +
           b[3] + ':' + b[4] + ':' + b[5] + '.' +
           b[6].substr(0,3) + '+00:00';
  }
  const createdAt = new Date(rectifyFormat(post.inserted_at))
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full pt-20">
      <Head>
        <title>{post.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="md:max-w-2xl w-11/12 mb-20 ">
        <h1 className="text-3xl font-semibold tracking-wide">{post.title}</h1>
        <div className="flex items-center justify-between" >
          <p className="text-sm font-light my-1 ">by {post.user_email}</p>
          <p className="text-xs font-light my-1 mr-14 ">Created: {createdAt.toLocaleString('en-IN', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true, day: 'numeric', month: 'numeric', year: 'numeric' })}</p>
        </div>
        <div className="mt-8">
          <ReactMarkdown className='prose' children={post.content} />
        </div>
      </div>
      <div className="w-full pb-10">
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const { data, error } = await supabase.from("post").select("id");
  const paths = data.map((post) => ({
    params: { id: JSON.stringify(post.id) },
  }));
  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const { data } = await supabase
    .from("post")
    .select()
    .filter("id", "eq", id)
    .single();
  return {
    props: {
      post: data
    },
    revalidate: 5,
  };
}
