import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  User,
  Clock,
  Eye,
  Tag,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useGetBlogByIdQuery } from "../redux/slices/BlogApi";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, isLoading, isError } = useGetBlogByIdQuery(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] text-gray-400">
        <p>Loading blog details...</p>
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] text-gray-400">
        <h1 className="text-4xl font-bold mb-4">404 - Blog Not Found</h1>
        <Link
          to="/blog"
          className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#09090f] via-[#11111a] to-[#1b1b29] text-gray-200 font-inter">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto pt-8 px-6">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mb-8"
        >
          <ArrowLeft size={18} /> Back to Blog
        </Link>
      </div>

      {/* Main Layout */}
      <div className="max-w-6xl mx-auto flex flex-col gap-10 px-6 pb-20">
        {/* Blog Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
        >
          <img
            src={blog.posterImage}
            alt={blog.title}
            className="w-full h-[500px] object-cover rounded-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 bg-indigo-500/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
            {blog.tags?.[0] || "General"}
          </div>
        </motion.div>

        {/* Blog Content */}
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 backdrop-blur-xl p-10 rounded-3xl shadow-lg border border-white/10"
        >
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
            <span className="flex items-center gap-1">
              <User size={14} /> {blog.author || "Admin"}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />{" "}
              {new Date(blog.createdAt).toLocaleDateString("en-GB")}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} /> 5 min read
            </span>
            <span className="flex items-center gap-1">
              <Eye size={14} /> 120 views
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
            {blog.title}
          </h1>

          {/* Short Description */}
          <p className="text-lg text-gray-400 mb-8 italic border-l-4 border-indigo-500 pl-4">
            {blog.description}
          </p>

          {/* HTML Content */}
          <div
            className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-lg prose-headings:text-white prose-strong:text-indigo-400 prose-p:my-4 prose-ul:list-disc prose-li:marker:text-indigo-400"
            dangerouslySetInnerHTML={{ __html: blog.html }}
          />

          {/* Footer Tags and Share */}
          <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-700">
            <span className="inline-flex items-center gap-2 bg-indigo-600/20 text-indigo-300 px-5 py-2.5 rounded-full text-sm font-medium">
              <Tag size={14} /> {blog.tags?.join(", ") || "Blog"}
            </span>
            <button className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2">
              <Share2 size={16} /> Share
            </button>
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default BlogDetails;
