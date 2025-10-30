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
  Bookmark,
} from "lucide-react";
import { motion } from "framer-motion";
import { useGetBlogByIdQuery } from "../redux/slices/BlogApi";
import { useTranslation } from "react-i18next";

const BlogDetails = () => {
  const { t } = useTranslation("blogDetails");
  const { id } = useParams();
  const { data: blog, isLoading, isError } = useGetBlogByIdQuery(id);

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#104c80] mx-auto mb-4"></div>
          <p className="text-[#104c80] font-semibold tracking-wide">
            {t("loading.message")}
          </p>
        </div>
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <h1 className="text-3xl font-bold text-[#104c80] mb-4">
            {t("error.title")}
          </h1>
          <p className="text-gray-600 mb-8">{t("error.description")}</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-[#104c80] hover:bg-[#0c3c66] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft size={18} /> {t("error.button")}
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100/30 font-inter overflow-hidden">
      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Back Button */}
        <motion.div variants={fadeUp} className="mb-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[#104c80] hover:text-[#0c3c66] font-medium transition-all duration-300 group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            {t("backButton")}
          </Link>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl overflow-hidden shadow-2xl mb-14 border border-[#104c80]/20 relative group"
        >
          <motion.img
            src={blog.posterImage}
            alt={blog.title}
            className="w-full h-[250px] md:h-[280px] lg:h-[360px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
            whileHover={{ scale: 1.05 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#104c80]/40 via-transparent to-transparent opacity-70"></div>
        </motion.div>

        {/* Title + Meta */}
        <motion.div variants={fadeUp} className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#104c80] mb-5 leading-tight tracking-tight">
            {blog.title}
          </h1>

          <motion.p
            variants={fadeUp}
            className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {blog.description}
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-6 text-sm text-gray-600"
            variants={staggerContainer}
          >
            <motion.span variants={fadeUp} className="flex items-center gap-1">
              <User size={16} /> {blog.author || t("meta.authorFallback")}
            </motion.span>
            <motion.span variants={fadeUp} className="flex items-center gap-1">
              <Calendar size={16} />{" "}
              {new Date(blog.createdAt).toLocaleDateString(t("dateFormats.short"))}
            </motion.span>
           
          </motion.div>
        </motion.div>

        {/* Blog Content */}
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative bg-white rounded-3xl shadow-2xl border border-[#104c80]/10 p-10 md:p-14 overflow-hidden"
        >
          {/* Subtle animated gradient accent */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-[#104c80]/20 via-blue-200/10 to-transparent"
          />

          {/* Animated blog text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative z-10 prose max-w-none text-gray-800 prose-lg md:prose-xl
              prose-headings:text-[#104c80] prose-headings:font-bold prose-headings:mt-10
              prose-p:leading-loose prose-p:mb-5
              prose-img:rounded-2xl prose-img:shadow-lg prose-img:border prose-img:my-10
              prose-a:text-[#104c80] hover:prose-a:underline
              prose-strong:text-[#104c80] prose-hr:border-gray-200"
          >
            <motion.div
              variants={fadeUp}
              dangerouslySetInnerHTML={{ __html: blog.html }}
            />
          </motion.div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-12 pt-8  border-t border-gray-200"
            >
              <h3 className="text-lg font-semibold text-[#104c80] mb-4 flex items-center gap-2">
                <Tag size={18} /> {t("content.tagsTitle")}
              </h3>
              <div className="flex flex-wrap gap-3">
                {blog.tags.map((tag, i) => (
                  <motion.span
                    key={i}
                    variants={fadeUp}
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-1 bg-[#104c80]/10 text-[#104c80] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#104c80]/20 transition-all duration-300 cursor-pointer"
                  >
                    #{tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Footer */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-end items-end gap-4"
          >
            <div className="text-gray-500 text-sm">
              {t("content.publishedOn")}{" "}
              <span className="text-[#104c80] font-medium">
                {new Date(blog.createdAt).toLocaleDateString(
                  "en-US",
                  t("dateFormats.long")
                )}
              </span>
            </div>
           
          </motion.div>
        </motion.article>
      </motion.div>
    </div>
  );
};

export default BlogDetails;
