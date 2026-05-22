import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  HelpCircle, 
  CheckCircle2, 
  Smartphone, 
  User, 
  MapPin, 
  MessageSquare,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { QuoteRequest } from '../types';
import { useSiteConfig } from '../context/SiteConfigContext';

export default function QuoteCalculator() {
  const { config } = useSiteConfig();
  
  // Input states
  const [useDimensions, setUseDimensions] = useState<boolean>(true);
  const [width, setWidth] = useState<string>('5');
  const [length, setLength] = useState<string>('12');
  const [customArea, setCustomArea] = useState<string>('60');
  
  const [structType, setStructType] = useState<string>('terrace');
  const [techType, setTechType] = useState<string>('pu-membrane');

  // Contact form state
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  
  // Status feedback
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [savedRequests, setSavedRequests] = useState<QuoteRequest[]>([]);

  // Rates in VND per m² (Reference only)
  const structuralRates: Record<string, { name: string; multiplier: number }> = {
    terrace: { name: 'Sân thượng / Ban công ngoài trời', multiplier: config.multiplier_terrace },
    toilet: { name: 'Nhà vệ sinh / Sàn ẩm ướt trong nhà', multiplier: config.multiplier_toilet },
    basement: { name: 'Vách hầm đứng / Hố pít hầm ngược (Áp lực cao)', multiplier: config.multiplier_basement },
    wall: { name: 'Vách tường ngoài lộ thiên sập bão', multiplier: config.multiplier_wall }
  };

  const technologyRates: Record<string, { name: string; baseRateMin: number; baseRateMax: number; materialsDesc: string; matRef: string }> = {
    'pu-membrane': { 
      name: 'Màng lỏng dẻo nguội Polyurethane / Polyurea cao cấp', 
      baseRateMin: config.rate_pu_min, 
      baseRateMax: config.rate_pu_max,
      materialsDesc: 'Sơn lót Neoproof Primer + 2 lớp màng lỏng đàn hồi Polyurethane Neotex dày 1.5mm',
      matRef: 'Khoảng 1.5kg dung dịch sơn lỏng + lưới sợi thủy tinh kháng kiềm gia cố góc.'
    },
    'bitum-hot': { 
      name: 'Màng Bitum khò nóng rulo nhiệt Lemax 4mm Thụy Sĩ', 
      baseRateMin: config.rate_bitum_min, 
      baseRateMax: config.rate_bitum_max,
      materialsDesc: 'Sơn lót Bitum lỏng quét nguội + Màng khò nóng Bitum đen dày 4mm chống đè cơ học',
      matRef: 'Khoảng 1.1m² màng khò bảo dưỡng (gồm mối chồng mép biên 10cm) và bình khò ga.'
    },
    'cement-sika': { 
      name: 'Vữa dẻo Xi măng Polymê 2 thành phần Sikatop Seal 107', 
      baseRateMin: config.rate_sika_min, 
      baseRateMax: config.rate_sika_max,
      materialsDesc: 'Hồ xi măng đàn hồi cao gốc acrylic Sikatop lướt chéo bám cực dính sàn bê tông mài phẳng',
      matRef: 'Khoảng 2.5kg xi măng tinh + nước nhũ gốc dẻo polymer Sika.'
    },
    'penetron-crystal': { 
      name: 'Xi măng tinh thể thẩm thấu ngược sâu Penetron (Mỹ)', 
      baseRateMin: config.rate_penetron_min, 
      baseRateMax: config.rate_penetron_max,
      materialsDesc: 'Bơm chèn PU chặn nước chảy tức thời + Phun phủ lớp tinh thể hóa thạch sâu mao dẫn bê tông 15cm',
      matRef: 'Van kim loại bơm áp lực chuyên sâu + Bột bột xỉ đông cứng xi măng tinh thể.'
    }
  };

  // Load request history on mount
  useEffect(() => {
    const historical = localStorage.getItem('waterproofing_quotes');
    if (historical) {
      try {
        setSavedRequests(JSON.parse(historical));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  // Compute values
  const computedArea = useDimensions 
    ? (parseFloat(width) || 0) * (parseFloat(length) || 0)
    : (parseFloat(customArea) || 0);

  const activeStruct = structuralRates[structType] || structuralRates.terrace;
  const activeTech = technologyRates[techType] || technologyRates['pu-membrane'];

  const multiplier = activeStruct.multiplier;
  const priceMin = Math.round(computedArea * activeTech.baseRateMin * multiplier);
  const priceMax = Math.round(computedArea * activeTech.baseRateMax * multiplier);

  // Suggested material estimation quantities
  const getSuggestedMaterialsQuantity = () => {
    if (computedArea <= 0) return '0';
    switch (techType) {
      case 'pu-membrane':
        return `${Math.ceil(computedArea * 1.5)} kg màng gốc nước PU + ${Math.ceil(computedArea * 1.15)} m² lưới thủy tinh`;
      case 'bitum-hot':
        return `${Math.ceil(computedArea * 1.12)} m² cuộn màng Bitum dày 4mm + ${Math.ceil(computedArea * 0.3)} lít sơn lót`;
      case 'cement-sika':
        return `${Math.ceil(computedArea / 25 * 2.5)} bộ thùng Sikatop Seal 107 dẻo (25kg/thùng)`;
      case 'penetron-crystal':
        return `${Math.ceil(computedArea * 1.2)} kg vữa hoạt tính thẩm thấu Penetron + ${Math.ceil(computedArea / 10)} van bơm nở ép nước`;
      default:
        return `${Math.ceil(computedArea)} đơn vị vật tư`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    const newRequest: QuoteRequest = {
      id: `req-${Date.now()}`,
      fullName,
      phone,
      email: email || 'Không có',
      projectType: computedArea > 1000 ? 'Dự án lớn' : 'Công trình dân dụng',
      structureType: activeStruct.name,
      areaSize: computedArea,
      notes: notes || 'Yêu cầu tư vấn kỹ thuật trực tiếp',
      estimatedCostMin: priceMin,
      estimatedCostMax: priceMax,
      createdAt: new Date().toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: 'Processing'
    };

    const updated = [newRequest, ...savedRequests];
    setSavedRequests(updated);
    localStorage.setItem('waterproofing_quotes', JSON.stringify(updated));

    // Submit to central server database API immediately
    fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRequest)
    }).catch(err => {
      console.error('Failed to submit quote request to server database:', err);
    });

    // Reset fields & show success state
    setFullName('');
    setPhone('');
    setEmail('');
    setNotes('');
    setIsSubmitted(true);
    
    // Auto reset submission block flag after 4 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const handleClearHistory = () => {
    localStorage.removeItem('waterproofing_quotes');
    setSavedRequests([]);
  };

  return (
    <div id="cost-estimator" className="py-16 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-sky-600 bg-sky-100/70 border border-sky-200/50 px-3 py-1 rounded-full uppercase tracking-wider">
            Công Cụ Dự Toán Công Trình
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Máy Tính Dự Kiến Diện Tích & Định Mức Vật Tư
          </h2>
          <p className="text-slate-600 mt-4 leading-relaxed">
            Nhập kích thước bề mặt của bạn để dự tính ngay khối lượng vật tư cần sử dụng theo tiêu chuẩn kỹ thuật châu Âu và bảng giá thầu tham khảo dự toán dự án trên thị trường Việt Nam hiện hành.
          </p>
        </div>

        {/* Form Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left panel: Dimension inputs and structural choices */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-100/80 p-6 sm:p-8 rounded-3xl space-y-6">
            
            {/* Step 1 Area definition */}
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-xs font-extrabold text-slate-900 uppercase tracking-widest flex items-center gap-1">
                  <span className="w-5 h-5 bg-sky-600 rounded text-white flex items-center justify-center text-[10px] font-mono leading-none">1</span>
                  <span>1. Nhập Kích Thước Bề Mặt</span>
                </span>
                
                {/* Toggle dimensions vs pure area sizing */}
                <div className="flex bg-white border border-slate-200 rounded-lg p-0.5 text-xs">
                  <button 
                    onClick={() => setUseDimensions(true)}
                    className={`px-2 py-1 rounded-md font-bold cursor-pointer ${useDimensions ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
                  >
                    Nhập Dài/Rộng
                  </button>
                  <button 
                    onClick={() => setUseDimensions(false)}
                    className={`px-2 py-1 rounded-md font-bold cursor-pointer ${!useDimensions ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
                  >
                    Nhập Thẳng m²
                  </button>
                </div>
              </div>

              {useDimensions ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Chiều rộng sàn (m):</label>
                    <input 
                      type="number" 
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      min="0.1" 
                      step="0.1"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm font-semibold focus:outline-none focus:border-sky-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Chiều dài sàn (m):</label>
                    <input 
                      type="number" 
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      min="0.1"
                      step="0.1"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm font-semibold focus:outline-none focus:border-sky-500 font-mono"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Tổng diện tích mặt sàn đo thực tế (m²):</label>
                  <input 
                    type="number" 
                    value={customArea}
                    onChange={(e) => setCustomArea(e.target.value)}
                    min="1"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm font-semibold focus:outline-none focus:border-sky-500 font-mono"
                  />
                </div>
              )}
            </div>

            {/* Step 2 Struct properties */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-1 border-b border-slate-200 pb-2">
                <span className="w-5 h-5 bg-sky-600 rounded text-white flex items-center justify-center text-[10px] font-mono leading-none">2</span>
                <span>2. Chọn Khu Vực Thi Công</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(structuralRates).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setStructType(key)}
                    className={`p-3.5 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                      structType === key
                        ? 'bg-sky-50 border-sky-600 text-sky-950 focus:outline-none shadow-sm font-bold'
                        : 'bg-white border-slate-100 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                      structType === key ? 'bg-sky-600 animate-pulse' : 'bg-slate-300'
                    }`}></span>
                    <div>
                      <span className="text-xs font-extrabold sm:block leading-tight">{value.name.split(' / ')[0]}</span>
                      <span className="text-[10px] text-slate-500 block mt-1 font-medium">{value.name.split(' / ')[1] || 'mặt lộ thiên'}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3 Technology options */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-1 border-b border-slate-200 pb-2">
                <span className="w-5 h-5 bg-sky-600 rounded text-white flex items-center justify-center text-[10px] font-mono leading-none">3</span>
                <span>3. Chọn Công Nghệ & Giải Pháp Vật Tư</span>
              </label>

              <div className="space-y-2.5">
                {Object.entries(technologyRates).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setTechType(key)}
                    className={`w-full p-4 rounded-xl border text-left flex items-start justify-between gap-3 transition-all cursor-pointer ${
                      techType === key
                        ? 'bg-sky-50 border-sky-600 text-sky-950 shadow-sm'
                        : 'bg-white border-slate-100 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className={`w-4 h-4 rounded-full border border-sky-600 flex items-center justify-center shrink-0 mt-0.5 ${
                        techType === key ? 'bg-sky-600 text-white' : 'bg-transparent'
                      }`}>
                        {techType === key && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                      </span>
                      <div>
                        <strong className="text-xs font-extrabold block">{value.name}</strong>
                        <span className="text-[10px] text-slate-500 block leading-relaxed mt-1">{value.materialsDesc}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold text-sky-700 bg-sky-100/70 shrink-0 px-2 py-0.5 rounded uppercase font-sans">
                      {key.split('-')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right panel: Live calculation summary */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Calculation Card */}
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-lg shadow-slate-900/10">
              <div className="absolute right-0 top-0 w-32 h-32 bg-sky-500 opacity-20 rounded-full blur-3xl pointer-events-none"></div>

              <div className="border-b border-slate-800 pb-4 mb-5 flex items-center justify-between">
                <h3 className="font-extrabold text-sm uppercase tracking-widest text-slate-300 flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-sky-400" />
                  <span>Kết Quả Ước Tính</span>
                </h3>
                <span className="text-[9px] bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 font-bold px-2 py-0.5 rounded tracking-wide leading-none uppercase">
                  Định mức chính xác
                </span>
              </div>

              {/* Data numbers layout */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-2 border-b border-slate-800/40 pb-2.5">
                  <span className="text-xs text-slate-400 font-medium font-sans">Diện tích màng phủ ước tính:</span>
                  <strong className="text-xl font-extrabold text-white font-mono">{computedArea.toLocaleString()} m²</strong>
                </div>

                <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-2 border-b border-slate-800/40 pb-2.5">
                  <span className="text-xs text-slate-400 font-medium font-sans">Mức hao phí thi công bổ sung:</span>
                  <strong className="text-xs font-semibold text-slate-300 font-sans">Chi tiết góc + 12% hao hụt</strong>
                </div>

                {/* Material Quantities detailed suggested results */}
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700/60 mt-2 space-y-2">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Dự tính khối lượng hóa chất & phụ kiện:</span>
                  <strong className="text-xs text-sky-300 block font-bold leading-relaxed">{getSuggestedMaterialsQuantity()}</strong>
                  <p className="text-[9px] text-slate-400 font-medium leading-relaxed font-sans mt-1">
                    * Định mức: <span className="text-slate-200">{activeTech.matRef}</span>
                  </p>
                </div>

                {/* Estimate Cost limits guidance */}
                <div className="pt-4 border-t border-slate-800/80">
                  <span className="text-xs text-amber-300 font-bold uppercase tracking-wider block">Gợi ý dự toán gói thầu trọn gói (Vật tư và Thợ):</span>
                  <strong className="text-lg sm:text-2xl font-black text-white block mt-1 font-sans">
                    {priceMin <= 0 ? '0 VNĐ' : `${(priceMin / 1000000).toFixed(1)} triệu - ${(priceMax / 1000000).toFixed(1)} triệu VNĐ`}
                  </strong>
                  <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                    * Giá gói thầu bao gồm: Mài hút bụi mặt sàn, vá nứt nẻ, quét sơn lót kết dính, quét 3 lớp polymer chính chống dột và thử ngập nước nghiệm thu 24H nghiệm thu.
                  </p>
                </div>

              </div>
            </div>

            {/* Quick Consultation lead booking card */}
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl relative">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-3 mb-4 uppercase tracking-wider">
                Yêu cầu khảo sát thực tế & Đăng ký báo giá
              </h3>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="text-xs text-slate-600 block mb-1 font-bold">Họ và tên quý khách:</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ví dụ: Anh Hoàng Kim"
                      required
                      className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-600 block mb-1 font-bold font-sans">Số điện thoại liên lạc (bắt buộc):</label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ví dụ: 0912345xxx"
                      required
                      className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-600 block mb-1 font-bold">Email nhận thư (nếu có):</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="khachhang@gmail.com"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-600 block mb-1 font-bold">Yêu cầu ghi chú cụ thể thêm:</label>
                  <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ví dụ: Sân thượng đã lát gạch đỏ bị nứt nách ranh rỉ rột trần khách..."
                    rows={2}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500 font-sans leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md shadow-sky-600/10 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Gửi Yêu Cầu Cho Kỹ Sư Trưởng</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Status banner */}
              {isSubmitted && (
                <div className="absolute inset-0 bg-emerald-950/95 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center text-center p-6 text-white border border-emerald-800 animate-fade-in z-20">
                  <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/40 mb-3">
                    <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <h4 className="font-extrabold text-sm text-white">Đã Gửi Yêu Cầu Khảo Sát Kỹ Thuật!</h4>
                  <p className="text-xs text-slate-300 mt-2 max-w-xs leading-relaxed font-sans">
                    Kỹ sư trưởng chi nhánh gần quý khách nhất sẽ chủ động liên hệ đặt lịch đo đạc độ ẩm sàn bê tông hoàn toàn miễn phí sau 15-30 phút.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Saved historical request tracker in LocalStorage */}
        {savedRequests.length > 0 && (
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 mb-6">
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                  <span>Đơn Khảo Sát Đã Tạo Cho Quý Khách ({savedRequests.length})</span>
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5 font-medium leading-relaxed">Bộ lặp lịch trình được theo dõi và xử lý trực tiếp từ văn phòng kỹ thuật Toàn Tâm.</p>
              </div>

              <button 
                onClick={handleClearHistory}
                className="text-[10px] text-slate-500 hover:text-rose-600 font-bold hover:underline cursor-pointer"
              >
                Xóa lịch sử đơn
              </button>
            </div>

            <div className="space-y-4">
              {savedRequests.map((req) => (
                <div key={req.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <strong className="text-xs text-slate-900 font-extrabold">{req.fullName}</strong>
                      <span className="text-[10px] text-slate-400 font-semibold">• {req.phone}</span>
                      <span className="text-[9px] font-bold text-sky-800 bg-sky-50 border border-sky-100 px-1.5 py-0.5 rounded uppercase">
                        {req.areaSize} m²
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium font-sans flex items-center gap-1">
                      <span className="text-slate-400">Hạng mục:</span>
                      {req.structureType}
                    </p>
                    <p className="text-[10px] text-slate-400 leading-snug line-clamp-1 italic font-sans">
                      "{req.notes}"
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-center gap-2">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1 uppercase tracking-wide">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                      <span>Hệ thống đã nhận tin</span>
                    </span>
                    <span className="text-[9px] text-slate-400 font-sans">{req.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
