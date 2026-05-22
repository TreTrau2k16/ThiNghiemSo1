import { Project } from '../types';

export const COMPLETED_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'Biệt Thự Đơn Lập Vinhomes Ocean Park',
    category: 'civil',
    location: 'Gia Lâm, Hà Nội',
    year: 2025,
    area: 320,
    method: 'Bọc phủ màng Polyurethane sika lỏng cao cấp + dán màng khò nóng mặt sàn',
    materialsUsed: ['Sika Lastic 632 R', 'Màng chống thấm khò nóng Kopsh 4mm', 'Sika Primer W'],
    description: 'Xử lý triệt để thấm dột sàn sân thượng bồn hoa, ban công và hố pít thang máy cho biệt thự 3 tầng cao cấp. Bảo vệ kết cấu sàn bê tông ngoài trời chống chọi với thời tiết khắc nghiệt.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
    beforeImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800',
    status: 'Completed',
    solutionsHighlights: [
      'Mài tạo nhám bóc lớp vữa cũ yếu bằng máy mài sàn CN đứng',
      'Xử lý trám trét gia cố khe nứt bằng keo polyurethane gốc PU chuyên sâu',
      'Bo góc chân tường bằng vữa không co ngót Sika Grout',
      'Thi công 3 lớp màng lỏng Polyurethane đạt độ dày định lượng tiêu chuẩn 1.8mm'
    ]
  },
  {
    id: 'proj-2',
    name: 'Tầng Hầm Dự Án Chung Cư Khách Sạn Cao Cấp Gold Star',
    category: 'industrial',
    location: 'Quận 1, TP. Hồ Chí Minh',
    year: 2024,
    area: 2500,
    method: 'Chống thấm ngược vách tầng hầm băng phương pháp bơm epoxy áp lực cao và phủ gốc xi măng tinh thể thẩm thấu',
    materialsUsed: ['Sika Fix 110', 'Penetron Admix', 'Xi măng chống thấm thẩm thấu Aquafin-IC'],
    description: 'Thi công chống thấm ngược vách bê tông tầng hầm sâu 3 tầng dưới lòng đất chịu áp lực nước ngầm lớn. Giải quyết triệt để rò rỉ tại các mạch ngừng thi công và nứt chân chim bê tông.',
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=800',
    beforeImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800',
    status: 'Completed',
    solutionsHighlights: [
      'Khoan cấy van bơm một chiều tại mạch ngừng rò rỉ nước',
      'Bơm keo gốc Polyurethane trương nở chuyên dụng ép nước xù ra ngoài',
      'Đục tẩy vữa rỗ tổ ong, trát bịt vữa đông cứng nhanh chặn dòng',
      'Phun phủ 2 lớp tinh thể xi măng thẩm thấu sâu vào mao dẫn bê tông dày 10-15cm'
    ]
  },
  {
    id: 'proj-3',
    name: 'Nhà Máy Sản Xuất Linh Kiện Điện Tử Samsung',
    category: 'industrial',
    location: 'KCN Yên Phong, Bắc Ninh',
    year: 2025,
    area: 12000,
    method: 'Hệ chống thấm mái tôn nhà xưởng và máng xối composite + sơn nguội chịu tia cực tím',
    materialsUsed: ['Neoroof Polyurea', 'Lưới thủy tinh Polyester gia cường', 'Màng lỏng Neotex Acrylic'],
    description: 'Thi công chống dột, chống rỉ nách tôn máng xối của nhà xưởng lắp ráp quy mô cực lớn. Đảm bảo độ kín khít tuyệt đối 100% tránh gián đoạn sản xuất linh kiện vi mạch nhạy cảm.',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=800',
    status: 'Completed',
    solutionsHighlights: [
      'Thay thế và gia cố toàn bộ hệ vít bắn mái tôn rỉ sét cũ',
      'Dán băng keo butyl chịu nhiệt nách ghép máng xối và tấm bọc máng',
      'Quét màng lỏng đàn hồi cao gia cường lưới thủy tinh chịu lực kéo co giãn nhiệt mòn tôn',
      'Sơn phủ chống nóng phản xạ UV Neoroof giúp giảm 5 độ C nhiệt độ mái tôn xưởng'
    ]
  },
  {
    id: 'proj-4',
    name: 'Sân Thượng Penthouse Ciputra Tây Hồ',
    category: 'civil',
    location: 'Tây Hồ, Hà Nội',
    year: 2025,
    area: 180,
    method: 'Thi công chống thấm lộ thiên bằng sơn Polyurea siêu đàn hồi không cần cán vữa',
    materialsUsed: ['Neoproof Polyurea H', 'Neopox Primer AY', 'Sợi gia cường kháng mài mòn'],
    description: 'Chống thấm sàn mái lộ thiên chịu tác động trực tiếp của mưa nắng và bước chân đi lại cho căn hộ Penthouse. Đảm bảo độ bền thẩm mỹ cao mà không cần đục gạch tốn thời gian.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800',
    beforeImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800',
    status: 'Completed',
    solutionsHighlights: [
      'Mài bóc men gạch bóng kiếng để tạo chân bám liên kết',
      'Sơn lót Epoxy chịu ẩm đặc biệt ngăn phồng rộp',
      'Thi công phủ Polyurea gốc nước 2 thành phần đạt tuổi thọ vật liệu cam kết trên 20 năm',
      'Tạo nhám chống trơn trượt bề mặt sàn bơi lộ thiên ngoài trời'
    ]
  },
  {
    id: 'proj-5',
    name: 'Chống Thấm Toàn Bộ Hệ Thống Bể Bơi & Bể Nước Ngầm KĐT Ciputra',
    category: 'civil',
    location: 'Tây Hồ, Hà Nội',
    year: 2024,
    area: 450,
    method: 'Sử dụng màng xi măng polyme đàn hồi 2 thành phần chịu áp lực nước liên tục',
    materialsUsed: ['Sikatop Seal 107', 'Sika Latex TH làm vữa hồ dầu', 'Băng cản nước Sika Waterbar V20'],
    description: 'Hệ thống hồ bơi vô cực ngoài trời kết hợp bể nước sinh hoạt của cụm dân cư cao cấp cần đảm bảo tuyệt đối không rò rỉ hóa chất ra đất và thất thoát nước tuần hoàn dột hầm bên dưới.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800',
    status: 'Completed',
    solutionsHighlights: [
      'Xử lý cổ ống xuyên sàn bằng thanh trương nở Sika Swellstop dán kết hợp vữa đổ không co ngót SikaGrout 214-11',
      'Gia cố toàn bộ mép góc chân tường bằng lưới thủy tinh kháng kiềm 4x4mm',
      'Sát phủ 2 lớp hỗn hợp dẻo Sikatop Seal 107 gốc xi măng polyme vuông góc chéo nhau chốt khe nứt sàn nén nước vĩnh viễn'
    ]
  },
  {
    id: 'proj-6',
    name: 'Hầm Đường Bộ Nút Giao Thông Ngã Tư Sở',
    category: 'industrial',
    location: 'Thanh Xuân, Hà Nội',
    year: 2023,
    area: 1500,
    method: 'Thi công chống thấm vách, đáy bê tông hầm hở và hầm chui chịu tải trọng nặng giao thông liên tục',
    materialsUsed: ['Màng tự dính Bitum Lemax 2mm', 'Màng khò Bitum 4mm chất lượng xuất khẩu', 'Matit chèn khe khớp nối co giãn'],
    description: 'Bảo vệ kết cấu bê tông cốt thép hầm đường bộ khỏi xâm nhập muối hóa nước ngầm, axit hóa đất nền và rung chấn lưu thông tải trọng xe buýt xe tải liên tục.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800',
    status: 'Completed',
    solutionsHighlights: [
      'Thi công phủ sơn lót Bitum Primer gốc dung môi bám dính cực mạnh lên nền móng bê tông',
      'Dán màng Bitum nóng dày 4mm phủ vách đứng sâu, khò nóng lấp kín mối chồng biên tối thiểu 10cm chống xé màng',
      'Lắp đặt tấm nhựa thoát nước bảo vệ màng chống vật liệu sắc nhọn đè nén dập rách khi lấp đất hoàn trả mặt bằng'
    ]
  }
];
