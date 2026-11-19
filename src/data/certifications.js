// Certifications shown in the Certifications section, in display order.
//
// To add a certificate:
//   1. Drop the badge / certificate files into src/assets/certifications/
//   2. Add an entry below, using just the file names for `badge` and
//      `certificateFile` (or null if there isn't one). Optional `badgeAlt`
//      overrides the default "<name> badge" alt text, e.g. for a logo.
//      `credlyUrl` shows "Verify on Credly"; otherwise `verifyUrl` (any
//      other verification page) shows "Verify credential".
//
// Entries with `pending: true` are kept here but not shown on the site.
// Filter tabs are built from the categories of the visible entries, so a
// new category (e.g. "Additional") gets its own tab automatically.

const certifications = [
  {
    id: 'ccst-cybersecurity',
    name: 'Cisco Certified Support Technician (CCST) Cybersecurity',
    issuer: 'Cisco',
    category: 'Cybersecurity',
    issued: 'Sep 2025',
    extra: 'Verification code: JGCh-4wyY · Valid until Sep 2030',
    badge: 'ccst-cybersecurity-badge.png',
    certificateFile: 'ccst-cybersecurity-certificate.jpg',
    credlyUrl: 'https://www.credly.com/badges/fbdd317a-02f9-4a99-8561-1100d2510358/public_url',
    pending: false,
  },
  {
    id: 'ehe',
    name: 'Ethical Hacking Essentials (E|HE)',
    issuer: 'EC-Council',
    category: 'Cybersecurity',
    issued: 'Mar 2026',
    extra: 'Certificate No: ECC0298317456',
    badge: 'ehe-badge.png',
    certificateFile: 'ehe-certificate.pdf',
    credlyUrl: null,
    pending: false,
  },
  {
    id: 'threat-analysis',
    name: 'Threat Analysis & Risk Management',
    issuer: 'Cisco',
    category: 'Cybersecurity',
    issued: null,
    extra: null,
    badge: null,
    certificateFile: null,
    credlyUrl: null,
    pending: true,
  },
  {
    id: 'data-science-python',
    name: 'Data Science with Python',
    issuer: 'nasscom IT-ITeS SSC · FutureSkills Prime',
    category: 'Data & Development',
    issued: 'Sep 2026',
    extra: 'Gold grade (70%+) · Completed as internship – see Experience',
    badge: 'data-science-python-badge.png',
    badgeAlt: 'Nasscom Foundation logo',
    certificateFile: 'data-science-python-certificate.jpg',
    credlyUrl: null,
    pending: false,
  },
  {
    id: 'qlik-analytics',
    name: 'Qlik Data Analytics Certification',
    issuer: 'Qlik',
    category: 'Data & Development',
    issued: 'Feb 2026',
    extra: null,
    badge: 'qlik-analytics-badge.png',
    certificateFile: 'qlik-analytics-certificate.pdf',
    credlyUrl: 'https://www.credly.com/badges/43526e2f-d374-4a3e-b0c7-6d98f1a8e19f/public_url',
    pending: false,
  },
  {
    id: 'python-fullstack',
    name: 'Python Full Stack Web Development',
    issuer: 'Aitch Nu Global Technologies Pvt. Ltd.',
    category: 'Data & Development',
    issued: 'May 2025',
    extra: 'Completed as internship – see Experience',
    badge: 'python-fullstack-badge.png',
    badgeAlt: 'Aitch Nu Global Technologies logo',
    certificateFile: 'python-fullstack-internship-certificate.jpg',
    credlyUrl: null,
    pending: false,
  },
  {
    id: 'efset-english',
    name: 'EF SET English Certificate',
    issuer: 'EF (Education First)',
    category: 'Additional',
    issued: 'Jun 2026',
    extra: '76/100 · C2 Proficient (CEFR)',
    badge: 'efset-english-badge.svg',
    badgeAlt: 'EF SET logo',
    certificateFile: 'efset-english-certificate.jpg',
    credlyUrl: null,
    verifyUrl: 'https://cert.efset.org/8GBmPU',
    pending: false,
  },
  {
    id: 'german-a1',
    name: 'German A1 – Basic German Communication',
    issuer: null,
    category: 'Additional',
    issued: null,
    extra: null,
    badge: null,
    certificateFile: null,
    credlyUrl: null,
    pending: true,
  },
  {
    id: 'tally-erp9',
    name: 'Tally ERP 9 – Financial Accounting',
    issuer: null,
    category: 'Additional',
    issued: null,
    extra: null,
    badge: null,
    certificateFile: null,
    credlyUrl: null,
    pending: true,
  },
];

export default certifications;
