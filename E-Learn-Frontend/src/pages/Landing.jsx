import React from "react";
import Navbar from "../components/Navbar";
import "../style/Landing.css";
import icon from "../assets/icon.png"; 
import {
  FaLaptopCode,
  FaChartLine,
  FaRocket,
  FaMoneyBill,
  FaPencilRuler,
  FaBullhorn,
  FaUserFriends,
  FaBriefcase,
} from "react-icons/fa";

export default function Landing() {
  const categories = [
    "Web Development",
    "Data Science",
    "Entrepreneurship",
    "Finance",
    "Design",
    "Marketing",
    "Personal Development",
    "Career",
  ];

  const icons = [
    <FaLaptopCode />,
    <FaChartLine />,
    <FaRocket />,
    <FaMoneyBill />,
    <FaPencilRuler />,
    <FaBullhorn />,
    <FaUserFriends />,
    <FaBriefcase />,
  ];

  return (
    <>
      <Navbar />
      <div className="landing-root">
       
        <div className="animated-bg"></div>

        <section className="landing-hero">
          <div className="hero-content">
            <img src={icon} alt="Course Logo" className="hero-logo" />

            <p className="intro-text">
              Welcome Learner! Ready to <span className="highlight">Unlock Your Potential?</span>
            </p>

            <h1 className="main-heading">Learn. Grow. Achieve.</h1>
            <h2 className="sub-heading">Start Your Journey Today</h2>

            <p className="description">
              Discover top-quality courses designed to help you master new skills and elevate your career.
              Learn from expert instructors across a wide range of topics—from business and marketing to
              design, language learning, and more. Wherever you want to grow, we’re here to support you.
            </p>

            <button className="explore-btn">Explore Courses</button>
          </div>

          <div className="category-list">
            {categories.map((category, index) => (
              <span key={index} className="category-chip">
                {icons[index]}&nbsp;{category}
              </span>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
