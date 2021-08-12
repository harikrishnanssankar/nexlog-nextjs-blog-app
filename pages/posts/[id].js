import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { supabase } from "../../api";


export default function Post({ post }) {
  const router = useRouter();
  if (router.isFallback) (<div>Loading...</div>)
  return (
    <div className="flex justify-center h-screen w-full pt-20">
      <div className="max-w-xl w-11/12 mb-20 ">
        <h1 className="text-3xl font-semibold tracking-wide">{post?.title}</h1>
        <p className="text-sm font-light my-4">by {post?.user_email}</p>
        <div className="mt-8">
          {/* <span>{post?.content}</span> */}
            <ReactMarkdown className='prose' children={post?.content} />
        </div>
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
  };
}
