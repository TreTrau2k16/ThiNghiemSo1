import React, { useState } from 'react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { 
  Search, 
  Hammer, 
  Paintbrush, 
  Layers, 
  Droplets, 
  ShieldCheck, 
  ChevronRight, 
  CheckCircle2, 
  HelpCircle,
  Clock,
  Briefcase,
  AlertCircle
} from 'lucide-react';

export default function Process() {
  const { config } = useSiteConfig();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedStructure, setSelectedStructure] = useState<string>('terrace');

  // Map step icon strings to Lucide components
  const getStepIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Search':
        return <Search className={className} />;
      case 'Hammer':
        return <Hammer className={className} />;
      case 'Paintbrush':
        return <Paintbrush className={className} />;
      case 'Layers':
        return <Layers className={className} />;
      case 'Droplets':
        return <Droplets className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      default:
        return <CheckCircle2 className={className} />;
    }
  };

  const selectedMethod = config.waterproofingMethods.find(
    (m) => m.structureType === selectedStructure
  ) || config.waterproofingMethods[0];

  const currentStepData = config.executionSteps.find((s) => s.step === activeStep) || config.executionSteps[0];

  return (
    <div id="execution-processes" className="py-16 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-sky-600 bg-sky-100/70 border border-sky-200/50 px-3 py-1 rounded-full uppercase tracking-wider">
            Tiêu Chuẩn Thi Công Nghiêm Ngặt
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Quy Trình Thi Công Chi Tiết & Giải Pháp Mặt Cắt
          </h2>
          <p className="text-slate-600 mt-4 leading-relaxed">
            Một phương án chống thấm tuyệt đối chịu tuổi thọ trên 15 năm cần một quy trình thi công chuẩn chỉ từng centimet kết hợp với sơ đồ cấu trúc mặt cắt thích nghi cho từng khu vực của ngôi nhà mục tiêu.
          </p>
        </div>

        {/* Part 1: Interactive workflow */}
        <div className="mb-20">
          <div className="border-b border-slate-100 pb-4 mb-8">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 bg-sky-100 text-sky-600 text-xs font-bold rounded-lg leading-none">{config.executionSteps.length}</span>
              <span>{config.executionSteps.length} Bước Quy Trình Nghiệm Thu Chuẩn Chỉ</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">Ấn chọn từng bước bên dưới để xem chi tiết biện pháp kỹ thuật và hình ảnh chỉ dẫn thi công.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Step Selection Buttons */}
            <div className="lg:col-span-5 space-y-3">
              {config.executionSteps.map((step) => {
                const isActive = step.step === activeStep;
                return (
                  <button
                    key={step.step}
                    id={`step-btn-${step.step}`}
                    onClick={() => setActiveStep(step.step)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                      isActive
                        ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/10'
                        : 'bg-white text-slate-700 border-slate-100 hover:border-sky-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-600 group-hover:bg-sky-50 group-hover:text-sky-600'
                      }`}>
                        0{step.step}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm leading-tight">{step.title}</h4>
                        <span className={`text-[11px] block mt-0.5 leading-tight ${
                          isActive ? 'text-sky-100' : 'text-slate-400'
                        }`}>
                          {step.subtitle}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                      isActive ? 'text-white translate-x-1' : 'text-slate-400 group-hover:text-slate-600'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Selected Step Detail Panel */}
            <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100/80 relative overflow-hidden flex flex-col justify-between h-full min-h-[440px]">
              {/* Decorative background circle */}
              <div className="absolute right-0 top-0 w-32 h-32 bg-sky-200/10 rounded-full blur-2xl pointer-events-none"></div>

              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <span className={`inline-block px-3 py-1 border rounded-full text-xs font-semibold ${currentStepData.badgeColor}`}>
                    Cam kết giai đoạn {currentStepData.step}/{config.executionSteps.length}
                  </span>
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-sky-600">
                    {getStepIcon(currentStepData.icon, 'w-5.5 h-5.5 stroke-[2]')}
                  </div>
                </div>

                <h4 className="text-xl font-bold text-slate-900 leading-tight">
                  Biện Pháp Chi Tiết: {currentStepData.title}
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider">
                  {currentStepData.subtitle}
                </p>

                <p className="text-sm text-slate-600 mt-4 leading-relaxed bg-white p-4 rounded-xl border border-slate-100 font-sans">
                  {currentStepData.description}
                </p>

                {/* Sub-actions required */}
                <div className="mt-6">
                  <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-sky-500 rounded-full"></span>
                    <span>Nội dung nghiệm thu thực tế bắt buộc:</span>
                  </h5>
                  <ul className="space-y-2.5">
                    {currentStepData.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Proclamation footer banner */}
              <div className="mt-8 pt-4 border-t border-slate-200/60 flex items-center gap-2.5 text-slate-500 text-xs bg-slate-100/50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <p className="leading-snug text-[11px] text-slate-600 font-medium">
                  * Toàn bộ 6 giai đoạn thi công trên đều có kỹ sư giám sát độc lập kiểm định chặt chẽ, chủ đầu tư ký duyệt nghiệm thu từng lớp trước khi quét lớp màng tiếp theo.
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* Part 2: Structure-Specific cross-section detailed method */}
        <div className="bg-slate-50 border border-slate-100/80 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          <div className="border-b border-slate-200/60 pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-950 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-sky-600" />
                <span>Giải Pháp Chi Tiết Cho Từng Cấu Trúc Khác Biệt</span>
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-relaxed">Chọn cấu trúc cần thi công để nghiên cứu các thông số kỹ thuật, số lượng lớp vật liệu mặt cắt chống thấm tối ưu.</p>
            </div>
            
            <div className="flex flex-wrap gap-1.5 bg-white p-1 rounded-xl border border-slate-200">
              {[
                { id: 'terrace', label: 'Sân Thượng / Mái' },
                { id: 'toilet', label: 'Nhà Vệ Sinh / Bể' },
                { id: 'basement', label: 'Hầm Sâu / Móng' },
                { id: 'wall', label: 'Tường Ngoài Lộ Thiên' }
              ].map((btn) => (
                <button
                  key={btn.id}
                  id={`struct-btn-${btn.id}`}
                  onClick={() => setSelectedStructure(btn.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                    selectedStructure === btn.id
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Layers description */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-50 border border-amber-200/50 px-2 py-0.5 rounded">
                  Chế độ bảo hành lý tưởng: {selectedMethod.warrantyYears} Năm
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-slate-900 mt-2 leading-snug">
                  {selectedMethod.name}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-sans bg-white p-3 rounded-lg border border-slate-100">
                  {selectedMethod.description}
                </p>
              </div>

              {/* Cross-section Layer items visualization */}
              <div className="space-y-3">
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  Sơ đồ thứ tự cấu trúc lớp mặt cắt chống thấm (Trình tự thi công):
                </h5>
                <div className="space-y-2 relative pl-4 border-l-2 border-dashed border-sky-400/40">
                  {selectedMethod.layers.map((layer, idx) => (
                    <div key={idx} className="relative group/layer bg-white p-3.5 rounded-xl border border-slate-100 flex items-start gap-3 hover:border-sky-300 hover:shadow-sm transition-all duration-200">
                      {/* Left timeline blue dot */}
                      <span className="absolute -left-[23px] top-[18px] w-2 h-2 rounded-full border-2 border-sky-500 bg-white group-hover/layer:bg-sky-500 transition-colors"></span>
                      
                      <div className="w-6 h-6 rounded-md bg-sky-50 text-sky-700 font-extrabold text-xs flex items-center justify-center shrink-0">
                        L{idx + 1}
                      </div>

                      <p className="text-xs text-slate-700 font-medium leading-relaxed">
                        {layer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Methods specifications panel right */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Materials summary list */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm shadow-slate-200/40">
                <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3 pb-2 border-b border-slate-50">
                  Bộ ba vật tư đề xuất chính:
                </h5>
                <div className="space-y-3">
                  {selectedMethod.materials.map((mat, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                      <div>
                        <strong className="text-xs text-slate-900 block font-bold">{mat.name}</strong>
                        <span className="text-[10px] text-slate-500 block">Thương hiệu đồng hành:</span>
                      </div>
                      <span className="text-[10px] font-bold text-sky-800 bg-sky-50 border border-sky-100 px-2 py-0.5 rounded shrink-0 uppercase tracking-widest leading-none">
                        {mat.brand}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Application range card */}
              <div className="bg-sky-900 text-white p-5 rounded-2xl relative shadow-md">
                <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-sky-800 rounded-full blur-xl opacity-20"></div>
                
                <h5 className="font-bold text-xs uppercase tracking-wider text-sky-300">
                  Khuyến cáo phạm vi áp dụng:
                </h5>
                <p className="text-xs text-slate-100 mt-2 leading-relaxed">
                  {selectedMethod.suitability}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-[10px] bg-sky-800/80 border border-sky-700/60 px-2 py-1 rounded text-slate-300 tracking-wide">
                    Kiểm định bởi QC Chống Thấm Toàn Tâm
                  </span>
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Thử nghiệm 15Y+</span>
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
