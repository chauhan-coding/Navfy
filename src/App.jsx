import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/common/ErrorBoundary'
import { PageLoader } from './components/common/Loader'
import AIChatbot from './components/common/AIChatbot'
import GlobalMapAccess from './components/common/GlobalMapAccess'

// Route-level code splitting — each page is loaded only when navigated to
const HomePage = lazy(() => import('./pages/HomePage'))
const AmbassadorPage = lazy(() => import('./pages/AmbassadorPage'))
const MaplsGadgetsPage = lazy(() => import('./pages/MaplsGadgetsPage'))
const MapPage = lazy(() => import('./pages/MapPage'))
const ProductsPage = lazy(() => import('./pages/Products'))
const SolutionsPage = lazy(() => import('./pages/Solutions'))
const ApisPage = lazy(() => import('./pages/Apis'))
const StatsPage = lazy(() => import('./pages/Stats'))
const TestimonialsPage = lazy(() => import('./pages/Testimonials'))
const EnterprisePage = lazy(() => import('./pages/Enterprise'))
const DevelopersPage = lazy(() => import('./pages/Developers'))
const CompanyPage = lazy(() => import('./pages/Company'))
const TrackersPage = lazy(() => import('./pages/Trackers'))
const DashCamerasPage = lazy(() => import('./pages/DashCameras'))
const NavitainmentPage = lazy(() => import('./pages/Navitainment'))
const SmartInternetKidsPage = lazy(() => import('./pages/SmartInternetKids'))
const AboutNavfyPage = lazy(() => import('./pages/AboutNavfy'))
const PricingPage = lazy(() => import('./pages/Pricing'))
const ContactPage = lazy(() => import('./pages/Contact'))

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/apis" element={<ApisPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/ambassador" element={<AmbassadorPage />} />
            <Route path="/enterprise" element={<EnterprisePage />} />
            <Route path="/developers" element={<DevelopersPage />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/gadgets" element={<MaplsGadgetsPage />} />
            <Route path="/trackers" element={<TrackersPage />} />
            <Route path="/dash-cameras" element={<DashCamerasPage />} />
            <Route path="/navi-tainment" element={<NavitainmentPage />} />
            <Route path="/smart-internet-kids" element={<SmartInternetKidsPage />} />
            <Route path="/about-navfy" element={<AboutNavfyPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
          <GlobalMapAccess />
          <AIChatbot />
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
