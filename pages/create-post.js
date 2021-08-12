import { useContext, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { supabase } from "../api";
import { AuthContext } from "../store/Context";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
const initialState = { title: "", content: "" };

function CreatePost() {
  const { user } = useContext(AuthContext)
  const [post, setPost] = useState({});
  const { title, content } = post;
  const router = useRouter();
  function onChange(e) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }));
  }
  async function createNewPost() {
    if (!title || !content) return;
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("post")
      .insert([{ title, content, user_id: user.id, user_email: user.email }])
      .single();
    router.push(`/`);
  }
  if(!user)  return (
    <div className="pt-20 pl-10" >Access Denied</div>
  )
  return (
    <div className="flex justify-center pt-14 w-full" >
      <div className="flex flex-col items-center w-4/5 max-w-screen-lg ">
        <h1 className="text-3xl font-semibold tracking-wide mt-6">
          Create new post
        </h1>
        <input
          onChange={onChange}
          name="title"
          placeholder="Title"
          value={post.title}
          className="border-b pb-2 text-lg my-4 focus:outline-none w-full max-w-screen-sm font-light text-gray-600 placeholder-gray-600 y-2"
        />
        <SimpleMDE
        className="z-0"
          value={post.content}
          onChange={(value) => setPost({ ...post, content: value })}
        />
        <button
          type="button"
          className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
          onClick={createNewPost}
        >
          Create Post
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
