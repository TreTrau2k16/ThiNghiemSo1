import React from 'react';
import { Phone, Mail, Clock, ShieldCheck, MapPin, Menu, X } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { config } = useSiteConfig();

  const navItems = [
    { id: 'home', label: 'Trang Chủ' },
    { id: 'capability', label: 'Hồ Sơ Năng Lực' },
    { id: 'process', label: 'Quy Trình Thi Công' },
    { id: 'projects', label: 'Dự Án Tiêu Biểu' },
    { id: 'calculator', label: 'Dự Tính Chi Phí & Báo Giá' },
    { id: 'contact', label: 'Liên Hệ Khảo Sát' },
  ];

  const cleanPhoneLink = `tel:${config.hotline.replace(/[\.\s\-]/g, '')}`;

  return (
    <header className="w-full z-50 bg-white shadow-sm border-b border-slate-100 sticky top-0">
      {/* Top bar with contact info */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 sm:px-6 lg:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-sans">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              Hotline: <a href={cleanPhoneLink} className="text-white hover:text-sky-400 transition-colors font-bold">{config.hotline} (24/7)</a>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              Kỹ thuật: <span className="text-white font-medium">{config.email}</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              Phạm vi: <span className="text-white font-medium">Khu vực: TP. HCM & Phú Quốc</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Làm việc: <span className="text-white font-medium">{config.workingHours}</span>
            </span>
            <div className="h-3 w-[1px] bg-slate-700"></div>
            <span className="flex items-center gap-1 text-emerald-400 font-semibold uppercase text-[10px] tracking-wider bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
              <ShieldCheck className="w-3 h-3" /> Cam kết hết thấm 100%
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none group shrink-0"
            onClick={() => { setActiveTab('home'); setIsOpen(false); }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:bg-slate-900 transition-all duration-300 shrink-0">
              {/* Custom construction shield logo style */}
              <svg className="w-5 h-5 sm:w-7 sm:h-7 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.042 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
            <div>
              <div className="text-sm sm:text-base md:text-lg font-extrabold tracking-tight text-slate-900 leading-none uppercase whitespace-nowrap">
                {config.logoPrefix} <span className="text-sky-600 group-hover:text-slate-900 transition-colors">{config.logoSuffix}</span>
              </div>
              <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium tracking-normal sm:tracking-widest uppercase block mt-1 whitespace-nowrap">
                {config.tagline}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 rounded-md text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 border border-sky-100/50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* CTA Hotline on Desktop */}
          <div className="hidden lg:block">
            <a
              href={cleanPhoneLink}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-sky-600 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-all duration-300 shadow-sm"
            >
              <Phone className="w-4 h-4 text-sky-400 stroke-[2.5]" />
              <span>Khảo Sát Ngay</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-2 rounded-md hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left block px-4 py-3 rounded-md text-base font-semibold ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 font-bold border-l-4 border-sky-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 pb-2 border-t border-slate-100 px-4">
              <p className="text-xs text-slate-500 mb-2 font-medium">Ấn gọi để nhận tư vấn khẩn cấp:</p>
              <a
                href={cleanPhoneLink}
                className="flex items-center justify-center gap-2 w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-lg text-sm shadow-md transition-colors"
              >
                <Phone className="w-4 h-4" />
                Hotline: {config.hotline}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
