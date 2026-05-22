import { ProcessStep, WaterproofingMethod } from '../types';

export const EXECUTION_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: 'Khảo sát & Chẩn đoán',
    subtitle: 'Tìm chính xác nguyên nhân thấm',
    description: 'Chúng tôi sử dụng máy đo độ ẩm bê tông hồng ngoại, kiểm tra đường đi của mạch nước ngầm và kiểm tra hệ thống đường ống khuất để chẩn đoán gốc rễ của vấn đề trước khi lên phương án.',
    details: [
      'Đo độ ẩm sâu trong bê tông bằng máy cảm biến kỹ thuật số',
      'Xác định khe nứt kết cấu hay rò rỉ cơ học',
      'Phân tích áp lực nước (Áp lực nước thuận hay ngược)',
      'Lập hồ sơ chẩn đoán chi tiết và đề xuất giải pháp thi công tối ưu kinh tế'
    ],
    icon: 'Search',
    badgeColor: 'bg-blue-100 text-blue-700 border-blue-200'
  },
  {
    step: 2,
    title: 'Chuẩn bị bề mặt bê tông',
    subtitle: 'Khâu xương sống quyết định 80% độ bền',
    description: 'Chống thấm chỉ bám tốt trên bê tông đặc chắc. Bề mặt phải được mài nhám làm sạch hoàn toàn bụi xi măng yếu, đục bỏ tạp chất rỗ tổ ong và các dăm gỗ kẹt kết cấu.',
    details: [
      'Sử dụng máy mài đĩa kim cương bóc sạch lớp màng xi măng yếu (laitance)',
      'Đục mở rộng khe nứt hình chữ V (sâu 2cm) để nhồi keo trám trét',
      'Đục tẩy cổ ống và bo góc chân tường (fillet góc) bằng vữa mác cao không co ngót',
      'Hút bụi công nghiệp sạch sẽ hoàn toàn bề mặt, rửa thổi nước tạo ẩm bão hòa bê tông'
    ],
    icon: 'Hammer',
    badgeColor: 'bg-amber-100 text-amber-700 border-amber-200'
  },
  {
    step: 3,
    title: 'Thi công quét lót gia cường',
    subtitle: 'Tăng liên kết chân bám bám dính cực mạnh',
    description: 'Thi công một lớp lót chuyên dụng (Primer xi măng, gốc acrylic hoặc polyurethane) giúp thẩm thấu sâu lấp đầy bọt khí, cố định hạt bụi li ti còn sót lại và tạo màng liên kết keo.',
    details: [
      'Quét lót đồng đều bằng rulo hoặc máy phun áp lực cao chuyên dụng',
      'Gia cố lưới sợi thủy tinh kháng kiềm tại các vị trí yếu như cổ ống xuyên sàn, mép nách chân tường, khớp nứt sàn',
      'Dán băng cản nước chuyên dụng tại các mạch ngừng chuyển vị nhiệt',
      'Thời gian chờ khô chuẩn từ 1 đến 4 tiếng tùy theo dòng vật liệu lót gốc dầu hay nước'
    ],
    icon: 'Paintbrush',
    badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200'
  },
  {
    step: 4,
    title: 'Thi công lớp màng chống thấm',
    subtitle: 'Chốt chặn màng kín khít tuyệt đối',
    description: 'Thi công lớp màng chính bằng phương pháp quét màng lỏng Polyurethane/xi măng dẻo 2 phần hoặc khò nóng màng bitum. Tạo lớp màng nguyên khối liên tục không một vết hở.',
    details: [
      'Thi công tối thiểu 2 đến 3 lớp đan chéo vuông góc chéo nhau',
      'Đảm bảo định mức vật liệu tiêu chuẩn từ 1.5kg đến 2kg/m² đạt độ dày tối ưu 1.5 - 2.0mm',
      'Kiểm soát nghiêm ngặt thời gian giãn cách khô giữa các lớp phủ (không quá sớm gây phồng bong, không quá trễ gây rác màng)',
      'Đối với màng khò nóng: Hàn mối chồng mép biên tối thiểu 10cm lăn ép kín bọt khí'
    ],
    icon: 'Layers',
    badgeColor: 'bg-indigo-100 text-indigo-700 border-indigo-200'
  },
  {
    step: 5,
    title: 'Thử nước kiểm tra nghiệm thu',
    subtitle: 'Minh bạch chất lượng bàn giao',
    description: 'Đây là bước bắt buộc để chứng minh tính hiệu quả. Chúng tôi tiến hành quây ranh chắn bạt và bơm ngập nước trên sàn từ 24 đến 48 giờ để đo lường giám sát.',
    details: [
      'Đóng quây chặn đầu thoát nước hố thu sàn',
      'Bơm ngập nước ngập chân tường sâu từ 5cm - 10cm',
      'Kiểm tra định kỳ dưới trần căn hộ/vách tường dưới mỗi 12 giờ một lần',
      'Chỉ tiến hành tháo xả nước khi có chữ ký xác nhận của chủ nhà hoặc tư vấn giám sát'
    ],
    icon: 'Droplets',
    badgeColor: 'bg-cyan-100 text-cyan-700 border-cyan-200'
  },
  {
    step: 6,
    title: 'Lớp bảo vệ & Bàn giao',
    subtitle: 'Bảo vệ lâu dài trọn đời công trình',
    description: 'Sau khi thử nước đạt yêu cầu, thi công dán một lớp bạt bảo vệ hoặc cán vữa xi măng mác cao dày tối thiểu 2cm cát hạt nhỏ bảo vệ màng chống rách cơ học khi thi công ốp lát gạch đè lên.',
    details: [
      'Cán phủ vữa bảo vệ tạo dốc thu nước nếu là khu vực sân thượng, nhà tắm',
      'Bàn giao đầy đủ phiếu bảo hành điện tử và sổ hướng dẫn bảo trì định kỳ',
      'Kích hoạt bảo hành có thời hạn lưu trữ từ 5 đến 10 năm tùy gói kỹ thuật',
      'Hỗ trợ khảo sát định kỳ miễn phí mỗi năm một lần trước mùa mưa bão lớn'
    ],
    icon: 'ShieldCheck',
    badgeColor: 'bg-teal-100 text-teal-700 border-teal-200'
  }
];

export const WATERPROOFING_METHODS: WaterproofingMethod[] = [
  {
    id: 'method-terrace',
    name: 'Phương Pháp Chống Thấm Sân Thượng / Mái Lộ Thiên',
    structureType: 'terrace',
    description: 'Hệ thống chịu nhiệt bám dính tuyệt vời chịu tia UV, chống nứt xé do chênh lệch nhiệt độ ngày và đêm cực lớn ở Việt Nam.',
    layers: [
      'Lớp 1: Sàn bê tông cốt thép cốt lõi mài phẳng',
      'Lớp 2: Lớp lót tăng cường chống ẩm chuyên sâu Neopox Primer AY',
      'Lớp 3: Lưới sợi thủy tinh bọc góc gia cường Polyester chân và vết crack',
      'Lớp 4: Lớp sơn phủ Polyurethane đàn hồi cao Neoproof PU W (Lớp thứ nhất)',
      'Lớp 5: Lớp sơn phủ Polyurethane đàn hồi cao Neoproof PU W (Lớp hoàn thiện chịu UV)'
    ],
    materials: [
      { name: 'Neoproof PU W / Polyurea', brand: 'Neotex (Hy Lạp)' },
      { name: 'Lưới Polyester gia cường', brand: 'Korea' },
      { name: 'Sika Flex Construction', brand: 'Sika (Thụy Sĩ)' }
    ],
    suitability: 'Sân thượng không cán gạch bảo vệ, ban công rộng, mái vòm biệt thự, vườn trên mái.',
    warrantyYears: 8
  },
  {
    id: 'method-toilet',
    name: 'Hệ Chống Thấm Nhà Vệ Sinh / Khu Ẩm Ướt',
    structureType: 'toilet',
    description: 'Chống ẩm thâm nhập từ kẽ ron sàn gạch vào tường gạch bọng, bảo vệ cổ ống thoát sàn không bị rỉ nước xuống tầng dưới.',
    layers: [
      'Lớp 1: Bê tông kết cấu mài sạch chân lót bụi bẩn',
      'Lớp 2: Đắp vữa đổ rót Sikagrout quanh cổ ống thoát sàn + dán thanh trương nở SikaSwell',
      'Lớp 3: Quét hồ dầu xi măng dẻo gốc Polymê kết hợp phụ gia Sika Latex chân tường',
      'Lớp 4: Quét lớp chống thấm đàn hồi xi măng 2 thành phần Sikatop Seal 107 dẻo (Lớp thứ 1)',
      'Lớp 5: Quét Sikatop Seal 107 dẻo vuông góc lớp 1 (Lớp thứ 2 độ dày tổng đạt 1.2mm)',
      'Lớp 6: Cán vữa cát bảo vệ chống trầy xước trước khi ốp lát gạch men'
    ],
    materials: [
      { name: 'Sikatop Seal 107 dẻo', brand: 'Sika (Thụy Sĩ)' },
      { name: 'Sika Swellstop thanh trương nở', brand: 'Sika (Thụy Sĩ)' },
      { name: 'Sika Grout 214-11', brand: 'Sika (Thụy Sĩ)' }
    ],
    suitability: 'Nhà tắm căn hộ chung cư, sàn nhà vệ sinh liên kế, bồn hoa ban công, lô gia giặt giũ.',
    warrantyYears: 10
  },
  {
    id: 'method-basement',
    name: 'Giải Pháp Chống Thấm Ngược Tầng Hầm / Hố Pít',
    structureType: 'basement',
    description: 'Ngăn dòng nước ngầm có áp xâm nhập từ ngoài vác móng đất vào hầm bê tông đứng chịu lực nén cực mạnh.',
    layers: [
      'Lớp 1: Bê tông vách hầm đục sạch vữa rỗ tổ ong, phun rào áp lực rửa tinh',
      'Lớp 2: Khoan cấy đầu kim đồng, bơm chặn dòng rò rỉ chủ động bằng keo trương nở PU Polyurethane',
      'Lớp 3: Trám bít vữa xi măng đông cứng nhanh chặn tháo dòng rò rỉ',
      'Lớp 4: Quét phủ hoạt tính chống thấm thẩm thấu xi măng tinh thể Penetron thâm nhập mô rộp bê tông sâu tới 15cm',
      'Lớp 5: Bảo dưỡng ẩm phun sương liên tục 3 ngày để tinh thể liên tục liên kết trám nứt'
    ],
    materials: [
      { name: 'Penetron Activator & Crystal', brand: 'Penetron (Mỹ)' },
      { name: 'PU Foam Polyurethane SL-668', brand: 'Taiwan' },
      { name: 'Sika Monotop R', brand: 'Sika (Thụy Sĩ)' }
    ],
    suitability: 'Hố pít thang máy nhà dân, hầm tòa nhà cao tầng, tường móng đất âm nền xưởng.',
    warrantyYears: 15
  },
  {
    id: 'method-wall',
    name: 'Sơn Chống Thấm Tường Ngoài Lộ Thiên',
    structureType: 'wall',
    description: 'Chống thấm vách tường giáp ranh hàng xóm không trát ngoài được, chống lại nước mưa xiên mùa bão nứt rạn chân chim.',
    layers: [
      'Lớp 1: Bề mặt tường gạch trát phẳng nhám mác vữa cao khô sau 28 ngày',
      'Lớp 2: Lăn 1 lớp sơn lót kháng kiềm gốc acrylic ngoại thất bảo vệ bám dính',
      'Lớp 3: Quét 2-3 lớp vữa chống thấm trộn xi măng gốc Polyme nhũ tương Sika chống rêu mốc',
      'Lớp 4: Xử lý giáp lai liên tường nhà bên cạnh bằng máng tôn xả inox gia cố keo dán chuyên dụng chống xé vách nứt gãy'
    ],
    materials: [
      { name: 'Sikalastic 590 chống bám bẩn', brand: 'Sika (Thụy Sĩ)' },
      { name: 'Sơn lót kháng kiềm ngoại thất', brand: 'Dulux / Jotun' },
      { name: 'Keo dán mối nối Sikaflex 11FC', brand: 'Sika (Thụy Sĩ)' }
    ],
    suitability: 'Tường ngoài của chung cư biệt thự, vách đứng tiếp xúc trực tiếp gió bão mặt ngoài, nách giáp ranh hai tường liền mái sổ.',
    warrantyYears: 5
  }
];
