# AGENTS.md

## Project Identity

Cakrawa Labs adalah prototype frontend-only untuk platform AI-powered job matching dan workforce optimization. Aplikasi ini harus terasa seperti produk nyata, tetapi seluruh data, analisis, upload CV, login, dan matching berjalan dengan simulasi di sisi frontend tanpa backend dan tanpa database.

## Primary Goal

Bangun pengalaman produk yang lengkap, modern, informatif, dan meyakinkan untuk demo:

- Landing page yang kuat secara value proposition
- Auth flow bypass
- Job feed informatif
- Profile sebagai representasi CV
- Simulasi CV upload & analysis
- Match score per job
- Gap insight berdasarkan skill profile vs requirement job
- Career trajectory / learning roadmap
- Dashboard/panel ringkas namun kaya informasi

## Hard Constraints

- Frontend only
- Tidak boleh menggunakan backend
- Tidak boleh menggunakan database
- Semua data harus berasal dari mock data / local constants / local storage opsional
- Stack wajib:
  - React 19.2
  - Vite 7.3.1
  - TypeScript / TSX
  - Tailwind CSS
  - Lucide React untuk icon
- Font utama wajib Inter
- Responsive design wajib rapi di mobile, tablet, dan desktop
- Tidak boleh ada emoji di UI, copy, placeholder, maupun alt text
- Jangan gunakan avatar silhouette/default generic user icon untuk representasi profil
- Login hanya simulasi:
  - tombol Login
  - popup “Continue with Google”
  - setelah diklik langsung bypass masuk ke app/feed
- Profile dianggap sebagai CV aktif user
- Fitur “upload CV” adalah simulasi UI yang memicu analisis dari data profile/mock resume, bukan file parsing sungguhan

## Product Interpretation Rules

Jika brief ambigu, gunakan interpretasi berikut:

1. “CV Upload & Analysis” = simulasi unggah file, progress state, lalu hasil analisis dari data profile user.
2. “AI Analysis” = engine kalkulasi frontend berbasis rules:
   - skill overlap
   - preferred role affinity
   - seniority approximation
   - optional bonus dari tools / soft signals
3. “Cakrawa Score” = angka kecocokan user terhadap job target atau readiness umum.
4. “Horizon Role” = job paling realistis yang match-nya tinggi berdasarkan skills user.
5. “Gap Insight” = skill yang belum ada di profile tetapi dibutuhkan job.
6. “Career Trajectory” = roadmap step-by-step berbasis missing skills, dibagi ke fase belajar.
7. “Job Feed” = daftar pekerjaan yang lengkap, informatif, dan terasa realistis.
8. “Dashboard/Cakrawa Panel” = ringkasan metrik, rekomendasi, progress, dan aksi berikutnya.

## Required App Structure

Gunakan struktur halaman/fitur berikut minimal:

### Public

- Landing Page
  - Hero
  - Problem & solution
  - How it works
  - Feature highlights
  - CTA ke login

### Auth Simulation

- Login button
- Modal / dialog Continue with Google
- Bypass ke app setelah klik

### App (Protected in UI only)

- Feed / Jobs
- Job Detail
- Profile
- CV Analysis
- Gap Insight
- Career Trajectory
- Dashboard / Cakrawa Panel

## Required Core Data Models

Buat mock data minimal untuk:

- User profile
- Skills user
- Education
- Experience summary
- Preferred roles
- Job listings
- Company data
- Skill taxonomy
- Career roadmap templates
- Insight summary cards

Contoh entitas minimal:

- User
- Job
- Company
- Skill
- MatchResult
- GapAnalysis
- RoadmapStep

## Matching Engine Rules

Buat utility functions reusable untuk:

- normalizeSkill()
- compareSkills()
- calculateMatchScore()
- getMissingSkills()
- getStrengthSkills()
- getRecommendedJobs()
- getHorizonRole()
- buildCareerTrajectory()

### Match Scoring Guidance

Gunakan formula sederhana namun believable, misalnya:

- 70% skill overlap
- 15% preferred role relevance
- 10% experience relevance
- 5% learning momentum / bonus signal

Output score harus organik, bukan angka bulat membosankan terus-menerus.
Contoh:

- 74%
- 81%
- 67%
  Hindari angka monoton seperti 50%, 80%, 100% untuk semua item.

## Job Card Requirements

Setiap card job harus informatif dan minimal memuat:

- Job title
- Company name
- Location
- Work type
- Salary range
- Experience level
- Short description
- Key responsibilities ringkas
- Required skills
- Match score
- Missing skills count
- Quick status seperti “Strong match” / “Needs upskilling”
- CTA view detail / analyze

## Profile Rules

Profile berfungsi sebagai CV user.
Minimal memuat:

- Name
- Headline
- About
- Skills
- Education
- Projects / experience highlights
- Preferred roles
- Availability / work preference
- Learning goals

Semua analisis job harus bersumber dari profile ini.

## CV Upload Simulation Rules

Karena frontend-only:

- Gunakan drag-and-drop area atau upload button
- Terima PDF/DOC secara visual saja
- Setelah “upload”, tampilkan state processing
- Hasil analisis diambil dari profile/mock resume
- Tampilkan:
  - detected skills
  - suggested roles
  - readiness summary
  - match preview
  - next learning actions

## Dashboard Requirements

Panel utama harus memuat:

- Cakrawa Score
- Horizon Role
- Top matched jobs
- Missing skills summary
- Learning progress
- Career trajectory preview
- Recommended next action

## UX / UI Directives

- Visual harus modern, cool, clean, premium
- Pakai palette gelap-terang yang elegan, bukan norak
- Gunakan aksen yang konsisten
- Hindari neon glow berlebihan
- Gunakan depth halus, border tipis, blur secukupnya
- Layout harus terasa “produk startup modern”, bukan template kasar
- Mobile-first dan tetap kuat di desktop

## Typography

- Font utama: Inter
- Gunakan hierarki yang tegas
- Hindari gradient text berlebihan
- Hindari heading terlalu besar dan norak
- Gunakan angka/metrik yang menonjol tapi tetap elegan

## Motion

- Gunakan motion ringan dan halus
- Hover, active, modal, card transition, progress animation
- Jangan over-animated
- Prioritaskan performa
- Skeleton loading lebih baik daripada spinner generik

## Accessibility

- Pastikan contrast baik
- Fokus state jelas
- Semantic HTML benar
- Buttons, dialog, tabs, dan form elements accessible
- Jangan bergantung hanya pada warna untuk status

## Code Quality Rules

- Pecah komponen secara modular
- Pisahkan data, utilities, dan presentation
- Hindari file raksasa
- TypeScript types harus jelas
- Jangan hardcode logic berulang
- Gunakan constants untuk mock data
- Gunakan helper untuk label/status/match
- Semua komponen harus reusable bila masuk akal

## State Management

- Gunakan React state lokal
- Boleh context ringan jika perlu untuk auth simulation atau selected profile/job
- Jangan pakai library state tambahan kalau tidak perlu

## Styling Rules

- Tailwind CSS sebagai styling utama
- Gunakan design tokens internal:
  - colors
  - radius
  - spacing
  - shadows
- Konsisten pada:
  - border radius
  - card surface
  - spacing system
  - section container

## Forbidden Patterns

- Backend calls palsu yang tidak perlu
- Database integration
- Placeholder asal-asalan
- Job cards minim informasi
- Avatar silhouette/generic user icon
- Emoji
- Purple neon AI cliché
- Dashboard terlalu penuh tanpa hirarki
- Layout 3 kartu generik yang terasa template banget untuk semua section
- Copy marketing generik tanpa konteks produk

## Deliverable Expectation

Output implementasi harus terasa seperti demo startup siap presentasi:

- landing page polished
- auth simulation mulus
- job feed realistis
- profile-based analysis jelas
- gap insight actionable
- trajectory meyakinkan
- responsive di semua layar
- visual modern dan memorable

## Done Criteria

Tugas dianggap selesai jika:

- Semua flow utama berjalan tanpa backend
- User bisa masuk dari landing ke login bypass ke feed
- User bisa lihat profile sebagai CV
- User bisa simulasi upload CV
- User bisa lihat match score dan missing skills untuk job
- User bisa lihat Horizon Role dan Cakrawa Score
- User bisa lihat Career Trajectory
- UI responsif, rapi, dan terasa premium
