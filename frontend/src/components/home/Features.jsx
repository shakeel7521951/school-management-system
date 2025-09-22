import React from "react";

const Features = () => {
  const features = [
    {
      image: "./images/language.png",
      title: "Speech and Language Therapy",
      desc: "Daily, weekly, and monthly sessions.",
    },
    {
      image: "./images/edu.png",
      title: "Outstanding Education",
      desc: "Motivating students to achieve their highest potential.",
    },
    {
      image: "./images/technologies.png",
      title: "Modern Technologies",
      desc: "Advanced educational resources to enhance learning.",
    },
    {
      image: "./images/brightfuture.png",
      title: "A Bright Future",
      desc: "Building strong foundations for future success.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      {/* Heading Section */}
      <div className="container mx-auto px-6 text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1A4480]">
          Our Key Services
        </h2>
        <p className="text-lg font-semibold text-gray-600 mt-4 max-w-2xl mx-auto">
          At Tamakon Comprehensive School, we combine advanced teaching,
          therapeutic care, and modern resources to empower every student
          to reach their highest potential.
        </p>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto h-[300px] px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-b from-[#273C66] to-[#1A4480] text-white p-6 rounded-xl shadow-lg hover:scale-105 transition"
          >
            {/* Image */}
            <div className="mb-6 flex justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-contain"
              />
            </div>
            {/* Title */}
            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
            {/* Description */}
            <p className="text-lg text-gray-200">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
