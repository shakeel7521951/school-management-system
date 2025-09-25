// src/pages/Tamakon/Gallery.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaInstagram,
    FaTimes,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";

const Gallery = () => {
    // School gallery images (replace with actual school photos)
    const images = [
        { src: "/images/gallery1.jpg", title: "School Campus", description: "Our state-of-the-art campus designed for optimal learning environment", category: "campus", date: "2024-01-15" },
        { src: "/images/gallery2.jpg", title: "Classroom Activities", description: "Interactive learning sessions in our modern classrooms", category: "academics", date: "2024-01-10" },
        { src: "/images/gallery3.jpg", title: "Sports Day", description: "Annual sports competition showcasing student athleticism", category: "sports", date: "2024-01-08" },
        { src: "/images/gallery4.jpg", title: "Science Lab", description: "Hands-on experiments in our fully equipped laboratories", category: "facilities", date: "2024-01-05" },
        { src: "/images/gallery5.jpg", title: "Art Exhibition", description: "Student artwork displayed in our annual art showcase", category: "arts", date: "2023-12-20" },
        { src: "/images/gallery6.jpg", title: "Graduation Ceremony", description: "Celebrating our graduates' achievements and success", category: "events", date: "2023-12-15" },
        { src: "/images/gallery7.jpg", title: "Library", description: "Extensive collection of books and digital resources", category: "facilities", date: "2023-12-10" },
        { src: "/images/gallery8.jpg", title: "Cultural Event", description: "Multicultural celebrations and performances", category: "events", date: "2023-12-05" },
    ];

    const categories = ["all", "campus", "academics", "sports", "arts", "events", "facilities"];
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedImage, setSelectedImage] = useState(null);

    const filteredImages =
        selectedCategory === "all"
            ? images
            : images.filter((img) => img.category === selectedCategory);

    const openLightbox = (image) => {
        setSelectedImage(image);
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = "unset";
    };

    const navigateImage = (direction) => {
        if (!selectedImage) return;
        const currentIndex = filteredImages.findIndex((img) => img.src === selectedImage.src);
        let newIndex;
        if (direction === "next") {
            newIndex = (currentIndex + 1) % filteredImages.length;
        } else {
            newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        }
        setSelectedImage(filteredImages[newIndex]);
    };

    // Format date
    const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

    return (
        <div className="w-full text-gray-800 bg-gray-50">
            {/* Hero Banner */}
            <section
                className="relative w-full h-[50vh] min-h-[400px] bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage:
                        "url('https://tamakon.edu.qa/wp-content/uploads/2023/10/div2.png')",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#104c80]/90 to-[#0a3255]/80"></div>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center text-white px-6"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-2xl font-serif">
                        Gallery
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-gray-100 max-w-4xl mx-auto leading-relaxed">
                        Discover the vibrant life at Al-Tamakon Comprehensive School
                    </p>
                </motion.div>
            </section>

            {/* Category Filters */}
            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 capitalize ${selectedCategory === category
                                    ? "bg-[#104c80] text-white shadow-lg transform scale-105"
                                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Gallery Layout: 3 cols (3 | 2 | 3) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="flex flex-col gap-6">
                        {filteredImages.slice(0, 3).map((image, index) => (
                            <motion.div
                                key={index}
                                className="relative group overflow-hidden rounded-2xl shadow-xl cursor-pointer"
                                onClick={() => openLightbox(image)}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end">
                                    <h2 className="text-white text-lg font-semibold p-4">{image.title}</h2>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Center Column */}
                    <div className="flex flex-col gap-6 justify-center">
                        {filteredImages.slice(3, 5).map((image, index) => (
                            <motion.div
                                key={index}
                                className="relative group overflow-hidden rounded-2xl shadow-xl cursor-pointer"
                                onClick={() => openLightbox(image)}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    className="w-full h-72 object-cover transform group-hover:scale-110 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end">
                                    <h2 className="text-white text-lg font-semibold p-4">{image.title}</h2>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-6">
                        {filteredImages.slice(5, 8).map((image, index) => (
                            <motion.div
                                key={index}
                                className="relative group overflow-hidden rounded-2xl shadow-xl cursor-pointer"
                                onClick={() => openLightbox(image)}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end">
                                    <h2 className="text-white text-lg font-semibold p-4">{image.title}</h2>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                        onClick={closeLightbox}
                    >
                        <button
                            className="absolute top-6 right-6 text-white text-3xl z-10 hover:text-gray-300 transition duration-200 bg-black/50 rounded-full p-2"
                            onClick={closeLightbox}
                        >
                            <FaTimes />
                        </button>
                        <button
                            className="absolute left-6 text-white text-2xl p-4 bg-black/50 rounded-full hover:bg-black/70 transition duration-200 z-10"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigateImage("prev");
                            }}
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            className="absolute right-6 text-white text-2xl p-4 bg-black/50 rounded-full hover:bg-black/70 transition duration-200 z-10"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigateImage("next");
                            }}
                        >
                            <FaChevronRight />
                        </button>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative max-w-4xl max-h-[80vh] bg-white rounded-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                className="w-full h-auto max-h-[70vh] object-cover"
                            />
                            <div className="p-6 bg-white text-gray-800">
                                <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                                <p className="text-gray-600 mb-3">{selectedImage.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="inline-block px-3 py-1 bg-[#104c80] text-white rounded-full text-sm capitalize">
                                        {selectedImage.category}
                                    </span>
                                    <span className="text-sm text-gray-500">{formatDate(selectedImage.date)}</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
