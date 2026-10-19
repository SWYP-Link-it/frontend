<img width="100" height="100" alt="스위프 logo" src="https://github.com/user-attachments/assets/d0a1e869-bd94-4555-a963-ee2d5da21c14" />

# 🔗 Linkit (링킷)
 
스킬을 가르쳐 크레딧을 얻고, 그 크레딧으로 다른 스킬을 배우는 시간 기반 스킬 교환 플랫폼
 
DEMO: ~[app.desklab.kr](https://app.desklab.kr)~ (운영 중단)

## 📌 프로젝트 소개
 
- **기간**: 2026.01 ~ 2026.03 (SWYP 웹 12기)
- **인원**: PM 1·디자이너 2·프론트엔드 2·백엔드 3
- **기획 배경**: 비용 문제로 배움의 기회를 얻기 어려운 사람들을 위해, 금전 대신 '시간'을 단위로 지식을 교환하는 구조를 고민


### 서비스 흐름
 
1. 카카오 로그인 후 간단한 온보딩을 거쳐 가입 (가입 시 2 크레딧 지급)
2. 내가 가진 지식·경험을 스킬로 등록 (등록 시 1 크레딧 지급)
3. 배우고 싶은 스킬을 검색하고 요청서 작성 → 상대가 수락하면 매칭 성사
4. 채팅으로 일정을 조율하고 스킬 교환 진행
5. 진행 시간 기준으로 크레딧 자동 정산 (30분당 1 크레딧) → 리뷰 작성



## 🛠 기술 스택
 
| 분류 | 기술 |
| --- | --- |
| Framework | Next.js (App Router), React, TypeScript |
| State | TanStack Query, Zustand |
| Styling | Tailwind CSS, shadcn/ui |
| Network | Axios, SockJS, STOMP.js |
| Mocking | MSW |
| DX | ESLint, Prettier, Husky, lint-staged |
| Infra | Vercel |
 

## ✨ 주요 기능
 
 
### 🔐 로그인·온보딩
 
카카오 소셜 로그인으로 가입하고, 간단한 온보딩을 거쳐 바로 서비스를 시작합니다. 가입 시 2 크레딧이 지급됩니다.
 
| 로그인 | 온보딩 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/e6f65300-903d-4d14-b49d-d29d061f0f55" width="300" /> | <img src="https://github.com/user-attachments/assets/5b60a816-a086-4606-91c8-911a5027873c" width="300" />

### 🔍 스킬 탐색
 
전체·카테고리별로 스킬을 둘러보고, 키워드로 검색할 수 있습니다. 인기 검색어와 인기 스킬도 함께 제공됩니다.
 
| 스킬 리스트 | 스킬 검색 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/e57eb475-6ab2-495a-9c36-5b61cc9e4c15" width="300" /> | <img src="https://github.com/user-attachments/assets/9629233e-26c0-45fc-8f3b-fa37b987c5eb" width="300" /> |


### 📄 스킬 상세·요청
 
스킬 상세 정보와 리뷰를 확인하고, 원하는 일정과 시간을 담아 요청서를 보냅니다.
 
| 스킬 상세 | 요청서 작성 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/7948253d-b69a-4c4a-904b-c322dd0fda9f" width="300" /> | <img src="https://github.com/user-attachments/assets/178445be-2c9c-4660-92f2-bc9bec50e24c" width="300" /> |


### 🤝 스킬 교환 내역
 
받은 요청과 보낸 요청을 한곳에서 확인하고 수락·거절·취소할 수 있습니다. 교환이 끝나면 리뷰를 남깁니다.
 
| 받은·보낸 요청 | 리뷰 작성 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/99efa3e4-08de-4011-a05b-8f6b3d6512e2" width="300" /> | <img src="https://github.com/user-attachments/assets/2abc2fb1-96d6-43f3-9f39-7cc0cbb92eaf" width="300" /> |


### 💬 실시간 채팅·알림
 
스킬 요청 전 문의부터 매칭 후 일정 조율까지 실시간 채팅으로 이어집니다. 
새 채팅 메시지, 스킬 요청 수신·발송, 요청 상태 변경(수락·거절·취소)이 생기면 실시간 알림을 받습니다. 읽지 않은 메시지와 요청은 사이드바에 표시되고, 알림을 누르면 해당 채팅방이나 요청 관리 화면으로 이동합니다.
 
| 채팅방 | 알림 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/8fda6849-8b95-4dc1-b9f7-2907cfcc8dfe" width="300" /> | <img src="https://github.com/user-attachments/assets/e0c80b73-60f2-4cca-9f99-057545bdded9" width="300" /> |

### 👤 마이페이지·스킬 등록
 
프로필을 수정하고 크레딧 사용 내역을 확인합니다. 내 스킬의 제목·시간·지역·사진을 등록하고 편집할 수 있으며, 스킬 등록 시 1 크레딧이 지급됩니다. 

| 마이페이지·크레딧 내역 | 스킬 등록 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/c907e551-0418-4f05-bf63-3d48d25f4284" width="300" /> | <img src="https://github.com/user-attachments/assets/35345a4f-1f7b-4897-9f81-b349f73d0037" width="300" /> | 
 
## 📁 프로젝트 구조
 
```
src/
├── app/            # 라우팅 (페이지 & URL)
├── features/       # 기능 단위로 코드 통합
├── components/     # 공통 UI 컴포넌트 (버튼, 모달, 레이아웃 등)
├── hooks/          # 전역 훅 (특정 기능에 종속되지 않음)
├── lib/            # 설정 (Axios, QueryClient, Utils)
├── stores/         # 클라이언트 상태 (Zustand)
└── types/          # 전역 타입 정의
```


## 🚀 실행 방법
 
```bash
git clone https://github.com/SWYP-Link-it/frontend.git
cd frontend
 
cp .env.example .env    # NEXT_PUBLIC_SERVER_URL, NEXT_PUBLIC_FRONTEND_URL 설정
pnpm install
pnpm run dev
```


## 👥 팀원
 
| 이름 | 역할 | 담당 업무 |
| --- | --- | --- |
| **한보은** | Frontend | 초기 환경 세팅, 인증(로그인·회원가입), 스킬 리스트·상세·요청·리뷰, SEO 최적화 |
| **기원희** | Frontend | 아키텍처 설계, 실시간 채팅, 스킬 교환 내역, 마이페이지, 스킬 등록·편집 |
 
