import React, { useState } from 'react';
import { 
  User, 
  Smartphone, 
  Mail, 
  MapPin, 
  PenTool, 
  CheckCircle2, 
  Send, 
  AlertCircle,
  Building,
  ArrowRight,
  Sparkles,
  Layers,
  HelpCircle
} from 'lucide-react';
import { QuoteRequest } from '../types';

export default function ContactForm() {
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [structureType, setStructureType] = useState<string>('Sân Thượng / Ban Công');
  const [areaSize, setAreaSize] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const structureOptions = [
    { label: 'Sân Thượng & Ban Công', icon: Layers, value: 'Sân thượng / Sàn mái ngoài trời' },
    { label: 'Nhà Vệ Sinh & Sàn Bếp', icon: Building, value: 'Nhà vệ sinh / Nhà tắm sàn ướt' },
    { label: 'Tầng Hầm & Hố Thang', icon: Building, value: 'Vách hầm đứng / Hố rác ngược' },
    { label: 'Tường Ngoài Lộ Thiên', icon: Building, value: 'Vách tường ngoài đứng lộ thiên' },
    { label: 'Hạng Mục Khác', icon: HelpCircle, value: 'Khác (Bể nước, bể bơi, mái tôn)' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMessage('Vui lòng nhập đầy đủ Họ tên và Số điện thoại liên lạc.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const newRequest: QuoteRequest = {
      id: `req-${Date.now()}`,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || 'Không có',
      projectType: (parseInt(areaSize) || 0) > 150 ? 'Dự án lớn / Công trình đại trà' : 'Nhà dân dụng / Công trình nhỏ',
      structureType: structureType,
      areaSize: parseInt(areaSize) || 0,
      notes: `Vị trí: ${location || 'Chưa cung cấp'} | Ghi chú: ${notes || 'Cần đặt lịch khảo sát trực tiếp'}`,
      createdAt: new Date().toLocaleDateString('vi-VN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      status: 'Processing'
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRequest)
      });

      if (!response.ok) {
        throw new Error('Không thể đồng bộ dữ liệu tới CSDL');
      }

      // Update local storage so user sees their history in quote logs
      const historical = localStorage.getItem('waterproofing_quotes');
      let updated: QuoteRequest[] = [];
      if (historical) {
        try {
          updated = JSON.parse(historical);
        } catch (e) {
          console.error(e);
        }
      }
      updated = [newRequest, ...updated];
      localStorage.setItem('waterproofing_quotes', JSON.stringify(updated));

      setIsSuccess(true);
      setFullName('');
      setPhone('');
      setEmail('');
      setAreaSize('');
      setNotes('');
      setLocation('');
    } catch (err: any) {
      console.error(err);
      setErrorMessage('Đã xảy ra lỗi khi kết nối với máy chủ. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md shadow-slate-100 p-5 sm:p-7 relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 to-sky-600"></div>

      <div className="mb-6">
        <h4 className="text-sm font-bold text-slate-900 tracking-wide flex items-center gap-1.5 uppercase">
          <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
          <span>Mẫu Đăng Ký Khảo Sát Kỹ Thuật</span>
        </h4>
        <p className="text-[11px] text-slate-500 mt-1 lines-relaxed">
          Kỹ sư trưởng chi nhánh Toàn Tâm gần nhà bác nhất sẽ gọi điện trực tiếp để tư vấn và đo đạc độ ẩm dột hoàn toàn <span className="text-emerald-600 font-bold">Miễn Phí</span>.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-xl flex items-center gap-2 animate-fade-in font-semibold">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Full Name and Phone inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">Họ & Tên Chủ Nhà/Chủ Thầu:</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ví dụ: Anh Hoàng Kim"
                required
                className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-205 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-sans"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">Số Điện Thoại Nhận Đặt Lịch:</label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Số di dộng (bắt buộc)"
                required
                className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-205 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-mono"
              />
            </div>
          </div>
        </div>

        {/* Email and Location inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">Địa Chỉ / Vị Trí Công Trình:</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ví dụ: Quận 7, TP. HCM hoặc Dương Đông"
                className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-205 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-sans"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">Diện Tích Ước Tính (m²):</label>
            <div className="relative">
              <Layers className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input 
                type="number" 
                value={areaSize}
                onChange={(e) => setAreaSize(e.target.value)}
                placeholder="Không bắt buộc (ví dụ: 80)"
                className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-205 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-mono"
              />
            </div>
          </div>
        </div>

        {/* Structural Category Selection Dropdown */}
        <div>
          <label className="text-[11px] font-bold text-slate-700 block mb-2 uppercase tracking-wider">Hạng Mục Chống Thấm Cần Khảo Sát:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {structureOptions.map((opt, idx) => {
              const IconComp = opt.icon;
              const isSelected = structureType === opt.value;
              return (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setStructureType(opt.value)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-sky-50 text-sky-700 border-sky-500/80' 
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isSelected ? 'text-sky-600' : 'text-slate-400'}`} />
                  <span className="truncate leading-none">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes / Leakage description textarea */}
        <div>
          <label className="text-[11px] font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">Mô Tả Hiện Trạng Hoặc Mong Muốn Khảo Sát:</label>
          <div className="relative">
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ví dụ: Sàn thượng bị nứt nẻ thấm rỉ ố chân tường mốc meo, cần kỹ sư sang mang máy dò rò rỉ bê tông hồng ngoại..."
              rows={3}
              className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-sans leading-relaxed resize-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-slate-900 to-slate-850 hover:from-sky-600 hover:to-sky-700 text-white font-extrabold text-xs py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-[0.99] cursor-pointer flex flex-col items-center justify-center gap-0.5 leading-none"
        >
          <div className="flex items-center gap-1.5">
            <span>{isSubmitting ? 'ĐANG GỬI THÔNG TIN...' : 'GỬI ĐĂNG KÝ KHẢO SÁT CHUẨN KỸ SƯ'}</span>
            {!isSubmitting && <Send className="w-3.5 h-3.5 text-sky-400" />}
          </div>
          <span className="text-[9px] text-slate-400 group-hover:text-sky-100 font-semibold tracking-wider block mt-1 uppercase">CHI NHÁNH SẼ LIÊN HỆ ĐẶT LỊCH HẸN TRONG 15 PHÚT</span>
        </button>
      </form>

      {/* Success Popup inside block */}
      {isSuccess && (
        <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 text-white border border-slate-850 animate-fade-in z-30">
          <div className="w-14 h-14 bg-emerald-500/15 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-400/40 mb-3 animate-bounce">
            <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
          </div>
          <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">Đã tiếp nhận yêu cầu thành công</h4>
          <p className="text-[11px] text-slate-300 mt-2.5 max-w-xs leading-relaxed font-sans font-medium">
            Thông tin của chủ công trình đã được lưu lại dứt điểm trên hệ thống cơ sở dữ liệu Toàn Tâm. Kỹ sư trưởng chi nhánh Toàn Tâm phụ trách khu vực gần nhất sẽ liên hệ sang đo hồng ngoại bê tông hoàn toàn thất thiết miễn phí.
          </p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="mt-6 bg-sky-600 hover:bg-sky-700 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-white"
          >
            Quay lại đăng ký mới
          </button>
        </div>
      )}
    </div>
  );
}
