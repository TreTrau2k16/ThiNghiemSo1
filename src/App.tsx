import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Capability from './components/Capability';
import Process from './components/Process';
import ProjectShowcase from './components/ProjectShowcase';
import QuoteCalculator from './components/QuoteCalculator';
import ContactConsultation from './components/ContactConsultation';
import AdminPanel from './components/AdminPanel';
import { useSiteConfig } from './context/SiteConfigContext';
import { 
  Phone, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles, 
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const { config } = useSiteConfig();
  const cleanPhoneLink = `tel:${config.hotline.replace(/[\.\s\-]/g, '')}`;

  // Smooth scroll to top when tab switches
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans selection:bg-sky-500 selection:text-white">
      
      {/* 1. Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Main Content Routing State */}
      <main className="flex-grow">
        
        {/* TAB 1: HOME PANEL */}
        {activeTab === 'home' && (
          <div className="animate-fade-in">
            {/* Hero Main Presentation */}
            <Hero setActiveTab={setActiveTab} />

            {/* Quick Introduction Grid */}
            <section className="py-16 bg-white border-b border-slate-100 font-sans">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 space-y-6">
                    <span className="text-[10px] font-bold text-sky-600 bg-sky-50 border border-sky-200/50 px-3 py-1 rounded-full uppercase tracking-wider">
                      {config.introTitle}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                      Đơn Vị Tổng Thầu Thi Công <br />
                      <span className="text-sky-600">{config.introSub}</span>
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed font-sans">
                      {config.introDesc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        'Trực tiếp thi công - Không qua trung gian bán thầu',
                        'Dùng đúng định lượng TDS kỹ thuật của hãng đề xuất',
                        'Có phòng Lab mô tả thử nghiệm nước thực tế',
                        'Mài bóc tẩy nhám tạo bám dính siêu liên kết'
                      ].map((lead, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{lead}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      key="home-cap-go"
                      onClick={() => setActiveTab('capability')}
                      className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 hover:text-sky-700 hover:underline cursor-pointer group"
                    >
                      <span>Xem hồ sơ năng lực đầy đủ & Máy móc</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Right illustration / showcase blocks */}
                  <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
                    <div className="absolute inset-0 bg-sky-100 rounded-full blur-3xl opacity-20 -z-10"></div>
                    
                    <div className="space-y-4">
                      <div className="bg-sky-50 border border-sky-100 p-5 rounded-2xl">
                        <strong className="text-3xl font-bold text-sky-600 block">15+</strong>
                        <span className="text-xs text-sky-950 font-bold block mt-1 uppercase tracking-wide">Năm Kinh Nghiệm</span>
                        <p className="text-[10px] text-slate-500 mt-1 leading-snug">Làm chủ công nghệ chống thấm thuận ngược hầm đứng sâu.</p>
                      </div>
                      <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800">
                        <strong className="text-3xl font-bold text-amber-400 block">{config.warrantyYears} Năm</strong>
                        <span className="text-xs text-slate-300 font-bold block mt-1 uppercase tracking-wider">Hợp Đồng Bảo Hành</span>
                        <p className="text-[10px] text-slate-400 mt-1 leading-snug">Cam kết hết thấm dột hoàn toàn bằng con dấu văn bản dấu đỏ pháp lý.</p>
                      </div>
                    </div>

                    <div className="space-y-4 pt-8">
                      <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl">
                        <strong className="text-3xl font-bold text-emerald-600 block">100%</strong>
                        <span className="text-xs text-emerald-950 font-bold block mt-1 uppercase tracking-wide">Đạt Thử Nước</span>
                        <p className="text-[10px] text-slate-500 mt-1 leading-snug">Bơm ngập ngâm nước 48 giờ chất lượng mới bàn giao chuyển giao.</p>
                      </div>
                      <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm shadow-slate-100">
                        <strong className="text-3xl font-bold text-slate-900 block">6 Bước</strong>
                        <span className="text-xs text-slate-500 font-bold block mt-1 uppercase tracking-wide">Nghiệm Thu QA/QC</span>
                        <p className="text-[10px] text-slate-500 mt-1 leading-snug">Kỹ sư giám sát độc lập từng giai đoạn bóc vữa quét lót.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Process Highlight Section */}
            <section className="py-16 bg-slate-50 border-b border-slate-100 font-sans">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
                <div className="max-w-2xl mx-auto text-center space-y-3">
                  <span className="text-[10px] font-bold text-sky-600 bg-sky-100 border border-sky-200 px-3 py-1 rounded-full uppercase tracking-wider">
                    Quy Trình Hoạt Động
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    Trình Tự Thiết Kế Chuyên Nghiệp 
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Một sản phẩm chống thấm hoàn mỹ độ bền 20 năm bắt buộc phải trải qua sơ đồ chuẩn hóa nghiêm ngặt.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { step: '01', title: 'Khảo sát độ ẩm sàn', desc: 'Đo độ ẩm sâu bê tông cảm biến FLIR trước khi dán màng.' },
                    { step: '02', title: 'Mài bóc nhám sạch sẽ', desc: 'Bóc màng xi măng yếu rão tổ ong, trơ gân bê tông đặc chắc.' },
                    { step: '03', title: 'Thi công quét sơn lót', desc: 'Sơn lót chịu mòn bám hóa tạo liên kết kéo bám mút màng chính.' },
                    { step: '04', title: 'Màng dẻo 3 lớp chính', desc: 'Phủ sơn polyurethane elastomeric dầy 1.8mm đan chéo dẻo dai.' },
                    { step: '05', title: 'Thử nước ngâm 48 giờ', desc: 'Quây ngập chân tường sâu 10cm đo đạc dột trước khi bàn giao.' },
                    { step: '06', title: 'Cán lớp vữa bảo vệ', desc: 'Cán vữa bảo vệ chống trầy xước rách cơ lý học khi ốp lát gạch.' }
                  ].map((step, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 text-left hover:border-sky-300 transition-colors">
                      <span className="text-xs font-bold font-mono text-sky-600 bg-sky-50 px-2 py-1 rounded">{step.step}</span>
                      <h4 className="font-bold text-slate-900 text-sm mt-3">{step.title}</h4>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-sans">{step.desc}</p>
                    </div>
                  ))}
                </div>

                <button
                  key="home-proc-go"
                  onClick={() => setActiveTab('process')}
                  className="bg-slate-900 hover:bg-sky-600 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Khám phá sơ đồ thiết kế mặt cắt cho từng khu vực</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* Showcase completed typical items shortcut */}
            <section className="py-16 bg-white border-b border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
                <div className="max-w-2xl mx-auto space-y-3">
                  <span className="text-[10px] font-bold text-sky-600 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full uppercase tracking-wider">
                    Các dự án mẫu tiêu biểu
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    Dự Án Đã Nghiệm Thu Bàn Giao
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Toàn Tâm trực tiếp thi công từ biệt thự cao cấp đến các sàn hầm móng sâu nhà xưởng hàng nghìn m².
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  {[
                    { name: 'Biệt Thự Vinhomes Ocean Park', area: '320 m²', category: 'Dân dụng', method: 'Màng dẻo Polyurethane Neotex cao cấp dầy 1.8mm', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400' },
                    { name: 'Tầng Hầm Khách Sạn Gold Star', area: '2.500 m²', category: 'Công trình lớn', method: 'Bơm Epoxy chặn rỉ măng tinh thể thẩm thấu Penetron', image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=400' },
                    { name: 'Nhà Máy Điện Tử Samsung', area: '12.000 m²', category: 'Công trình lớn', method: 'Mái màng lỏng Polyurea phản xạ nhiệt chịu tia UV chống dột', image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=400' }
                  ].map((proj, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="h-48 overflow-hidden relative">
                        <img src={proj.image} alt={proj.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <span className="absolute top-3 left-3 bg-slate-900/80 text-white font-bold text-[9px] px-2 py-0.5 rounded uppercase tracking-wide">
                          {proj.category}
                        </span>
                      </div>
                      <div className="p-5 space-y-1.5">
                        <h4 className="font-bold text-slate-900 text-sm">{proj.name}</h4>
                        <p className="text-xs text-slate-500 font-sans leading-relaxed flex items-center gap-1">
                          <span>Quy mô:</span> <strong>{proj.area}</strong>
                        </p>
                        <p className="text-xs text-sky-700 font-semibold truncate font-sans">
                          {proj.method}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  key="home-proj-go"
                  onClick={() => setActiveTab('projects')}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Xem thư viện hình ảnh thực tế bàn giao đầy đủ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* Quick Consultation calculator link panel */}
            <section className="py-16 bg-gradient-to-br from-slate-800 to-slate-900 text-white relative overflow-hidden font-sans">
              <div className="absolute right-0 bottom-0 w-80 h-80 bg-sky-500 opacity-10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <span className="text-[10px] font-bold text-sky-400 bg-sky-950/80 border border-sky-800/60 px-2.5 py-1 rounded inline-block uppercase tracking-wider">
                      Lên dự toán xây dựng nhanh
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                      Bạn Chưa Biết Chi Phí Phục Hồi Chống Thấm Khoảng Bao Nhiêu?
                    </h2>
                    <p className="text-sm text-slate-300 max-w-2xl leading-relaxed font-sans">
                      Hãy sử dụng bộ máy tính thuật toán tự động tính diện tích, định vị hao phí vật liệu màng Bitum/Polyurethane và kiểm chứng giá tham khảo hữu ích cho sân thượng, nhà vệ sinh hay hầm móng của bạn chỉ trong 30 giây.
                    </p>
                  </div>

                  <div className="lg:col-span-4 text-left lg:text-right">
                    <button
                      key="home-calc-go"
                      onClick={() => setActiveTab('calculator')}
                      className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-xs sm:text-sm px-6 py-4 rounded-xl transition-all shadow-lg cursor-pointer inline-flex items-center gap-2 uppercase tracking-wide"
                    >
                      <span>Trải Nghiệm Máy Tính Dự Toán</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* General FAQs/Support component integration preview */}
            <ContactConsultation />

          </div>
        )}

        {/* TAB 2: CAPABILITY PROFILE */}
        {activeTab === 'capability' && (
          <div className="animate-fade-in">
            <Capability />
          </div>
        )}

        {/* TAB 3: EXECUTION PROCESS */}
        {activeTab === 'process' && (
          <div className="animate-fade-in">
            <Process />
          </div>
        )}

        {/* TAB 4: PROJECT PORTFOLIO */}
        {activeTab === 'projects' && (
          <div className="animate-fade-in">
            <ProjectShowcase />
          </div>
        )}

        {/* TAB 5: ESTIMATE CALCULATOR */}
        {activeTab === 'calculator' && (
          <div className="animate-fade-in">
            <QuoteCalculator />
          </div>
        )}

        {/* TAB 6: CONTACT INFORMATION */}
        {activeTab === 'contact' && (
          <div className="animate-fade-in">
            <div className="bg-white border-b border-slate-100 py-12 font-sans">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  
                  {/* Register booking left column */}
                  <div className="lg:col-span-6 space-y-6">
                    <span className="text-xs font-bold text-sky-600 bg-sky-50 border border-sky-100 px-3 py-1 rounded-full uppercase tracking-wider">
                      Đặt lịch khảo sát tận nơi
                    </span>
                    <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
                      Đặt Lịch Kỹ Sư Trưởng Khảo Sát Tường, Sàn
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Quý khách chỉ cần để lại số điện thoại đặt lịch. Đội ngũ kỹ thuật chống thấm Toàn Tâm sẽ túc trực điện thoại liên hệ sang tận công trình khảo sát hiện trạng độ ẩm bê tông rò rỉ hoàn toàn miễn phí, bóc dự toán mẫu không ràng buộc hợp đồng.
                    </p>

                    <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl flex items-start gap-3">
                      <Clock className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-xs text-sky-900 uppercase">Thời gian phản hồi tốc độ:</h4>
                        <p className="text-xs text-slate-700 mt-1 leading-relaxed font-sans font-medium">
                          Khảo sát thực tế trong vòng 2 giờ (Nội thành Hà Nội, Đà Nẵng, Sài Gòn) hoặc lên hồ sơ bản vẽ thuyết minh cho dự án lớn tỉnh xa trong vòng 24 giờ.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3.5">
                      <h4 className="font-bold text-xs text-slate-900 uppercase tracking-widest">Tiêu chí đạo đức nghề nghiệp:</h4>
                      <ul className="space-y-2.5 text-xs text-slate-600 font-sans select-none">
                        <li className="flex items-center gap-2 font-medium">
                          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                          <span>Chuẩn đoán dột đúng gốc rễ nguyên lý kết cấu, nói không với phán bừa tăng thầu.</span>
                        </li>
                        <li className="flex items-center gap-2 font-medium">
                          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                          <span>Dùng máy móc hiện đại đo đạc minh bạch số liệu ẩm bão, sâu rạn cốt bê tông.</span>
                        </li>
                        <li className="flex items-center gap-2 font-medium">
                          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                          <span>Cam kết thái độ niềm nở, tử tế, giữ gìn vệ sinh sạch sẽ cho công trình dọn rửa khi về.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Calculator and form panel directly loaded here for complete flow */}
                  <div className="lg:col-span-6 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-3.5 mb-5 uppercase tracking-wide">
                      Mẫu đăng ký thông tin khảo sát
                    </h3>
                    <QuoteCalculator />
                  </div>

                </div>
              </div>
            </div>
            
            {/* Address cards integration */}
            <ContactConsultation />
          </div>
        )}

      </main>

      {/* 4. Ultimate Footer Layout */}
      <footer className="bg-slate-900 text-slate-400 font-sans border-t border-slate-800 text-xs py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 pb-8 border-b border-slate-800">
          
          {/* Brand block (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-sky-600 rounded-lg flex items-center justify-center text-white font-extrabold shadow shadow-sky-500/10">
                CT
              </div>
              <div>
                <span className="text-base font-extrabold tracking-tight text-white uppercase block">{config.logoPrefix} {config.logoSuffix}</span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase block">{config.tagline}</span>
              </div>
            </div>

            <p className="leading-relaxed text-slate-400 font-sans text-xs">
              Nhà thầu chuyên nghiệp hàng đầu Việt Nam chuyên xử lý vết nứt rạn sàn mái biệt thự, bọc phủ nguội polyurethane, khò nóng bitum tấm lem, khoan bơm keo chịu ngầm hầm đứng và dự án công trình cơ điện quy mô hàng chục nghìn m².
            </p>

            <p className="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>* Được bảo chứng kỹ thuật bởi hai thương hiệu đồng hành Sika & Neotex.</span>
            </p>
          </div>

          {/* Sitemaps redirect menu (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">Danh mục dịch vụ</h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li>
                <button onClick={() => setActiveTab('process')} className="hover:text-white hover:underline cursor-pointer">
                  Chống thấm sàn mái sân thượng
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('process')} className="hover:text-white hover:underline cursor-pointer">
                  Chống thấm nhà vệ sinh, nhà tắm
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('process')} className="hover:text-white hover:underline cursor-pointer">
                  Chống thấm bể bơi, bể nước ăn sinh hoạt
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('process')} className="hover:text-white hover:underline cursor-pointer">
                  Chống thấm ngược hố pít tầng hầm đứng
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('process')} className="hover:text-white hover:underline cursor-pointer">
                  Chống dột mái tôn dập nách vách tôn xưởng
                </button>
              </li>
            </ul>
          </div>

          {/* Quick legal stats (4 cols) */}
          <div className="md:col-span-4 space-y-3.5 text-slate-400">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">Khu vực hoạt động trọng điểm</h4>
            
            <div className="space-y-2 text-slate-400 font-sans text-[11px] sm:text-xs leading-relaxed">
              <p className="flex gap-2">
                <strong className="text-slate-300 shrink-0">TP. HCM:</strong>
                <span>{config.addressHCM}</span>
              </p>
              <p className="flex gap-2">
                <strong className="text-slate-300 shrink-0">Phú Quốc:</strong>
                <span>{config.addressPQ}</span>
              </p>
              <p className="flex gap-2">
                <strong className="text-slate-300 shrink-0">Hotline Thầu:</strong>
                <a href={cleanPhoneLink} className="text-sky-400 font-bold hover:underline">{config.hotline}</a>
              </p>
            </div>
          </div>

        </div>

        {/* Rights declaration block */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] font-sans">
          <p>© 2026 {config.logoPrefix} {config.logoSuffix}. Tất cả quyền được bảo lưu. Giao diện thiết kế theo chuẩn Sieuthichongtham.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400">Kỹ thuật Châu Âu</span>
            <span>•</span>
            <span className="hover:text-slate-400">Trực tiếp thi công 100%</span>
            <span>•</span>
            <span className="hover:text-slate-400 font-bold text-sky-500">Bảo Hành {config.warrantyYears} Năm</span>
          </div>
        </div>
      </footer>

      {/* 5. Sticky Floating Mobile/Desktop Call Hotline panel */}
      <div className="fixed bottom-4 right-4 z-40 bg-slate-950 text-white rounded-2xl p-3 shadow-2xl border border-slate-800 shadow-slate-950 flex items-center gap-3 animate-bounce">
        <a 
          href={cleanPhoneLink} 
          className="w-10 h-10 bg-sky-600 text-white rounded-xl flex items-center justify-center cursor-pointer hover:bg-sky-500 transition-colors shrink-0"
        >
          <Phone className="w-5 h-5 animate-pulse" />
        </a>
        <div className="pr-2">
          <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider leading-none">Cần tư vấn ngay?</span>
          <a href={cleanPhoneLink} className="text-xs font-black text-amber-400 hover:underline block mt-0.5">{config.hotline} (24/7)</a>
        </div>
      </div>

      {/* 6. Back-office customizations admin drawer control button */}
      <AdminPanel />

    </div>
  );
}
