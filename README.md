# Grid AI - The Eye of the City

Grid AI is a next-generation automated traffic intelligence and violation processing frontend. Built with modern web technologies, it visualizes real-time data from CCTV detection and OCR pipelines to enforce city traffic protocols autonomously.

### 🌐 Links
- **Live Application:** [https://traffic-violation-eight.vercel.app/](https://traffic-gridai.vercel.app/)
- **Backend Repository:** [https://github.com/Aj242005/fg-r2](https://github.com/Aj242005/fg-r2)

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Authentication:** Clerk (`@clerk/nextjs`)
- **Charts & Visualization:** Recharts, Custom WebGL Shaders
- **Icons:** React Icons

## 🌟 Key Features

- **Automated Enforcement Protocol Visualization:** Follows a 3-phase execution pipeline (CCTV Detection, OCR Recognition, Audit & Ticketing).
- **Interactive Telemetry Dashboards:** Real-time metrics monitoring inference times, active nodes, and violation logs.
- **Officer Dashboard:** Secured authentication via Clerk for administrative operations and oversight.
- **Hardware-Accelerated Graphics:** Custom WebGL-based background shaders and premium glassmorphic UI elements.

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Aj242005/fgr2-fe.git
   cd fgr2-fe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   Create a `.env.local` file in the root directory and add your keys:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # Defaults to https://fgr2-backend.mooo.com if omitted
   NEXT_PUBLIC_API_URL=your_api_backend_url 
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 📂 Project Structure

- `/src/app/` - Next.js App Router endpoints (Landing Page, Officer Dashboard).
- `/src/components/landing/` - Premium landing page components, dynamic navbars, WebGL shaders, and scroll-bound animations.
- `/src/components/` - Reusable shared components.

## 📝 License

This project is proprietary and intended for Grid AI platform operations.
