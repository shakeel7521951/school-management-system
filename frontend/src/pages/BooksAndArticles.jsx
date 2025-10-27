import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Download } from "lucide-react";

const BooksAndArticles = () => {
  const books = [
    {
      title: "Discipline Skills that Teach Responsibility",
      description:
        "A detailed guide explaining effective discipline strategies and how they foster responsibility, respect, and positive behavior in the learning environment.",
      pdf: "/pdfs/مهارات التهذيب التى تعلم المسئولية  (1).pdf",
    },
  ];

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
          Books & Articles
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
          Explore insightful books and downloadable articles focused on
          discipline, learning, and leadership. Download PDFs and enhance your
          knowledge anytime.
        </p>
      </motion.div>

      {/* Books Section */}
      <div className="max-w-5xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {books.map((book, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="relative group bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-[#104c80]/10 overflow-hidden flex flex-col justify-between hover:shadow-2xl"
          >
            {/* Decorative gradient strip */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#104c80] to-[#4a8bd8]" />

            {/* Card Content */}
            <div className="p-8 flex-1 flex flex-col items-center text-center">
              <BookOpen className="w-14 h-14 text-[#104c80] mb-4" />
              <h2 className="text-2xl font-semibold text-[#104c80] mb-3">
                {book.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {book.description}
              </p>
            </div>

            {/* Download Button */}
            <div className="p-6 flex justify-center">
              <a
                href={book.pdf}
                download
                className="flex items-center gap-2 bg-[#104c80] text-white px-6 py-2.5 rounded-full shadow-md hover:bg-[#0d3a66] transition-all duration-300"
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
