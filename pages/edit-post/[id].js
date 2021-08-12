import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { supabase } from "../../api";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

function EditPost() {
  const [post, setPost] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetchPost();
    async function fetchPost() {
      if (!id) return;
      const { data } = await supabase
        .from("post")
        .select()
        .filter("id", "eq", id)
        .single();
      setPost(data);
    }
  }, [id]);

  if (!post) return null;
  function onChange(e) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }));
  }
  const { title, content } = post;
  async function updateCurrentPost() {
    if (!title || !content) return;
    await supabase.from("post").update([{ title, content }]).match({ id });
    router.push(`/my-posts/${id}`);
  }
  return (
    <div className="flex justify-center pt-14 w-full" >
      <div className="flex flex-col items-center w-4/5 max-w-screen-lg ">
        <h1 className="text-3xl font-semibold tracking-wide mt-6">
          Edit Post
        </h1>
        <input
          onChange={onChange}
          name="title"
          placeholder="Title"
          value={post.title}
          className="border-b pb-1 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
        />
        <SimpleMDE
          className="z-0"
          value={post.content}
          onChange={(value) => setPost({ ...post, content: value })}
        />
        <button
          className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
          onClick={updateCurrentPost}
        >
          Update Post
        </button>
      </div>
    </div>
  );
}

export default EditPost;
