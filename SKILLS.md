---
name: cakrawa-frontend-builder
description: Senior frontend product engineer untuk membangun prototype static Cakrawa Labs berbasis React 19.2 + Vite 7.3.1 + TypeScript, dengan simulasi login, simulasi CV analysis, job matching, gap insight, dashboard, dan career trajectory tanpa backend maupun database.
---

# Cakrawa Labs Frontend Skill

## 1. Mission

Bangun prototype frontend-only yang lengkap untuk Cakrawa Labs sebagai AI-powered job matching & workforce optimization platform. Produk harus mempresentasikan alur:

- memahami profil user
- mencocokkan user ke pekerjaan
- mengukur readiness
- menampilkan skill gap
- memberi roadmap belajar

Semua pengalaman harus terasa seperti aplikasi nyata meskipun seluruh mekanisme berjalan dari mock data dan frontend logic.

## 2. Locked Tech Stack

Gunakan stack ini secara wajib:

- React 19.2
- Vite 7.3.1
- TypeScript / TSX
- Tailwind CSS
- Lucide React
- Inter font

Jangan ubah stack kecuali user meminta langsung.

## 3. Architectural Rules

- Frontend only
- Tidak ada backend
- Tidak ada database
- Tidak ada autentikasi sungguhan
- Tidak ada file upload processing sungguhan
- Tidak ada API dependency yang wajib untuk core flow
- Semua interaksi penting harus bisa jalan dari:
  - local mock data
  - utility functions
  - local state
  - optional localStorage untuk persist ringan

## 4. Product Modules

Aplikasi minimal harus memiliki modul berikut:

### A. Landing Page

Harus memuat:

- hero section
- problem & solution
- how it works
- feature highlights
- CTA menuju login

### B. Auth Simulation

Harus memuat:

- login button
- popup / modal Continue with Google
- klik tombol langsung bypass ke app/feed

### C. Job Feed

Harus memuat:

- daftar job informatif
- filter ringan opsional
- sorting opsional
- match score per job
- quick insight per job

### D. Job Detail

Harus memuat:

- company info
- job overview
- responsibilities
- required skills
- salary / work mode / level
- match score breakdown
- missing skills
- why this role fits
- next action

### E. Profile as CV

Profile dianggap sebagai CV aktif user.
Harus memuat:

- identity
- headline
- about
- skills
- experience highlights
- education
- preferred roles
- learning goals

### F. CV Upload Simulation

Harus memuat:

- upload zone
- fake upload flow
- processing state
- analysis result
- detected skills
- suggested roles
- readiness summary

### G. Gap Insight

Harus memuat:

- owned skills
- missing skills
- partially matched readiness
- grouped insights berdasarkan job target

### H. Career Trajectory

Harus memuat:

- step-by-step roadmap
- fase belajar
- output target per fase
- estimasi progress visual

### I. Cakrawa Panel

Harus memuat:

- Cakrawa Score
- Horizon Role
- top matches
- learning progress
- trajectory summary
- action cards

## 5. Core Product Logic

Semua “AI” adalah simulasi frontend berbasis rules yang masuk akal.

### Required Utility Functions

Buat helper / util untuk:

- normalizeSkill(skill)
- dedupeSkills(skills)
- getSkillOverlap(userSkills, jobSkills)
- getMissingSkills(userSkills, jobSkills)
- getMatchedSkills(userSkills, jobSkills)
- calculateMatchScore(profile, job)
- getMatchLabel(score)
- getHorizonRole(profile, jobs)
- getRecommendedJobs(profile, jobs)
- buildCareerTrajectory(profile, targetJob)

### Scoring Guidance

Gunakan formula believable:

- 70% skill overlap
- 15% preferred role alignment
- 10% experience alignment
- 5% learning intent / momentum

### Score Output Rules

- Gunakan angka organik
- Tampilkan sebagai integer yang realistis
- Variasikan hasil
- Jangan gunakan angka sempurna secara berlebihan
- Hindari semua job terlihat sama bagusnya

## 6. Data Modeling

Siapkan mock data kuat dan tidak generik.

### User Profile

Harus mencakup:

- fullName
- headline
- location
- about
- skills
- preferredRoles
- learningGoals
- education
- experiences
- projects
- certifications optional

### Jobs

Setiap job wajib mencakup:

- id
- title
- company
- location
- workType
- level
- salaryRange
- description
- responsibilities
- requiredSkills
- preferredSkills
- category
- postedAt
- applicants count optional
- match metadata yang dihitung runtime

### Companies

Muat identitas yang believable:

- name
- industry
- size
- culture tags
- short summary

### Roadmap Steps

Setiap langkah minimal punya:

- title
- description
- duration
- goal
- relatedSkills
- status optional

## 7. UI Direction

Gunakan visual yang:

- modern
- cool
- premium
- clean
- profesional
- responsive

### Palette Guidance

- Hindari purple-neon AI look
- Pakai neutral gelap/soft dengan aksen yang elegan
- Cocok untuk tema horizon/cakrawala
- Gunakan gradient halus, bukan menyala berlebihan

Contoh arah:

- surface: slate / zinc / neutral
- accent: cyan lembut, emerald halus, atau sky yang refined
- border: tipis dan subtle
- glow: sangat minim atau tidak perlu

## 8. Typography

- Font wajib Inter
- Gunakan hierarki yang jelas
- Hindari serif
- Hindari heading raksasa
- Gunakan tracking dan weight yang rapi
- Angka metrik harus jelas dan menonjol

## 9. Layout Rules

- Mobile-first
- Container rapi, maksimal sekitar `max-w-7xl`
- Jangan pakai `h-screen` untuk hero; gunakan `min-h-[100dvh]`
- Grid harus fleksibel dan jatuh rapi di mobile
- Hindari 3 kartu generik yang terasa template di semua section
- Gunakan variasi layout:
  - split hero
  - dashboard panels
  - asymmetric blocks secukupnya
  - stacked content di mobile

## 10. Component Rules

Buat komponen reusable minimal:

- Navbar
- HeroSection
- FeatureBlock
- LoginDialog
- JobCard
- JobDetailPanel
- SkillChip
- MatchScoreCard
- GapInsightCard
- TrajectoryTimeline
- ProfileSummaryCard
- UploadSimulationCard
- DashboardStatCard

Semua komponen harus:

- typed
- reusable
- clean
- punya empty/loading state jika relevan

## 11. Job Card Specification

Setiap JobCard harus informatif dan memuat minimal:

- title
- company
- location
- work type
- level
- salary range
- ringkasan role
- skill tags
- match score
- missing skills count
- CTA analyze / view detail

Tambahkan indikator status seperti:

- Strong match
- High potential
- Needs upskilling

## 12. Profile / CV Interpretation

Profile adalah sumber utama seluruh analisis.
Jangan membuat parser file sungguhan.
Data profile harus digunakan untuk:

- menghitung match score
- menentukan Horizon Role
- mendeteksi gap skills
- membentuk roadmap belajar
- menampilkan readiness summary

## 13. Upload Simulation Rules

Upload area hanya simulasi.
Flow:

1. user pilih file
2. tampil state uploading
3. tampil state analyzing
4. hasil analysis muncul dari profile/mock resume

Result harus memuat:

- detected skills
- strengths
- suggested roles
- readiness score
- missing areas umum
- CTA ke dashboard / jobs / roadmap

## 14. Motion & Interaction

Gunakan motion ringan, halus, dan performant:

- hover elevation kecil
- active press state
- dialog animation
- section reveal
- progress bar transitions
- skeleton shimmer

Jangan overuse animation.
Jangan gunakan animasi berat yang bikin terasa gimmick.

## 15. Accessibility Rules

- Kontras warna baik
- Focus visible jelas
- Button dan dialog accessible
- Label jelas
- Semantic HTML benar
- Status jangan bergantung pada warna saja

## 16. Content Rules

Copy harus:

- konkret
- relevan ke job matching dan readiness
- tidak generik
- tidak terlalu hype
- tidak memakai filler words murahan

### Forbidden Content Patterns

- emoji
- placeholder lorem ipsum
- nama super generik seperti John Doe
- avatar silhouette
- angka palsu yang terlalu bulat dan monoton
- company naming generik seperti Acme, SmartFlow, Nexus

## 17. Visual Anti-Patterns

Jangan lakukan ini:

- pure black
- glow berlebihan
- gradient text berlebihan
- dashboard terlalu ramai
- card shadow berat
- accent terlalu jenuh
- icon style campur-campur
- silhouette char / default user avatar jelek

## 18. Recommended UX Flow

Flow utama yang harus terasa jelas:

- User membuka landing page
- Klik login
- Muncul popup Continue with Google
- Klik dan langsung masuk
- Masuk ke jobs feed
- Lihat kecocokan tiap job
- Buka detail job
- Lihat skill gap
- Buka profile sebagai CV
- Simulasi upload CV
- Lihat dashboard dan trajectory

## 19. Output Quality Standard

Hasil akhir harus terasa seperti:

- startup demo siap presentasi
- polished
- cohesive
- believable
- responsive
- informative

Bukan sekadar template landing page kosong.

## 20. Delivery Standard

Saat menghasilkan implementasi:

- gunakan struktur folder yang rapi
- pastikan semua komponen penting terhubung
- prioritaskan realism data
- tampilkan reasoning produk lewat UI
- buat semua job cards benar-benar informatif
- buat dashboard dan insights terasa membantu user mengambil keputusan

## 21. Final Checks

Sebelum dianggap selesai, pastikan:

- stack sesuai
- font Inter terpasang
- login bypass bekerja
- semua data frontend-only
- profile dipakai sebagai CV
- match score tampil
- missing skills tampil
- Horizon Role tampil
- Career Trajectory tampil
- responsive
- tidak ada emoji
- tidak ada silhouette avatar
