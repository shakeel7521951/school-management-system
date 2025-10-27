import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Download } from "lucide-react";

const BooksAndArticles = () => {
  const books = [
    {
      title: "Discipline Skills that Teach Responsibility",
      description:
        "A book that explains effective discipline techniques and their role in teaching students responsibility and self-control within the classroom environment.",
      pdf: "/pdfs/مهارات التهذيب التى تعلم المسئولية  (1).pdf",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f9ff] to-white py-16 px-6">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#104c80] mb-4">
          Books & Articles
        </h1>
        <p className="text-gray-600 text-lg">
          Browse through educational books and articles and download PDF files
          to expand your knowledge about behavior, responsibility, and learning.
        </p>
      </div>

      {/* Books Grid */}
      <div className="max-w-4xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {books.map((book, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg border border-[#104c80]/10 p-6 flex flex-col justify-between text-center"
          >
            <div>
              <div className="flex justify-center mb-4">
                <BookOpen className="w-12 h-12 text-[#104c80]" />
              </div>
              <h2 className="text-xl font-semibold text-[#104c80] mb-2">
                {book.title}
              </h2>
              <p className="text-gray-600 mb-4">{book.description}</p>
            </div>

            <div className="mt-4 flex justify-center">
              <a
                href={book.pdf}
                download
                className="flex items-center gap-2 bg-[#104c80] text-white px-5 py-2 rounded-full shadow-md hover:bg-[#0d3a66] transition-all"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BooksAndArticles;
