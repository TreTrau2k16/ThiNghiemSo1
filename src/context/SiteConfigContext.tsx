import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, ProcessStep, WaterproofingMethod } from '../types';
import { COMPLETED_PROJECTS } from '../data/projects';
import { EXECUTION_STEPS, WATERPROOFING_METHODS } from '../data/processes';

export interface SiteConfig {
  // Theme section
  themePreset: 'sky' | 'blue' | 'emerald' | 'amber' | 'orange' | 'red' | 'indigo' | 'custom';
  primaryColor: string;
  primaryHoverColor: string;
  primaryLightColor: string;
  primaryAccentColor: string;

  // Contact info
  hotline: string;
  email: string;
  workingHours: string;
  addressHCM: string;
  addressPQ: string;

  // Branding text
  logoPrefix: string;
  logoSuffix: string;
  tagline: string;
  warrantyYears: number;

  // Hero section
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleMain: string;
  heroTitleLine2: string;
  heroDesc: string;

  // About / Value Prop intro
  introTitle: string;
  introSub: string;
  introDesc: string;

  // Calculator custom coefficients
  rate_pu_min: number;
  rate_pu_max: number;
  rate_bitum_min: number;
  rate_bitum_max: number;
  rate_sika_min: number;
  rate_sika_max: number;
  rate_penetron_min: number;
  rate_penetron_max: number;

  multiplier_terrace: number;
  multiplier_toilet: number;
  multiplier_basement: number;
  multiplier_wall: number;

  // Dynamic lists
  projects: Project[];
  executionSteps: ProcessStep[];
  waterproofingMethods: WaterproofingMethod[];
}

export const THEME_PRESETS = {
  sky: {
    primaryColor: '#0284c7', // sky-600
    primaryHoverColor: '#0369a1', // sky-700
    primaryLightColor: '#f0f9ff', // sky-50
    primaryAccentColor: '#38bdf8', // sky-400
  },
  blue: {
    primaryColor: '#2563eb', // blue-600
    primaryHoverColor: '#1d4ed8', // blue-700
    primaryLightColor: '#eff6ff', // blue-50
    primaryAccentColor: '#60a5fa', // blue-400
  },
  emerald: {
    primaryColor: '#059669', // emerald-600
    primaryHoverColor: '#047857', // emerald-700
    primaryLightColor: '#ecfdf5', // emerald-50
    primaryAccentColor: '#34d399', // emerald-400
  },
  amber: {
    primaryColor: '#d97706', // amber-600
    primaryHoverColor: '#b45309', // amber-700
    primaryLightColor: '#fef3c7', // amber-50
    primaryAccentColor: '#fbbf24', // amber-400
  },
  orange: {
    primaryColor: '#f1811c', // Custom orange requested by user
    primaryHoverColor: '#d66d0e',
    primaryLightColor: '#fffaf5',
    primaryAccentColor: '#f9a149',
  },
  red: {
    primaryColor: '#dc2626', // red-600
    primaryHoverColor: '#b91c1c', // red-700
    primaryLightColor: '#fef2f2', // red-50
    primaryAccentColor: '#f87171', // red-400
  },
  indigo: {
    primaryColor: '#4f46e5', // indigo-600
    primaryHoverColor: '#4338ca', // indigo-700
    primaryLightColor: '#eef2ff', // indigo-50
    primaryAccentColor: '#818cf8', // indigo-400
  }
};

const DEFAULT_CONFIG: SiteConfig = {
  themePreset: 'orange',
  ...THEME_PRESETS.orange,

  hotline: '0988.333.xxx',
  email: 'kỹ thuật.chongtham@gmail.com',
  workingHours: 'T2 - CN (7:30 - 21:00)',
  addressHCM: 'Số 45/9 Đường Song Hành, Hóc Môn, TP. Hồ Chí Minh',
  addressPQ: 'Số 120 Đường Trần Hưng Đạo, Dương Đông, TP. Phú Quốc, Kiên Giang',

  logoPrefix: 'CHỐNG THẤM',
  logoSuffix: 'TOÀN TÂM',
  tagline: 'KỸ THUẬT CHÂU ÂU • BẢO HÀNH 10 NĂM',
  warrantyYears: 10,

  heroBadge: 'Chống Thấm Toàn Tâm • TP. HCM & Phú Quốc',
  heroTitleLine1: 'Nhà Thầu Thi Công',
  heroTitleMain: 'Chống Thấm Triệt Để 100%',
  heroTitleLine2: 'Dân Dụng & Dự Án Lớn',
  heroDesc: 'Chúng tôi không bán lẻ hóa chất. Chúng tôi cung cấp giải pháp, vật tư chất lượng châu Âu phục vụ trực tiếp cho các công trình biệt thự, tòa nhà, resort, khách sạn mặt biển tại TP. HCM và Phú Quốc. Cam kết đền tiền gấp đôi nếu phát dột lại.',

  introTitle: 'Hồ Sơ Năng Lực Trọng Tâm',
  introSub: 'Độc Quyền Giải Pháp Châu Âu',
  introDesc: 'Chúng tôi tự hào là đơn vị tiên phong áp dụng các máy đo bóc ẩm hồng ngoại và công nghệ phun màng dẻo chống chịu muối mặn bão biển của Hy Lạp chuyên dụng cho khí hậu cận xích đạo tại miền Nam và đảo ngọc Phú Quốc. Toàn bộ kỹ sư trưởng trực tiếp phụ trách chẩn đoán đo đạc và lập biện pháp thi công tối ưu.',

  // Calculator multipliers and base rates
  rate_pu_min: 280000,
  rate_pu_max: 420000,
  rate_bitum_min: 320000,
  rate_bitum_max: 480000,
  rate_sika_min: 180000,
  rate_sika_max: 260000,
  rate_penetron_min: 350000,
  rate_penetron_max: 550000,

  multiplier_terrace: 1.0,
  multiplier_toilet: 0.85,
  multiplier_basement: 1.4,
  multiplier_wall: 0.7,

  projects: COMPLETED_PROJECTS,
  executionSteps: EXECUTION_STEPS,
  waterproofingMethods: WATERPROOFING_METHODS
};

interface SiteConfigContextType {
  config: SiteConfig;
  updateConfig: (updater: Partial<SiteConfig> | ((prev: SiteConfig) => SiteConfig)) => void;
  resetConfig: () => void;
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('site_custom_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migrate old default 'sky' to 'orange' preset
        if (parsed.themePreset === 'sky') {
          parsed.themePreset = 'orange';
          Object.assign(parsed, THEME_PRESETS.orange);
        }
        // Ensure new properties are backfilled
        return { ...DEFAULT_CONFIG, ...parsed };
      } catch (err) {
        console.error('Error parsing site config, fallback to default', err);
        return DEFAULT_CONFIG;
      }
    }
    return DEFAULT_CONFIG;
  });

  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  // Sync state with global server database on mount
  useEffect(() => {
    fetch('/api/config')
      .then(res => {
        if (!res.ok) throw new Error('API DB response not OK');
        return res.json();
      })
      .then(data => {
        if (data && typeof data === 'object' && Object.keys(data).length > 0) {
          setConfig(prev => {
            const merged = { ...prev, ...data };
            localStorage.setItem('site_custom_config', JSON.stringify(merged));
            return merged;
          });
        }
      })
      .catch(err => {
        console.warn('Backend database not reachable, using offline browser caches.', err);
      });
  }, []);

  // Apply visual colors directly on CSS variables
  useEffect(() => {
    const styleEl = document.getElementById('site-dynamic-theme-overrides') || document.createElement('style');
    styleEl.id = 'site-dynamic-theme-overrides';
    
    styleEl.innerHTML = `
      :root {
        --color-brand-primary: ${config.primaryColor};
        --color-brand-primary-hover: ${config.primaryHoverColor};
        --color-brand-primary-light: ${config.primaryLightColor};
        --color-brand-primary-accent: ${config.primaryAccentColor};
      }
      
      /* Target Tailwind classes to hot-swap theme color elements */
      .text-sky-600 { color: var(--color-brand-primary) !important; }
      .text-sky-700 { color: var(--color-brand-primary-hover) !important; }
      .text-sky-400 { color: var(--color-brand-primary-accent) !important; }
      .hover\\:text-sky-700:hover { color: var(--color-brand-primary-hover) !important; }
      .hover\\:text-sky-600:hover { color: var(--color-brand-primary) !important; }
      
      .bg-sky-600 { background-color: var(--color-brand-primary) !important; }
      .bg-sky-700 { background-color: var(--color-brand-primary-hover) !important; }
      .bg-sky-550 { background-color: var(--color-brand-primary) !important; }
      .bg-sky-50 { background-color: var(--color-brand-primary-light) !important; }
      .bg-sky-100 { background-color: var(--color-brand-primary-light) !important; }
      .bg-sky-500 { background-color: var(--color-brand-primary) !important; }
      
      .hover\\:bg-sky-600:hover { background-color: var(--color-brand-primary) !important; }
      .hover\\:bg-sky-700:hover { background-color: var(--color-brand-primary-hover) !important; }
      .hover\\:bg-sky-50:hover { background-color: var(--color-brand-primary-light) !important; }
      
      .border-sky-600 { border-color: var(--color-brand-primary) !important; }
      .border-sky-200 { border-color: var(--color-brand-primary-light) !important; }
      .border-sky-100 { border-color: var(--color-brand-primary-light) !important; }
      .border-sky-300 { border-color: var(--color-brand-primary) !important; }
      
      /* Subtle ring utility */
      .focus\\:border-sky-500:focus { border-color: var(--color-brand-primary) !important; }
      
      /* Override custom brand styles */
      .selection\\:bg-sky-500::selection { background-color: var(--color-brand-primary) !important; }
      
      /* Transparent backgrounds */
      .bg-sky-500\\/10 { background-color: rgba(${hexToRgb(config.primaryColor)}, 0.1) !important; }
      .border-sky-400\\/30 { border-color: rgba(${hexToRgb(config.primaryColor)}, 0.3) !important; }
      .shadow-sky-500\\/10 { --tw-shadow-color: rgba(${hexToRgb(config.primaryColor)}, 0.1) !important; }
      .shadow-sky-500\\/20 { --tw-shadow-color: rgba(${hexToRgb(config.primaryColor)}, 0.2) !important; }
    `;

    document.head.appendChild(styleEl);
  }, [config]);

  // Utility to map hex to RGB numbers for opacity styling
  function hexToRgb(hex: string): string {
    const cleanHex = hex.replace('#', '');
    const bigint = parseInt(cleanHex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return isNaN(r) ? '2, 132, 199' : `${r}, ${g}, ${b}`;
  }

  const updateConfig = (updater: Partial<SiteConfig> | ((prev: SiteConfig) => SiteConfig)) => {
    setConfig(prev => {
      const nextConfig = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      
      // If presets are chosen, override primary colors accordingly
      if (updater && 'themePreset' in updater && updater.themePreset !== 'custom') {
        const preset = updater.themePreset as keyof typeof THEME_PRESETS;
        const presetColors = THEME_PRESETS[preset];
        if (presetColors) {
          Object.assign(nextConfig, presetColors);
        }
      }

      localStorage.setItem('site_custom_config', JSON.stringify(nextConfig));

      // Asynchronously sync modifications to server database file
      fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextConfig)
      }).catch(err => {
        console.error('Failed to submit updated config to server database:', err);
      });

      return nextConfig;
    });
  };

  const resetConfig = () => {
    localStorage.removeItem('site_custom_config');
    setConfig(DEFAULT_CONFIG);

    // Sync reset to server database
    fetch('/api/config/reset', {
      method: 'POST'
    }).catch(err => {
      console.error('Failed to reset config on server database:', err);
    });
  };

  return (
    <SiteConfigContext.Provider value={{ config, updateConfig, resetConfig, isAdminMode, setIsAdminMode }}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (context === undefined) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
};
