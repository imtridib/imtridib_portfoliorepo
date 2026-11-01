// Everything the About section shows. Edit the text here.
// Empty strings are simply hidden (degree, department, logo).
export const about = {
  // The big sentence under "About me". It reveals word by word when it scrolls into view.
  summary: 'AI/ML and automation engineer building intelligent systems, from the model to deployment.',

  // Written from your skills list and capstone README. Please rewrite it in your own words.
  paragraphs: [
    'My work centres on AI automation, LLM engineering and machine learning. I enjoy turning models into working systems, from fine-tuning and retrieval to APIs and deployment.',
    'For my capstone project I built a multilingual visual question answering system for the cultural heritage sites of Bangladesh, combining a fine-tuned BLIP model, LLaMA 3.3 70B answer refinement and a Streamlit interface.',
  ],

  // The accent-coloured line, e.g. 'B.Sc. in Computer Science and Engineering · 2021–2025'. Leave '' to hide it.
  degree: 'B.Sc in Computer Science & Engineering',

  // The card on the right. Put the logo file at public/logos/ewu.png (or change the path).
  institution: {
    name: 'East West University',
    department: 'Department of Computer Science and Engineering', // Leave '' to hide it.
    url: 'https://www.ewubd.edu/',
    logo: '/images/logo.png',
  },
}
