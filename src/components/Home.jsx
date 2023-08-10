import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold  bg-red-300">Welcome to my social media project</h1>

      <div className="flex items-center justify-start mt-2 mb-2 gap-2 ">
        <Link to={'chat'} className="px-5 py-2 bg-cyan-500 text-white rounded-sm shadow-sm" >Chat</Link>
        <Link to={'video'} className="px-5 py-2 bg-cyan-500 text-white rounded-sm shadow-sm" >Streamming Video</Link>
      </div>
    </div>
  )
}
