import Head from "next/head";
import { useState, useEffect } from "react";
import { supabase } from "../api";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/router"

export default function Home({posts}) {
  // const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  useEffect(() => {
    if (posts) {
      setLoading(false)
    }
    return () => {
      
    }
  }, [posts])
  // useEffect(() => {
  //   fetchPosts();
  //   const mySubscription = supabase
  //     .from("posts")
  //     .on("*", () => {
  //       fetchPosts();
  //     })
  //     .subscribe();
  //   return () => supabase.removeSubscription(mySubscription);
  // }, []);
  // async function fetchPosts() {
  //   const { data, error } = await supabase.from("post").select().order('inserted_at', {ascending: false});
  //   setPosts(data);
  //   setLoading(false);
  // }
  const truncate = (string, n) => {
    return string && string.length > n
      ? string.substr(0, n - 1) + "..."
      : string;
  };
  if (loading)
    return (
      <div className="flex items-center justify-center fixed w-full h-screen bg-opacity-60 bg-gray-500">
        <ClipLoader color="#2b94f0" loading={loading} size={50} />
      </div>
    );
  if (!posts.length)
    return (
      <div className="pt-20">
        <p className="text-2xl">No posts.</p>
      </div>
    );
  return (
    <div>
      <Head>
        <title>Nexlog</title>
        <meta name="description" content="generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-wrap justify-center gap-10 w-full pt-14 p-10 ">
        {posts.map((post) => (
            <div key={post.id} onClick={() => router.push(`/posts/${post.id}`)}  className="flex flex-col justify-start cursor-pointer w-11/12 md:max-w-11/12 md:w-72 h-38 border-b border-gray-300	mt-8 pb-4">
              <h2 className="text-xl font-semibold">{truncate(post.title,50)}</h2>
              <p className="text-sm text-gray-500 ">Author: {truncate(post.user_email,30)}</p>
              <p className="text-gray-500 ">{truncate(post.content,100)}</p>
            </div>
        ))}
      </div>
    </div>
  );
}


export async function getServerSideProps() {
  const { data, error } = await supabase.from("post").select().order('inserted_at', {ascending: false});
  return{
    props: {
      posts: data
    }
  }
}