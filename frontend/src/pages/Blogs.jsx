// src/pages/Blog.jsx
import React from "react";

const Blog = () => {
    const blogPosts = [
        {
            id: 1,
            title: "Blog Post 1",
            summary: "This is a sample blog post summary to show how your blog layout will look.",
            image: "/images/blog-1.jpg",
        },
        {
            id: 2,
            title: "Blog Post 2",
            summary: "Explore new ideas and insights from our latest updates and articles.",
            image: "/images/blog-2.jpg",
        },
        {
            id: 3,
            title: "Blog Post 3",
            summary: "Stay connected with our team’s thoughts and announcements.",
            image: "/images/blog-3.png",
        },
    ];

    return (
        <section className="py-16 px-6 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-[#244083]">
                Our Blog
            </h1>
            <p className="text-gray-700 text-center max-w-3xl mx-auto mb-12">
                Welcome to our blog section! Here you’ll find the latest news,
                insights, and updates from our team.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                    <div
                        key={post.id}
                        className="border rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden bg-white"
                    >
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-5">
                            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                            <p className="text-gray-600 text-sm">{post.summary}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Blog;
