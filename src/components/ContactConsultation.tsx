import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ShieldAlert,
  Headphones,
  FileText
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

export default function ContactConsultation() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { config } = useSiteConfig();

  const offices = [
    {
      city: 'Văn Phòng Miền Nam (TP. Hồ Chí Minh)',
      address: config.addressHCM,
      hotline: '0988.333.x33 (Kỹ sư Trần Phong)',
      email: 'sg.chongtham@gmail.com'
    },
    {
      city: 'Văn Phòng Đặc Khu (Đảo Ngọc Phú Quốc)',
      address: config.addressPQ,
      hotline: '0988.333.x88 (Kỹ sư Minh Quân)',
      email: 'pq.chongtham@gmail.com'
    }
  ];

  const faqs = [
    {
      q: 'Tại sao nên sơn lót bằng keo dầu trong khi giá thành đắt đỏ hơn?',
      a: 'Lớp lót sơn dầu chuyên dụng (như Neopox Primer AY hoặc Polyurethane lót) thấm sâu sâu gấp 5 lần so với sơn lót gốc nước thông thường. LỚp lót gốc dầu liên kết hoàn hảo gốc bụi cát của bê tông cũ nát, tạo liên kết dính liền màng polymer mà không bị rã nứt phồng rộp khi thời tiết ngoài trời nóng lên đổ mồ hôi bê tông.'
    },
    {
      q: 'Hố pít thang máy bị tràn ngập đầy nước ngầm có thi công được không?',
      a: 'Hoàn toàn thi công được bằng biện pháp chống thấm ngược. Quy trình xử lý gồm: Bơm hút xả cạn hố nước, khoan cấy kim một chiều bít kẽ nứt rò bằng keo gốc polyurethane SL-668 trương dẻo gặp nước nở bịt kín các mạch rò rỉ ngầm rỉ rách trước, sau đó quét bọc xi măng tinh thể hoạt tính Penetron để hóa màng kết cấu.'
    },
    {
      q: 'Thời gian bảo hành 10 năm được thực hiện cam kết như thế nào?',
      a: 'Chính sách bảo hành được Toàn Tâm bảo lãnh bằng cam kết hợp đồng pháp lý đóng dấu công ty đỏ. Sau khi nghiệm thu, chúng tôi cấp phiếu bảo hành. Định kỳ hàng năm trước chu kỳ bão chính (khoảng tháng 5), phòng Kỹ Thuật sẽ liên hệ đặt lịch cử giám sát cùng rơ mốt đo nhiệt kế ẩm tận nơi miễn phí bảo hành ngăn ngừa rủi ro.'
    },
    {
      q: 'Khảo sát hiện trạng và chẩn đoán nguyên nhân thấm dột ban đầu có tốn tiền không?',
      a: 'Hoàn toàn MIỄN PHÍ. Chúng tôi có tôn chỉ "Tìm gốc trước, Tính tiền sau". Đội kỹ sư trưởng chi nhánh gần quý khách nhất sẽ đem theo máy dò hồng ngoại, camera và máy thẩm thấu ẩm bê tông sang trực tiếp hiện trường đo đạc, chẩn đoán đưa giải pháp mặt cắt tối ưu mà không thu bất kỳ đồng phí nào.'
    },
    {
      q: 'Sau khi dán màng xong thì có bắt buộc phải cán lớp vữa bảo vệ không?',
      a: 'Đây là quy tắc chuẩn chỉ bắt buộc 100%. Lớp màng lỏng dẻo, hay màng khò sika dán đều rất nhạy cảm với các va quẹt cơ lý học (như thợ lề đi ủng bảo hộ nén gạch đè, đầu thép nhọn làm rách thủng màng). Việc cán lớp vữa hồ mác cao M75 bảo vệ tối thiểu dày 2cm phủ cát mịn là tối quan trọng để giữ chất lượng lớp màng.'
    }
  ];

  return (
    <div id="contact-faq" className="py-16 bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Head Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-sky-600 bg-sky-100/70 border border-sky-200/50 px-3 py-1 rounded-full uppercase tracking-wider">
            Chi Nhánh & Giải Đáp Thắc Mắc
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Liên Hệ Thiết Kế Phương Án & FAQs Kỹ Thuật
          </h2>
          <p className="text-slate-600 mt-4 leading-relaxed">
            Chúng tôi có đội ngũ kỹ sư túc trực 24/7 tại TP. HCM và đảo Phú Quốc để sẵn sàng đo đạc hiện trường độ ẩm dột gốc và xây dựng bản vẽ thuyết minh biện pháp chống thấm khoa học nhất.
          </p>
        </div>

        {/* Dynamic Offices list with cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
          {offices.map((office, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md shadow-slate-200/30 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-sky-50 text-sky-600 rounded-xl border border-sky-100 flex items-center justify-center mb-4">
                  <MapPin className="w-5.5 h-5.5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 leading-tight">
                  {office.city}
                </h4>
                <div className="mt-4 space-y-3 text-xs text-slate-600 font-medium">
                  <p className="flex gap-2 leading-relaxed">
                    <span className="text-slate-400 font-bold shrink-0">Địa chỉ:</span>
                    <span>{office.address}</span>
                  </p>
                  <p className="flex gap-2">
                    <span className="text-slate-400 font-bold shrink-0">Hotline kỹ sư:</span>
                    <a href={`tel:${office.hotline.replace(/[\.\s\-a-zA-Z\(\)\:]/g, '')}`} className="text-sky-600 hover:underline font-bold">
                      {office.hotline}
                    </a>
                  </p>
                  <p className="flex gap-2 truncate">
                    <span className="text-slate-400 font-bold shrink-0">Thư kỹ thuật:</span>
                    <span>{office.email}</span>
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Cơ sở hoạt động {idx + 1}</span>
                <span className="text-emerald-500 font-bold uppercase tracking-wider bg-emerald-50 px-1.5 py-0.5 rounded text-[9px] border border-emerald-100">Đang hoạt động</span>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ list with expandables and support left box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Support hotlines cards on the left (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Engineering desk */}
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-lg shadow-sky-950/20">
              <div className="absolute right-0 top-0 w-24 h-24 bg-sky-500 opacity-20 rounded-full blur-2xl pointer-events-none"></div>

              <h4 className="text-sm font-extrabold uppercase tracking-widest text-sku-300 flex items-center gap-2 mb-4">
                <Headphones className="w-4.5 h-4.5 text-sky-400 animate-bounce" />
                <span>Tổng Đài Kỹ Thuật Khẩn Cấp</span>
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Đừng đợi khi tường nhà trần nhà đổ mồ hôi loang ố đen rỉ nước phá hoại đồ gỗ tivi, hãy liên hệ ngay với kỹ sư Toàn Tâm để nhận chẩn đoán và hướng dẫn xử lý tức thì phòng ngừa nguy cơ chập cháy nổ điện vách đứng ẩm bão.
              </p>

              <div className="mt-6 space-y-3.5">
                <a 
                  href="tel:0988333xxx" 
                  className="flex items-center justify-between bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700 p-3.5 rounded-xl text-white group"
                >
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">Tư vấn khẩn cấp 24/7:</span>
                    <strong className="text-sm font-bold block mt-0.5 group-hover:text-sky-400 transition-colors">0988.333.xxx</strong>
                  </div>
                  <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                </a>

                <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Cung cấp hồ sơ báo thầu đầy đủ có hóa đơn VAT pháp lý.</span>
                </div>
              </div>
            </div>

            {/* Shield disclaimer alert */}
            <div className="bg-amber-50 border border-amber-200/60 p-5 rounded-2xl text-amber-900 flex items-start gap-3.5">
              <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-xs uppercase tracking-wide">Cảnh báo thị trường giả mạo Sika:</h5>
                <p className="text-[11px] text-amber-800 mt-1 leading-relaxed font-sans font-medium">
                  Hiện nay có hơn 40% cơ sở tư thầu trung gian tự do sử dụng Sika pha nước, rút quét lớp lót lậu, hóa chất pha rão khiến màng polymer nhanh dấp mủ rữa mọt sau 1-2 năm sử dụng ngoài trời. Toàn Tâm cam kết bồi thường gấp đôi nếu phát hiện vật tư lậu kém chất lượng hàng trôi dột.
                </p>
              </div>
            </div>

          </div>

          {/* FAQ right collapse elements (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl space-y-4 shadow-sm shadow-slate-200/20">
            <h4 className="text-base font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-4 mb-2 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-sky-600" />
              <span>Góc Giải Đáp Trực Tuyến Từ Kỹ Sư Trưởng</span>
            </h4>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div 
                    key={idx} 
                    className="border border-slate-100 rounded-xl overflow-hidden transition-all duration-300 bg-slate-50/50"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-4 flex items-start justify-between gap-3 text-slate-950 font-bold text-xs sm:text-sm hover:bg-slate-50 transition-colors uppercase cursor-pointer leading-tight tracking-tight"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                    
                    {isOpen && (
                      <div className="p-4 pt-0 border-t border-slate-100/60 bg-white">
                        <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium pt-3 whitespace-pre-line">
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
