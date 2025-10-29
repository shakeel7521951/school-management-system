import React, { useState, useRef } from "react";
import {
  Upload,
  Download,
  Trash2,
  BookOpen,
  FileText,
  Plus,
  X,
} from "lucide-react";
import {
  useGetBooksQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
} from "../../redux/slices/BookApi";

const BooksAndArticlesManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
    coverPhoto: null,
  });
  const fileInputRef = useRef(null);

  // ✅ RTK Query hooks
  const { data: books = [], isLoading, refetch } = useGetBooksQuery();
  const [createBook, { isLoading: isCreating }] = useCreateBookMutation();
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🧠 Build FormData
    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("pdf", formData.file);
    form.append("coverPhoto", formData.coverPhoto);

    // ✅ Log actual FormData content
    for (let [key, value] of form.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const result = await createBook(form).unwrap(); // ✅ send FormData instead
      console.log("Book created:", result);
      alert("Book uploaded successfully!");
      setIsModalOpen(false);
      setFormData({ title: "", description: "", file: null, coverPhoto: null });
      refetch();
    } catch (err) {
      console.error("Error creating book:", err);
      alert("Failed to create book");
    }
  };

  // ✅ Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await deleteBook(id).unwrap();
      refetch();
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete the book.");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen text-[#104C80] text-lg font-medium">
        Loading books...
      </div>
    );

  return (
    <div className="p-4 sm:p-6 lg:ml-64 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen flex flex-col items-center transition-all duration-300">
      {/* Header */}
      <div className="w-full max-w-7xl flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#104C80] p-4 md:p-6 rounded-2xl shadow-lg mb-10 gap-4">
        <div className="flex items-center gap-3 text-white">
          <BookOpen size={30} className="hidden sm:block" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center sm:text-left">
            Books & Articles
          </h2>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-white text-[#104C80] px-4 py-2 rounded-lg font-medium shadow-md hover:bg-[#e6eff8] hover:scale-[1.03] transition-all duration-200 text-sm sm:text-base w-full sm:w-auto"
        >
          <Plus size={18} /> Upload New Book
        </button>
      </div>

      {/* Books List */}
      <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 border border-gray-200 w-full max-w-7xl">
        <h3 className="text-lg sm:text-xl font-semibold text-[#104C80] mb-6 text-center">
          Uploaded Books & Articles
        </h3>

        {books.length === 0 ? (
          <p className="text-gray-500 italic text-center text-sm sm:text-base">
            No books or articles uploaded yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <div
                key={book._id}
                className="border border-gray-200 rounded-2xl p-4 sm:p-5 bg-white hover:bg-[#f0f6fc] hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-[#104C80]" />

                {/* ✅ Cover Photo */}
                {book.coverImageUrl && (
                  <img
                    src={book.coverImageUrl}
                    alt={book.title}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                )}

                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-[#104C80] mb-1 break-words mt-2">
                    {book.title}
                  </h4>
                  <p className="text-gray-600 mb-3 text-sm break-words">
                    {book.description}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-gray-700">
                      <FileText size={18} className="text-[#104C80]" />
                      <span className="text-xs sm:text-sm truncate">
                        {book.fileName || "File"}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 text-xs bg-[#e6eff8] text-[#104C80] font-semibold rounded-md">
                      {book.type || "PDF"}
                    </span>
                  </div>

                  {book.pdfUrl && book.pdfUrl.endsWith(".pdf") && (
                    <iframe
                      src={book.pdfUrl}
                      className="w-full h-40 sm:h-44 border border-gray-200 rounded-lg mb-3"
                      title="PDF Preview"
                    ></iframe>
                  )}
                </div>

                <div className="flex items-center justify-between mt-auto">
                  {book.pdfUrl && (
                    <a
                      href={book.pdfUrl}
                      download={book.fileName}
                      className="flex items-center gap-1 sm:gap-2 text-[#104C80] hover:text-[#0d3a60] font-medium text-sm sm:text-base transition-all"
                    >
                      <Download size={16} /> Download
                    </a>
                  )}
                  <button
                    onClick={() => handleDelete(book._id)}
                    disabled={isDeleting}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-all font-medium text-sm sm:text-base disabled:opacity-50"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4 sm:p-0">
          <div className="bg-white rounded-2xl shadow-2xl w-full sm:w-[90%] max-w-lg p-6 relative animate-fadeIn">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <X size={22} />
            </button>

            <h3 className="text-lg sm:text-xl font-semibold text-[#104C80] mb-4 text-center">
              Upload a New Book or Article
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                  Book Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#104C80]"
                  placeholder="Enter book title"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                  Short Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base h-24 focus:outline-none focus:ring-2 focus:ring-[#104C80]"
                  placeholder="Enter short description"
                ></textarea>
              </div>

              <div className="mb-5">
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                  Upload PDF / File
                </label>
                <input
                  type="file"
                  name="file"
                  accept=".pdf,.doc,.docx"
                  ref={fileInputRef}
                  onChange={handleChange}
                  className="w-full text-gray-600 text-sm sm:text-base"
                />
              </div>

              {/* ✅ Cover Photo Upload */}
              <div className="mb-5">
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                  Upload Cover Photo
                </label>
                <input
                  type="file"
                  name="coverPhoto"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full text-gray-600 text-sm sm:text-base"
                />
              </div>

              <button
                type="submit"
                disabled={isCreating}
                className="flex items-center justify-center gap-2 w-full bg-[#104C80] text-white px-5 py-2.5 rounded-lg hover:bg-[#0d3a60] transition-all duration-300 font-medium shadow-md text-sm sm:text-base disabled:opacity-60"
              >
                {isCreating ? "Uploading..." : <Upload size={18} />}
                {isCreating ? "" : "Upload Book"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksAndArticlesManagement;
