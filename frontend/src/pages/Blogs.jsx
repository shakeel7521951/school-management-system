// src/pages/Blog.jsx
import React, { useState } from "react";
import { Calendar, User, Tag, Search, ArrowRight, Clock, Share2, Bookmark, Eye } from "lucide-react";

const Blog = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const blogPosts = [
        {
            id: 1,
            title: "Understanding Neural Networks: A Comprehensive Guide",
            author: "Isha Naveed",
            date: "October 20, 2025",
            category: "Artificial Intelligence",
            summary: "Dive into the basics of neural networks, their architecture, and how they form the foundation of modern AI systems. Learn about different types of neural networks and their practical applications.",
            image: "/images/blog-1.jpg",
            readTime: "8 min read",
            views: "1.2k",
            featured: true
        },
        {
            id: 2,
            title: "The Future of Machine Learning: Trends to Watch in 2025",
            author: "Admin",
            date: "October 10, 2025",
            category: "Machine Learning",
            summary: "Machine Learning is evolving rapidly. Discover the latest trends, tools, and research areas shaping the future of AI and how they're transforming industries worldwide.",
            image: "/images/blog-2.jpg",
            readTime: "6 min read",
            views: "894",
            featured: true
        },
        {
            id: 3,
            title: "Optimizing Web Apps with React: Best Practices",
            author: "Developer Team",
            date: "September 25, 2025",
            category: "Web Development",
            summary: "Learn how to improve performance, reusability, and scalability in your React-based web applications with these proven techniques and modern approaches.",
            image: "/images/blog-3.png",
            readTime: "10 min read",
            views: "1.5k",
            featured: false
        },
        {
            id: 4,
            title: "Deep Learning vs Machine Learning: Key Differences",
            author: "Isha Naveed",
            date: "September 18, 2025",
            category: "Deep Learning",
            summary: "Understand the fundamental differences between deep learning and traditional machine learning approaches, and when to use each in your projects.",
            image: "/images/blog-4.jpg",
            readTime: "7 min read",
            views: "2.1k",
            featured: false
        },
        {
            id: 5,
            title: "Data Science in Healthcare: Revolutionizing Patient Care",
            author: "Data Team",
            date: "September 12, 2025",
            category: "Data Science",
            summary: "Explore how data science and AI are transforming healthcare, from predictive analytics to personalized treatment plans and medical research.",
            image: "/images/blog-5.jpg",
            readTime: "9 min read",
            views: "1.8k",
            featured: true
        },
        {
            id: 6,
            title: "Building Scalable APIs with Modern JavaScript",
            author: "Developer Team",
            date: "September 5, 2025",
            category: "Web Development",
            summary: "A comprehensive guide to building robust, scalable APIs using modern JavaScript frameworks and best practices for enterprise applications.",
            image: "/images/blog-6.jpg",
            readTime: "11 min read",
            views: "956",
            featured: false
        }
    ];

    const categories = [
        "All",
        "Artificial Intelligence",
        "Machine Learning",
        "Deep Learning",
        "Web Development",
        "Data Science"
    ];

    const featuredPosts = blogPosts.filter(post => post.featured);
    const recentPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">
            {/* ===== Hero Section ===== */}
            <section className="relative bg-gradient-to-r from-[#0B055A] to-[#5A51D3] text-white py-24 px-6 text-center overflow-hidden">


                <div className="relative max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                        Welcome to Our Blog
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                        Explore insights, tutorials, and updates from the world of technology and AI.
                        Stay ahead with cutting-edge knowledge.
                    </p>
                    <div className="relative max-w-2xl mx-auto">
                        <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-4 border border-white/30">
                            <Search className="text-white mr-3" size={20} />
                            <input
                                type="text"
                                placeholder="Search articles, topics, or authors..."
                                className="bg-transparent border-none text-white placeholder-white/70 focus:outline-none w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Featured Posts ===== */}
            {featuredPosts.length > 0 && (
                <section className="py-16 px-6 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0B055A]">
                            Featured Articles
                        </h2>
                        <div className="flex items-center text-[#5A51D3] font-semibold cursor-pointer hover:text-[#0B055A] transition">
                            View All <ArrowRight size={20} className="ml-2" />
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {featuredPosts.map((post) => (
                            <div key={post.id} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                                    />
                                    <div className="absolute top-4 left-4 bg-gradient-to-r from-[#0B055A] to-[#5A51D3] text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        Featured
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 flex-wrap">
                                        <div className="flex items-center gap-1">
                                            <User size={14} /> {post.author}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} /> {post.date}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock size={14} /> {post.readTime}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Eye size={14} /> {post.views}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-[#0B055A] mb-4 group-hover:text-[#5A51D3] transition line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                                        {post.summary}
                                    </p>

                                    <div className="flex justify-between items-center">
                                        <span className="inline-flex items-center gap-1 bg-blue-50 text-[#5A51D3] px-3 py-1 rounded-full text-sm font-medium">
                                            <Tag size={14} /> {post.category}
                                        </span>
                                        <div className="flex items-center gap-3">
                                            <button className="p-2 text-gray-400 hover:text-[#5A51D3] transition">
                                                <Bookmark size={18} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-[#5A51D3] transition">
                                                <Share2 size={18} />
                                            </button>
                                            <button className="flex items-center gap-2 bg-gradient-to-r from-[#0B055A] to-[#5A51D3] text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition">
                                                Read More <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ===== Blog Content Section ===== */}
            <section className="py-16 px-6 max-w-7xl mx-auto grid lg:grid-cols-[2fr_1fr] gap-12">
                {/* Main Blog Posts */}
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-[#0B055A]">
                            {selectedCategory === "All" ? "All Articles" : selectedCategory}
                        </h2>
                        <div className="text-gray-500">
                            {filteredPosts.length} articles found
                        </div>
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap gap-3 mb-8">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full font-medium transition ${selectedCategory === category
                                    ? "bg-gradient-to-r from-[#0B055A] to-[#5A51D3] text-white shadow-lg"
                                    : "bg-white text-gray-600 hover:bg-gray-50 shadow-sm"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Blog Posts Grid */}
                    {filteredPosts.length > 0 ? (
                        <div className="grid gap-8">
                            {filteredPosts.map((post) => (
                                <article key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                                    <div className="md:flex">
                                        <div className="md:w-2/5">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition duration-500"
                                            />
                                        </div>
                                        <div className="md:w-3/5 p-8">
                                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3 flex-wrap">
                                                <div className="flex items-center gap-1">
                                                    <User size={14} /> {post.author}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar size={14} /> {post.date}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock size={14} /> {post.readTime}
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-[#0B055A] mb-3 group-hover:text-[#5A51D3] transition line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
                                                {post.summary}
                                            </p>

                                            <div className="flex justify-between items-center">
                                                <span className="inline-flex items-center gap-1 bg-blue-50 text-[#5A51D3] px-3 py-1 rounded-full text-sm font-medium">
                                                    <Tag size={14} /> {post.category}
                                                </span>
                                                <div className="flex items-center gap-4">
                                                    <span className="flex items-center gap-1 text-sm text-gray-500">
                                                        <Eye size={14} /> {post.views}
                                                    </span>
                                                    <button className="flex items-center gap-2 text-[#0B055A] font-semibold hover:text-[#5A51D3] transition group">
                                                        Read More <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold text-gray-600 mb-2">No articles found</h3>
                            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <aside className="space-y-8">
                    {/* Categories */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-2xl font-bold text-[#0B055A] mb-6 pb-2 border-b-2 border-blue-100">
                            Categories
                        </h3>
                        <ul className="space-y-3">
                            {categories.map((category, idx) => (
                                <li
                                    key={idx}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition ${selectedCategory === category
                                        ? "bg-gradient-to-r from-[#0B055A] to-[#5A51D3] text-white"
                                        : "hover:bg-blue-50 text-gray-700"
                                        }`}
                                >
                                    <span>• {category}</span>
                                    <span className="text-sm opacity-70">
                                        {blogPosts.filter(post => category === "All" || post.category === category).length}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Recent Posts */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-2xl font-bold text-[#0B055A] mb-6 pb-2 border-b-2 border-blue-100">
                            Recent Posts
                        </h3>
                        <div className="space-y-4">
                            {recentPosts.map((post) => (
                                <div key={post.id} className="flex gap-4 group cursor-pointer">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-16 h-16 object-cover rounded-lg group-hover:scale-110 transition duration-300"
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-800 group-hover:text-[#5A51D3] transition line-clamp-2 text-sm">
                                            {post.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="bg-gradient-to-br from-[#0B055A] to-[#5A51D3] text-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-2xl font-bold mb-4">About This Blog</h3>
                        <p className="text-white/90 leading-relaxed mb-4">
                            We share cutting-edge articles on AI, ML, and web development. Stay updated with the
                            latest innovations, trends, and tutorials from experts in the field.
                        </p>
                        <button className="w-full bg-white text-[#0B055A] py-3 rounded-xl font-semibold hover:bg-blue-50 transition">
                            Subscribe to Newsletter
                        </button>
                    </div>

                    {/* Tags Cloud */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-2xl font-bold text-[#0B055A] mb-4">Popular Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {["AI", "React", "JavaScript", "Python", "Neural Networks", "Data Science", "Web Dev", "Machine Learning"].map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-[#5A51D3] transition cursor-pointer"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </aside>
            </section>

            {/* ===== Newsletter Section ===== */}
            <section className="py-16 px-6 bg-gradient-to-r from-[#0B055A] to-[#5A51D3] text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Get the latest articles and news delivered directly to your inbox. No spam, ever.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button className="bg-white text-[#0B055A] px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition whitespace-nowrap">
                            Subscribe Now
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;