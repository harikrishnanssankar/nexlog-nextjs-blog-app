import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../api";
import {useRouter} from "next/router";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const router = useRouter()
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("post")
      .select("*")
      .filter("user_id", "eq", user.id);
    setPosts(data);
  };
  async function deletePost(id) {
    await supabase.from("post").delete().match({ id });
    fetchPosts();
  }
  return (
    <div className="pt-14">
      <h1 className="text-2xl font-semibold tracking-wide mt-4 ml-10 mb-2">
        My Posts
      </h1>
      <div className="ml-10 mr-10 flex-wrap flex gap-5">
        {posts.map((post, index) => (
          <div key={index} className="border-b border-gray-300 cursor-pointer	mt-8 pb-4">
            <h2 onClick={() => router.push(`/posts/${post.id}`)} className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-500 mt-2 mb-2">Author: {post.user_email}</p>
            <Link href={`/edit-post/${post.id}`}>
              <a className="text-sm mr-4 text-blue-500">Edit Post</a>
            </Link>
            <Link href={`/posts/${post.id}`}>
              <a className="text-sm mr-4 text-blue-500">View Post</a>
            </Link>
            <button
              className="text-sm mr-4 text-red-500"
              onClick={() => deletePost(post.id)}
            >
              Delete Post
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
