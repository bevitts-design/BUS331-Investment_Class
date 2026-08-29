export const bus331Homepage = {
  course: {
    name: 'Investments',
    code: 'BUS331-02',
    meetingDays: 'Tuesday / Thursday',
    meetingTime: '8:00–9:15 a.m.',
    room: 'GSB 255'
  },
  instructor: {
    name: 'Bethany Evitts',
    email: 'bevitts@endicott.edu',
    phone: '617-877-2001',
    officeHours: {
      label: "Professor Evitts’ Office Hours",
      href: 'https://endicott.instructure.com/courses/58601/pages/professor-evitts-office-hours-fall-2026'
    }
  },
  syllabus: {
    label: 'Open the Course Syllabus',
    pageTitle: 'Syllabus',
    href: 'https://endicott.instructure.com/courses/58601/assignments/syllabus'
  },
  textbook: {
    title: 'Investments via Connect',
    edition: '13th Edition',
    author: 'Zvi Bodie'
  },
  welcome: {
    intro: 'Welcome to Investments. In this course, you will learn to connect market evidence, financial models, and risk management decisions.',
    instructorBio: 'My name is Bethany Evitts, and I will be your professor for this class. With over three decades of experience in investment and financial management, I have observed the dynamic landscape of financial markets through a variety of market conditions.',
    courseDescription: 'Throughout this course, we will examine valuation methods and basic trading strategies using stocks, bonds, and options. We will explore their risk and return characteristics in the context of Modern Portfolio Theory, then construct investment portfolios using risk-management methods, including risk mitigation with futures and options. This class will actively use the FactSet data analytics system for economic, securities, and investment information.',
    closing: 'Together, let’s dive into the world of finance and discover the opportunities that await us.'
  },
  signal: {
    eyebrow: 'Course signal',
    title: 'From evidence to portfolio action',
    stages: [
      { label: 'Evidence', detail: 'Market + company data' },
      { label: 'Analyze', detail: 'Risk + return + value' },
      { label: 'Decide + act', detail: 'Select + size + monitor' }
    ],
    feedback: 'Results become new evidence'
  },
  courseTopics: [
    { label: 'Stocks', detail: 'Value ownership claims and read market evidence.' },
    { label: 'Bonds', detail: 'Connect cash flows, rates, prices, and risk.' },
    { label: 'Options & futures', detail: 'Explore trading strategies and risk mitigation.' },
    { label: 'Portfolio theory', detail: 'Balance risk and return through diversification.' },
    { label: 'FactSet', detail: 'Work with economic, security, and investment data.' }
  ],
  readiness: {
    title: 'Bring a fully charged laptop to every class',
    detail: 'We will use Excel spreadsheets to run calculations and build models for security and other financial analysis.'
  }
};
