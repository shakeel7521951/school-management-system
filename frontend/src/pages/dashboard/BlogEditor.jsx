import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Eye, X } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import {
  useGetAllBlogsQuery,
  useDeleteBlogMutation,
} from "../../redux/slices/BlogApi";

const BlogEditor = () => {
  const navigate = useNavigate();
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  // ✅ Fetch all blogs
  const {
    data: blogs = [],
    isLoading,
    isError,
    refetch,
  } = useGetAllBlogsQuery();

  // ✅ RTK mutation for delete
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

  const handleAddBlog = () => {
    navigate("/blog-editor/create");
  };

  const handleViewBlog = (blog) => {
    setSelectedBlog(blog);
  };

  const handleDeleteBlog = (id) => {
    setBlogToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteBlog(blogToDelete).unwrap();
      setShowConfirm(false);
      setBlogToDelete(null);
      refetch(); // refresh list
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 lg:ml-64 bg-gray-50 min-h-screen flex justify-center items-center">
        <p className="text-gray-500 text-lg">Loading blogs...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 lg:ml-64 bg-gray-50 min-h-screen flex justify-center items-center">
        <p className="text-red-500 text-lg">Failed to load blogs 😢</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:ml-64 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#104C80]">Blog Management</h1>
        <Link
          to="/blog-editor/create"
          className="flex items-center gap-2 bg-[#104C80] text-white px-5 py-2 rounded-lg hover:bg-[#0d3d66] transition"
        >
          <Plus size={20} /> Add Blog
        </Link>
      </div>

      {/* Blog Cards */}
      <div className="space-y-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Poster Image */}
                {blog.posterImage ? (
                  <img
                    src={blog.posterImage}
                    alt={blog.title}
                    className="md:w-1/3 w-full h-52 object-cover"
                  />
                ) : (
                  <div className="md:w-1/3 w-full h-52 flex items-center justify-center bg-gray-100 text-gray-400 italic">
                    No Image
                  </div>
                )}

                {/* Blog Info */}
                <div className="p-5 md:w-2/3 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-[#104C80] mb-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 mb-3 line-clamp-3">
                      {blog.description || "No description available"}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleViewBlog(blog)}
                        className="flex items-center gap-1 text-[#104C80] hover:underline"
                      >
                        <Eye size={18} /> View
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog._id)}
                        className="flex items-center gap-1 text-red-600 hover:underline"
                      >
                        <Trash2 size={18} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-10">
            No blogs added yet. Click <b>Add Blog</b> to create one!
          </p>
        )}
      </div>

      {/* ✅ Confirm Delete Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg text-center w-80"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Delete this blog?
              </h3>
              <p className="text-gray-500 text-sm mb-5">
                This action cannot be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Blog Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white w-full max-w-3xl p-6 rounded-2xl shadow-lg relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <X size={22} />
            </button>
            <h2 className="text-3xl font-semibold mb-3 text-[#104C80]">
              {selectedBlog.title}
            </h2>
            {selectedBlog.posterImage && (
              <img
                src={selectedBlog.posterImage}
                alt={selectedBlog.title}
                className="rounded-lg w-full h-64 object-cover mb-4"
              />
            )}
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedBlog.html }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogEditor;
