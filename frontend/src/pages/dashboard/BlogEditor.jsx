import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Eye, X } from "lucide-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const BlogEditor = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleAddBlog = () => {
    if (!formData.title || !formData.content) return;
    const newBlog = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toLocaleString(),
    };
    setBlogs([...blogs, newBlog]); 
    setFormData({ title: "", description: "", content: "", image: "" });
    setShowModal(false);
  };

  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  const handleViewBlog = (blog) => {
    setSelectedBlog(blog);
  };

  return (
    <div className="p-6 lg:ml-64 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#104C80]">Blog Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#104C80] text-white px-5 py-2 rounded-lg hover:bg-[#0d3d66] transition"
        >
          <Plus size={20} /> Add Blog
        </button>
      </div>

      {/* Blog List */}
      <div className="space-y-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Blog Image */}
                {blog.image ? (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="md:w-1/3 w-full h-52 object-cover"
                  />
                ) : (
                  <div className="md:w-1/3 w-full h-52 flex items-center justify-center bg-gray-100 text-gray-400 italic">
                    No Image
                  </div>
                )}

                {/* Blog Content */}
                <div className="p-5 md:w-2/3 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-[#104C80] mb-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 mb-3">{blog.description}</p>
                    <div
                      className="text-gray-700 text-sm line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500">
                      {blog.createdAt}
                    </span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleViewBlog(blog)}
                        className="flex items-center gap-1 text-[#104C80] hover:underline"
                      >
                        <Eye size={18} /> View
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog.id)}
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

      {/* Add Blog Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50 p-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl relative overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex justify-between items-center bg-[#104C80] text-white px-6 py-3">
              <h2 className="text-xl font-semibold">Add New Blog</h2>
              <button onClick={() => setShowModal(false)}>
                <X size={22} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto">
              <div className="space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter blog title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#104C80] outline-none"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Description
                  </label>
                  <textarea
                    placeholder="Short description..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg p-2 h-24 focus:ring-2 focus:ring-[#104C80] outline-none"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Image URL
                  </label>
                  <input
                    type="text"
                    placeholder="Enter image URL"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#104C80] outline-none"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Content
                  </label>
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <ReactQuill
                      theme="snow"
                      value={formData.content}
                      onChange={(value) =>
                        setFormData({ ...formData, content: value })
                      }
                      className="bg-white min-h-[150px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Button */}
            <div className="p-4 border-t bg-gray-50 text-right">
              <button
                onClick={handleAddBlog}
                className="bg-[#104C80] text-white px-6 py-2 rounded-lg hover:bg-[#0d3d66] transition"
              >
                Add Blog
              </button>
            </div>
          </div>
        </div>
      )}

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
            {selectedBlog.image && (
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                className="rounded-lg w-full h-64 object-cover mb-4"
              />
            )}
            <p className="text-gray-600 mb-3">{selectedBlog.description}</p>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogEditor;
