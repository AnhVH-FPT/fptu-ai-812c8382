import { useState, useCallback } from 'react';

export type Lang = 'vi' | 'en';

const LANG_KEY = 'fpt-ai-lang';

export function getSavedLang(): Lang {
  if (typeof window === 'undefined') return 'vi';
  return (localStorage.getItem(LANG_KEY) as Lang) || 'vi';
}

export function saveLang(lang: Lang) {
  localStorage.setItem(LANG_KEY, lang);
}

export function useLang() {
  const [lang, setLangState] = useState<Lang>(getSavedLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    saveLang(l);
  }, []);

  return { lang, setLang };
}

export function t(translations: Record<Lang, string>, lang: Lang): string {
  return translations[lang] || translations.vi;
}

// Centralized translations
export const translations = {
  nav: {
    home: { vi: 'Trang chủ', en: 'Home' },
    faculty: { vi: 'Giảng viên', en: 'Faculty' },
    about: { vi: 'Về bộ môn', en: 'About' },
    contact: { vi: 'Liên hệ', en: 'Contact' },
  },
  hero: {
    badge: { vi: 'Đại học FPT TP.HCM — Bộ môn Trí tuệ Nhân tạo', en: 'FPT University HCMC — Department of Artificial Intelligence' },
    title1: { vi: 'Kiến tạo Tương lai', en: 'Shaping the Future' },
    title2: { vi: 'với Trí tuệ Nhân tạo', en: 'with Artificial Intelligence' },
    subtitle: { vi: 'Chương trình đào tạo AI tiên phong, kết hợp nghiên cứu chuyên sâu và thực hành dự án thực tế, chuẩn bị cho sinh viên trở thành lãnh đạo công nghệ tương lai.', en: 'A pioneering AI training program combining in-depth research with real-world project experience, preparing students to become future technology leaders.' },
    cta1: { vi: 'Tìm hiểu chương trình', en: 'Explore Program' },
    cta2: { vi: 'Gặp gỡ giảng viên', en: 'Meet Our Faculty' },
  },
  highlights: {
    title: { vi: 'Tại sao chọn AI tại FPT?', en: 'Why Choose AI at FPT?' },
    h1Title: { vi: 'Chương trình cập nhật', en: 'Updated Curriculum' },
    h1Desc: { vi: 'Giáo trình được cập nhật liên tục theo xu hướng AI mới nhất từ các đối tác công nghệ hàng đầu thế giới.', en: 'Curriculum continuously updated with the latest AI trends from world-leading technology partners.' },
    h2Title: { vi: 'Nghiên cứu chuyên sâu', en: 'In-depth Research' },
    h2Desc: { vi: 'Phòng lab hiện đại với GPU clusters, hỗ trợ sinh viên tham gia các dự án nghiên cứu quốc tế.', en: 'Modern labs with GPU clusters, supporting students in international research projects.' },
    h3Title: { vi: 'Kết nối doanh nghiệp', en: 'Industry Connection' },
    h3Desc: { vi: 'Hợp tác chặt chẽ với FPT Software, VinAI, và các tập đoàn công nghệ trong nước và quốc tế.', en: 'Close collaboration with FPT Software, VinAI, and domestic & international tech corporations.' },
    h4Title: { vi: 'Cơ hội việc làm', en: 'Career Opportunities' },
    h4Desc: { vi: '95% sinh viên có việc làm trong vòng 3 tháng sau tốt nghiệp với mức lương cạnh tranh.', en: '95% of graduates employed within 3 months of graduation with competitive salaries.' },
  },
  about: {
    pageTitle: { vi: 'Về Bộ môn Trí tuệ Nhân tạo', en: 'About the Department of Artificial Intelligence' },
    historyTitle: { vi: 'Lịch sử hình thành', en: 'Our History' },
    historyText: { vi: 'Bộ môn Trí tuệ Nhân tạo được thành lập năm 2019 tại Đại học FPT TP.HCM, là một trong những bộ môn tiên phong trong đào tạo AI tại Việt Nam. Với sứ mệnh đào tạo nguồn nhân lực chất lượng cao cho ngành AI, bộ môn đã phát triển mạnh mẽ với đội ngũ giảng viên có trình độ tiến sĩ từ các trường đại học hàng đầu thế giới.', en: 'The Department of Artificial Intelligence was established in 2019 at FPT University Ho Chi Minh City, pioneering AI education in Vietnam. With a mission to train high-quality human resources for the AI industry, the department has grown strongly with faculty members holding doctoral degrees from world-leading universities.' },
    visionTitle: { vi: 'Tầm nhìn', en: 'Vision' },
    visionText: { vi: 'Trở thành trung tâm đào tạo và nghiên cứu AI hàng đầu Đông Nam Á, nơi kiến tạo những giải pháp công nghệ đột phá và đào tạo thế hệ lãnh đạo AI tương lai.', en: 'Become a leading AI training and research center in Southeast Asia, creating breakthrough technology solutions and training future AI leaders.' },
    missionTitle: { vi: 'Sứ mệnh', en: 'Mission' },
    missionText: { vi: 'Cung cấp chương trình đào tạo AI chất lượng quốc tế, kết hợp nghiên cứu ứng dụng và hợp tác doanh nghiệp, để sinh viên không chỉ nắm vững kiến thức mà còn có khả năng giải quyết các bài toán thực tế của xã hội.', en: 'Provide internationally quality AI training programs, combining applied research and corporate collaboration, so students not only master knowledge but also have the ability to solve real-world problems.' },
    stats: {
      students: { vi: '500+ Sinh viên', en: '500+ Students' },
      faculty: { vi: '15+ Giảng viên', en: '15+ Faculty' },
      papers: { vi: '100+ Bài báo', en: '100+ Papers' },
      partners: { vi: '20+ Đối tác', en: '20+ Partners' },
    },
  },
  contact: {
    pageTitle: { vi: 'Liên hệ', en: 'Contact Us' },
    formName: { vi: 'Họ và tên', en: 'Full Name' },
    formEmail: { vi: 'Email', en: 'Email' },
    formSubject: { vi: 'Chủ đề', en: 'Subject' },
    formMessage: { vi: 'Nội dung tin nhắn', en: 'Message' },
    formSend: { vi: 'Gửi tin nhắn', en: 'Send Message' },
    addressTitle: { vi: 'Địa chỉ', en: 'Address' },
    addressText: { vi: 'Lô E2a-7, Đường D1, Khu Công nghệ cao, P. Long Thạnh Mỹ, TP. Thủ Đức, TP. Hồ Chí Minh', en: 'Lot E2a-7, D1 Street, High-Tech Park, Long Thanh My Ward, Thu Duc City, Ho Chi Minh City' },
    emailTitle: { vi: 'Email', en: 'Email' },
    phoneTitle: { vi: 'Điện thoại', en: 'Phone' },
  },
  faculty: {
    pageTitle: { vi: 'Đội ngũ Giảng viên', en: 'Our Faculty' },
    pageSubtitle: { vi: 'Những chuyên gia hàng đầu trong lĩnh vực Trí tuệ Nhân tạo', en: 'Leading experts in the field of Artificial Intelligence' },
    searchPlaceholder: { vi: 'Tìm theo tên, hướng nghiên cứu, bài báo...', en: 'Search by name, research area, paper...' },
    noResults: { vi: 'Không tìm thấy giảng viên phù hợp', en: 'No matching faculty found' },
    viewDetail: { vi: 'Xem chi tiết', en: 'View Details' },
    research: { vi: 'Hướng nghiên cứu', en: 'Research Areas' },
    currentResearches: { vi: 'Các Nghiên Cứu Đang Thực Hiện', en: 'Current Researches' },
    completedResearches: { vi: 'Những Nghiên Cứu Đã Thực Hiện', en: 'Completed Researches' },
    courses: { vi: 'Môn giảng dạy', en: 'Courses' },
    education: { vi: 'Lịch sử Giáo dục', en: 'Education History' },
    eduDegree: { vi: 'Bằng cấp', en: 'Degree' },
    eduSchool: { vi: 'Trường', en: 'Institution' },
    eduYear: { vi: 'Năm', en: 'Year' },
    eduMajor: { vi: 'Chuyên ngành', en: 'Major' },
    researchName: { vi: 'Tên nghiên cứu', en: 'Research Title' },
    researchMembers: { vi: 'Thành viên', en: 'Members' },
    researchAbstract: { vi: 'Tóm tắt', en: 'Abstract' },
    researchVenue: { vi: 'Nơi xuất bản', en: 'Venue' },
    notices: { vi: 'Thông Báo', en: 'Notices' },
    noticeTopic: { vi: 'Đề tài', en: 'Topic' },
    noticeSlots: { vi: 'Số lượng tuyển', en: 'Positions' },
    noticeRequirements: { vi: 'Yêu cầu', en: 'Requirements' },
    applyBtn: { vi: 'Ứng tuyển', en: 'Apply' },
    recruiting: { vi: 'Đang nhận SV nghiên cứu', en: 'Recruiting students' },
    notRecruiting: { vi: 'Ngừng nhận sinh viên', en: 'Not recruiting' },
    backToList: { vi: '← Quay lại danh sách', en: '← Back to list' },
    showMore: { vi: 'Xem thêm', en: 'Show more' },
    showLess: { vi: 'Thu gọn', en: 'Show less' },
  },
  footer: {
    desc: { vi: 'Bộ môn Trí tuệ Nhân tạo - Đại học FPT TP.HCM. Đào tạo thế hệ lãnh đạo AI tiên phong.', en: 'Department of Artificial Intelligence - FPT University HCMC. Training the next generation of AI leaders.' },
    quickLinks: { vi: 'Liên kết nhanh', en: 'Quick Links' },
    contactInfo: { vi: 'Thông tin liên hệ', en: 'Contact Info' },
    copyright: { vi: '© 2026 Bộ môn Trí tuệ Nhân tạo - Đại học FPT TP.HCM. Mọi quyền được bảo lưu.', en: '© 2026 Department of Artificial Intelligence - FPT University HCMC. All rights reserved.' },
  },
} as const;
