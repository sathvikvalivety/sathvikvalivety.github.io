import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  Terminal,
  Shield,
  Cpu,
  Database,
  Globe,
  Code2,
  ChevronRight,
  Menu,
  X,
  Award,
  Briefcase,
  GraduationCap,
  Layers
} from 'lucide-react';
import { cn } from './lib/utils';
import projectsData from './data/projects.json';
import certificatesData from './data/certificates.json';
import profileImg from "./data/IMG20250316130515.jpg";

// --- Types ---

interface Project {
  title: string;
  description: string[];
  tags: string[];
  category: string;
  link?: string;
  github?: string;
  image: string;
}

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  category: string;
  link?: string;
  image: string;
  description: string;
}

interface Skill {
  category: string;
  items: string[];
  icon: React.ReactNode;
}

// --- Data ---

const PROJECTS: Project[] = projectsData as Project[];
const CERTIFICATES: Certificate[] = certificatesData as Certificate[];

const SKILLS: Skill[] = [
  {
    category: "Languages",
    items: ["C", "C++", "Python", "Java", "JavaScript", "SQL", "Solidity", "Kotlin"],
    icon: <Code2 className="w-5 h-5" />
  },
  {
    category: "Blockchain",
    items: ["Ethereum", "Web3.js", "Smart Contracts", "ERC-20", "MetaMask"],
    icon: <Layers className="w-5 h-5" />
  },
  {
    category: "Cybersecurity",
    items: ["Wireshark", "Burp Suite", "SNORT", "Cryptography", "Ethical Hacking"],
    icon: <Shield className="w-5 h-5" />
  },
  {
    category: "Tools & DB",
    items: ["Git", "MySQL", "MongoDB", "Cisco Packet Tracer", "VS Code"],
    icon: <Database className="w-5 h-5" />
  }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
      scrolled ? "bg-cyber-dark/80 backdrop-blur-md border-cyber-green/20 py-3" : "bg-transparent border-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="font-display text-2xl font-bold tracking-tighter flex items-center gap-2 group">
          <div className="w-8 h-8 bg-cyber-green rounded flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Terminal className="text-cyber-dark w-5 h-5" />
          </div>
          <span className="text-white">SATHVIK<span className="text-cyber-green">.</span>V</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-400 hover:text-cyber-green transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-cyber-green/10 border border-cyber-green/50 text-cyber-green text-xs font-bold rounded hover:bg-cyber-green hover:text-cyber-dark transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            RESUME
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-cyber-dark border-b border-cyber-green/20 p-6 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-slate-300 hover:text-cyber-green"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => { window.print(); setIsOpen(false); }}
              className="w-full py-3 bg-cyber-green text-cyber-dark font-bold rounded flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              DOWNLOAD RESUME
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const TerminalHero = () => {
  const [lines, setLines] = useState<{ type: 'command' | 'output', text: string }[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const terminalSequence = [
    { type: 'command', text: 'whoami' },
    { type: 'output', text: 'Name: Valivety Sathvik' },
    { type: 'output', text: 'Role: Security Researcher / Blockchain Dev' },
    { type: 'output', text: 'Focus: Smart Contracts, Threat Detection, 3D UI' },
    { type: 'command', text: 'ls skills/' },
    { type: 'output', text: 'Solidity, Python, React, Java, C++, SQL' },
    { type: 'command', text: 'clear' },
    { type: 'output', text: 'System ready. Welcome, Sathvik.' },
  ];

  useEffect(() => {
    if (currentLineIndex >= terminalSequence.length) {
      setIsTyping(false);
      return;
    }

    const currentLine = terminalSequence[currentLineIndex];

    if (currentLine.type === 'command') {
      if (currentCharIndex < currentLine.text.length) {
        const timeout = setTimeout(() => {
          setCurrentCharIndex(prev => prev + 1);
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setLines(prev => [...prev, currentLine]);
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 500);
        return () => clearTimeout(timeout);
      }
    } else {
      // Output lines appear instantly or very fast
      setLines(prev => [...prev, currentLine]);
      setCurrentLineIndex(prev => prev + 1);
      setCurrentCharIndex(0);
    }
  }, [currentLineIndex, currentCharIndex]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden cyber-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark via-transparent to-cyber-dark z-0" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-green/10 border border-cyber-green/30 text-cyber-green text-xs font-bold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green"></span>
            </span>
            AVAILABLE FOR INTERNSHIPS
          </div>

          <h1 className="text-6xl md:text-8xl font-display leading-[0.9] mb-6">
            VALIVETY <br />
            <span className="text-cyber-green glow-text">SATHVIK</span>
          </h1>

          <p className="text-xl text-slate-400 max-w-lg mb-8 font-mono">
            &gt; Cybersecurity Student & Blockchain Enthusiast. <br />
            &gt; Building secure, decentralized, and interactive digital experiences.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="px-8 py-4 bg-cyber-green text-cyber-dark font-bold rounded-lg hover:bg-white transition-all flex items-center gap-2 group"
            >
              VIEW PROJECTS
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex items-center gap-4 px-4">
              <a href="https://github.com" className="text-slate-400 hover:text-cyber-green transition-colors"><Github /></a>
              <a href="https://linkedin.com" className="text-slate-400 hover:text-cyber-green transition-colors"><Linkedin /></a>
              <a href="mailto:sathvikvalivety@gmail.com" className="text-slate-400 hover:text-cyber-green transition-colors"><Mail /></a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 bg-cyber-gray/50 border border-cyber-green/20 rounded-xl overflow-hidden backdrop-blur-sm shadow-2xl scanline">
            <div className="bg-cyber-gray border-b border-cyber-green/20 px-4 py-2 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">system_status: active</div>
            </div>
            <div className="p-6 font-mono text-sm space-y-2 min-h-[240px]">
              {lines.map((line, i) => (
                <div key={i}>
                  {line.type === 'command' ? (
                    <div className="flex gap-2">
                      <span className="text-cyber-green">visitor@portfolio:~$</span>
                      <span className="text-white">{line.text}</span>
                    </div>
                  ) : (
                    <div className="text-slate-400 pl-4 whitespace-pre-line">
                      {line.text}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && currentLineIndex < terminalSequence.length && (
                <div>
                  {terminalSequence[currentLineIndex].type === 'command' ? (
                    <div className="flex gap-2">
                      <span className="text-cyber-green">visitor@portfolio:~$</span>
                      <span className="text-white">
                        {terminalSequence[currentLineIndex].text.substring(0, currentCharIndex)}
                        <span className="animate-pulse">_</span>
                      </span>
                    </div>
                  ) : null}
                </div>
              )}

              {!isTyping && (
                <div className="flex gap-2 pt-2">
                  <span className="text-cyber-green">visitor@portfolio:~$</span>
                  <span className="animate-pulse">_</span>
                </div>
              )}
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyber-green/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyber-blue/10 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
};

const SkillCard = ({ skill, index }: { skill: Skill, index: number, key?: React.Key }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="p-6 bg-cyber-gray/30 border border-cyber-green/10 rounded-xl hover:border-cyber-green/40 transition-all group"
    >
      <div className="w-12 h-12 bg-cyber-green/10 rounded-lg flex items-center justify-center text-cyber-green mb-4 group-hover:scale-110 transition-transform">
        {skill.icon}
      </div>
      <h3 className="text-lg font-display mb-4 text-white uppercase tracking-wider">{skill.category}</h3>
      <div className="flex flex-wrap gap-2">
        {skill.items.map((item) => (
          <span key={item} className="px-2 py-1 bg-cyber-dark border border-slate-800 text-[10px] font-mono text-slate-400 rounded uppercase">
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ project, index }: { project: Project, index: number, key?: React.Key }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-cyber-gray/20 border border-cyber-green/10 rounded-2xl overflow-hidden hover:border-cyber-green/30 transition-all h-full"
    >
      <div className="aspect-video overflow-hidden relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent opacity-80" />

        <div className="absolute top-4 right-4 flex gap-2">
          {project.github && (
            <a href={project.github} className="p-2 bg-cyber-dark/80 backdrop-blur-md rounded-full text-white hover:text-cyber-green transition-colors">
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.link && (
            <a href={project.link} className="p-2 bg-cyber-dark/80 backdrop-blur-md rounded-full text-white hover:text-cyber-green transition-colors">
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] font-bold text-cyber-green uppercase tracking-widest">#{tag}</span>
          ))}
        </div>
        <h3 className="text-xl font-display mb-3 group-hover:text-cyber-green transition-colors">{project.title}</h3>
        <ul className="space-y-2 mb-6">
          {project.description.map((desc, i) => (
            <li key={i} className="text-sm text-slate-400 flex gap-2">
              <span className="text-cyber-green mt-1">▹</span>
              {desc}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const ExperienceItem = ({ item, index }: { item: any, index: number, key?: React.Key }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-8 pb-12 border-l border-cyber-green/20 last:pb-0"
    >
      <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] bg-cyber-green rounded-full glow-border" />
      <div className="text-xs font-mono text-cyber-green mb-1 uppercase tracking-widest">{item.period}</div>
      <h3 className="text-xl font-display text-white mb-1">{item.title}</h3>
      <div className="text-sm text-slate-400 mb-4">{item.organization}</div>
      <p className="text-slate-500 text-sm max-w-2xl">{item.description}</p>
    </motion.div>
  );
};

const CertificateCard = ({ cert, index }: { cert: Certificate, index: number, key?: React.Key }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-cyber-gray/20 border border-cyber-green/10 rounded-2xl overflow-hidden hover:border-cyber-green/30 transition-all h-full"
    >
      <div className="aspect-video overflow-hidden relative">
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent opacity-80" />

        <div className="absolute top-4 right-4 flex gap-2">
          {cert.link && (
            <a href={cert.link} className="p-2 bg-cyber-dark/80 backdrop-blur-md rounded-full text-white hover:text-cyber-green transition-colors">
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-bold text-cyber-green uppercase tracking-widest">#{cert.category}</span>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{cert.date}</span>
        </div>
        <h3 className="text-xl font-display mb-2 group-hover:text-cyber-green transition-colors">{cert.title}</h3>
        <div className="text-sm text-cyber-blue font-mono mb-3 uppercase tracking-wider">{cert.issuer}</div>
        <p className="text-sm text-slate-400 leading-relaxed">
          {cert.description}
        </p>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [projectFilter, setProjectFilter] = useState('All');
  const [certFilter, setCertFilter] = useState('All');

  const projectCategories = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))];
  const projectTech = ['All', 'React', 'Solidity', 'Kotlin', 'Python', 'Java', 'Node.js', 'Android'];

  const certCategories = ['All', ...Array.from(new Set(CERTIFICATES.map(c => c.category)))];

  const filteredProjects = PROJECTS.filter(project => {
    if (projectFilter === 'All') return true;
    return project.category === projectFilter || project.tags.includes(projectFilter);
  });

  const filteredCertificates = CERTIFICATES.filter(cert => {
    if (certFilter === 'All') return true;
    return cert.category === certFilter;
  });

  return (
    <div className="bg-cyber-dark min-h-screen selection:bg-cyber-green/30">
      <Navbar />

      <TerminalHero />

      {/* About Section */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-cyber-green/20 relative z-10">
              <img
                src={profileImg}
                alt="Valivety Sathvik"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-cyber-green/10 mix-blend-overlay" />
            </div>
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-cyber-green/20 rounded-2xl -z-0" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-cyber-green/20 rounded-full blur-3xl -z-0" />
          </motion.div>

          <div>
            <div className="text-cyber-green font-mono text-xs mb-4 uppercase tracking-[0.3em]">01. Background</div>
            <h2 className="text-4xl md:text-5xl mb-8">SECURE BY <span className="text-cyber-green italic">DESIGN</span></h2>
            <div className="space-y-6 text-slate-400 leading-relaxed">
              <p>
                I am a B.Tech student at <span className="text-white">Amrita Vishwa Vidyapeetham</span> specializing in Computer Science and Cybersecurity. With a GPA of 8.66, I've dedicated my academic journey to understanding the intersection of security, blockchain, and robust software engineering.
              </p>
              <p>
                My passion lies in building decentralized applications that are not only functional but inherently secure. From crafting 3D visualizations to developing ransomware early warning systems, I enjoy tackling complex technical challenges that require both creative thinking and rigorous analysis.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyber-gray flex items-center justify-center text-cyber-green border border-cyber-green/20">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">CEH</div>
                    <div className="text-[10px] uppercase tracking-wider">Expected 2026</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyber-gray flex items-center justify-center text-cyber-blue border border-cyber-blue/20">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">OCI Certified</div>
                    <div className="text-[10px] uppercase tracking-wider">Networking Prof.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-cyber-gray/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-cyber-green font-mono text-xs mb-4 uppercase tracking-[0.3em]">02. Expertise</div>
            <h2 className="text-4xl md:text-5xl">TECHNICAL <span className="text-cyber-green italic">ARSENAL</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILLS.map((skill, i) => (
              <SkillCard key={skill.category} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <div className="text-cyber-green font-mono text-xs mb-4 uppercase tracking-[0.3em]">03. Portfolio</div>
              <h2 className="text-4xl md:text-5xl">SELECTED <span className="text-cyber-green italic">WORKS</span></h2>
            </div>
            <p className="text-slate-500 max-w-sm text-sm">
              A collection of projects ranging from blockchain platforms to security tools and interactive web visualizations.
            </p>
          </div>

          {/* Filter UI */}
          <div className="mb-12 space-y-6">
            <div className="flex flex-wrap gap-3">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest w-full mb-1">Filter by Category:</span>
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProjectFilter(cat)}
                  className={cn(
                    "px-4 py-2 text-[10px] font-bold rounded border transition-all uppercase tracking-widest",
                    projectFilter === cat
                      ? "bg-cyber-green text-cyber-dark border-cyber-green"
                      : "bg-transparent text-slate-400 border-slate-800 hover:border-cyber-green/50"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest w-full mb-1">Filter by Tech:</span>
              {projectTech.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setProjectFilter(tech)}
                  className={cn(
                    "px-3 py-1.5 text-[10px] font-bold rounded border transition-all uppercase tracking-widest",
                    projectFilter === tech
                      ? "bg-cyber-blue text-cyber-dark border-cyber-blue"
                      : "bg-transparent text-slate-500 border-slate-800 hover:border-cyber-blue/50"
                  )}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="py-20 text-center border border-dashed border-slate-800 rounded-2xl">
              <p className="text-slate-500 font-mono">No projects found for the selected filter.</p>
              <button
                onClick={() => setProjectFilter('All')}
                className="mt-4 text-cyber-green text-xs font-bold uppercase tracking-widest hover:underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-24 bg-cyber-gray/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <div className="text-cyber-green font-mono text-xs mb-4 uppercase tracking-[0.3em]">04. Credentials</div>
              <h2 className="text-4xl md:text-5xl">CERTIFICATIONS <span className="text-cyber-green italic">& BADGES</span></h2>
            </div>
            <p className="text-slate-500 max-w-sm text-sm">
              Professional certifications and academic achievements in cybersecurity and cloud technologies.
            </p>
          </div>

          {/* Filter UI */}
          <div className="mb-12 flex flex-wrap gap-3">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest w-full mb-1">Filter by Field:</span>
            {certCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCertFilter(cat)}
                className={cn(
                  "px-4 py-2 text-[10px] font-bold rounded border transition-all uppercase tracking-widest",
                  certFilter === cat
                    ? "bg-cyber-green text-cyber-dark border-cyber-green"
                    : "bg-transparent text-slate-400 border-slate-800 hover:border-cyber-green/50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredCertificates.map((cert, i) => (
                <CertificateCard key={cert.title} cert={cert} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-cyber-gray/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <div className="text-cyber-green font-mono text-xs mb-4 uppercase tracking-[0.3em]">04. Journey</div>
            <h2 className="text-4xl md:text-5xl mb-8">CAREER <span className="text-cyber-green italic">PATH</span></h2>
            <p className="text-slate-500 text-sm mb-8">
              My professional experience and academic background that shaped my technical expertise.
            </p>
            <div className="p-6 bg-cyber-green/5 border border-cyber-green/20 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <GraduationCap className="text-cyber-green w-6 h-6" />
                <h4 className="font-display text-white">Education</h4>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-white text-sm font-bold">Amrita Vishwa Vidyapeetham</div>
                  <div className="text-xs text-slate-400">B.Tech in CS-Cybersecurity</div>
                  <div className="text-cyber-green text-[10px] font-mono mt-1">GPA: 8.66 / 10.0</div>
                </div>
                <div className="pt-2 border-t border-cyber-green/10">
                  <div className="text-white text-sm font-bold">Bhashyam Junior College</div>
                  <div className="text-xs text-slate-400">12th Standard</div>
                  <div className="text-cyber-green text-[10px] font-mono mt-1">Score: 96%</div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <ExperienceItem
                item={{
                  period: "2025",
                  title: "Website Lead",
                  organization: "Amrita Cybernation 2025",
                  description: "Designed and hosted the official website for Cybernation 2025, managing high-traffic loads and ensuring a secure, interactive user experience for participants."
                }}
                index={0}
              />
              <ExperienceItem
                item={{
                  period: "2023 - 2024",
                  title: "CTF Competitor",
                  organization: "Various National Hackathons",
                  description: "Collaborated in multiple CTF events, solving 12+ complex tasks in cryptography, web exploitation, and binary analysis. Enhanced threat mitigation skills through real-world scenarios."
                }}
                index={1}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="text-cyber-green font-mono text-xs mb-4 uppercase tracking-[0.3em]">05. Connection</div>
          <h2 className="text-5xl md:text-7xl mb-8">GET IN <span className="text-cyber-green italic">TOUCH</span></h2>
          <p className="text-slate-400 text-lg mb-12">
            Whether you have a question about my projects, want to discuss cybersecurity, or just want to say hi, my inbox is always open.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a
              href="mailto:sathvikvalivety@gmail.com"
              className="w-full md:w-auto px-8 py-4 bg-cyber-green text-cyber-dark font-bold rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              SAY HELLO
            </a>
            <div className="flex items-center gap-4">
              <a href="#" className="w-12 h-12 rounded-full border border-cyber-green/20 flex items-center justify-center text-slate-400 hover:text-cyber-green hover:border-cyber-green transition-all"><Github /></a>
              <a href="#" className="w-12 h-12 rounded-full border border-cyber-green/20 flex items-center justify-center text-slate-400 hover:text-cyber-green hover:border-cyber-green transition-all"><Linkedin /></a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-cyber-green/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 text-xs font-mono">
            © 2026 VALIVETY SATHVIK. BUILT WITH REACT & TAILWIND.
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] font-bold text-slate-500 hover:text-cyber-green transition-colors uppercase tracking-widest">Github</a>
            <a href="#" className="text-[10px] font-bold text-slate-500 hover:text-cyber-green transition-colors uppercase tracking-widest">Linkedin</a>
            <a href="#" className="text-[10px] font-bold text-slate-500 hover:text-cyber-green transition-colors uppercase tracking-widest">Leetcode</a>
          </div>
        </div>
      </footer>

      {/* Print-only Resume View (Hidden normally) */}
      <div className="hidden print:block bg-white text-black p-12 font-serif">
        <h1 className="text-4xl font-bold mb-2">Valivety Sathvik</h1>
        <p className="mb-6 border-b pb-4">sathvikvalivety@gmail.com | +91 9199194449 | Cybersecurity & Blockchain</p>

        <h2 className="text-xl font-bold uppercase border-b mb-4">Education</h2>
        <div className="mb-4">
          <div className="flex justify-between font-bold">
            <span>Amrita Vishwa Vidyapeetham</span>
            <span>GPA: 8.66 / 10.0</span>
          </div>
          <div>B.Tech in Computer Science-Cybersecurity</div>
        </div>

        <h2 className="text-xl font-bold uppercase border-b mb-4 mt-8">Skills</h2>
        <p className="mb-4">
          <strong>Languages:</strong> C, C++, Python, Java, HTML, CSS, JavaScript, SQL, Solidity, Kotlin<br />
          <strong>Tools:</strong> Wireshark, Burp Suite, Cisco Packet Tracer, MySQL, SNORT, Git, VS Code<br />
          <strong>Blockchain:</strong> Solidity, Ethereum, Web3, Smart Contracts
        </p>

        <h2 className="text-xl font-bold uppercase border-b mb-4 mt-8">Projects</h2>
        {PROJECTS.map(p => (
          <div key={p.title} className="mb-4">
            <div className="font-bold">{p.title}</div>
            <ul className="list-disc ml-6">
              {p.description.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
