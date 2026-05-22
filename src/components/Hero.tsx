import { Shield, Sparkles, Flame, CheckCircle2, ChevronRight, Calculator, MapPin, Layers } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

export default function Hero({ setActiveTab }: HeroProps) {
  const { config } = useSiteConfig();

  const stats = [
    { value: '15+', label: 'Năm Trong Nghề', desc: 'Có chứng nhận châu Âu' },
    { value: '1.200+', label: 'Công Trình Đã Làm', desc: 'Từ dân dụng đến dự án lớn' },
    { value: '350k+', label: 'm² Bề Mặt Bảo Vệ', desc: 'Màng phủ chống thấm tuyệt đối' },
    { value: `${config.warrantyYears} Năm`, label: 'Bảo Hành Miễn Phí', desc: 'Cam kết bằng văn bản dấu đỏ' },
  ];

  return (
    <div id="hero-section" className="relative bg-slate-900 text-white overflow-hidden py-16 lg:py-24">
      {/* Decorative background grids & gradients */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-sky-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text information */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-sky-400">
              <Shield className="w-3.5 h-3.5" />
              <span>{config.heroBadge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {config.heroTitleLine1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-amber-300">
                {config.heroTitleMain}
              </span><br />
              {config.heroTitleLine2}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              {config.heroDesc}
            </p>

            {/* Core Values Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 py-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-slate-100">Vật tư chính hãng chuẩn Âu</h4>
                  <p className="text-xs text-slate-400">Sika Thụy Sĩ, Neotex Hy Lạp, Penetron Mỹ</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-slate-100">Kỹ thuật viên 10 năm kinh nghiệm</h4>
                  <p className="text-xs text-slate-400">Nắm rõ đường đi mạch nước ngầm phức tạp</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-slate-100">Khảo sát & chẩn đoán miễn phí</h4>
                  <p className="text-xs text-slate-400">Sử dụng máy quét hồng ngoại tìm dòng thấm</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-slate-100">Bảo hành {config.warrantyYears} năm bằng văn bản</h4>
                  <p className="text-xs text-slate-400">Kiểm tra định kỳ hàng năm trước mùa mưa</p>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                key="btn-contact-survey"
                onClick={() => setActiveTab('contact')}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold px-7 py-4 rounded-xl shadow-lg shadow-sky-500/20 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-sm"
              >
                <span>Yêu Cầu Khảo Sát Gặp Kỹ Sư</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <button
                key="btn-calc"
                onClick={() => setActiveTab('calculator')}
                className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600 font-semibold px-7 py-4 rounded-xl transition-all duration-300 cursor-pointer text-sm"
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Máy Tính Dự Toán Chi Phí</span>
              </button>
            </div>
          </div>

          {/* Dual Category Presentation (Civil vs Large Project) */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-5">
            {/* Column Civil */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 p-6 rounded-2xl relative shadow-xl hover:border-sky-500/30 transition-all duration-300 group">
              <div className="absolute top-4 right-4 bg-sky-500/10 text-sky-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-sky-400/20">
                Xử lý dân dụng
              </div>
              <div className="w-10 h-10 bg-sky-600/10 text-sky-400 rounded-lg flex items-center justify-center border border-sky-400/20 mb-4">
                <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">Thi Công Cho Nhà Dân & Biệt Thự</h3>
              <p className="text-slate-300 text-sm mb-3.5">
                Chống thấm dột triệt để sàn mái bê tông, sân thượng, nhà tắm ẩm, hố thang máy biệt thự đơn lập, nhà liên kề. Bóc sạch gạch cũ hoặc làm không cần đục gạch lộ thiên.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-2 py-0.5 rounded-md">Khu phụ ẩm</span>
                <span className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-2 py-0.5 rounded-md">Sân thượng mái</span>
                <span className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-2 py-0.5 rounded-md">Ban công / Logia</span>
              </div>
            </div>

            {/* Column Industrial */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 p-6 rounded-2xl relative shadow-xl hover:border-amber-500/30 transition-all duration-300 group">
              <div className="absolute top-4 right-4 bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-amber-400/20">
                Công trình lớn
              </div>
              <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-lg flex items-center justify-center border border-amber-400/20 mb-4">
                <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.33l-7.5-5-7.5 5V21m16.5 0H3.75" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">Hầm Sâu, Nhà Máy & Dự Án Quy Mô</h3>
              <p className="text-slate-300 text-sm mb-3.5">
                Các giải pháp chống thấm vách hầm sâu, đài móng giằng móng, hầm kỹ thuật, bể xử lý nước thải công nghiệp. Bơm PU chặn nước ngầm áp lực cao rò rỉ mạch ngừng.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-2 py-0.5 rounded-md">Chống thấm ngược hầm</span>
                <span className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-2 py-0.5 rounded-md">Mái tôn nhà xưởng cực rộng</span>
                <span className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-2 py-0.5 rounded-md">Bể chứa hoá chất bơi</span>
              </div>
            </div>
          </div>

        </div>

        {/* Highlight Stats Panels */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t border-slate-800/80">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800/60 text-center md:text-left">
              <span className="text-3xl md:text-4xl font-extrabold text-sky-400 tracking-tight block">
                {stat.value}
              </span>
              <strong className="text-sm font-semibold text-slate-100 mt-1 block tracking-tight">
                {stat.label}
              </strong>
              <span className="text-xs text-slate-400 mt-0.5 block line-clamp-2">
                {stat.desc}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
