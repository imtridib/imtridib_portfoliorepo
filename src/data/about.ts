// Everything the About section shows. Edit the text here.
// Empty strings are simply hidden (degree, department, logo).
export const about = {
  // The big sentence under "About me". It reveals word by word when it scrolls into view.
  summary:
    "AI/ML and automation engineer building intelligent systems, from the model to deployment.",

  // Written from your skills list and capstone README. Please rewrite it in your own words.
  // paragraphs: [
  //   'My work centres on AI automation, LLM engineering and machine learning. I enjoy turning models into working systems, from fine-tuning and retrieval to APIs and deployment.',
  //   'For my capstone project I built a multilingual visual question answering system for the cultural heritage sites of Bangladesh, combining a fine-tuned BLIP model, LLaMA 3.3 70B answer refinement and a Streamlit interface.',
  // ],

  //   paragraphs: [
  //   "I’m Tridib Chakraborty, a Computer Science and Engineering graduate from East West University, specializing in Data Science. I enjoy building practical AI/ML projects and turning ideas into useful applications.",
  //   "My research and project experience includes deep-learning image classification and a multilingual Visual Question Answering system for the cultural heritage sites of Bangladesh, developed using a fine-tuned BLIP model and LLaMA 3.3 70B.",
  //   "My current interests include Natural Language Processing (NLP), Computer Vision, and AI automation. I enjoy developing AI-powered applications and automation workflows that solve real-world problems."
  // ],

  paragraphs: [
    'I’m Tridib Chakraborty, a Computer Science and Engineering graduate from <strong class="text-accent">East West University</strong>, specializing in <strong class="text-accent">Data Science</strong>. I enjoy building practical <strong class="text-accent">AI/ML projects</strong> and turning ideas into useful applications.',

    'My research and project experience includes <strong class="text-accent">Deep-learning image classification</strong> and a <strong class="text-accent">Multilingual Visual Question Answering (VQA) system</strong> for the cultural heritage sites of Bangladesh, developed using a fine-tuned BLIP model and LLaMA 3.3 70B.',

    'My current interests include <strong class="text-accent">Natural Language Processing (NLP)</strong>, <strong class="text-accent">Computer Vision</strong>, and <strong class="text-accent">AI automation</strong>. I enjoy developing AI-powered applications and automation workflows that solve real-world problems.',
  ],

  // The accent-coloured line, e.g. 'B.Sc. in Computer Science and Engineering · 2021–2025'. Leave '' to hide it.
  degree: "B.Sc in Computer Science & Engineering",

  // The card on the right. Put the logo file at public/logos/ewu.png (or change the path).
  institution: {
    name: "East West University",
    department: "Department of Computer Science and Engineering", // Leave '' to hide it.
    url: "https://www.ewubd.edu/",
    logo: "/images/logo.png",
  },
};
