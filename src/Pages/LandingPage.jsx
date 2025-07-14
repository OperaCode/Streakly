import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";

const LandingPage = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
  }, [controls]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-['Inter']">
      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 bg-white shadow-md p-6 flex justify-between items-center max-w-7xl mx-auto"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-indigo-600">Streakly</h1>
        <nav className="space-x-8">
          {/* <Link to="/home" className="text-gray-600 hover:text-indigo-600 transition-colors" >Home</Link> */}
          <a
            href="#home"
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            About
          </a>
          <a
            href="#bottom"
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Testimonials
          </a>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative text-center py-32 bg-gradient-to-br from-indigo-100 via-teal-50 to-white overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')] opacity-10"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 drop-shadow-sm">
            Swipe. Complete. Repeat.
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-700 leading-relaxed">
            Transform your daily tasks into powerful streaks with Streakly – the
            ultimate minimalist productivity app.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/home"
              className="inline-block bg-indigo-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-indigo-700 transition-colors animate-pulse"
              aria-label="Start your streak"
            >
              Start Your Streak
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 px-6">
          {[
            {
              icon: "🔥",
              title: "Daily Streaks",
              desc: "Stay consistent with daily streak tracking that motivates you to keep showing up.",
            },
            {
              icon: "👆",
              title: "Swipe to Complete",
              desc: "A fun, intuitive swipe interface to mark tasks as done or skip for later.",
            },
            {
              icon: "📈",
              title: "Visual Progress",
              desc: "Watch your growth with a clean, minimal pixel grid that fills with your progress.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {f.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimonials" className="py-24 bg-indigo-50 text-center">
        <motion.h2
          className="text-4xl font-bold mb-8 text-gray-900"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          What Our Users Say
        </motion.h2>
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="p-8 bg-white rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-lg italic text-gray-600 mb-4">
              "Streakly transformed my daily routine! The swipe feature makes it
              so easy to stay on track."
            </p>
            <p className="font-semibold text-indigo-600">
              – Alex M., Product Manager
            </p>
          </motion.div>
        </div>
      </section>

      {/* Motivation Section */}
      <section
        id="bottom"
        className="py-24 bg-gradient-to-b from-indigo-100 to-teal-50 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Join thousands staying productive with Streakly
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-700 leading-relaxed">
            Build momentum with daily streaks and watch your productivity soar,
            one swipe at a time.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/home"
              className="inline-block bg-indigo-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-indigo-700 transition-colors"
              aria-label="Start now"
            >
              Start Now
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-6">© 2025 Streakly. All rights reserved.</p>
          <div className="space-x-6 mb-6">
            <a
              href="#home"
              className=" hover:text-indigo-600 transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              className=" hover:text-indigo-600 transition-colors"
            >
              About
            </a>
            <a
              href="#bottom"
              className=" hover:text-indigo-600 transition-colors"
            >
              Testimonials
            </a>
          </div>
         
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
