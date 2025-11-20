import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Menu, X, User, Target, Heart, Code, Database, Settings, Brain, 
  Github, Linkedin, Mail, Phone, Download, ChevronDown, Calendar, 
  MapPin, Briefcase, GraduationCap, Award, Trophy, 
  Users, Send 
} from 'lucide-react'
import './App.css'

// Header Component
const Header = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    // Close mobile menu when scrolling
    const handleScrollClose = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('scroll', handleScrollClose)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleScrollClose)
    }
  }, [isMenuOpen])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.header')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const navItems = [
    { href: '#home', label: 'Home', icon: <User size={18} /> },
    { href: '#about', label: 'About', icon: <Target size={18} /> },
    { href: '#skills', label: 'Skills', icon: <Code size={18} /> },
    { href: '#experience', label: 'Experience', icon: <Briefcase size={18} /> },
    { href: '#projects', label: 'Projects', icon: <Github size={18} /> },
    { href: '#education', label: 'Education', icon: <GraduationCap size={18} /> },
    { href: '#achievements', label: 'Achievements', icon: <Trophy size={18} /> },
    { href: '#contact', label: 'Contact', icon: <Mail size={18} /> }
  ]

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId.replace('#', ''))
    }
    setIsMenuOpen(false)
  }

  return (
    <motion.header
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="header-container">
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          onClick={() => scrollToSection('#home')}
        >
          <span className="logo-text">JC</span>
          <span className="logo-subtitle">Portfolio</span>
        </motion.div>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <div className="nav-header">
            <h3>Navigation</h3>
            <button 
              className="nav-close"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          
          {navItems.map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              className={`nav-link ${activeSection === item.href.replace('#', '') ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(item.href)
              }}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isMenuOpen ? 1 : 1, 
                x: isMenuOpen ? 0 : 0 
              }}
              transition={{ 
                delay: isMenuOpen ? index * 0.1 : 0,
                duration: 0.3 
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </motion.a>
          ))}
          
          <div className="nav-footer">
            <div className="nav-social">
              <motion.a
                href="https://github.com/jayacharanambati"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="nav-social-link"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/jaya-charan-ambati-901052254/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="nav-social-link"
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </div>
        </nav>

        <motion.button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </motion.button>
      </div>
      
      {/* Mobile menu overlay */}
      <motion.div 
        className={`nav-overlay ${isMenuOpen ? 'active' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsMenuOpen(false)}
      />
    </motion.header>
  )
}

// Hero Component with Image
const Hero = () => {
  const scrollToNext = () => {
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-wrapper">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hi, I'm <span className="highlight">Jaya Charan</span>
            </motion.h1>
            
            <motion.h2
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              AI Engineer 
            </motion.h2>
            
            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Passionate about building intelligent applications with AI and modern web technologies. 
              Currently working on end-to-end automation systems and AI-powered legal assistants.
            </motion.p>

            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.a
                href="#contact"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Get In Touch
              </motion.a>
              
              <motion.a
                href="https://drive.google.com/file/d/1aA8HxEdkKtXmq5dCdv11HlihkeTuVojx/view"
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={20} />
                View Resume
              </motion.a>
            </motion.div>

            <motion.div
              className="hero-social"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <motion.a
                href="https://github.com/jayacharanambati"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={24} />
              </motion.a>
              
              <motion.a
                href="https://www.linkedin.com/in/jaya-charan-ambati-901052254/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={24} />
              </motion.a>
              
              <motion.a
                href="mailto:ambatijayacharan18@gmail.com"
                className="social-link"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail size={24} />
              </motion.a>
              
              <motion.a
                href="tel:+919640179624"
                className="social-link"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Phone size={24} />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-image-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div 
              className="hero-image-wrapper"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              <img 
                src="https://res.cloudinary.com/dzc70c3lw/image/upload/v1747502112/1711743254380_w86f5m.jpg" 
                alt="Jaya Charan - AI Engineer"
                className="hero-image"
                loading="eager"
              />
              <div className="hero-image-glow"></div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="hero-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.button
            onClick={scrollToNext}
            className="scroll-button"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            whileHover={{ scale: 1.1 }}
          >
            <ChevronDown size={24} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

// About Component
const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="about" className="about">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">Get to know more about me</p>
        </motion.div>

        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="about-text" variants={itemVariants}>
            <p>
              I'm a Computer Science student at Kalasalingam Academy of Research and Education who loves
              exploring the space where imagination meets technology. AI isn’t just a subject for me
              it’s the tool I use to turn ideas into solutions that genuinely help people.
            </p>
            
            <p>
              My journey began with simple curiosity: “How far can technology really go?” 
              That question pushed me into building everything from AI-driven legal assistants to complete
              automation systems. Every new project feels like stepping into a puzzle—one that challenges
              me to push boundaries, learn faster, and create smarter.
            </p>
            
            <p>
              When I’m not immersed in code, I’m usually experimenting with new AI frameworks,
              contributing to open source communities, or guiding fellow learners through the KARE
              Open Source Society, where I proudly serve as the Open Source Framework Lead.
              Technology evolves every day and I love growing with it.
            </p>
          </motion.div>

          <motion.div className="about-highlights" variants={itemVariants}>
            <div className="highlight-card">
              <div className="highlight-icon">
                <User size={32} />
              </div>
              <h3>Professional</h3>
              <p>AI Intern at Nyayatech with hands-on experience in building scalable automation systems</p>
            </div>

            <div className="highlight-card">
              <div className="highlight-icon">
                <Target size={32} />
              </div>
              <h3>Focus Areas</h3>
              <p>Generative AI, Machine Learning, Full Stack Development, and Data Structures & Algorithms</p>
            </div>

            <div className="highlight-card">
              <div className="highlight-icon">
                <Heart size={32} />
              </div>
              <h3>Passion</h3>
              <p>Building intelligent applications that make a positive impact on society and people's lives</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Skills Component
const Skills = () => {
  const skillCategories = [
    {
      icon: <Code size={32} />,
      title: 'Languages',
      skills: ['Python', 'SQL', 'JavaScript', 'HTML/CSS']
    },
    {
      icon: <Brain size={32} />,
      title: 'AI/ML Frameworks',
      skills: ['LangChain', 'RAG', 'LLMs', 'Hugging Face', 'Transformers', 'Google Gemini']
    },
    {
      icon: <Database size={32} />,
      title: 'Backend & Databases',
      skills: ['FastAPI', 'Flask', 'PostgreSQL', 'Alembic', 'SQLAlchemy']
    },
    {
      icon: <Settings size={32} />,
      title: 'Tools & Technologies',
      skills: ['Docker', 'Git/GitHub', 'Selenium', 'Power BI', 'AWS', 'React']
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">Technologies I work with</p>
        </motion.div>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="skill-category"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              <div className="skill-icon">
                {category.icon}
              </div>
              <h3 className="skill-title">{category.title}</h3>
              <div className="skill-list">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    className="skill-item"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="soft-skills"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="soft-skills-title">Soft Skills</h3>
          <div className="soft-skills-list">
            {['Rapport Building', 'Stakeholder Management', 'People Management', 'Excellent Communication'].map((skill, index) => (
              <motion.span
                key={index}
                className="soft-skill"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Experience Component
const Experience = () => {
  const experiences = [
    {
      title: 'AI Intern',
      company: 'Nyayatech',
      location: 'Vijayawada, India',
      duration: 'July 2025 - Present',
      description: 'Building end-to-end automation systems for court case and hearing management',
      achievements: [
        'Built an end-to-end automation system for court case and hearing management',
        'Developed a FastAPI-based backend integrated with external APIs for real-time data updates',
        'Automated data extraction and validation using Selenium and ETL logic for seamless syncing',
        'Designed scalable PostgreSQL models with Alembic migrations for evolving business needs',
        'Implemented intelligent PATCH notifications and ensured API compliance with robust error handling',
        'Containerized and deployed the platform using Docker with environment-based configuration'
      ],
      technologies: ['FastAPI', 'PostgreSQL', 'Selenium', 'Docker', 'Alembic', 'ETL']
    },
    {
      title: 'Research Student',
      company: 'Multicore Wave',
      location: 'KrishnanKoil, India',
      duration: 'Aug 2023 - Dec 2024',
      description: 'Focused on computer vision and robotics research projects',
      achievements: [
        'Created an image dataset, collecting and annotating 50,000+ images using LabelStudio',
        'Performed data preprocessing to enhance model performance',
        'Gained hands-on experience with ROS2 and SLAM, completing robotic mapping and localization crash courses'
      ],
      technologies: ['Computer Vision', 'LabelStudio', 'ROS2', 'SLAM', 'Data Preprocessing']
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <section id="experience" className="experience">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">My professional journey</p>
        </motion.div>

        <motion.div
          className="experience-timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="experience-item"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              <div className="experience-icon">
                <Briefcase size={24} />
              </div>
              
              <div className="experience-content">
                <div className="experience-header">
                  <h3 className="experience-title">{exp.title}</h3>
                  <h4 className="experience-company">{exp.company}</h4>
                  
                  <div className="experience-meta">
                    <span className="experience-duration">
                      <Calendar size={16} />
                      {exp.duration}
                    </span>
                    <span className="experience-location">
                      <MapPin size={16} />
                      {exp.location}
                    </span>
                  </div>
                </div>
                
                <p className="experience-description">{exp.description}</p>
                
                <div className="experience-achievements">
                  <h5>Key Achievements:</h5>
                  <ul>
                    {exp.achievements.map((achievement, achIndex) => (
                      <motion.li
                        key={achIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: achIndex * 0.1 }}
                      >
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div className="experience-technologies">
                  {exp.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      className="tech-tag"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Projects Component
const Projects = () => {
  const projects = [
    {
      title: 'LawGPT',
      date: 'April 2025',
      description: 'Built an AI-powered legal assistant leveraging Google Gemini 1.5 Flash for real-time, context-aware legal research and conversational support.',
      features: [
        'Interactive chat UI that provides accurate, AI-driven answers to legal queries based on updated legal data',
        'Designed for law students, researchers, and professionals to simplify complex legal topics',
        'Access to statutes and case law efficiently through AI assistance'
      ],
      technologies: ['Python', 'LangChain', 'Google Gemini 1.5 Flash', 'AWS Hosting', 'React'],
      github: 'https://github.com/JAYACHARANAMBATI/lawGPT',
      category: 'AI/ML'
    },
    {
      title: 'ID and Formal Dress Detection',
      date: 'May 2025',
      description: 'Developed a computer vision-based compliance monitoring system using YOLOv12 for real-time ID card detection and Google Cloud Vision API for formal dress code verification.',
      features: [
        'Automated violation capture with image saving and email alerts',
        'Zipped evidence collection for efficient monitoring',
        'React-based web interface for live violation visualization and monitoring'
      ],
      technologies: ['Python', 'OpenCV', 'YOLOv12 (Ultralytics)', 'Google Cloud Vision API', 'SMTP Email Automation'],
      github: 'https://github.com/JAYACHARANAMBATI/ID-Card-and-Formal-Dress-Code-Detection-System',
      category: 'Computer Vision'
    },
    {
      title: 'Natural Language to SQL Query App',
      date: 'May 2025',
      description: 'Developed a Streamlit-based web application that translates natural language queries into executable MySQL SQL queries using LangChain and Google Gemini LLM.',
      features: [
        'Natural language to SQL translation without writing code',
        'Dynamic query generation and execution',
        'Result visualization and database interaction'
      ],
      technologies: ['Python', 'Streamlit', 'LangChain', 'Google Gemini', 'MySQL', 'SQLAlchemy', 'PyMySQL'],
      github: 'https://github.com/JAYACHARANAMBATI/GENAI_SQL',
      category: 'AI/ML'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Some of my recent work</p>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              <div className="project-header">
                <div className="project-category">{project.category}</div>
                <div className="project-date">
                  <Calendar size={16} />
                  {project.date}
                </div>
              </div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-features">
                <h4>Key Features:</h4>
                <ul>
                  {project.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                    >
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="project-technologies">
                {project.technologies.map((tech, techIndex) => (
                  <motion.span
                    key={techIndex}
                    className="tech-tag"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              <div className="project-links">
                <motion.a
                  href={project.github}
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={16} />
                  View Code
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          className="view-more-projects"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.a
            href="https://github.com/jayacharanambati"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary view-more-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            View More Projects
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

// Education Component
const Education = () => {
  const education = [
    {
      degree: 'Bachelor of Technology in Computer Science and Engineering',
      institution: 'Kalasalingam Academy of Research and Education',
      location: 'KrishnanKoil, Virudhunagar, India',
      duration: '2022 - Present',
      grade: 'CGPA: 8.01/10.0',
      description: 'Specialized in Computer Science with focus on AI/ML and Software Development',
      highlights: [
        'Consistent academic performance with 8.01 CGPA',
        'Research student at Multicore Wave focusing on computer vision and robotics',
        'Active participation in open-source development',
        'Leadership role in KARE Open-Source Society'
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <section id="education" className="education">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">My academic journey</p>
        </motion.div>

        <motion.div
          className="education-timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="education-item"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              <div className="education-icon">
                <GraduationCap size={24} />
              </div>
              
              <div className="education-content">
                <div className="education-header">
                  <h3 className="education-degree">{edu.degree}</h3>
                  <h4 className="education-institution">{edu.institution}</h4>
                  
                  <div className="education-meta">
                    <span className="education-duration">
                      <Calendar size={16} />
                      {edu.duration}
                    </span>
                    <span className="education-location">
                      <MapPin size={16} />
                      {edu.location}
                    </span>
                    <span className="education-grade">
                      <Award size={16} />
                      {edu.grade}
                    </span>
                  </div>
                </div>
                
                <p className="education-description">{edu.description}</p>
                
                <div className="education-highlights">
                  <h5>Key Highlights:</h5>
                  <ul>
                    {edu.highlights.map((highlight, highlightIndex) => (
                      <motion.li
                        key={highlightIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: highlightIndex * 0.1 }}
                      >
                        {highlight}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Achievements Component
const Achievements = () => {
  const achievements = [
    {
      title: '2nd Place Winner - The ComBattle Ideathon',
      organization: 'IEEE ComSoc KARE',
      date: 'March 2025',
      description: 'Recognized for innovative problem-solving and technical excellence, securing 2nd place and a cash prize in this competitive ideation event.',
      type: 'Competition',
      icon: <Trophy size={24} />
    }
  ]

  const positions = [
    {
      title: 'Open Source Framework Lead',
      organization: 'KARE Open-Source Society (KARE – OSS)',
      duration: 'July 2024 - June 2025',
      description: 'Leading open-source development and fostering tech community collaboration.',
      responsibilities: [
        'Leading open-source development initiatives',
        'Fostering collaboration within the tech community',
        'Mentoring students in open-source contributions',
        'Organizing workshops and tech events'
      ],
      icon: <Users size={24} />
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="achievements" className="achievements">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Achievements & Leadership</h2>
          <p className="section-subtitle">Recognitions and responsibilities</p>
        </motion.div>

        <motion.div
          className="achievements-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="achievements-section" variants={itemVariants}>
            <h3 className="subsection-title">
              <Award size={20} />
              Achievements & Certificates
            </h3>
            
            <div className="achievements-grid">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="achievement-card"
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                >
                  <div className="achievement-icon">
                    {achievement.icon}
                  </div>
                  
                  <div className="achievement-content">
                    <h4 className="achievement-title">{achievement.title}</h4>
                    <h5 className="achievement-organization">{achievement.organization}</h5>
                    
                    <div className="achievement-meta">
                      <span className="achievement-date">
                        <Calendar size={14} />
                        {achievement.date}
                      </span>
                      <span className="achievement-type">{achievement.type}</span>
                    </div>
                    
                    <p className="achievement-description">{achievement.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="positions-section" variants={itemVariants}>
            <h3 className="subsection-title">
              <Users size={20} />
              Positions of Responsibility
            </h3>
            
            <div className="positions-grid">
              {positions.map((position, index) => (
                <motion.div
                  key={index}
                  className="position-card"
                  whileHover={{ scale: 1.02, y: -3 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                >
                  <div className="position-icon">
                    {position.icon}
                  </div>
                  
                  <div className="position-content">
                    <h4 className="position-title">{position.title}</h4>
                    <h5 className="position-organization">{position.organization}</h5>
                    
                    <div className="position-duration">
                      <Calendar size={14} />
                      {position.duration}
                    </div>
                    
                    <p className="position-description">{position.description}</p>
                    
                    <div className="position-responsibilities">
                      <h6>Key Responsibilities:</h6>
                      <ul>
                        {position.responsibilities.map((responsibility, respIndex) => (
                          <motion.li
                            key={respIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: respIndex * 0.1 }}
                          >
                            {responsibility}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Contact Component
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form processing
    setTimeout(() => {
      setIsSubmitting(false)
      setShowOptions(true)
    }, 1000)
  }

  const sendViaWhatsApp = () => {
    const whatsappMessage = `Hi Jaya Charan! 

*Name:* ${formData.name}
*Email:* ${formData.email}
*Subject:* ${formData.subject}

*Message:*
${formData.message}

Looking forward to hearing from you!`

    const phoneNumber = "919640179624" // Your phone number with country code
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`
    
    window.open(whatsappUrl, '_blank')
    resetForm()
  }

  const sendViaEmail = () => {
    const emailSubject = `Portfolio Contact: ${formData.subject}`
    const emailBody = `Hi Jaya Charan,

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

Best regards,
${formData.name}`

    const emailUrl = `mailto:ambatijayacharan18@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
    
    window.location.href = emailUrl
    resetForm()
  }

  const resetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' })
    setShowOptions(false)
  }

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      value: 'ambatijayacharan18@gmail.com',
      link: 'mailto:ambatijayacharan18@gmail.com'
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      value: '+91 9640179624',
      link: 'tel:+919640179624'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Location',
      value: 'Vijayawada, India',
      link: null
    }
  ]

  const socialLinks = [
    {
      icon: <Github size={20} />,
      title: 'GitHub',
      link: 'https://github.com/jayacharanambati'
    },
    {
      icon: <Linkedin size={20} />,
      title: 'LinkedIn',
      link: 'https://www.linkedin.com/in/jaya-charan-ambati-901052254/'
    }
  ]

  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Let's work together on your next project</p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Let's talk about your project</h3>
            <p>
              I'm always interested in new opportunities and exciting projects. 
              Whether you have a question or just want to say hello, I'll do my best to get back to you!
            </p>

            <div className="contact-details">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="contact-item"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="contact-icon">
                    {info.icon}
                  </div>
                  <div className="contact-text">
                    <h4>{info.title}</h4>
                    {info.link ? (
                      <a href={info.link}>{info.value}</a>
                    ) : (
                      <span>{info.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="contact-social">
              <h4>Follow me on</h4>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                    <span>{social.title}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {!showOptions ? (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <motion.input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <motion.textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? (
                    'Processing...'
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div 
                className="send-options"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="options-header">
                  <h3>Choose how to send your message</h3>
                  <p>Your message has been prepared. Select your preferred method:</p>
                </div>

                <div className="message-preview">
                  <h4>Message Preview:</h4>
                  <div className="preview-content">
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Subject:</strong> {formData.subject}</p>
                    <p><strong>Message:</strong> {formData.message}</p>
                  </div>
                </div>

                <div className="send-buttons">
                  <motion.button
                    className="send-option whatsapp-btn"
                    onClick={sendViaWhatsApp}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="btn-content">
                      <Phone size={24} />
                      <div>
                        <span className="btn-title">Send via WhatsApp</span>
                        <span className="btn-subtitle">+91 9640179624</span>
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    className="send-option email-btn"
                    onClick={sendViaEmail}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="btn-content">
                      <Mail size={24} />
                      <div>
                        <span className="btn-title">Send via Email</span>
                        <span className="btn-subtitle">ambatijayacharan18@gmail.com</span>
                      </div>
                    </div>
                  </motion.button>
                </div>

                <motion.button
                  className="back-btn"
                  onClick={() => setShowOptions(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ← Back to Edit Message
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <h3>Jaya Charan</h3>
            <p>AI Engineer & AI Developer</p>
          </div>
          
          
        </div>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  const [activeSection, setActiveSection] = useState('home')

  return (
    <div className="App">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
