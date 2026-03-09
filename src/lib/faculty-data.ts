import type { Lang } from './i18n';

export interface ResearchMember {
  name: Record<Lang, string>;
}

export interface CurrentResearch {
  name: Record<Lang, string>;
  summary: Record<Lang, string>;
  members: ResearchMember[];
}

export interface CompletedResearch {
  name: string;
  authors: string;
  abstract: Record<Lang, string>;
  venue: Record<Lang, string>;
  doi: string;
}

export interface Education {
  degree: Record<Lang, string>;
  school: Record<Lang, string>;
  year: number;
  major: Record<Lang, string>;
}

export interface RecruitmentNotice {
  topic: Record<Lang, string>;
  slots: number;
  requirements: Record<Lang, string>;
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
  currentResearches: CurrentResearch[];
  completedResearches: CompletedResearch[];
  education: Education[];
  bio: Record<Lang, string>;
  notices: RecruitmentNotice[];
}

/** Derived: faculty is recruiting if they have at least one notice */
export function isRecruiting(faculty: Faculty): boolean {
  return faculty.notices.length > 0;
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
    education: [
      { degree: { vi: 'Tiến sĩ', en: 'Ph.D.' }, school: { vi: 'Đại học Carnegie Mellon, Mỹ', en: 'Carnegie Mellon University, USA' }, year: 2016, major: { vi: 'Thị giác Máy tính', en: 'Computer Vision' } },
      { degree: { vi: 'Thạc sĩ', en: 'M.Sc.' }, school: { vi: 'Đại học Bách Khoa TP.HCM', en: 'Ho Chi Minh City University of Technology' }, year: 2012, major: { vi: 'Khoa học Máy tính', en: 'Computer Science' } },
      { degree: { vi: 'Cử nhân', en: 'B.Sc.' }, school: { vi: 'Đại học Bách Khoa TP.HCM', en: 'Ho Chi Minh City University of Technology' }, year: 2010, major: { vi: 'Công nghệ Thông tin', en: 'Information Technology' } },
    ],
    currentResearches: [
      {
        name: { vi: 'VinDr-CXR: Phát hiện bất thường trên ảnh X-quang ngực', en: 'VinDr-CXR: Chest X-ray Abnormality Detection' },
        summary: { vi: 'Phát triển hệ thống AI phát hiện bất thường trên ảnh X-quang ngực, hợp tác với VinBigData. Đạt AUC 0.95 trên bộ dữ liệu 18,000 ảnh.', en: 'Developed an AI system for detecting abnormalities in chest X-ray images, in collaboration with VinBigData. Achieved AUC of 0.95 on 18,000 images.' },
        members: [
          { name: { vi: 'Phạm Minh Đức', en: 'Pham Minh Duc' } },
          { name: { vi: 'Lý Thị Hoa', en: 'Ly Thi Hoa' } },
        ],
      },
      {
        name: { vi: 'Smart Traffic HCMC: Phân tích giao thông realtime', en: 'Smart Traffic HCMC: Real-time Traffic Analysis' },
        summary: { vi: 'Ứng dụng Computer Vision phân tích luồng giao thông realtime tại TP.HCM, hợp tác với Sở GTVT.', en: 'Computer Vision application for real-time traffic flow analysis in Ho Chi Minh City, in collaboration with the Department of Transport.' },
        members: [
          { name: { vi: 'Nguyễn Hoàng', en: 'Nguyen Hoang' } },
          { name: { vi: 'Vũ Anh Tuấn', en: 'Vu Anh Tuan' } },
          { name: { vi: 'Đỗ Mai Linh', en: 'Do Mai Linh' } },
        ],
      },
      {
        name: { vi: 'FPT-FaceID: Nhận diện khuôn mặt điểm danh', en: 'FPT-FaceID: Facial Recognition Attendance' },
        summary: { vi: 'Xây dựng hệ thống nhận diện khuôn mặt cho điểm danh tự động tại các campus FPT University.', en: 'Built a facial recognition system for automatic attendance at FPT University campuses.' },
        members: [
          { name: { vi: 'Trần Quốc Bảo', en: 'Tran Quoc Bao' } },
        ],
      },
    ],
    completedResearches: [
      {
        name: 'Lung Cancer Detection with Deep Learning',
        authors: 'Nguyen Van An, Tran Quoc Huy, Le Thi Minh Anh',
        abstract: { vi: 'Nghiên cứu ứng dụng mạng CNN trong phát hiện sớm ung thư phổi từ ảnh CT scan, đạt độ chính xác 94.2% trên bộ dữ liệu LIDC-IDRI.', en: 'Research on CNN application for early lung cancer detection from CT images, achieving 94.2% accuracy on the LIDC-IDRI dataset.' },
        venue: { vi: 'MICCAI 2022', en: 'MICCAI 2022' },
        doi: 'https://doi.org/10.1007/978-3-031-16431-6_01',
      },
      {
        name: 'Lightweight Model Optimization for Edge Devices',
        authors: 'Nguyen Van An, Pham Minh Duc, Hoang Thi Nga',
        abstract: { vi: 'Nghiên cứu kỹ thuật pruning và quantization để triển khai mô hình CV trên thiết bị IoT, giảm 60% kích thước mô hình mà chỉ giảm 1.5% accuracy.', en: 'Research on pruning and quantization techniques for deploying CV models on IoT devices, reducing model size by 60% with only 1.5% accuracy drop.' },
        venue: { vi: 'CVPR Workshop 2021', en: 'CVPR Workshop 2021' },
        doi: 'https://doi.org/10.1109/CVPRW53098.2021.00123',
      },
    ],
    bio: {
      vi: 'TS. Nguyễn Văn An tốt nghiệp Tiến sĩ tại Đại học Carnegie Mellon (Mỹ) năm 2016 chuyên ngành Computer Vision. Ông có hơn 30 bài báo được công bố tại các hội nghị hàng đầu như CVPR, ICCV, ECCV. Trước khi gia nhập FPT University, TS. An từng là nghiên cứu viên tại Google Research trong 3 năm.',
      en: 'Dr. Nguyen Van An received his PhD from Carnegie Mellon University (USA) in 2016, specializing in Computer Vision. He has published over 30 papers at top conferences including CVPR, ICCV, and ECCV. Before joining FPT University, Dr. An was a researcher at Google Research for 3 years.',
    },
    notices: [
      {
        topic: { vi: 'Hệ thống AI phát hiện bệnh võng mạc từ ảnh fundus', en: 'AI system for retinal disease detection from fundus images' },
        slots: 2,
        requirements: { vi: 'Đã hoàn thành môn Học Sâu, GPA >= 3.2, có kinh nghiệm Python/PyTorch', en: 'Completed Deep Learning course, GPA >= 3.2, Python/PyTorch experience' },
      },
    ],
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
    education: [
      { degree: { vi: 'Tiến sĩ', en: 'Ph.D.' }, school: { vi: 'Đại học Edinburgh, Vương quốc Anh', en: 'University of Edinburgh, UK' }, year: 2018, major: { vi: 'Xử lý Ngôn ngữ Tự nhiên', en: 'Natural Language Processing' } },
      { degree: { vi: 'Thạc sĩ', en: 'M.Sc.' }, school: { vi: 'Đại học Khoa học Tự nhiên TP.HCM', en: 'University of Science, HCMC' }, year: 2014, major: { vi: 'Khoa học Máy tính', en: 'Computer Science' } },
      { degree: { vi: 'Cử nhân', en: 'B.Sc.' }, school: { vi: 'Đại học Khoa học Tự nhiên TP.HCM', en: 'University of Science, HCMC' }, year: 2012, major: { vi: 'Toán - Tin học', en: 'Mathematics & Computer Science' } },
    ],
    currentResearches: [
      {
        name: { vi: 'VietnameseNLP: Bộ công cụ NLP mã nguồn mở', en: 'VietnameseNLP: Open-source NLP Toolkit' },
        summary: { vi: 'Xây dựng bộ công cụ NLP mã nguồn mở cho tiếng Việt, bao gồm tokenizer, NER, và sentiment analysis. Hơn 2,000 stars trên GitHub.', en: 'Built an open-source NLP toolkit for Vietnamese, including tokenizer, NER, and sentiment analysis. Over 2,000 stars on GitHub.' },
        members: [
          { name: { vi: 'Lê Thị Mai', en: 'Le Thi Mai' } },
          { name: { vi: 'Hoàng Văn Nam', en: 'Hoang Van Nam' } },
        ],
      },
      {
        name: { vi: 'EduBot: Chatbot tư vấn học tập', en: 'EduBot: Academic Advising Chatbot' },
        summary: { vi: 'Chatbot AI hỗ trợ tư vấn học tập cho sinh viên FPT, sử dụng RAG và fine-tuned LLM trên dữ liệu giáo dục.', en: 'AI chatbot for student academic advising at FPT, using RAG and fine-tuned LLM on educational data.' },
        members: [
          { name: { vi: 'Phạm Hữu Trí', en: 'Pham Huu Tri' } },
          { name: { vi: 'Đặng Thị Hằng', en: 'Dang Thi Hang' } },
          { name: { vi: 'Lê Minh Quân', en: 'Le Minh Quan' } },
        ],
      },
      {
        name: { vi: 'Tóm tắt văn bản pháp luật tự động', en: 'Automatic Legal Text Summarization' },
        summary: { vi: 'Hệ thống tóm tắt tự động cho tài liệu pháp luật Việt Nam sử dụng fine-tuned LLM.', en: 'Automatic summarization system for Vietnamese legal documents using fine-tuned LLM.' },
        members: [
          { name: { vi: 'Nguyễn Thị Lan Anh', en: 'Nguyen Thi Lan Anh' } },
        ],
      },
    ],
    completedResearches: [
      {
        name: 'PhoBERT: Pre-trained Language Model for Vietnamese',
        authors: 'Tran Thi Binh, Dat Quoc Nguyen, Anh Tuan Nguyen',
        abstract: { vi: 'Đóng góp vào việc fine-tune mô hình PhoBERT cho các tác vụ NLP tiếng Việt, đạt SOTA trên 4 benchmark tiếng Việt.', en: 'Contributed to fine-tuning PhoBERT model for Vietnamese NLP tasks, achieving SOTA on 4 Vietnamese benchmarks.' },
        venue: { vi: 'ACL 2020', en: 'ACL 2020' },
        doi: 'https://doi.org/10.18653/v1/2020.findings-emnlp.92',
      },
      {
        name: 'Vietnamese Social Media Sentiment Analysis',
        authors: 'Tran Thi Binh, Le Thi Mai, Hoang Van Nam',
        abstract: { vi: 'Xây dựng bộ dữ liệu 50,000 bình luận và mô hình phân tích cảm xúc đa lớp, đạt F1-score 87.3%.', en: 'Built a 50,000-comment dataset and multi-class sentiment analysis model, achieving F1-score of 87.3%.' },
        venue: { vi: 'EMNLP 2021', en: 'EMNLP 2021' },
        doi: 'https://doi.org/10.18653/v1/2021.emnlp-main.456',
      },
    ],
    bio: {
      vi: 'TS. Trần Thị Bình nhận bằng Tiến sĩ tại Đại học Edinburgh (Vương quốc Anh) năm 2018, chuyên ngành NLP. Bà là tác giả của hơn 20 bài báo tại ACL, EMNLP, NAACL. TS. Bình cũng là người sáng lập cộng đồng Vietnamese AI, quy tụ hơn 5,000 thành viên.',
      en: 'Dr. Tran Thi Binh received her PhD from the University of Edinburgh (UK) in 2018, specializing in NLP. She has authored over 20 papers at ACL, EMNLP, and NAACL. Dr. Binh is also the founder of the Vietnamese AI community, with over 5,000 members.',
    },
    notices: [
      {
        topic: { vi: 'Fine-tuning LLM cho hệ thống hỏi đáp y tế tiếng Việt', en: 'Fine-tuning LLM for Vietnamese medical Q&A system' },
        slots: 3,
        requirements: { vi: 'Kinh nghiệm với Hugging Face Transformers, GPA >= 3.0', en: 'Experience with Hugging Face Transformers, GPA >= 3.0' },
      },
      {
        topic: { vi: 'Chatbot tư vấn tuyển sinh đại học sử dụng RAG', en: 'University admission advising chatbot using RAG' },
        slots: 2,
        requirements: { vi: 'Kiến thức về LangChain/LlamaIndex, có kinh nghiệm làm việc với API', en: 'Knowledge of LangChain/LlamaIndex, API experience' },
      },
    ],
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
    education: [
      { degree: { vi: 'Tiến sĩ', en: 'Ph.D.' }, school: { vi: 'ETH Zurich, Thụy Sĩ', en: 'ETH Zurich, Switzerland' }, year: 2014, major: { vi: 'Robotics & Autonomous Systems', en: 'Robotics & Autonomous Systems' } },
      { degree: { vi: 'Thạc sĩ', en: 'M.Sc.' }, school: { vi: 'Đại học Bách Khoa Hà Nội', en: 'Hanoi University of Science and Technology' }, year: 2010, major: { vi: 'Kỹ thuật Điều khiển & Tự động hóa', en: 'Control Engineering & Automation' } },
      { degree: { vi: 'Cử nhân', en: 'B.Sc.' }, school: { vi: 'Đại học Bách Khoa Hà Nội', en: 'Hanoi University of Science and Technology' }, year: 2008, major: { vi: 'Cơ điện tử', en: 'Mechatronics' } },
    ],
    currentResearches: [
      {
        name: { vi: 'FPT-Drone: Drone tự hành cho nông nghiệp chính xác', en: 'FPT-Drone: Autonomous Drones for Precision Agriculture' },
        summary: { vi: 'Phát triển drone tự hành sử dụng Deep RL cho khảo sát nông nghiệp chính xác. Đã triển khai thử nghiệm tại 3 tỉnh Đồng bằng sông Cửu Long.', en: 'Developed autonomous drones using Deep RL for precision agriculture surveys. Piloted across 3 provinces in the Mekong Delta.' },
        members: [
          { name: { vi: 'Võ Thành Đạt', en: 'Vo Thanh Dat' } },
          { name: { vi: 'Bùi Minh Khoa', en: 'Bui Minh Khoa' } },
        ],
      },
      {
        name: { vi: 'MultiAgent-Warehouse: Điều phối đa robot', en: 'MultiAgent-Warehouse: Multi-robot Coordination' },
        summary: { vi: 'Hệ thống điều phối đa robot trong kho hàng thông minh, tối ưu đường đi bằng MARL. Hợp tác với Lazada Logistics.', en: 'Multi-robot coordination system in smart warehouses, path optimization using MARL. In collaboration with Lazada Logistics.' },
        members: [
          { name: { vi: 'Lê Đình Phúc', en: 'Le Dinh Phuc' } },
          { name: { vi: 'Nguyễn Thị Yến', en: 'Nguyen Thi Yen' } },
          { name: { vi: 'Hoàng Gia Bảo', en: 'Hoang Gia Bao' } },
          { name: { vi: 'Đỗ Văn Kiên', en: 'Do Van Kien' } },
        ],
      },
      {
        name: { vi: 'SimToReal: Transfer Learning mô phỏng sang thực tế', en: 'SimToReal: Simulation to Reality Transfer' },
        summary: { vi: 'Nghiên cứu transfer learning từ môi trường mô phỏng sang robot thực, giảm 70% thời gian huấn luyện.', en: 'Research on transfer learning from simulation to real robots, reducing training time by 70%.' },
        members: [
          { name: { vi: 'Trương Quang Huy', en: 'Truong Quang Huy' } },
          { name: { vi: 'Phan Thị Ngọc Ánh', en: 'Phan Thi Ngoc Anh' } },
        ],
      },
    ],
    completedResearches: [
      {
        name: { vi: 'Điều hướng robot trong môi trường động', en: 'Robot Navigation in Dynamic Environments' },
        abstract: { vi: 'Nghiên cứu thuật toán RL cho robot di chuyển trong môi trường có chướng ngại vật động, đạt tỉ lệ thành công 96.8%.', en: 'Research on RL algorithms for robot navigation with dynamic obstacles, achieving 96.8% success rate.' },
        venue: { vi: 'ICRA 2020', en: 'ICRA 2020' },
        doi: 'https://doi.org/10.1109/ICRA40945.2020.9196789',
      },
      {
        name: { vi: 'Tối ưu năng lượng UAV bằng Deep RL', en: 'Energy-Efficient UAV Control with Deep RL' },
        abstract: { vi: 'Phát triển phương pháp điều khiển bay tiết kiệm năng lượng cho drone sử dụng PPO, giảm 35% tiêu thụ pin. Best Paper Award.', en: 'Developed energy-saving flight control method for drones using PPO, reducing battery consumption by 35%. Best Paper Award.' },
        venue: { vi: 'IROS 2019', en: 'IROS 2019' },
        doi: 'https://doi.org/10.1109/IROS40897.2019.8967654',
      },
      {
        name: { vi: 'Cooperative Multi-Agent RL cho logistics', en: 'Cooperative Multi-Agent RL for Logistics' },
        abstract: { vi: 'Hệ thống phân phối hàng hóa đa robot trong kho, tăng 40% hiệu suất so với phương pháp truyền thống.', en: 'Multi-robot goods distribution system in warehouses, 40% efficiency improvement over traditional methods.' },
        venue: { vi: 'NeurIPS 2021', en: 'NeurIPS 2021' },
        doi: 'https://doi.org/10.48550/arXiv.2110.12345',
      },
    ],
    bio: {
      vi: 'PGS.TS. Lê Văn Cường là Phó Giáo sư tại Đại học FPT, tốt nghiệp Tiến sĩ tại ETH Zurich (Thụy Sĩ) năm 2014. Ông có hơn 50 bài báo tại các tạp chí và hội nghị quốc tế như ICRA, IROS, NeurIPS. PGS.TS. Cường từng nhận giải Best Paper tại IROS 2019.',
      en: 'Assoc. Prof. Le Van Cuong is an Associate Professor at FPT University, having received his PhD from ETH Zurich (Switzerland) in 2014. He has published over 50 papers in international journals and conferences including ICRA, IROS, and NeurIPS. He received the Best Paper Award at IROS 2019.',
    },
    notices: [],
  },
];
