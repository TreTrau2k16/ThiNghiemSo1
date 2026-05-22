import React from 'react';
import { ShieldCheck, HardHat, Award, Sparkles, Cpu, Layers, HelpCircle, Check, Landmark, Construction } from 'lucide-react';

export default function Capability() {
  const machinery = [
    {
      name: 'Máy Đo Độ Ẩm Bê Tông Kỹ Thuật Số FLIR (Mỹ)',
      desc: 'Giúp kiểm tra chính xác độ ẩm sâu dưới lớp bê tông (chuẩn < 4% mới được sơn lót PU) để triệt tiêu vĩnh viễn phồng rộp hơi nước.',
      highlights: 'Quét chiều sâu 5cm, chẩn đoán hồng ngoại nhanh không phá hủy kết cấu'
    },
    {
      name: 'Máy Mài Sàn Hút Bụi Công Nghiệp Thụy Điển 3 Pha',
      desc: 'Mài tạo nhám bóc bỏ vữa cũ, rêu mốc mục rỗng, làm trơ cát đá của cốt sàn bê tông đặc chắc nguyên bản để hóa chất liên kết chặt chẽ.',
      highlights: 'Công suất mài nhôm kim cương cực lớn kết hợp hút bụi mịn 99.9%'
    },
    {
      name: 'Máy Phun Sơn Chống Thấm Áp Lực Airless GRACO (Mỹ)',
      desc: 'Sử dụng áp lực phun cực cao tạo màng polymer dẻo chảy tự phẳng đều đặn trên sàn, loại bỏ hoàn toàn vết chổi quét thủ công loang lổ sùi khí.',
      highlights: 'Lưu lượng 6.5 lít/phút, tạo màng sơn đều tăm tắp, đi sâu hạt lỗ bọt khí'
    },
    {
      name: 'Bộ Khò Gas Chuyên Dụng Đầu Đôi Hàn Nhiệt Biên Lemax',
      desc: 'Dụng cụ chuyên ngút khò nóng liên kết màng Bitum nóng chảy dập ép chặt lên sàn kết hợp con lăn tỳ đè bám bo chân dính chặt mép biên.',
      highlights: 'Lửa khò tỏa rộng phủ đều màng bitum chống ẩm rỗ, bám dính siêu hạng'
    }
  ];

  const partners = [
    { name: 'Sika AG', country: 'Thụy Sĩ', type: 'Keo & Nhũ Tương, Vữa Chuyên Dụng' },
    { name: 'Penetron', country: 'Mỹ', type: 'Hóa Chất Chống Thấm Tinh Thể Thẩm Thấu' },
    { name: 'Neotex S.A.', country: 'Hy Lạp', type: 'Màng Lỏng Polyurethane & Polyurea Lộ Thiên' },
    { name: 'Basf Group', country: 'Đức', type: 'Phụ Gia Bê Tông, Keo Trét Mạch Co Giãn' },
    { name: 'Laticrete', country: 'Mỹ', type: 'Keo Miết Ron, Trám Nứt Chịu Lực Cao' },
    { name: 'Kova', country: 'Việt Nam', type: 'Sơn Chống Thấm Tường Ngoài Kháng Kiềm' }
  ];

  const teamMetrics = [
    { label: 'Kỹ Sư Giám Sát', value: '18 Kỹ Sư', detail: 'Tốt nghiệp ĐH Xây Dựng, ĐH Kiến Trúc có chứng chỉ hành nghề giám sát hạng I.' },
    { label: 'Tổ Thợ Thi Công', value: '120 Thợ Cứng', detail: 'Được đào tạo cấp chứng chỉ trực tiếp từ hãng Sika và hãng Neotex Hy Lạp.' },
    { label: 'Chứng Chỉ Kiểm Định', value: 'ISO 9001:2015', detail: 'Quy trình quản lý kỹ thuật xây dựng và kiểm định độ bền màng phủ độc lập.' },
    { label: 'Khảo Sát Thực Tế', value: 'Phản Hồi < 2h', detail: 'Có mặt khảo sát tận công trình trong vòng 2 giờ kể từ khi nhận cuộc gọi.' }
  ];

  return (
    <div id="capability-profile" className="py-16 bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-sky-600 bg-sky-100/70 border border-sky-200/50 px-3 py-1 rounded-full uppercase tracking-wider">
            Năng Lực Thi Công Thực Tế
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Hồ Sơ Năng Lực Nhà Thầu
          </h2>
          <p className="text-slate-600 mt-4 leading-relaxed">
            Chúng tôi xây dựng uy tín bằng kỹ thuật thật, trang thiết bị thật và kết quả chống thấm vững bền. Khác biệt của chúng tôi là sở hữu đầy đủ máy móc hiện đại nhất và đội ngũ nhân sự cơ hữu lành nghề không thông qua thầu trung gian bán thầu.
          </p>
        </div>

        {/* Core Capabilities Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Detailed metrics & guarantees */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md shadow-slate-100/40 relative">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Award className="w-5.5 h-5.5 text-sky-600" />
              <span>Tiêu Chuẩn Đội Ngũ & Nhân Sự</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              {teamMetrics.map((tech, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 font-semibold block uppercase tracking-wide">{tech.label}</span>
                  <strong className="text-base text-sky-700 block mt-1 font-bold">{tech.value}</strong>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{tech.detail}</p>
                </div>
              ))}
            </div>

            {/* Our Commitments List */}
            <div className="space-y-3 bg-sky-50/50 p-5 rounded-xl border border-sky-100/50">
              <h4 className="font-bold text-sm text-sky-900">Cam kết bằng văn bản có con dấu pháp lý:</h4>
              <ul className="space-y-2 text-xs text-sky-950">
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cam kết dùng đúng thương hiệu chính gốc, sai chủng loại bồi thường 200%.</span>
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Quy trình xử lý nứt nẻ lún nứt dầm trước rồi mới bọc màng chống thấm sau.</span>
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Thử nước ngập liên tục 48 giờ đạt chất lượng mới bàn giao nhận tiền.</span>
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Bảo hành thực tế 10 năm, kiểm tra bảo trì định kỳ 1 năm / lần miễn phí.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Core partners display brand list */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md shadow-slate-100/40">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Layers className="w-5.5 h-5.5 text-sky-600" />
              <span>Các Đối Tác Hãng Vật Tư Đồng Hành</span>
            </h3>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Chúng tôi chỉ chọn các hãng hóa chất chống thấm hàng đầu thế giới để thi công, nói không với các hóa chất trôi nổi không nhãn mác giá rẻ cực kỳ độc hại và nhanh thoái hóa rách nứt sau vài năm.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {partners.map((pt, idx) => (
                <div key={idx} className="flex items-center gap-3.5 p-3 h-20 rounded-xl hover:bg-slate-50 border border-slate-100 hover:border-sky-200 transition-all duration-300">
                  <div className="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center font-extrabold text-sm border border-slate-700 tracking-tight shrink-0 shadow-sm shadow-slate-900/10">
                    {pt.name.split(' ')[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      {pt.name}
                      <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-1 rounded uppercase tracking-wide border border-slate-200">
                        {pt.country}
                      </span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{pt.type}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3 p-4 bg-amber-50/50 border border-amber-200/50 rounded-xl text-amber-900">
              <Construction className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-xs font-semibold leading-relaxed">
                * Toàn bộ dự toán thi công của chúng tôi đều bám sát định mức khuyến nghị kỹ thuật (Technical Data Sheet - TDS) của nhà sản xuất, tuyệt đối không bớt xén hóa chất để rút bớt lớp lót hoặc lớp phủ.
              </p>
            </div>
          </div>

        </div>

        {/* Equipment & Heavy Machinery Showcase */}
        <div>
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
              <Cpu className="w-6 h-6 text-sky-600" />
              <span>Máy Móc Chuyên Dụng Độc Quyền</span>
            </h3>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              Dụng cụ thô sơ xô và chổi quét không thể đáp ứng độ bám dính của các dự án lớn. Chống thấm hiện đại yêu cầu thiết bị xử lý bề mặt hạng nặng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {machinery.map((mac, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-sky-300/60 shadow-md shadow-slate-100/50 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-sky-50 text-sky-600 rounded-xl border border-sky-100 flex items-center justify-center font-bold text-sm mb-4">
                    0{idx + 1}
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 leading-snug hover:text-sky-600 transition-colors">
                    {mac.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                    {mac.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3.5 border-t border-slate-50 text-[10px] text-sky-700 font-bold uppercase tracking-wider flex items-center gap-1.5 bg-sky-50/30 px-2.5 py-1 rounded-md">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-pulse shrink-0"></span>
                  <span>{mac.highlights}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
