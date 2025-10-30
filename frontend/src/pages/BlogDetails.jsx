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

const BlogDetails = () => {
  const { id } = useParams();

  const blogPosts = [
   {
            id: 1,
            title: "Understanding Neural Networks: A Comprehensive Guide",
            author: "Isha Naveed",
            date: "October 20, 2025",
            category: "Artificial Intelligence",
            image: "/images/blog-1.jpg",
            readTime: "8 min read",
            views: "1.2k",
            content: `
Neural networks are the foundation of deep learning — the most powerful branch of AI today. 
They consist of layers of nodes (neurons) that learn to recognize complex patterns in data.

🔑 Key Concepts:
- **Neurons:** Units that receive input and apply activation functions.
- **Layers:** Input, hidden, and output layers define the network’s depth.
- **Training:** Uses backpropagation and optimization (like gradient descent).
- **Applications:** Image recognition, NLP, robotics, and predictive analytics.

By mastering neural networks, you unlock the potential to build models that can *see, hear, and make decisions* like humans.
      `,
        },
        {
            id: 2,
            title: "The Future of Machine Learning: Trends to Watch in 2025",
            author: "Admin",
            date: "October 10, 2025",
            category: "Machine Learning",
            image: "/images/blog-2.jpg",
            readTime: "6 min read",
            views: "894",
            content: `
Machine Learning continues to evolve in 2025 with emerging tools and trends that are transforming how we build AI.

### 🔍 Top Trends:
- **TinyML:** Running ML models on small IoT devices.
- **AutoML:** Automated model selection and optimization.
- **Explainable AI:** Increasing transparency in predictions.
- **Federated Learning:** Training models without centralized data.

As we move forward, ML will integrate deeply into every field—from medicine to finance to creative arts.
      `,
        },
        {
            id: 3,
            title: "Optimizing Web Apps with React: Best Practices",
            author: "Developer Team",
            date: "September 25, 2025",
            category: "Web Development",
            image: "/images/blog-3.png",
            readTime: "10 min read",
            views: "1.5k",
            content: `
React offers flexibility and scalability for modern web apps — but performance optimization is key.

### ⚙️ Best Practices:
- **Code Splitting** with React.lazy()
- **Memoization** with React.memo() and useMemo()
- **Reducing Re-renders** by optimizing component structure
- **Lazy Loading Images**
- **Using React Profiler** to identify bottlenecks

By mastering these, you ensure smoother, faster, and more maintainable React projects.
      `,
        },
        {
            id: 4,
            title: "Introduction to Data Science for Beginners",
            author: "Data Team",
            date: "September 15, 2025",
            category: "Data Science",
            image: "/images/blog-4.jpg",
            readTime: "12 min read",
            views: "2.1k",
            content: `
Data Science combines programming, statistics, and domain knowledge to derive insights from data.

### 🧠 Core Components:
- **Data Cleaning:** Handling missing values and outliers.
- **Exploratory Data Analysis (EDA):** Understanding data through visuals.
- **Modeling:** Using algorithms like regression, trees, or clustering.
- **Evaluation:** Measuring accuracy and reliability.

Whether you’re analyzing sales data or predicting trends, data science empowers better decision-making.
      `,
        },
        {
            id: 5,
            title: "Building Scalable APIs with Node.js",
            author: "Backend Team",
            date: "August 30, 2025",
            category: "Backend Development",
            image: "/images/blog-5.jpg",
            readTime: "9 min read",
            views: "1.8k",
            content: `
Node.js has become the backbone of scalable web applications.

### ⚡ Best Practices:
- **Modular Structure:** Organize code with separate routes & controllers.
- **Error Handling:** Always return structured error responses.
- **JWT Authentication:** Secure routes effectively.
- **Performance Monitoring:** Use PM2 and clustering.

Mastering Node.js API design will help you handle millions of requests efficiently.
      `,
        },
  ];

  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a3a63] text-white">
        <h1 className="text-4xl font-bold mb-4">404 - Blog Not Found</h1>
        <Link
          to="/blog"
          className="text-white/80 hover:text-white flex items-center gap-2 transition"
        >
          <ArrowLeft size={18} /> Back to Blog
        </Link>
      </div>
    );
  } 

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-[#cfe8f9]/60 to-[#104c80]/30 text-gray-100 font-inter overflow-hidden">
      {/* Glass Layer */}
      <div className="absolute inset-0 backdrop-blur-2xl bg-white/10"></div>

      <div className="relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto pt-6 sm:pt-10 px-4 sm:px-6"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[#104c80]/80 hover:text-[#104c80] transition mb-6 font-medium"
          >
            <ArrowLeft size={18} /> Back to Blog
          </Link>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8"
        >
          <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] overflow-hidden rounded-3xl shadow-xl border-4 border-white/30 bg-white/20 backdrop-blur-md">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#104c80]/70 via-transparent to-transparent"></div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-14"
        >
          <div className="bg-white/30 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-lg border border-white/30">
            {/* Category & Title */}
            <div className="text-center mb-10">
              <span className="inline-block bg-[#104c80]/10 text-[#104c80] px-5 py-1 rounded-full text-sm font-medium mb-4">
                {post.category}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 leading-snug text-[#0b1a2b]">
                {post.title}
              </h1>

              {/* Author Info */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-gray-700 text-sm">
                <span className="flex items-center gap-1">
                  <User size={14} /> {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {post.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={14} /> {post.views} views
                </span>
              </div>
            </div>

            {/* Blog Content */}
            <article
              className="prose max-w-none text-gray-800 prose-headings:text-[#104c80] prose-strong:text-[#0b1a2b] prose-blockquote:border-l-[#104c80] prose-blockquote:text-[#0b1a2b] prose-li:marker:text-[#104c80] text-base sm:text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetails;
