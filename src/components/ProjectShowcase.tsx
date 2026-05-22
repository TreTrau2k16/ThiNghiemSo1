import React, { useState } from 'react';
import { Project } from '../types';
import { useSiteConfig } from '../context/SiteConfigContext';
import { 
  MapPin, 
  Calendar, 
  Maximize2, 
  Wrench, 
  Layers, 
  CheckCircle2, 
  X, 
  Image as ImageIcon,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function ProjectShowcase() {
  const { config } = useSiteConfig();
  const [filter, setFilter] = useState<'all' | 'civil' | 'industrial'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const cleanPhoneLink = `tel:${config.hotline.replace(/[\.\s\-]/g, '')}`;

  const filteredProjects = config.projects.filter(p => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <div id="project-portfolio" className="py-16 bg-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold text-sky-600 bg-sky-100/70 border border-sky-200/50 px-3 py-1 rounded-full uppercase tracking-wider">
              Dự Án Đã Thực Hiện Thành Công
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Hình Ảnh Thực Tế & Công Trình Tiêu Biểu
            </h2>
            <p className="text-slate-600 mt-2 text-sm max-w-xl">
              Năng lực thực chiến được kiểm chứng bằng hơn 1000 dự án đã bàn giao, nhận được sự hài lòng vượt mong đợi từ cả hộ dân lẫn các chủ đầu tư xây dựng khó tính nhất.
            </p>
          </div>

          {/* Filter Navigation Tabs */}
          <div className="flex bg-white p-1 rounded-xl border border-slate-200 shrink-0 self-start md:self-end">
            {[
              { id: 'all', label: 'Tất Cả Dự Án' },
              { id: 'civil', label: 'Biệt Thự / Nhà Dân' },
              { id: 'industrial', label: 'Tầng Hầm / Nhà Máy' }
            ].map((tab) => (
              <button
                key={tab.id}
                id={`filter-btn-${tab.id}`}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                  filter === tab.id
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((p) => (
            <div 
              key={p.id}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-md shadow-slate-200/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group justify-between"
            >
              <div>
                {/* Thumbnail image and badges */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={p.image} 
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded text-white shadow-sm ${
                      p.category === 'civil' ? 'bg-indigo-600' : 'bg-slate-900 border border-slate-700'
                    }`}>
                      {p.category === 'civil' ? 'Nhà Dân / Dân Dụng' : 'Hầm Sâu / Nhà Máy'}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm shadow px-2.5 py-1 rounded-md text-[10px] font-bold text-sky-800 flex items-center gap-1 border border-white">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Đã Nghiệm Thu</span>
                  </div>
                </div>

                {/* Card description content */}
                <div className="p-5 space-y-3.5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3.5 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {p.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Năm {p.year}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug">
                      {p.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-sans">
                    {p.description}
                  </p>

                  <div className="pt-3 border-t border-slate-50 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-sans">Diện tích xử lý:</span>
                      <strong className="text-slate-800 font-bold mt-0.5 block">{p.area.toLocaleString()} m²</strong>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-sans">Phương pháp màng:</span>
                      <strong className="text-slate-800 font-bold mt-0.5 block truncate" title={p.method}>{p.method.split(' ')[0]} {p.method.split(' ')[1]}...</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action trigger button */}
              <div className="p-5 pt-0">
                <button
                  key={`proj-btn-${p.id}`}
                  onClick={() => setSelectedProject(p)}
                  className="w-full flex items-center justify-center gap-1.5 bg-slate-900 group-hover:bg-sky-600 text-white font-bold text-xs py-3 rounded-xl transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <span>Xem Chi Tiết Giải Pháp</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Dynamic Project Case Study Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-slate-100">
              
              {/* Close pin */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-full cursor-pointer transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header section with image backdrop */}
              <div className="relative h-64 md:h-80">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] uppercase font-bold text-sky-400 bg-sky-950/80 border border-sky-800/60 px-2.5 py-1 rounded">
                    Khảo Sát & Thi Công Thực Tế 2023-2026
                  </span>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white mt-2 leading-tight">
                    {selectedProject.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1.5 flex items-center gap-4">
                    <span>Vị trí: <strong>{selectedProject.location}</strong></span>
                    <span>•</span>
                    <span>Quy mô: <strong>{selectedProject.area.toLocaleString()} m²</strong></span>
                  </p>
                </div>
              </div>

              {/* Content body layout */}
              <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left primary information panel */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Project overview description */}
                  <div className="space-y-2">
                    <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-400">Tổng quan hiện trạng dột</h4>
                    <p className="text-sm text-slate-700 leading-relaxed font-sans font-medium">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Before after comparison if any */}
                  {selectedProject.beforeImage && (
                    <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-500 mb-2 flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-sky-600" />
                        <span>Hình ảnh hiện trạng vs Đã thi công xong</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative rounded-lg overflow-hidden h-36">
                          <img 
                            src={selectedProject.beforeImage} 
                            alt="Trước thi công" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute bottom-2 left-2 bg-rose-600/90 text-white font-bold text-[9px] px-2 py-0.5 rounded uppercase">Thấm Dột Cũ</span>
                        </div>
                        <div className="relative rounded-lg overflow-hidden h-36">
                          <img 
                            src={selectedProject.image} 
                            alt="Sau thi công" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute bottom-2 left-2 bg-emerald-600/95 text-white font-bold text-[9px] px-2 py-0.5 rounded uppercase">Đã Chống Thấm</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 text-center font-medium">* Cam kết chống lại mọi mạch rò rỉ dưới áp lực thủy tĩnh cao bằng hóa chất chống thấm chuyên dụng bám dính sâu.</p>
                    </div>
                  )}

                  {/* Solutions list */}
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-900 flex items-center gap-1.5">
                      <Wrench className="w-4 h-4 text-sky-600" />
                      <span>Các bước kỹ thuật cốt lõi đã áp dụng</span>
                    </h4>
                    
                    <ul className="space-y-2">
                      {selectedProject.solutionsHighlights.map((sol, index) => (
                        <li key={index} className="flex gap-2.5 text-xs text-slate-600 leading-relaxed">
                          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{sol}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Right sidebar details panel */}
                <div className="lg:col-span-5 space-y-5">
                  
                  {/* Materials card */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 shadow-sm">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5 pb-2 border-b border-slate-200">
                      <Layers className="w-4 h-4 text-sky-600" />
                      <span>Vật tư chính sử dụng</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.materialsUsed.map((mat, idx) => (
                        <span 
                          key={idx} 
                          className="text-xs bg-white text-slate-800 font-bold px-2.5 py-1.5 rounded-lg border border-slate-200"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlight methodology statistics info */}
                  <div className="bg-sky-950 text-white p-5 rounded-2xl border border-sky-800 relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 w-24 h-24 bg-sky-500 rounded-full blur-2xl opacity-10"></div>
                    
                    <h4 className="text-xs font-bold text-sky-300 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
                      <span>Thông tin nghiệm thu</span>
                    </h4>

                    <div className="space-y-3 text-xs">
                      <div>
                        <span className="text-slate-400 block">Thời gian thi công hoàn tất:</span>
                        <strong className="text-slate-100 block mt-0.5 font-sans">9 ngày làm việc liên tục</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Thời gian thử nước liên tục:</span>
                        <strong className="text-slate-100 block mt-0.5 font-sans">48 giờ (Bơm ngập 10cm)</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Tiêu chuẩn kiểm soát chất lượng:</span>
                        <strong className="text-slate-100 block mt-0.5 font-sans">Đạt kiểm định co giãn bê tông TCVN</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Hạn kích hoạt bảo hành:</span>
                        <strong className="text-amber-400 block mt-0.5 font-sans">Đến hết năm {selectedProject.year + config.warrantyYears}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Call Hotline inside showcase */}
                  <div className="bg-amber-500 hover:bg-amber-600 transition-colors text-slate-950 font-sans p-4 rounded-2xl text-center">
                    <span className="text-[10px] uppercase font-bold tracking-wide block text-amber-950">Bác đang tìm phương án tối ưu tương tự?</span>
                    <a href={cleanPhoneLink} className="text-base font-extrabold block mt-1 hover:underline">Ấn gọi kỹ thuật: {config.hotline}</a>
                  </div>

                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
