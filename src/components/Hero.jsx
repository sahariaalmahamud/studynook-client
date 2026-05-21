'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Users, Star } from 'lucide-react';

// Floating blobs component
const FloatingBlob = ({ delay = 0, size = 'w-96', top = '10%', left = '-5%' }) => {
  return (
    <motion.div
      className={`absolute ${size} h-96 bg-linear-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl pointer-events-none`}
      style={{ top, left }}
      animate={{
        y: [0, 30, 0],
        x: [0, 20, 0],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

// Stat card component
const StatCard = ({ icon: Icon, label, value, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="glass-effect p-4 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, delay: delay + 0.3, repeat: Infinity }}
        className="flex items-center gap-3"
      >
        <div className="p-2 bg-linear-to-br from-blue-400 to-purple-400 rounded-lg">
          <Icon size={20} className="text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-lg font-semibold text-white">{value}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.2 },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.4 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.6 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, x: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.8, delay: 0.3 },
    },
  };

  const buttonHoverVariants = {
    hover: { scale: 1.05, y: -2 },
    tap: { scale: 0.98 },
  };


  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-900 via-slate-900 to-slate-800 overflow-hidden relative">
      {/* Animated Background Blobs */}
      <FloatingBlob delay={0} size="w-96" top="10%" left="-5%" />
      <FloatingBlob delay={1} size="w-72" top="60%" left="70%" />
      <FloatingBlob delay={2} size="w-80" top="20%" left="60%" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-900/50 to-slate-900 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <motion.div className="flex flex-col space-y-6 md:space-y-8">
            {/* Badge */}
            <motion.div variants={badgeVariants} className="w-fit">
              <div className="glass-effect inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-all">
                <div className="w-2 h-2 bg-linear-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-transparent bg-clip-text bg-linear-to-r from-blue-300 to-purple-300">
                  Quiet • Productive • Private
                </span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div variants={headingVariants}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Find Your
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-pink-400">
                  Perfect Study Room
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div variants={descriptionVariants}>
              <p className="text-lg md:text-xl text-gray-300 max-w-md leading-relaxed">
                Browse and book quiet, private study rooms in your library. List your own room and earn.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={buttonVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.div
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link href="/rooms">
                  <button className="group relative w-full sm:w-auto px-8 py-3 md:py-4 bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 cursor-pointer">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <BookOpen size={20} />
                      Explore Rooms
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </Link>
              </motion.div>

              <motion.div
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <button className="group relative w-full sm:w-auto px-8 py-3 md:py-4 glass-effect backdrop-blur-md bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Users size={20} />
                    List Your Room
                  </span>
                </button>
              </motion.div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
              <StatCard
                icon={BookOpen}
                label="Rooms Available"
                value="120+"
                delay={0.8}
              />
              <StatCard
                icon={Star}
                label="User Rating"
                value="4.9"
                delay={1}
              />
            </motion.div>
          </motion.div>

          {/* Right Side - Illustration */}
          <motion.div
            variants={imageVariants}
            className="hidden lg:flex items-center justify-center"
          >
            <motion.div
              animate={{
                y: [0, 20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              {/* Placeholder for hero image - can be replaced with actual image or illustration */}
              <div className="w-full h-96 relative">
                {/* Glowing circle background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Main illustration area with glass effect */}
                <div className="relative h-full glass-effect backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-8 flex items-center justify-center overflow-hidden">
                  {/* Decorative elements */}
                  <motion.div
                    className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl blur-xl opacity-30"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  <motion.div
                    className="absolute bottom-6 left-6 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-xl opacity-30"
                    animate={{
                      scale: [1.2, 1, 1.2],
                      rotate: [0, -90, 0],
                    }}
                    transition={{
                      duration: 6,
                      delay: 1,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  {/* Content overlay */}
                  <div className="relative z-10 text-center space-y-4">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <BookOpen size={64} className="mx-auto text-blue-400" />
                    </motion.div>
                    <p className="text-white font-semibold text-lg">Study Room Finder</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
    </div>
  );
}