import type { Lang } from './i18n';

export interface StudentInfo {
  name: Record<Lang, string>;
  topic: Record<Lang, string>;
}

export interface Faculty {
  id: string;
  name: string;
  title: Record<Lang, string>;
  email: string;
  phone: string;
  image: string;
  researchAreas: Record<Lang, string[]>;
  courses: Record<Lang, string[]>;
  projects: Record<Lang, { name: string; desc: string }[]>;
  completedResearch: Record<Lang, { name: string; desc: string }[]>;
  students: StudentInfo[];
  bio: Record<Lang, string>;
  announcement: Record<Lang, string>;
}

export const facultyData: Faculty[] = [
  {
    id: 'nguyen-van-a',
    name: 'TS. Nguyễn Văn An',
    title: {
      vi: 'Trưởng Bộ môn Trí tuệ Nhân tạo',
      en: 'Head of Department of Artificial Intelligence',
    },
    email: 'an.nv@fpt.edu.vn',
    phone: '(028) 7300 5588 - Ext: 1234',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    researchAreas: {
      vi: ['Thị giác Máy tính (Computer Vision)', 'Học Sâu (Deep Learning)', 'Xử lý ảnh y tế', 'Nhận dạng đối tượng', 'Phân đoạn ảnh ngữ nghĩa'],
      en: ['Computer Vision', 'Deep Learning', 'Medical Image Processing', 'Object Detection', 'Semantic Segmentation'],
    },
    courses: {
      vi: ['Nhập môn Trí tuệ Nhân tạo', 'Thị giác Máy tính', 'Học Sâu Nâng cao', 'Đồ án Chuyên ngành AI'],
      en: ['Introduction to AI', 'Computer Vision', 'Advanced Deep Learning', 'AI Capstone Project'],
    },
    projects: {
      vi: [
        { name: 'VinDr-CXR', desc: 'Phát triển hệ thống AI phát hiện bất thường trên ảnh X-quang ngực, hợp tác với VinBigData. Đạt AUC 0.95 trên bộ dữ liệu 18,000 ảnh.' },
        { name: 'Smart Traffic HCMC', desc: 'Ứng dụng Computer Vision phân tích luồng giao thông realtime tại TP.HCM, hợp tác với Sở GTVT.' },
        { name: 'FPT-FaceID', desc: 'Xây dựng hệ thống nhận diện khuôn mặt cho điểm danh tự động tại các campus FPT University.' },
      ],
      en: [
        { name: 'VinDr-CXR', desc: 'Developed an AI system for detecting abnormalities in chest X-ray images, in collaboration with VinBigData. Achieved AUC of 0.95 on 18,000 images.' },
        { name: 'Smart Traffic HCMC', desc: 'Computer Vision application for real-time traffic flow analysis in Ho Chi Minh City, in collaboration with the Department of Transport.' },
        { name: 'FPT-FaceID', desc: 'Built a facial recognition system for automatic attendance at FPT University campuses.' },
      ],
    },
    completedResearch: {
      vi: [
        { name: 'Phát hiện ung thư phổi bằng Deep Learning', desc: 'Nghiên cứu ứng dụng mạng CNN trong phát hiện sớm ung thư phổi từ ảnh CT. Công bố tại MICCAI 2022.' },
        { name: 'Tối ưu mô hình nhẹ cho thiết bị edge', desc: 'Nghiên cứu kỹ thuật pruning và quantization để triển khai mô hình CV trên thiết bị IoT. Công bố tại CVPR Workshop 2021.' },
      ],
      en: [
        { name: 'Lung Cancer Detection with Deep Learning', desc: 'Research on CNN application for early lung cancer detection from CT images. Published at MICCAI 2022.' },
        { name: 'Lightweight Model Optimization for Edge Devices', desc: 'Research on pruning and quantization techniques for deploying CV models on IoT devices. Published at CVPR Workshop 2021.' },
      ],
    },
    students: [
      { name: { vi: 'Nhóm MedAI (Phạm Minh Đức, Lý Thị Hoa)', en: 'MedAI Group (Pham Minh Duc, Ly Thi Hoa)' }, topic: { vi: 'Phát hiện bệnh võng mạc từ ảnh fundus bằng Vision Transformer', en: 'Retinal disease detection from fundus images using Vision Transformer' } },
      { name: { vi: 'Trần Quốc Bảo', en: 'Tran Quoc Bao' }, topic: { vi: 'Phân đoạn ảnh y tế 3D sử dụng U-Net cải tiến', en: '3D medical image segmentation using improved U-Net' } },
      { name: { vi: 'Nhóm SmartCam (Nguyễn Hoàng, Vũ Anh Tuấn, Đỗ Mai Linh)', en: 'SmartCam Group (Nguyen Hoang, Vu Anh Tuan, Do Mai Linh)' }, topic: { vi: 'Hệ thống giám sát giao thông thông minh realtime', en: 'Real-time smart traffic monitoring system' } },
    ],
    bio: {
      vi: 'TS. Nguyễn Văn An tốt nghiệp Tiến sĩ tại Đại học Carnegie Mellon (Mỹ) năm 2016 chuyên ngành Computer Vision. Ông có hơn 30 bài báo được công bố tại các hội nghị hàng đầu như CVPR, ICCV, ECCV. Trước khi gia nhập FPT University, TS. An từng là nghiên cứu viên tại Google Research trong 3 năm.',
      en: 'Dr. Nguyen Van An received his PhD from Carnegie Mellon University (USA) in 2016, specializing in Computer Vision. He has published over 30 papers at top conferences including CVPR, ICCV, and ECCV. Before joining FPT University, Dr. An was a researcher at Google Research for 3 years.',
    },
    announcement: {
      vi: '🔬 Đang tuyển 2 sinh viên nghiên cứu cho dự án Medical AI (2026-2027). Yêu cầu: Đã hoàn thành môn Học Sâu, GPA >= 3.2, có kinh nghiệm Python/PyTorch. Liên hệ qua email trước 30/06/2026.',
      en: '🔬 Recruiting 2 research students for the Medical AI project (2026-2027). Requirements: Completed Deep Learning course, GPA >= 3.2, Python/PyTorch experience. Contact via email before June 30, 2026.',
    },
  },
  {
    id: 'tran-thi-b',
    name: 'TS. Trần Thị Bình',
    title: {
      vi: 'Phó Trưởng Bộ môn - Phụ trách Nghiên cứu',
      en: 'Deputy Head - Research Director',
    },
    email: 'binh.tt@fpt.edu.vn',
    phone: '(028) 7300 5588 - Ext: 1235',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
    researchAreas: {
      vi: ['Xử lý Ngôn ngữ Tự nhiên (NLP)', 'Mô hình Ngôn ngữ Lớn (LLM)', 'AI trong Giáo dục', 'Phân tích Cảm xúc', 'Dịch máy'],
      en: ['Natural Language Processing (NLP)', 'Large Language Models (LLM)', 'AI in Education', 'Sentiment Analysis', 'Machine Translation'],
    },
    courses: {
      vi: ['Xử lý Ngôn ngữ Tự nhiên', 'Học Máy', 'Khai phá Dữ liệu Văn bản', 'Seminar Nghiên cứu AI'],
      en: ['Natural Language Processing', 'Machine Learning', 'Text Mining', 'AI Research Seminar'],
    },
    projects: {
      vi: [
        { name: 'VietnameseNLP', desc: 'Xây dựng bộ công cụ NLP mã nguồn mở cho tiếng Việt, bao gồm tokenizer, NER, và sentiment analysis. Hơn 2,000 stars trên GitHub.' },
        { name: 'EduBot', desc: 'Chatbot AI hỗ trợ tư vấn học tập cho sinh viên FPT, sử dụng RAG và fine-tuned LLM trên dữ liệu giáo dục.' },
      ],
      en: [
        { name: 'VietnameseNLP', desc: 'Built an open-source NLP toolkit for Vietnamese, including tokenizer, NER, and sentiment analysis. Over 2,000 stars on GitHub.' },
        { name: 'EduBot', desc: 'AI chatbot for student academic advising at FPT, using RAG and fine-tuned LLM on educational data.' },
      ],
    },
    completedResearch: {
      vi: [
        { name: 'PhoBERT: Pre-trained Language Model cho tiếng Việt', desc: 'Đóng góp vào việc fine-tune mô hình PhoBERT cho các tác vụ NLP tiếng Việt. Công bố tại ACL 2020.' },
        { name: 'Phân tích cảm xúc mạng xã hội Việt Nam', desc: 'Xây dựng bộ dữ liệu 50,000 bình luận và mô hình phân tích cảm xúc đa lớp. Công bố tại EMNLP 2021.' },
      ],
      en: [
        { name: 'PhoBERT: Pre-trained Language Model for Vietnamese', desc: 'Contributed to fine-tuning PhoBERT model for Vietnamese NLP tasks. Published at ACL 2020.' },
        { name: 'Vietnamese Social Media Sentiment Analysis', desc: 'Built a 50,000-comment dataset and multi-class sentiment analysis model. Published at EMNLP 2021.' },
      ],
    },
    students: [
      { name: { vi: 'Nhóm NLP Lab (Lê Thị Mai, Hoàng Văn Nam)', en: 'NLP Lab Group (Le Thi Mai, Hoang Van Nam)' }, topic: { vi: 'Fine-tuning LLM cho hệ thống hỏi đáp y tế tiếng Việt', en: 'Fine-tuning LLM for Vietnamese medical Q&A system' } },
      { name: { vi: 'Nguyễn Thị Lan Anh', en: 'Nguyen Thi Lan Anh' }, topic: { vi: 'Tóm tắt văn bản tự động cho tài liệu pháp luật', en: 'Automatic text summarization for legal documents' } },
      { name: { vi: 'Nhóm EduAI (Phạm Hữu Trí, Đặng Thị Hằng, Lê Minh Quân)', en: 'EduAI Group (Pham Huu Tri, Dang Thi Hang, Le Minh Quan)' }, topic: { vi: 'Chatbot tư vấn tuyển sinh đại học sử dụng RAG', en: 'University admission advising chatbot using RAG' } },
    ],
    bio: {
      vi: 'TS. Trần Thị Bình nhận bằng Tiến sĩ tại Đại học Edinburgh (Vương quốc Anh) năm 2018, chuyên ngành NLP. Bà là tác giả của hơn 20 bài báo tại ACL, EMNLP, NAACL. TS. Bình cũng là người sáng lập cộng đồng Vietnamese AI, quy tụ hơn 5,000 thành viên.',
      en: 'Dr. Tran Thi Binh received her PhD from the University of Edinburgh (UK) in 2018, specializing in NLP. She has authored over 20 papers at ACL, EMNLP, and NAACL. Dr. Binh is also the founder of the Vietnamese AI community, with over 5,000 members.',
    },
    announcement: {
      vi: '📚 Tuyển 3 sinh viên tham gia dự án LLM cho tiếng Việt (học kỳ Fall 2026). Ưu tiên sinh viên có kinh nghiệm với Hugging Face Transformers. Gửi CV và transcript qua email.',
      en: '📚 Recruiting 3 students for Vietnamese LLM project (Fall 2026 semester). Priority for students with Hugging Face Transformers experience. Send CV and transcript via email.',
    },
  },
  {
    id: 'le-van-c',
    name: 'PGS.TS. Lê Văn Cường',
    title: {
      vi: 'Giảng viên Cao cấp - Trưởng nhóm Robotics & RL',
      en: 'Senior Lecturer - Head of Robotics & RL Group',
    },
    email: 'cuong.lv@fpt.edu.vn',
    phone: '(028) 7300 5588 - Ext: 1236',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    researchAreas: {
      vi: ['Học Tăng cường (Reinforcement Learning)', 'Robot Tự hành', 'Hệ thống Multi-Agent', 'Điều khiển thông minh', 'Sim-to-Real Transfer'],
      en: ['Reinforcement Learning', 'Autonomous Robotics', 'Multi-Agent Systems', 'Intelligent Control', 'Sim-to-Real Transfer'],
    },
    courses: {
      vi: ['Học Tăng cường', 'Robot học', 'Toán cho AI', 'Hệ thống Thông minh'],
      en: ['Reinforcement Learning', 'Robotics', 'Mathematics for AI', 'Intelligent Systems'],
    },
    projects: {
      vi: [
        { name: 'FPT-Drone', desc: 'Phát triển drone tự hành sử dụng Deep RL cho khảo sát nông nghiệp chính xác. Đã triển khai thử nghiệm tại 3 tỉnh Đồng bằng sông Cửu Long.' },
        { name: 'MultiAgent-Warehouse', desc: 'Hệ thống điều phối đa robot trong kho hàng thông minh, tối ưu đường đi bằng MARL. Hợp tác với Lazada Logistics.' },
        { name: 'SimToReal', desc: 'Nghiên cứu transfer learning từ môi trường mô phỏng sang robot thực, giảm 70% thời gian huấn luyện.' },
      ],
      en: [
        { name: 'FPT-Drone', desc: 'Developed autonomous drones using Deep RL for precision agriculture surveys. Piloted across 3 provinces in the Mekong Delta.' },
        { name: 'MultiAgent-Warehouse', desc: 'Multi-robot coordination system in smart warehouses, path optimization using MARL. In collaboration with Lazada Logistics.' },
        { name: 'SimToReal', desc: 'Research on transfer learning from simulation to real robots, reducing training time by 70%.' },
      ],
    },
    completedResearch: {
      vi: [
        { name: 'Điều hướng robot trong môi trường động', desc: 'Nghiên cứu thuật toán RL cho robot di chuyển trong môi trường có chướng ngại vật động. Công bố tại ICRA 2020.' },
        { name: 'Tối ưu năng lượng UAV bằng Deep RL', desc: 'Phát triển phương pháp điều khiển bay tiết kiệm năng lượng cho drone sử dụng PPO. Best Paper tại IROS 2019.' },
        { name: 'Cooperative Multi-Agent RL cho logistics', desc: 'Hệ thống phân phối hàng hóa đa robot trong kho. Công bố tại NeurIPS 2021.' },
      ],
      en: [
        { name: 'Robot Navigation in Dynamic Environments', desc: 'Research on RL algorithms for robot navigation with dynamic obstacles. Published at ICRA 2020.' },
        { name: 'Energy-Efficient UAV Control with Deep RL', desc: 'Developed energy-saving flight control method for drones using PPO. Best Paper at IROS 2019.' },
        { name: 'Cooperative Multi-Agent RL for Logistics', desc: 'Multi-robot goods distribution system in warehouses. Published at NeurIPS 2021.' },
      ],
    },
    students: [
      { name: { vi: 'Nhóm Drone Lab (Võ Thành Đạt, Bùi Minh Khoa)', en: 'Drone Lab Group (Vo Thanh Dat, Bui Minh Khoa)' }, topic: { vi: 'Tối ưu đường bay drone nông nghiệp bằng Multi-Agent RL', en: 'Agricultural drone flight path optimization using Multi-Agent RL' } },
      { name: { vi: 'Trương Quang Huy', en: 'Truong Quang Huy' }, topic: { vi: 'Sim-to-Real transfer cho cánh tay robot gắp vật thể', en: 'Sim-to-Real transfer for robotic arm grasping' } },
      { name: { vi: 'Nhóm Warehouse (Lê Đình Phúc, Nguyễn Thị Yến, Hoàng Gia Bảo, Đỗ Văn Kiên)', en: 'Warehouse Group (Le Dinh Phuc, Nguyen Thi Yen, Hoang Gia Bao, Do Van Kien)' }, topic: { vi: 'Hệ thống điều phối AGV trong nhà kho thông minh', en: 'AGV coordination system in smart warehouses' } },
      { name: { vi: 'Phan Thị Ngọc Ánh', en: 'Phan Thi Ngoc Anh' }, topic: { vi: 'Học tăng cường an toàn cho robot trong môi trường có người', en: 'Safe reinforcement learning for robots in human environments' } },
    ],
    bio: {
      vi: 'PGS.TS. Lê Văn Cường là Phó Giáo sư tại Đại học FPT, tốt nghiệp Tiến sĩ tại ETH Zurich (Thụy Sĩ) năm 2014. Ông có hơn 50 bài báo tại các tạp chí và hội nghị quốc tế như ICRA, IROS, NeurIPS. PGS.TS. Cường từng nhận giải Best Paper tại IROS 2019.',
      en: 'Assoc. Prof. Le Van Cuong is an Associate Professor at FPT University, having received his PhD from ETH Zurich (Switzerland) in 2014. He has published over 50 papers in international journals and conferences including ICRA, IROS, and NeurIPS. He received the Best Paper Award at IROS 2019.',
    },
    announcement: {
      vi: '🤖 Lab Robotics đang tuyển sinh viên nghiên cứu khóa 2026. Cần 4 vị trí: 2 RL Engineer, 1 Robot Perception, 1 System Integration. Yêu cầu GPA >= 3.0, có passion về robotics. Phỏng vấn trực tiếp tại Lab C301.',
      en: '🤖 Robotics Lab is recruiting research students for 2026. 4 positions: 2 RL Engineers, 1 Robot Perception, 1 System Integration. Requirements: GPA >= 3.0, passion for robotics. In-person interviews at Lab C301.',
    },
  },
];
