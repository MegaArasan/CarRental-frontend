import React from "react";
import { motion } from "framer-motion";
import "./Hero.css";

const Hero = ({ headline = "Ride in Style", subtext = "Find your perfect car today", ctaText = "Book Now", onCtaClick }) => {
  return (
    <section className="hero-wrapper">
      <div className="hero-background" />

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="hero-headline"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {headline}
        </motion.h1>
        <motion.p
          className="hero-subtext"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {subtext}
        </motion.p>
        <motion.button
          className="hero-cta"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          onClick={onCtaClick}
        >
          {ctaText}
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
