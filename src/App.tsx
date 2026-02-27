import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import { MainLayout } from '@/components/layout/MainLayout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import DigitalTwin from '@/pages/DigitalTwin';
import Assets from '@/pages/Assets';
import Maintenance from '@/pages/Maintenance';
import Timeline from '@/pages/Timeline';
import Budget from '@/pages/Budget';
import Sustainability from '@/pages/Sustainability';
import Reports from '@/pages/Reports';
import Settings from '@/pages/Settings';
import Signup from '@/pages/Signup';
import { AppProvider } from '@/context/AppContext';

function App() {
  return (
    <AppProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/twin" element={<DigitalTwin />} />
              <Route path="/assets" element={<Assets />} />
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/sustainability" element={<Sustainability />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  );
}

export default App;
