import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Eye, X } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import {
  useGetAllBlogsQuery,
  useDeleteBlogMutation,
} from "../../redux/slices/BlogApi";
import { useTranslation } from "react-i18next";

const BlogEditor = () => {
  const { t } = useTranslation("blogEditor");
  const navigate = useNavigate();
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  const {
    data: blogs = [],
    isLoading,
    isError,
    refetch,
  } = useGetAllBlogsQuery();

  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

  const handleAddBlog = () => navigate("/blog-editor/create");
  const handleViewBlog = (blog) => setSelectedBlog(blog);
  const handleDeleteBlog = (id) => {
    setBlogToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteBlog(blogToDelete).unwrap();
      setShowConfirm(false);
      setBlogToDelete(null);
      refetch();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 lg:ml-64 bg-gray-50 min-h-screen flex justify-center items-center">
        <p className="text-gray-500 text-lg">{t("page.loading")}</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 lg:ml-64 bg-gray-50 min-h-screen flex justify-center items-center">
        <p className="text-red-500 text-lg">{t("page.error")}</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:ml-64 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#104C80]">
          {t("page.title")}
        </h1>
        <Link
          to="/blog-editor/create"
          className="flex items-center gap-2 bg-[#104C80] text-white px-5 py-2 rounded-lg hover:bg-[#0d3d66] transition"
        >
          <Plus size={20} /> {t("page.addBlog")}
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
                    {t("blog.noImage")}
                  </div>
                )}

                {/* Blog Info */}
                <div className="p-5 md:w-2/3 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-[#104C80] mb-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 mb-3 line-clamp-3">
                      {blog.description || t("blog.noDescription")}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString(
                        t("blog.dateFormat")
                      )}
                    </span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleViewBlog(blog)}
                        className="flex items-center gap-1 text-[#104C80] hover:underline"
                      >
                        <Eye size={18} /> {t("blog.view")}
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog._id)}
                        className="flex items-center gap-1 text-red-600 hover:underline"
                      >
                        <Trash2 size={18} /> {t("blog.delete")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p
            className="text-gray-500 text-center mt-10"
            dangerouslySetInnerHTML={{ __html: t("blog.noBlogs") }}
          />
        )}
      </div>

      {/* ✅ Glassmorphism Confirm Delete Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/30 backdrop-blur-xl border border-white/30 text-center shadow-2xl rounded-2xl p-8 w-80 text-white relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3 className="text-lg font-semibold mb-3 text-white">
                {t("confirmModal.title")}
              </h3>
              <p className="text-sm mb-5 text-gray-200">
                {t("confirmModal.message")}
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 rounded-lg bg-white/30 hover:bg-white/40 text-gray-800 font-medium transition"
                >
                  {t("confirmModal.cancel")}
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-lg bg-red-500/80 hover:bg-red-500 text-white font-semibold shadow-md transition disabled:opacity-50"
                >
                  {isDeleting
                    ? t("confirmModal.deleting")
                    : t("confirmModal.delete")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Glassmorphism View Blog Modal */}
      {selectedBlog && (
        <motion.div
          className="fixed inset-0 flex justify-center items-center bg-black/80 backdrop-blur-md z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-6 w-full max-w-3xl text-white overflow-y-auto max-h-[90vh]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-3 right-3 text-white/80 hover:text-white"
              title={t("viewModal.close")}
            >
              <X size={22} />
            </button>
            <h2 className="text-3xl font-semibold mb-3">
              {selectedBlog.title}
            </h2>
            {selectedBlog.posterImage && (
              <img
                src={selectedBlog.posterImage}
                alt={selectedBlog.title}
                className="rounded-lg w-full h-64 object-cover mb-4 shadow-lg"
              />
            )}
            <div
              className="prose prose-invert max-w-none text-white leading-relaxed"
              dangerouslySetInnerHTML={{ __html: selectedBlog.html }}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default BlogEditor;
