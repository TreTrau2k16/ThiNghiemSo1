import React, { useState, useEffect } from 'react';
import { useSiteConfig, THEME_PRESETS, SiteConfig } from '../context/SiteConfigContext';
import { 
  X, 
  Settings, 
  Palette, 
  Type, 
  DollarSign, 
  FileText, 
  RotateCcw, 
  Check, 
  Trash2, 
  Phone, 
  MapPin, 
  Sliders, 
  Eye, 
  ShieldCheck, 
  Users,
  Search,
  Briefcase,
  Wrench,
  Plus,
  Edit3,
  Save,
  PlusCircle
} from 'lucide-react';
import { QuoteRequest, Project, ProcessStep, WaterproofingMethod } from '../types';

export default function AdminPanel() {
  const { config, updateConfig, resetConfig, isAdminMode, setIsAdminMode } = useSiteConfig();
  const [activeTab, setActiveTab] = useState<'theme' | 'identity' | 'pricing' | 'projects' | 'processes' | 'leads'>('theme');
  const [copiedText, setCopiedText] = useState<string>('');
  const [leads, setLeads] = useState<QuoteRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Local state for interactive editors
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newMaterial, setNewMaterial] = useState<string>('');
  const [newHighlight, setNewHighlight] = useState<string>('');

  const [editingStep, setEditingStep] = useState<ProcessStep | null>(null);
  const [newStepDetail, setNewStepDetail] = useState<string>('');

  const [editingMethod, setEditingMethod] = useState<WaterproofingMethod | null>(null);
  const [newMethodLayer, setNewMethodLayer] = useState<string>('');
  const [newMethodMatName, setNewMethodMatName] = useState<string>('');
  const [newMethodMatBrand, setNewMethodMatBrand] = useState<string>('');

  // Local input states for text customization (binds immediately but lets us reset if needed)
  useEffect(() => {
    loadLeads();
  }, [isAdminMode]);

  const loadLeads = () => {
    const data = localStorage.getItem('waterproofing_quotes');
    if (data) {
      try {
        setLeads(JSON.parse(data));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeleteLead = (id: string) => {
    if (window.confirm('Bạn có muốn xóa đơn khảo sát này?')) {
      const updated = leads.filter(l => l.id !== id);
      setLeads(updated);
      localStorage.setItem('waterproofing_quotes', JSON.stringify(updated));
    }
  };

  const handleClearAllLeads = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa TOÀN BỘ danh sách đăng ký khảo sát của khách hàng?')) {
      localStorage.removeItem('waterproofing_quotes');
      setLeads([]);
    }
  };

  const handleCopyValue = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(''), 2000);
  };

  // Project Management Handlers
  const handleSaveProject = () => {
    if (!editingProject) return;
    if (!editingProject.name.trim()) {
      alert('Vui lòng nhập tên công trình');
      return;
    }
    
    let updatedProjects = [...(config.projects || [])];
    
    if (!editingProject.id) {
      // Adding new
      const newProj: Project = {
        ...editingProject,
        id: 'proj-' + Date.now().toString()
      };
      updatedProjects = [newProj, ...updatedProjects];
    } else {
      // Editing existing
      updatedProjects = updatedProjects.map(p => p.id === editingProject.id ? editingProject : p);
    }
    
    updateConfig({ projects: updatedProjects });
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Bạn có chắc muốn xóa dự án này khỏi danh sách giới thiệu?')) {
      const updatedProjects = (config.projects || []).filter(p => p.id !== id);
      updateConfig({ projects: updatedProjects });
    }
  };

  // Step Management Handlers
  const handleSaveStep = () => {
    if (!editingStep) return;
    const updatedSteps = (config.executionSteps || []).map(s => s.step === editingStep.step ? editingStep : s);
    updateConfig({ executionSteps: updatedSteps });
    setEditingStep(null);
  };

  // Waterproofing Method Handlers
  const handleSaveMethod = () => {
    if (!editingMethod) return;
    const updatedMethods = (config.waterproofingMethods || []).map(m => m.id === editingMethod.id ? editingMethod : m);
    updateConfig({ waterproofingMethods: updatedMethods });
    setEditingMethod(null);
  };

  const filteredLeads = leads.filter(l => 
    l.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.phone.includes(searchTerm) ||
    l.structureType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAdminMode) {
    // Elegant tiny floating toggle in bottom left corner
    return (
      <button
        onClick={() => setIsAdminMode(true)}
        className="fixed bottom-4 left-4 z-50 bg-slate-900 border border-slate-800 hover:bg-sky-600 text-white rounded-xl px-4 py-3 shadow-2xl flex items-center gap-2 cursor-pointer transition-all duration-300 font-sans text-xs font-bold shadow-slate-950/40"
      >
        <Settings className="w-4 h-4 animate-spin-slow text-sky-400" />
        <span>Tùy Biến Giao Diện (Admin)</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end font-sans">
      {/* Semi-transparent backdrop overlay */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsAdminMode(false)}
      ></div>

      {/* Main Panel Content Container (Slides out from right) */}
      <div className="relative w-full max-w-2xl h-full bg-white shadow-2xl border-l border-slate-100 flex flex-col justify-between z-10 animate-slide-in">
        
        {/* Header Block */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-sky-600 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-white stroke-[2]" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm uppercase tracking-wider block">Bảng Điều Khiển Admin</h3>
              <span className="text-[10px] text-slate-400 block font-medium">Tùy biến thời gian thực, lưu trữ cục bộ</span>
            </div>
          </div>

          <button 
            onClick={() => setIsAdminMode(false)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls Nav */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs px-2 pt-2 overflow-x-auto whitespace-nowrap scrollbar-none shrink-0">
          {[
            { id: 'theme', label: 'Màu Sắc & Preset', icon: Palette },
            { id: 'identity', label: 'Nội Dung & Hotline', icon: Type },
            { id: 'pricing', label: 'Giải Pháp & Định Mức', icon: DollarSign },
            { id: 'projects', label: 'Quản Lý Dự Án', icon: Briefcase },
            { id: 'processes', label: 'Quy Trình Chuẩn', icon: Wrench },
            { id: 'leads', label: `Đăng Ký m² Đột (${leads.length})`, icon: Users }
          ].map(tab => {
            const Icon = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-4 py-3 font-extrabold border-b-2 tracking-wide transition-all cursor-pointer ${
                  isTabActive
                    ? 'border-sky-600 text-sky-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Scroller body */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          
          {/* TAB 1: THEME & COLOR CUSTOMIZATION */}
          {activeTab === 'theme' && (
            <div className="space-y-6">
              
              {/* Theme presets option blocks */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-sky-600" />
                  <span>Chọn Màu Preset Đồng Bộ</span>
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                  Chọn một chủ đề màu đã thiết lập sẵn. Toàn bộ các icon, viền, thẻ, và chữ trên trang sẽ chuyển giao diện sang dải màu mới ngay lập tức.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                  {[
                    { id: 'orange', name: 'Cam Đảo Ngọc (Chủ Đạo)', color: '#f1811c' },
                    { id: 'sky', name: 'Xanh Khí Quyển (Cũ)', color: '#0284c7' },
                    { id: 'blue', name: 'Xanh Thép (Royal Blue)', color: '#2563eb' },
                    { id: 'emerald', name: 'Xanh Lá Cây (Fresh Green)', color: '#059669' },
                    { id: 'indigo', name: 'Tía Sắc Chàm (Indigo)', color: '#4f46e5' },
                    { id: 'amber', name: 'Vàng Nghệ (Yên Bình)', color: '#d97706' },
                    { id: 'red', name: 'Đỏ Lửa (Hỏa Tốc)', color: '#dc2626' }
                  ].map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => updateConfig({ themePreset: preset.id as any })}
                      className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all bg-white cursor-pointer ${
                        config.themePreset === preset.id
                          ? 'border-slate-900 shadow-md ring-2 ring-slate-950/10'
                          : 'border-slate-200 hover:border-slate-350'
                      }`}
                    >
                      <span 
                        className="w-4.5 h-4.5 rounded-lg shrink-0 border border-slate-900/10" 
                        style={{ backgroundColor: preset.color }}
                      ></span>
                      <div className="text-left">
                        <span className="text-[11px] font-bold text-slate-950 block">{preset.name}</span>
                        <span className="text-[9px] text-slate-400 font-mono block">{preset.color}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Hex Color Pickers if Custom is chosen */}
              <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-800">Tự chỉnh màu sắc theo thương hiệu (Custom)</span>
                  <button 
                    onClick={() => updateConfig({ themePreset: 'custom' })}
                    className={`text-[10px] font-extrabold px-2.5 py-1 rounded ${
                      config.themePreset === 'custom' 
                        ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    Kích hoạt Tự chọn
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-extrabold text-slate-600 uppercase block mb-1.5">Màu Chủ Đạo (Primary Hex):</label>
                    <div className="flex gap-2 items-center">
                      <input 
                        type="color" 
                        value={config.primaryColor}
                        onChange={(e) => updateConfig({ themePreset: 'custom', primaryColor: e.target.value })}
                        className="w-10 h-10 border border-slate-200 rounded-lg cursor-pointer"
                      />
                      <input 
                        type="text" 
                        value={config.primaryColor}
                        onChange={(e) => updateConfig({ themePreset: 'custom', primaryColor: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold text-slate-600 uppercase block mb-1.5">Màu Hover (Primary Hover Hex):</label>
                    <div className="flex gap-2 items-center">
                      <input 
                        type="color" 
                        value={config.primaryHoverColor}
                        onChange={(e) => updateConfig({ themePreset: 'custom', primaryHoverColor: e.target.value })}
                        className="w-10 h-10 border border-slate-200 rounded-lg cursor-pointer"
                      />
                      <input 
                        type="text" 
                        value={config.primaryHoverColor}
                        onChange={(e) => updateConfig({ themePreset: 'custom', primaryHoverColor: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold text-slate-600 uppercase block mb-1.5">Nền nhạt dịu mắt (Light BG Hex):</label>
                    <div className="flex gap-2 items-center">
                      <input 
                        type="color" 
                        value={config.primaryLightColor}
                        onChange={(e) => updateConfig({ themePreset: 'custom', primaryLightColor: e.target.value })}
                        className="w-10 h-10 border border-slate-200 rounded-lg cursor-pointer"
                      />
                      <input 
                        type="text" 
                        value={config.primaryLightColor}
                        onChange={(e) => updateConfig({ themePreset: 'custom', primaryLightColor: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold text-slate-600 uppercase block mb-1.5">Màu nổi bật phụ (Accent Hex):</label>
                    <div className="flex gap-2 items-center">
                      <input 
                        type="color" 
                        value={config.primaryAccentColor}
                        onChange={(e) => updateConfig({ themePreset: 'custom', primaryAccentColor: e.target.value })}
                        className="w-10 h-10 border border-slate-200 rounded-lg cursor-pointer"
                      />
                      <input 
                        type="text" 
                        value={config.primaryAccentColor}
                        onChange={(e) => updateConfig({ themePreset: 'custom', primaryAccentColor: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 font-mono font-bold"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: IDENTITY & BRAND TEXT CUSTOMIZATION */}
          {activeTab === 'identity' && (
            <div className="space-y-6">
              
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
                  <Type className="w-4 h-4 text-sky-600" />
                  <span>Bộ Nhận Diện & Nội Dung Văn Bản</span>
                </h4>
                
                {/* Branding elements inputs */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
                  <h5 className="text-[11px] font-bold text-slate-800 border-b border-slate-100 pb-2 flex gap-1 items-center">
                    <span className="w-2 h-2 bg-sky-600 rounded-full"></span>
                    <span>1. Logo & Khẩu Hiệu Ký Tên</span>
                  </h5>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Tên Tiền Tố Logo (Prefix):</label>
                      <input 
                        type="text" 
                        value={config.logoPrefix}
                        onChange={(e) => updateConfig({ logoPrefix: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Tên Hậu Tố Logo (Suffix):</label>
                      <input 
                        type="text" 
                        value={config.logoSuffix}
                        onChange={(e) => updateConfig({ logoSuffix: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">Tagline Chữ Nhỏ Logo:</label>
                    <input 
                      type="text" 
                      value={config.tagline}
                      onChange={(e) => updateConfig({ tagline: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">Thời hạn hợp đồng bảo hành mặc định (năm):</label>
                    <input 
                      type="number" 
                      value={config.warrantyYears}
                      onChange={(e) => updateConfig({ warrantyYears: parseInt(e.target.value) || 10 })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-bold"
                    />
                  </div>
                </div>

                {/* Contacts variables inputs */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
                  <h5 className="text-[11px] font-bold text-slate-800 border-b border-slate-100 pb-2 flex gap-1 items-center">
                    <span className="w-2 h-2 bg-sky-600 rounded-full"></span>
                    <span>2. Thông Tin Hotline & Văn Phòng</span>
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">SĐT Hotline Liên Hệ:</label>
                      <input 
                        type="text" 
                        value={config.hotline}
                        onChange={(e) => updateConfig({ hotline: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-bold text-sky-700 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Giờ Làm Việc:</label>
                      <input 
                        type="text" 
                        value={config.workingHours}
                        onChange={(e) => updateConfig({ workingHours: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Email Công Ty (Chính):</label>
                      <input 
                        type="email" 
                        value={config.email}
                        onChange={(e) => updateConfig({ email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">Địa chỉ văn phòng Sài Gòn / TP. HCM:</label>
                    <input 
                      type="text" 
                      value={config.addressHCM}
                      onChange={(e) => updateConfig({ addressHCM: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">Địa chỉ chi nhánh đảo ngọc Phú Quốc:</label>
                    <input 
                      type="text" 
                      value={config.addressPQ}
                      onChange={(e) => updateConfig({ addressPQ: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-semibold"
                    />
                  </div>
                </div>

                {/* Hero titles and sections */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
                  <h5 className="text-[11px] font-bold text-slate-800 border-b border-slate-100 pb-2 flex gap-1 items-center">
                    <span className="w-2 h-2 bg-sky-600 rounded-full"></span>
                    <span>3. Banner Chính (Hero Section)</span>
                  </h5>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">Dòng chữ Badge ở trên:</label>
                    <input 
                      type="text" 
                      value={config.heroBadge}
                      onChange={(e) => updateConfig({ heroBadge: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-bold"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">Tiêu đề chính 3 khúc:</label>
                    <div className="space-y-2">
                      <input 
                        type="text" 
                        value={config.heroTitleLine1}
                        onChange={(e) => updateConfig({ heroTitleLine1: e.target.value })}
                        placeholder="Ví dụ: Nhà Thầu Thi Công"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-semibold"
                      />
                      <input 
                        type="text" 
                        value={config.heroTitleMain}
                        onChange={(e) => updateConfig({ heroTitleMain: e.target.value })}
                        placeholder="Ví dụ: Chống Thấm Triệt Để 100%"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-bold text-sky-700"
                      />
                      <input 
                        type="text" 
                        value={config.heroTitleLine2}
                        onChange={(e) => updateConfig({ heroTitleLine2: e.target.value })}
                        placeholder="Ví dụ: Dân Dụng & Dự Án Lớn"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">Mô tả văn bản Hero:</label>
                    <textarea 
                      value={config.heroDesc}
                      onChange={(e) => updateConfig({ heroDesc: e.target.value })}
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-medium font-sans leading-relaxed"
                    />
                  </div>
                </div>

                {/* About Panel Profile Intro text */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
                  <h5 className="text-[11px] font-bold text-slate-800 border-b border-slate-100 pb-2 flex gap-1 items-center">
                    <span className="w-2 h-2 bg-sky-600 rounded-full"></span>
                    <span>4. Khối Giới Thiệu Năng Lực (Trống Tâm)</span>
                  </h5>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Dòng chữ nhỏ trên đầu:</label>
                      <input 
                        type="text" 
                        value={config.introTitle}
                        onChange={(e) => updateConfig({ introTitle: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Tiêu Đề Lớn Màu Xanh:</label>
                      <input 
                        type="text" 
                        value={config.introSub}
                        onChange={(e) => updateConfig({ introSub: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-bold text-sky-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">Mô tả tự bạch năng lực:</label>
                    <textarea 
                      value={config.introDesc}
                      onChange={(e) => updateConfig({ introDesc: e.target.value })}
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-medium font-sans leading-relaxed"
                    />
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: PRICING & COEFFICIENTS ESTIMATOR */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-sky-600" />
                  <span>Cấu Hình Báo Giá & Định Mức Thầu</span>
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Thay đổi đơn giá gốc thầu dột của 4 dòng giải pháp kỹ thuật châu Âu và hệ số nhân của từng khu vực. Máy tính trong tab "Dự Tính Chi Phí" của khách hàng sẽ áp dụng các giá trị thợ này tự động trong 30 giây!
                </p>

                {/* Base solution rates per m² */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
                  <h5 className="text-[11px] font-bold text-slate-800 border-b border-slate-100 pb-2 flex gap-1.5 items-center">
                    <Sliders className="w-4 h-4 text-sky-600 animate-pulse" />
                    <span>1. Đơn Giá Gốc Của Từng Công Nghệ (VND/m²)</span>
                  </h5>

                  <div className="space-y-4">
                    {/* Polyurethane */}
                    <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                      <strong className="text-xs text-slate-900 block font-bold">A. Màng lỏng Polyurethane Neotex</strong>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 block mb-1">Giá tối thiểu (VNĐ):</label>
                          <input 
                            type="number" 
                            value={config.rate_pu_min}
                            onChange={(e) => updateConfig({ rate_pu_min: parseInt(e.target.value) || 0 })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-950 font-bold font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 block mb-1">Giá tối đa (VNĐ):</label>
                          <input 
                            type="number" 
                            value={config.rate_pu_max}
                            onChange={(e) => updateConfig({ rate_pu_max: parseInt(e.target.value) || 0 })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-950 font-bold font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bitum */}
                    <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                      <strong className="text-xs text-slate-900 block font-bold">B. Màng Bitum khò nóng Thụy Sĩ</strong>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 block mb-1">Giá tối thiểu (VNĐ):</label>
                          <input 
                            type="number" 
                            value={config.rate_bitum_min}
                            onChange={(e) => updateConfig({ rate_bitum_min: parseInt(e.target.value) || 0 })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-950 font-bold font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 block mb-1">Giá tối đa (VNĐ):</label>
                          <input 
                            type="number" 
                            value={config.rate_bitum_max}
                            onChange={(e) => updateConfig({ rate_bitum_max: parseInt(e.target.value) || 0 })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-950 font-bold font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Sika */}
                    <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                      <strong className="text-xs text-slate-900 block font-bold">C. Vữa dẻo Xi măng Sikatop Seal 107</strong>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 block mb-1">Giá tối thiểu (VNĐ):</label>
                          <input 
                            type="number" 
                            value={config.rate_sika_min}
                            onChange={(e) => updateConfig({ rate_sika_min: parseInt(e.target.value) || 0 })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-950 font-bold font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 block mb-1">Giá tối đa (VNĐ):</label>
                          <input 
                            type="number" 
                            value={config.rate_sika_max}
                            onChange={(e) => updateConfig({ rate_sika_max: parseInt(e.target.value) || 0 })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-950 font-bold font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Penetron */}
                    <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                      <strong className="text-xs text-slate-900 block font-bold">D. Hoạt tính chống thấm ngược Penetron</strong>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 block mb-1">Giá tối thiểu (VNĐ):</label>
                          <input 
                            type="number" 
                            value={config.rate_penetron_min}
                            onChange={(e) => updateConfig({ rate_penetron_min: parseInt(e.target.value) || 0 })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-950 font-bold font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 block mb-1">Giá tối đa (VNĐ):</label>
                          <input 
                            type="number" 
                            value={config.rate_penetron_max}
                            onChange={(e) => updateConfig({ rate_penetron_max: parseInt(e.target.value) || 0 })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-950 font-bold font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Multipliers system */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
                  <h5 className="text-[11px] font-bold text-slate-800 border-b border-slate-100 pb-2 flex gap-1.5 items-center">
                    <span className="w-2 h-2 bg-sky-600 rounded-full animate-ping"></span>
                    <span>2. Hệ Số Độ Khó / Nhân Theo Từng Sàn Khu Vực</span>
                  </h5>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Sân thượng / Mái (Multiplier):</label>
                      <input 
                        type="number" 
                        value={config.multiplier_terrace}
                        onChange={(e) => updateConfig({ multiplier_terrace: parseFloat(e.target.value) || 1.0 })}
                        step="0.05"
                        min="0.1"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-bold font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Nhà vệ sinh / Sàn ẩm (Multiplier):</label>
                      <input 
                        type="number" 
                        value={config.multiplier_toilet}
                        onChange={(e) => updateConfig({ multiplier_toilet: parseFloat(e.target.value) || 0.85 })}
                        step="0.05"
                        min="0.1"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-bold font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Hầm đứng / Chống thấm ngược (Multiplier):</label>
                      <input 
                        type="number" 
                        value={config.multiplier_basement}
                        onChange={(e) => updateConfig({ multiplier_basement: parseFloat(e.target.value) || 1.4 })}
                        step="0.05"
                        min="0.1"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-bold font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Vách tường ngoài lộ thiên (Multiplier):</label>
                      <input 
                        type="number" 
                        value={config.multiplier_wall}
                        onChange={(e) => updateConfig({ multiplier_wall: parseFloat(e.target.value) || 0.7 })}
                        step="0.05"
                        min="0.1"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-bold font-mono"
                      />
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB: PROJECTS MANAGEMENT */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-sky-600" />
                  <span>Danh Sách & Quản Lý Dự Án Tiêu Biểu ({config.projects?.length || 0})</span>
                </h4>
                {!editingProject && (
                  <button
                    onClick={() => setEditingProject({
                      id: '',
                      name: '',
                      category: 'civil',
                      location: '',
                      year: new Date().getFullYear(),
                      area: 100,
                      method: '',
                      materialsUsed: [],
                      description: '',
                      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
                      solutionsHighlights: []
                    })}
                    className="flex items-center gap-1 bg-sky-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl cursor-pointer hover:bg-sky-700 transition shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm Dự Án Mới</span>
                  </button>
                )}
              </div>

              {editingProject ? (
                // Project Editing Form
                <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                  <h5 className="text-xs font-bold text-slate-800 pb-2 border-b border-slate-100 flex justify-between items-center font-sans uppercase">
                    <span>{editingProject.id ? 'CẬP NHẬT DỰ ÁN' : 'TẠO MỚI DỰ ÁN THỰC CHIẾN'}</span>
                    <button 
                      onClick={() => setEditingProject(null)}
                      className="text-[10px] text-slate-400 hover:text-slate-700 font-bold"
                    >
                      Hủy bỏ
                    </button>
                  </h5>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Tên Công Trình:</label>
                      <input 
                        type="text"
                        value={editingProject.name}
                        onChange={(e) => setEditingProject({...editingProject, name: e.target.value})}
                        placeholder="Ví dụ: Biệt Thự Sân Vườn Sunset Sanato"
                        className="w-full bg-slate-55 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-1">Phân Loại Hạng Mục:</label>
                        <select
                          value={editingProject.category}
                          onChange={(e) => setEditingProject({...editingProject, category: e.target.value as any})}
                          className="w-full bg-slate-55 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold"
                        >
                          <option value="civil">Nhà Dân / Biệt Thự (Civil)</option>
                          <option value="industrial">Tập Đoàn / Tầng Hầm / Nhà Máy (Industrial)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-1">Vị Trí Địa Lý:</label>
                        <input 
                          type="text"
                          value={editingProject.location}
                          onChange={(e) => setEditingProject({...editingProject, location: e.target.value})}
                          placeholder="Ví dụ: Dương Đông, Phú Quốc"
                          className="w-full bg-slate-55 border border-slate-205 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-1">Diện Tích Thực Hiện (m²):</label>
                        <input 
                          type="number"
                          value={editingProject.area}
                          onChange={(e) => setEditingProject({...editingProject, area: parseInt(e.target.value) || 0})}
                          className="w-full bg-slate-55 border border-slate-205 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-1">Năm Thi Công:</label>
                        <input 
                          type="number"
                          value={editingProject.year}
                          onChange={(e) => setEditingProject({...editingProject, year: parseInt(e.target.value) || 2026})}
                          className="w-full bg-slate-55 border border-slate-205 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Phương Pháp & Công Nghệ Bọc Màng:</label>
                      <input 
                        type="text"
                        value={editingProject.method}
                        onChange={(e) => setEditingProject({...editingProject, method: e.target.value})}
                        placeholder="Ví dụ: Bọc phủ màng Polyurethane lỏng + dán màng tự dính Bitum"
                        className="w-full bg-slate-55 border border-slate-205 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Mô tả Hiện trạng & Thuyết minh giải pháp:</label>
                      <textarea
                        value={editingProject.description}
                        onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                        rows={3}
                        placeholder="Mô tả rò rỉ, thấm dột cũ và cách thức khắc phục..."
                        className="w-full bg-slate-55 border border-slate-205 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium font-sans leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-1">URL Hình Ảnh (Sau hoàn thành):</label>
                        <input 
                          type="text"
                          value={editingProject.image}
                          onChange={(e) => setEditingProject({...editingProject, image: e.target.value})}
                          className="w-full bg-slate-55 border border-slate-205 rounded-xl px-3 py-2 text-[10px] text-slate-800 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-1">URL Hình Ảnh Hiện Trạng Thấm (Trước):</label>
                        <input 
                          type="text"
                          value={editingProject.beforeImage || ''}
                          onChange={(e) => setEditingProject({...editingProject, beforeImage: e.target.value})}
                          placeholder="Không bắt buộc"
                          className="w-full bg-slate-55 border border-slate-205 rounded-xl px-3 py-2 text-[10px] text-slate-800 font-mono"
                        />
                      </div>
                    </div>

                    {/* Array: Materials Used */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-slate-600 block">Vật tư chính đã sử dụng:</label>
                        <div className="flex gap-1.5">
                          <input 
                            type="text"
                            placeholder="Nhập vật tư..."
                            value={newMaterial}
                            onChange={(e) => setNewMaterial(e.target.value)}
                            className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-900 w-32"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (newMaterial.trim() && editingProject.materialsUsed) {
                                setEditingProject({
                                  ...editingProject,
                                  materialsUsed: [...editingProject.materialsUsed, newMaterial.trim()]
                                });
                                setNewMaterial('');
                              }
                            }}
                            className="bg-sky-600 hover:bg-sky-700 text-white px-2 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                          >
                            Thêm
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.55">
                        {editingProject.materialsUsed?.map((mat, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1 bg-white border border-slate-200 px-2 py-0.5 rounded text-[10px] font-bold text-slate-800">
                            <span>{mat}</span>
                            <button
                              type="button"
                              onClick={() => setEditingProject({
                                ...editingProject,
                                materialsUsed: editingProject.materialsUsed.filter((_, i) => i !== idx)
                              })}
                              className="text-rose-500 hover:text-rose-700 font-extrabold ml-1 font-sans text-[9px] cursor-pointer"
                            >
                              x
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Array: Solutions Highlights */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-slate-600 block">Các bước xử lý kỹ thuật cốt lõi:</label>
                        <div className="flex gap-1.5">
                          <input 
                            type="text"
                            placeholder="Nhập bước kỹ thuật..."
                            value={newHighlight}
                            onChange={(e) => setNewHighlight(e.target.value)}
                            className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-900 w-44"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (newHighlight.trim() && editingProject.solutionsHighlights) {
                                setEditingProject({
                                  ...editingProject,
                                  solutionsHighlights: [...editingProject.solutionsHighlights, newHighlight.trim()]
                                });
                                setNewHighlight('');
                              }
                            }}
                            className="bg-sky-600 hover:bg-sky-700 text-white px-2 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                          >
                            Thêm
                          </button>
                        </div>
                      </div>
                      
                      <ol className="space-y-1.5 list-decimal list-inside text-[11px] text-slate-700 pl-1">
                        {editingProject.solutionsHighlights?.map((hl, idx) => (
                          <li key={idx} className="text-[11px] font-medium leading-relaxed">
                            <span className="mr-1.5">{hl}</span>
                            <button
                              type="button"
                              onClick={() => setEditingProject({
                                ...editingProject,
                                solutionsHighlights: editingProject.solutionsHighlights.filter((_, i) => i !== idx)
                              })}
                              className="text-rose-500 hover:text-rose-700 font-bold ml-1 text-[9px] cursor-pointer"
                            >
                              [Xóa]
                            </button>
                          </li>
                        ))}
                      </ol>
                    </div>

                  </div>

                  <div className="flex gap-2.5 pt-2">
                    <button
                      onClick={handleSaveProject}
                      className="flex-grow bg-slate-900 text-white text-xs font-bold py-2 px-4 rounded-xl hover:bg-slate-850 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-4 h-4 text-emerald-400" />
                      <span>Xác Nhận Lưu Lên Trang Chủ</span>
                    </button>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 px-4 rounded-xl cursor-pointer"
                    >
                      Quay lại
                    </button>
                  </div>
                </div>
              ) : (
                // Project Portfolio Lists Layout
                <div className="space-y-3">
                  <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                    Các dự án này được hiển thị động trong phần "Kính ảnh thực tế & Công trình tiêu biểu" trên trang chủ. Bác có thể sửa thông tin thuyết minh kỹ thuật hoặc xóa bỏ dứt điểm các dự án không muốn trưng bày nữa.
                  </p>

                  <div className="space-y-2.5">
                    {config.projects?.map((proj) => (
                      <div key={proj.id} className="bg-white p-4 rounded-2xl border border-slate-200/70 shadow-sm flex items-start gap-4 hover:border-sky-300 transition-colors">
                        <img 
                          src={proj.image} 
                          alt={proj.name}
                          className="w-16 h-16 object-cover rounded-xl border border-slate-100 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-grow min-w-0">
                          <div className="flex gap-2 items-center">
                            <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                              proj.category === 'civil' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-slate-100 text-slate-800'
                            }`}>
                              {proj.category === 'civil' ? 'Nhà Dân / Biệt Thự' : 'Dự Án Lớn'}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono font-medium">{proj.location} • {proj.year}</span>
                          </div>
                          <h5 className="text-xs font-bold text-slate-900 mt-1 truncate" title={proj.name}>{proj.name}</h5>
                          <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 font-sans leading-relaxed">{proj.description}</p>
                          
                          <div className="mt-2.5 pt-2 border-t border-slate-50 flex items-center gap-3">
                            <button
                              onClick={() => setEditingProject(proj)}
                              className="text-[10px] text-sky-600 font-bold hover:underline cursor-pointer flex items-center gap-0.5"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Sửa thông tin</span>
                            </button>
                            <span className="text-slate-200">|</span>
                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="text-[10px] text-rose-600 font-bold hover:underline cursor-pointer flex items-center gap-0.5"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Gỡ bỏ</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {(!config.projects || config.projects.length === 0) && (
                      <div className="bg-white rounded-2xl border border-slate-150 p-8 text-center">
                        <p className="text-xs text-slate-400 italic font-sans animate-pulse">Chưa có dự án nào trong danh sách. Bác hãy bấm nút phía trên để tạo mới dự án.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: PROCESSES & STRUCTURAL METHODS */}
          {activeTab === 'processes' && (
            <div className="space-y-6 animate-fade-in font-sans">
              
              {/* Part A: 6 execution steps editing */}
              <div className="space-y-3">
                <div className="pb-1.5 border-b border-slate-200">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
                    <Wrench className="w-4 h-4 text-sky-600" />
                    <span>A. {config.executionSteps?.length || 6} Bước Quy Trình Kỹ Thuật Nghiệm Thu</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-sans mt-0.5">
                    Cập nhật nội dung các bước thi công thực tế tại công trường. Nhấp vào nút "Sửa" của bước tương ứng để chỉnh sửa.
                  </p>
                </div>

                {editingStep ? (
                  // Step edit form
                  <div className="bg-white border-2 border-dashed border-sky-400 p-4 rounded-2xl space-y-3">
                    <h5 className="text-[11px] font-bold text-slate-800 flex justify-between items-center border-b border-slate-100 pb-2">
                      <span className="uppercase tracking-wider">Cập Nhật Bước 0{editingStep.step}: {editingStep.title}</span>
                      <button onClick={() => setEditingStep(null)} className="text-[10px] text-slate-400 hover:text-slate-750 font-bold cursor-pointer">Quay lại</button>
                    </h5>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-1">Tiêu Đề Bước:</label>
                          <input 
                            type="text" 
                            value={editingStep.title}
                            onChange={(e) => setEditingStep({...editingStep, title: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-1">Tiêu Đề Phụ (Subtitle):</label>
                          <input 
                            type="text" 
                            value={editingStep.subtitle}
                            onChange={(e) => setEditingStep({...editingStep, subtitle: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-bold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-1">Thuyết minh chi tiết (Description):</label>
                        <textarea 
                          value={editingStep.description}
                          onChange={(e) => setEditingStep({...editingStep, description: e.target.value})}
                          rows={3}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium font-sans leading-relaxed"
                        />
                      </div>

                      {/* Add detail strings list item */}
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-bold text-slate-600 block">Nhiệm vụ kiểm định thực tế bắt buộc:</label>
                          <div className="flex gap-1.5">
                            <input 
                              type="text"
                              placeholder="Thêm chỉ dẫn..."
                              value={newStepDetail}
                              onChange={(e) => setNewStepDetail(e.target.value)}
                              className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-900 w-44"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (newStepDetail.trim()) {
                                  setEditingStep({
                                    ...editingStep,
                                    details: [...editingStep.details, newStepDetail.trim()]
                                  });
                                  setNewStepDetail('');
                                }
                              }}
                              className="bg-sky-600 hover:bg-sky-700 text-white px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                            >
                              Thêm
                            </button>
                          </div>
                        </div>
                        
                        <ul className="space-y-1 list-disc list-inside text-[11px] text-slate-700 pl-1">
                          {editingStep.details.map((dt, idx) => (
                            <li key={idx} className="text-[11px] font-medium leading-relaxed">
                              <span className="mr-1.5">{dt}</span>
                              <button
                                type="button"
                                onClick={() => setEditingStep({
                                  ...editingStep,
                                  details: editingStep.details.filter((_, i) => i !== idx)
                                })}
                                className="text-rose-500 hover:text-rose-700 font-bold ml-1 text-[9px] cursor-pointer"
                              >
                                [Xóa]
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={handleSaveStep}
                        className="bg-slate-900 text-white text-xs font-bold py-2 px-4 rounded-xl hover:bg-slate-850 flex items-center justify-center gap-1.5 cursor-pointer flex-grow"
                      >
                        <Save className="w-4 h-4 text-emerald-400" />
                        <span>Cập nhật bước {editingStep.step}</span>
                      </button>
                      <button
                        onClick={() => setEditingStep(null)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 px-4 rounded-xl cursor-pointer"
                      >
                        Đóng
                      </button>
                    </div>
                  </div>
                ) : (
                  // Steps Listing
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {config.executionSteps?.map((step) => (
                      <div key={step.step} className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <strong className="text-[9px] text-sky-600 font-extrabold uppercase font-mono block">Bước 0{step.step}</strong>
                          <h5 className="text-[11.5px] font-bold text-slate-900 mt-0.5 truncate">{step.title}</h5>
                          <span className="text-[9px] text-slate-400 block truncate mt-0.5">{step.subtitle}</span>
                        </div>
                        <button
                          onClick={() => setEditingStep(step)}
                          className="bg-slate-50 hover:bg-slate-100 border border-slate-200 p-1 px-2 rounded-lg text-[9.5px] font-bold text-slate-700 flex items-center gap-0.5 shrink-0 cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3 text-sky-600" />
                          <span>Sửa</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Part B: 4 key waterproofing structures cross section layers */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="pb-1.5 border-b border-slate-200">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-sky-600" />
                    <span>B. Thứ Tự Các Lớp Mặt Cắt Chống Thấm (4 Khu Vực)</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-sans mt-0.5">
                    Thiết lập thông số số lượng lớp bọc, loại vật tư và hạn bảo hành lý tưởng của 4 khu vực: Sân Thượng, Nhà Vệ Sinh, Tầng Hầm, Tường Ngoài.
                  </p>
                </div>

                {editingMethod ? (
                  // Method Edit Form
                  <div className="bg-white border-2 border-dashed border-sky-400 p-4 rounded-2xl space-y-3 font-sans">
                    <h5 className="text-[11px] font-bold text-slate-800 flex justify-between items-center border-b border-slate-100 pb-2">
                      <span className="uppercase tracking-wider">Cập nhật mặt cắt: {editingMethod.name}</span>
                      <button onClick={() => setEditingMethod(null)} className="text-[10px] text-slate-400 hover:text-slate-750 font-bold cursor-pointer">Quay lại</button>
                    </h5>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-1">Tên Gọi Giải Pháp:</label>
                        <input 
                          type="text" 
                          value={editingMethod.name}
                          onChange={(e) => setEditingMethod({...editingMethod, name: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-bold"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-1">Thời Hạn Bảo Hành Gói (Năm):</label>
                          <input 
                            type="number" 
                            value={editingMethod.warrantyYears}
                            onChange={(e) => setEditingMethod({...editingMethod, warrantyYears: parseInt(e.target.value) || 10})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-bold font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-1">Khuyên dùng cho cấu trúc:</label>
                          <input 
                            type="text" 
                            value={editingMethod.suitability}
                            onChange={(e) => setEditingMethod({...editingMethod, suitability: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-semibold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-1">Thuyết minh mô tả:</label>
                        <textarea 
                          value={editingMethod.description}
                          onChange={(e) => setEditingMethod({...editingMethod, description: e.target.value})}
                          rows={2.5}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium font-sans leading-relaxed"
                        />
                      </div>

                      {/* Array input: Layers */}
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-bold text-slate-600 block">Danh sách các lớp từ dưới lên trên:</label>
                          <div className="flex gap-1.5">
                            <input 
                              type="text"
                              placeholder="Tên lớp..."
                              value={newMethodLayer}
                              onChange={(e) => setNewMethodLayer(e.target.value)}
                              className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-900 w-44"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (newMethodLayer.trim()) {
                                  setEditingMethod({
                                    ...editingMethod,
                                    layers: [...editingMethod.layers, newMethodLayer.trim()]
                                  });
                                  setNewMethodLayer('');
                                }
                              }}
                              className="bg-sky-600 hover:bg-sky-700 text-white px-2 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                            >
                              Thêm lớp
                            </button>
                          </div>
                        </div>
                        
                        <div className="space-y-1 pl-1">
                          {editingMethod.layers.map((layer, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-white p-1.5 px-2.5 rounded-lg border border-slate-150 text-[10px] font-semibold text-slate-800">
                              <span className="truncate leading-relaxed font-sans max-w-[210px]"><span className="text-sky-700 font-bold mr-1">Lớp {idx+1}:</span>{layer}</span>
                              <button
                                type="button"
                                onClick={() => setEditingMethod({
                                  ...editingMethod,
                                  layers: editingMethod.layers.filter((_, i) => i !== idx)
                                })}
                                className="text-rose-500 hover:text-rose-700 font-extrabold ml-2 cursor-pointer"
                              >
                                Gỡ
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Array input: Materials */}
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-bold text-slate-600 block">Vật tư đề xuất chủ đạo:</label>
                          <div className="flex gap-1">
                            <input 
                              type="text"
                              placeholder="Tên vật tư"
                              value={newMethodMatName}
                              onChange={(e) => setNewMethodMatName(e.target.value)}
                              className="bg-white border border-slate-200 text-slate-900 rounded-lg px-2 py-1 text-[11px] font-semibold w-24"
                            />
                            <input 
                              type="text"
                              placeholder="Thương hiệu"
                              value={newMethodMatBrand}
                              onChange={(e) => setNewMethodMatBrand(e.target.value)}
                              className="bg-white border border-slate-200 text-slate-900 rounded-lg px-2 py-1 text-[11px] font-semibold w-20"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (newMethodMatName.trim() && newMethodMatBrand.trim()) {
                                  setEditingMethod({
                                    ...editingMethod,
                                    materials: [...editingMethod.materials, { name: newMethodMatName.trim(), brand: newMethodMatBrand.trim() }]
                                  });
                                  setNewMethodMatName('');
                                  setNewMethodMatBrand('');
                                }
                              }}
                              className="bg-sky-600 hover:bg-sky-700 text-white px-2 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                            >
                              Thêm
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1.5">
                          {editingMethod.materials.map((mat, idx) => (
                            <span key={idx} className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-2 py-1 rounded text-[10px] font-bold text-slate-800">
                              <span><strong>{mat.name}</strong> ({mat.brand})</span>
                              <button
                                type="button"
                                onClick={() => setEditingMethod({
                                  ...editingMethod,
                                  materials: editingMethod.materials.filter((_, i) => i !== idx)
                                })}
                                className="text-rose-500 hover:text-rose-700 font-extrabold text-[9px] cursor-pointer"
                              >
                                x
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={handleSaveMethod}
                        className="bg-slate-900 text-white text-xs font-bold py-2 px-4 rounded-xl hover:bg-slate-850 flex items-center justify-center gap-1.5 cursor-pointer flex-grow"
                      >
                        <Save className="w-4 h-4 text-emerald-400" />
                        <span>Cập nhật cấu trúc {editingMethod.id.replace('method-', '')}</span>
                      </button>
                      <button
                        onClick={() => setEditingMethod(null)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 px-4 rounded-xl cursor-pointer"
                      >
                        Đóng
                      </button>
                    </div>

                  </div>
                ) : (
                  // Methods list
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {config.waterproofingMethods?.map((m) => (
                      <div key={m.id} className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <h5 className="text-[11.5px] font-bold text-slate-900 truncate">{m.name}</h5>
                          <span className="text-[9px] text-slate-400 block truncate mt-0.5 font-mono">Bảo hành {m.warrantyYears} năm • {m.layers?.length || 0} lớp bọc</span>
                        </div>
                        <button
                          onClick={() => setEditingMethod(m)}
                          className="bg-slate-50 hover:bg-slate-100 border border-slate-200 p-1 px-2 rounded-lg text-[9.5px] font-bold text-slate-700 flex items-center gap-0.5 shrink-0 cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3 text-sky-600" />
                          <span>Sửa lớp</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

              </div>

            </div>
          )}

          {/* TAB 4: LIVE LEADS REGISTRATION MANAGEMENT */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span>Danh Sách Đăng Ký Khảo Sát Tận Nơi ({leads.length})</span>
                  </h4>

                  {leads.length > 0 && (
                    <button
                      onClick={handleClearAllLeads}
                      className="text-[10px] text-rose-600 bg-rose-50 border border-rose-100 hover:bg-rose-100 px-2.5 py-1 rounded font-bold cursor-pointer transition-colors"
                    >
                      Xóa toàn bộ sổ đăng ký
                    </button>
                  )}
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Khi khách hàng điền biểu mẫu "Đăng ký khảo sát" ở tab Dự Tính Chi Phí hoặc Liên Hệ, dữ liệu sẽ ngay lập tức được chèn trực tiếp vào sổ quản lý này. Admin có thể tra cứu và gọi điện tư vấn trực tiếp tốc hành.
                </p>

                {/* Filter / Search input bar */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input 
                    type="text"
                    placeholder="Tìm theo họ tên, sđt, hạng mục..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500"
                  />
                </div>

                {/* Clean Cards rendering list */}
                {filteredLeads.length > 0 ? (
                  <div className="space-y-3">
                    {filteredLeads.map((lead) => (
                      <div key={lead.id} className="bg-white p-4 rounded-2xl border border-slate-200 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-350 transition-all shadow-sm">
                        
                        {/* Core text content left column */}
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs text-slate-900 font-extrabold">{lead.fullName}</span>
                            <span className="text-[10px] text-slate-400 font-medium font-sans">({lead.email})</span>
                            <span className="text-[9px] text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded uppercase font-bold font-mono">
                              {lead.areaSize} m²
                            </span>
                          </div>

                          <p className="text-xs text-slate-800">
                            SĐT: <a href={`tel:${lead.phone}`} className="font-extrabold text-sky-700 hover:underline">{lead.phone}</a>
                          </p>

                          <div className="text-[11px] text-slate-500 font-mono space-y-0.5 font-medium leading-relaxed">
                            <p>🗺️ Hạng mục: <span className="text-slate-700 font-bold">{lead.structureType}</span></p>
                            <p>💰 Dự toán thầu: <span className="text-emerald-700 font-bold">{lead.estimatedCostMin ? `${(lead.estimatedCostMin / 1000000).toFixed(1)}M - ${(lead.estimatedCostMax! / 1000000).toFixed(1)}M VNĐ` : 'Chưa định giá'}</span></p>
                          </div>

                          {lead.notes && (
                            <div className="mt-2 bg-slate-50 border border-slate-100 p-2.5 rounded-lg text-[10px] text-slate-600 italic font-medium leading-relaxed">
                              "{lead.notes}"
                            </div>
                          )}

                          <span className="text-[9px] text-slate-400 block mt-1 font-sans">📥 Ngày tạo: {lead.createdAt}</span>
                        </div>

                        {/* Actions right items column */}
                        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                          <button
                            onClick={() => handleCopyValue(lead.phone, lead.id)}
                            className="bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 pr-3.5 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{copiedText === lead.id ? 'Đã Sao Chép SĐT!' : 'Sao Chép SĐT'}</span>
                          </button>

                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="text-[10px] text-slate-400 hover:text-rose-600 p-2.5 hover:bg-slate-50 rounded-lg cursor-pointer flex items-center gap-1.5"
                            title="Xóa dòng"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Xóa</span>
                          </button>
                        </div>

                        <span className="absolute top-0 right-0 w-1.5 h-full bg-emerald-500"></span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-white border border-slate-200 rounded-2xl">
                    <Users className="w-8 h-8 text-slate-350 mx-auto stroke-[1.5] mb-2" />
                    <p className="text-xs text-slate-500 font-medium">Chưa tìm thấy đăng ký khảo sát nào trong lịch sử.</p>
                  </div>
                )}

              </div>

            </div>
          )}

        </div>

        {/* Footer Area with Reset Config button */}
        <div className="p-4 bg-slate-900 text-white border-t border-slate-800 flex items-center justify-between text-xs">
          <button
            onClick={() => {
              if (window.confirm('Bạn có chắc chắn muốn trả tất cả văn bản, hotline, màu sắc trang web về cài đặt mặc định gốc của Toàn Tâm ban đầu không?')) {
                resetConfig();
                alert('Đã khôi phục thiết lập gốc thành công!');
                window.location.reload();
              }
            }}
            className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer py-2 px-3.5 hover:bg-slate-800 rounded-lg"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Khôi Phục Gốc Hệ Thống</span>
          </button>

          <button
            onClick={() => setIsAdminMode(false)}
            className="bg-sky-600 hover:bg-sky-700 text-white font-extrabold py-2 px-5 rounded-lg cursor-pointer shadow shadow-sky-600/10"
          >
            Đóng bảng
          </button>
        </div>

      </div>
    </div>
  );
}
