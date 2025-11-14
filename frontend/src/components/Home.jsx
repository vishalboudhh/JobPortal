import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();

  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies")
    }
  }, []);

  return (
    <div className="flex flex-col bg-gray-50">
      {/* ✅ Navbar stays fixed on top for better UX */}
      <header className="w-full sticky top-0 z-50 shadow bg-white">
        <Navbar />
      </header>

      {/* ✅ Main Content */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-10  mt-4">
        <section className="w-full">
          <HeroSection />
        </section>

        <section className="w-full">
          <CategoryCarousel />
        </section>

        <section className="w-full">
          <LatestJobs />
        </section>
      </main>

      {/* ✅ Footer */}
      <footer className="mt-auto w-full bg-gray-900 text-white">
        <Footer />
      </footer>
    </div>
  )
}

export default Home
