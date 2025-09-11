import { FaClock } from "react-icons/fa";
import background1 from "../../assets/contactimages/background1.jpg";

const OfficeHours = () => {
  const hours = [
    { day: "Sunday – Thursday", time: "7:30 AM – 2:30 PM" },
    { day: "Friday – Saturday", time: "Closed" },
  ];

  return (
    <section className="relative w-full h-auto md:py-10">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={background1}
          alt="Office Background"
          className="w-full h-full object-cover object-center filter brightness-60"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-blue-800/40 to-blue-700/40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 md:py-32 py-10 flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Left: Hero Section */}
        <div
          className="flex flex-col gap-6 text-white lg:w-1/2"
          data-aos="fade-right"
        >
          <div className="flex items-center gap-4">
            <FaClock className="text-7xl text-[#d08700] animate-bounce" />
            <h2 className="text-5xl lg:text-6xl font-extrabold leading-tight">
              Office Hours
            </h2>
          </div>
          <p className="text-lg lg:text-xl text-center text-gray-200">
            Our team is available during the hours below. Please check before
            visiting, and contact us for any urgent matters.
          </p>
        </div>

        {/* Right: Floating Cards */}
        <div className="lg:w-1/2 flex flex-col gap-6" data-aos="fade-left">
          {hours.map((hour, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl px-4 gap-3  md:px-8 py-4 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500"
            >
              <span className="text-white text-sm lg:text-xl font-medium">
                {hour.day}
              </span>
              <span
                className={`${
                  hour.time.toLowerCase() === "closed"
                    ? "text-red-500 font-bold"
                    : "text-[#d08700] font-semibold"
                } text-sm lg:text-xl`}
              >
                {hour.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <p
        className="relative z-10 text-center text-white md:mt-6 pb-6 text-md lg:text-xl max-w-2xl mx-auto px-4"
        data-aos="zoom-out"
      >
        For urgent matters outside working hours, please reach us by email and
        we will respond as soon as possible.
      </p>
    </section>
  );
};

export default OfficeHours;