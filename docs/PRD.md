# 사이트 설계도(PRD) — Ohio University Restaurant, Hotel, and Tourism 과정 안내

작성일: 2026-10-25 · 이 문서는 사이트를 고칠 때마다 다시 보는 기준이다.

## 1. 한 줄 정의
Ohio University Restaurant, Hotel, and Tourism 과정을 진학을 고민하는 학생에게 소개하고, 학과와 상담을 예약하게 하는 공식 안내 사이트.

## 2. 손님
- 누가: 호텔·외식·관광 전공 진학을 고민 중인 학생
- 어디서 알고 오나: 검색 (구글·네이버)
- 운영: 학과 교수·직원 (공식 사이트로 표기)

## 3. 손님이 궁금한 것 (연락하기 전에)
1. 어떤 수업을 배우나 (전공 과목, 실습, 인턴십)
   - 정식 이름: Restaurant, Hotel and Tourism Major (B.S.) · Patton College of Education, Recreation, Sport Pedagogy, and Consumer Sciences 학과
   - 주요 수업: Introduction to Hospitality, Hotel & Lodging Operations, Restaurant Operations, MICE & Event Planning, Principles of Tourism, Marketing for Hospitality and Tourism, Accounting in Hospitality, Food and Culture, Hospitality Internship
   - 실습: 상업용 주방 실습실과 시연 교실, 인턴십, 스터디 투어, 업계 멘토링
2. 졸업 후 진로 (호텔·외식·관광 업계 취업)
   - 호텔·레스토랑 회사, 대학 급식, 이벤트·케이터링 회사, 관광 기관의 초급~중간 관리직
3. 입학 조건·지원 방법 (8번 참고)
4. 학비·장학금 (8번 참고)

## 4. 믿게 할 증거 (실제로 있는 것만)
- 수업·실습 사진
- 교수진 경력
- 인증: 사용자가 있다고 함. 학과 공식 페이지에는 언급이 없어서 어떤 인증인지 확인한 뒤 넣는다
- 후기: 실제 학생 후기 (본인 동의를 받은 것만 넣는다)

## 5. 누르게 할 버튼 하나
- 버튼 이름: 상담 예약하기
- 누르면: 상담 예약 폼

## 6. 페이지 구성 (위에서 아래로)
1. 첫 화면 — 한 문장 + 상담 예약하기 버튼
2. 무엇을 배우나 — 수업·실습 (실습 사진)
3. 졸업 후 진로
4. 입학 조건·지원 방법 / 학비·장학금 — (미정) 칸은 "준비 중"으로 표시
5. 교수진·인증
6. 학생 후기
7. 상담 예약 폼

## 7. 문의 폼에서 받을 것
- 이름, 연락처
- 원하는 상담 날짜·방식 (예: 다음 주 화요일, 온라인)
- 개인정보 수집·이용 동의 (필수)

## 8. 정확해야 하는 사실 (2026-10-25 ohio.edu 공식 페이지에서 확인 · 학년도마다 다시 확인)
- 학비: 숫자는 적지 않고 공식 페이지로 연결 → https://www.ohio.edu/admissions/tuition
- 장학금:
  - 학과 장학금: Lee Cibrowski Scholarship, Mark and Patricia McClintick Endowment, Beulah Sellers-Davis Scholarship, Shirley Slater Scholarship
  - 신입생 장학금(OHIO Excellence Awards)은 입학 지원서로 자동 심사. FAFSA는 1월 15일까지 권장
  - 안내 링크: https://www.ohio.edu/admissions/tuition/scholarships-financial-aid
- 입학 마감일 (Athens 캠퍼스, 가을 학기 신입생): 11월 15일 Early Action(장학금 우선 심사), 2월 1일 정시 마감 → https://www.ohio.edu/admissions/apply/dates-deadlines
- 지원 방법: 지원서 + 지원비 $55 + 고등학교 성적증명서(카운슬러가 발송). ACT·SAT 선택 → https://www.ohio.edu/apply
- 상담 가능 시간·방식: (미정)
- 위치: Patton Hall, 100 East Union St., Athens, OH 45701
- 연락 방법: Dr. Rebecca Choi (Associate Professor & Program Coordinator) · choih@ohio.edu · 740.593.9983
- 출처: https://www.ohio.edu/education/recreation-sport-pedagogy-consumer-sciences/restaurant-hotel-tourism

## 9. 이번에 넣지 않을 것
- 회원가입·로그인
- 결제
- 블로그

## 10. 첫 화면 한 문장 후보
1. 손님을 맞이하는 일을 배우는 곳, Ohio University Restaurant, Hotel, and Tourism 과정
2. 호텔·레스토랑·관광 업계로 가는 길, 상담으로 먼저 확인해 보세요
3. 무엇을 배우고 어디로 가는지, 학과 교수진이 직접 알려 드려요

## 11. 다음에 할 것
- 상담 가능 시간·방식 정하기
- 인증 이름 확인하기
- 지원비·마감일은 학년도마다 공식 페이지와 다시 맞춰 보기
- 학생 후기는 본인 동의를 받은 뒤 넣기

## 12. 만드는 방법 (클로드가 끝까지 만들 때 기준)
- 분위기: 따뜻한 · 참고 디자인: 없음 — 클로드가 정함
- 문의 저장: 예 → Supabase(leaderpl-admin 스킬) + /admin
- 회원가입: 이번엔 아니요
- 배포: GitHub 공개 저장소 + Vercel

## 13. 만드는 순서 (클로드가 처음부터 끝까지 한 번에)
1. 스타일(색·글꼴)을 분위기에 맞게 정하고 첫 화면부터 만든다
2. GitHub 공개 저장소에 올리고 Vercel로 배포해 내 주소를 만든다
3. 상담 예약 폼 → Supabase 저장 → /admin 관리자 페이지까지 만든다
4. 다 만든 뒤 한 번에 보고: 내 사이트 주소 · 관리자 주소 · 확인 방법 · 사용자가 할 일
- 사용자가 직접 할 일(이때만 멈춤): 로그인, 결제, 관리자 비밀번호(ADMIN_PASSWORD) 입력
