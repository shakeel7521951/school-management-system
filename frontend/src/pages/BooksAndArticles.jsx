import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Download } from "lucide-react";
import { useGetBooksQuery } from "../redux/slices/BookApi";
import { useTranslation } from "react-i18next";

const BooksAndArticles = () => {
  // ✅ load the translation namespace (must match your i18n file name or key)
  const { t } = useTranslation("booksAndarticles");

  // ✅ fetch books from backend
  const { data: books = [], isLoading, isError } = useGetBooksQuery();
  console.log("Books data:", books);

  // ✅ show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#104c80] text-lg font-semibold">
        {t("booksAndArticles.loading")}
      </div>
    );
  }

  // ✅ show error state
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg font-semibold">
        {t("booksAndArticles.error")}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eaf2ff] via-[#f7faff] to-white py-20 px-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center mb-20"
      >
        <h1 className="text-5xl font-extrabold text-[#104c80] mb-5">
          {t("booksAndArticles.title")}
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
          {t("booksAndArticles.subtitle")}
        </p>
      </motion.div>

      {/* Books Section */}
      <div className="max-w-5xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {books.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            {t("booksAndArticles.noBooks")}
          </p>
        ) : (
          books.map((book) => (
            <motion.div
              key={book._id || book.id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="relative group bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-[#104c80]/10 overflow-hidden flex flex-col justify-between hover:shadow-2xl"
            >
              {/* Decorative gradient strip */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#104c80] to-[#4a8bd8]" />

              {/* Card Content */}
              <div className="p-8 flex-1 flex flex-col items-center text-center">
                <BookOpen className="w-14 h-14 text-[#104c80] mb-4" />
                <h2 className="text-2xl font-semibold text-[#104c80] mb-3 break-words">
                  {book.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed break-words">
                  {book.description}
                </p>
              </div>

              {/* Download Button */}
              {book.pdfUrl && (
                <div className="p-6 flex justify-center">
                  <button
                    onClick={async () => {
                      const response = await fetch(book.pdfUrl)
                      const blob = await response.blob()
                      const url = window.URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = `${book.fileName || book.title || 'file'}.pdf`  // ✅ fallback added
                      document.body.appendChild(a)
                      a.click()
                      a.remove()
                      window.URL.revokeObjectURL(url)
                    }}
                    className="flex items-center gap-2 bg-[#104c80] text-white px-6 py-2.5 rounded-full shadow-md hover:bg-[#0d3a66] transition-all duration-300"
                  >
                    <Download className="w-5 h-5" />
                    {t("booksAndArticles.downloadBtn")}
                  </button>
                </div>
              )}

            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default BooksAndArticles;
