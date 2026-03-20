import type { UserProfile } from '../types';

export const mockUser: UserProfile = {
  id: 'u-001',
  fullName: 'Rizka Amalia Putri',
  headline: 'Frontend Developer & UI Enthusiast',
  location: 'Jakarta, Indonesia',
  about: 'Lulusan Informatika dari Universitas Indonesia dengan pengalaman 1.5 tahun di pengembangan web. Antusias dengan React, desain antarmuka yang bersih, dan membangun produk digital yang berdampak. Sedang mendalami TypeScript dan ingin berkembang ke full-stack engineering.',
  avatarUrl: '',
  skills: [
    'JavaScript',
    'TypeScript',
    'React',
    'HTML',
    'CSS',
    'Tailwind CSS',
    'Git',
    'REST API',
    'Figma',
    'Node.js',
    'Next.js',
    'Responsive Design',
    'Agile',
    'Problem Solving',
  ],
  preferredRoles: [
    'Frontend Engineer',
    'Full Stack Developer',
    'UI Engineer',
    'Product Engineer',
  ],
  learningGoals: [
    'Docker & Containerization',
    'System Design',
    'PostgreSQL',
    'GraphQL',
    'Testing (Jest & Cypress)',
    'CI/CD Pipeline',
  ],
  education: [
    {
      institution: 'Universitas Indonesia',
      degree: 'Sarjana Komputer (S.Kom)',
      field: 'Teknik Informatika',
      year: '2019 - 2023',
    },
  ],
  experiences: [
    {
      company: 'Tokopedia',
      role: 'Frontend Engineer Intern',
      duration: 'Jun 2022 - Nov 2022',
      highlights: [
        'Mengembangkan komponen React untuk halaman produk marketplace',
        'Menerapkan optimasi performa yang meningkatkan Lighthouse score 18 poin',
        'Berkolaborasi dengan tim desain untuk implementasi design system',
      ],
    },
    {
      company: 'Bangkit Academy (Google)',
      role: 'Machine Learning Path Participant',
      duration: 'Feb 2023 - Jul 2023',
      highlights: [
        'Menyelesaikan kurikulum machine learning dan cloud computing',
        'Membangun capstone project klasifikasi gambar dengan TensorFlow',
        'Berkolaborasi dalam tim lintas-path untuk membangun aplikasi Android',
      ],
    },
  ],
  projects: [
    {
      name: 'Warung Digital',
      description: 'Aplikasi POS sederhana untuk warung dan UMKM berbasis web dengan dashboard penjualan dan manajemen inventaris.',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    },
    {
      name: 'Jadwal Kuliah Generator',
      description: 'Tool untuk generate kombinasi jadwal kuliah optimal berdasarkan constraint waktu dan prioritas mahasiswa.',
      techStack: ['Next.js', 'Node.js', 'PostgreSQL'],
    },
    {
      name: 'EcoTrack',
      description: 'Prototipe aplikasi pelacak jejak karbon pribadi dengan visualisasi data dan rekomendasi gaya hidup.',
      techStack: ['React', 'Chart.js', 'REST API'],
    },
  ],
  workPreferences: {
    workTypes: ['Full-time', 'Remote', 'Hybrid'],
    locations: ['Jakarta', 'Bandung', 'Remote Indonesia'],
    salaryExpectation: 'Rp8.000.000 - Rp14.000.000 / bulan',
  },
};
