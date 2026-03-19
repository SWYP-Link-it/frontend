# 🚀 Linkit

Linkit은 비용 문제로 배움의 기회를 얻기 어려운 사람들을 위해, 
금전 대신 ‘시간 기반 크레딧’으로 지식을 교환할 수 있는 스킬 거래 플랫폼입니다.

이용자는 본인이 가진 지식이나 경험을 스킬로 등록하고, 다른 이용자는 해당 스킬을 요청하여 매칭을 진행합니다. 
매칭이 성사되어 스킬 거래가 진행되면, 진행 시간 기준으로 크레딧이 자동 정산됩니다.

단순한 지식 공유를 넘어서 배움의 진입 장벽을 낮추고 지식의 가치를 시간 단위로 환산하며 상호 신뢰 기반의 교환 구조를 만드는 것을 목표로 합니다.

---

## 🛠 Tech Stack

* **Framework:** Next.js (App Router), React
* **Language:** TypeScript
* **State Management:** TanStack Query, Zustand
* **Styling:** Tailwind CSS, Shadcn/ui
* **Network & Real-time**: Axios, SockJS-client, Stomp.js
* **API Mocking**: MSW
* **Code Quality & DX**: Husky, lint-staged, ESLint, Prettier
* **Infrastructure:** Vercel

---

## ✨ Features
* **Authentication:** 카카오 소셜 로그인 및 로그인 세션 유지, 회원가입 및 온보딩
* **Credit:** 회원가입 시 2 크레딧, 스킬 등록 시 1 크레딧 부여, 스킬 30분 당 1 크레딧 차감·획득
* **Skills:** 스킬 전체·카테고리별 조회, 스킬 상세·리뷰 조회, 스킬 요청서 작성
* **Exchange:** 받은 요청·보낸 요청 조회, 요청 수락·거절·취소·리뷰 작성
* **Message:** 채팅방 목록 조회, 실시간 채팅·문의, 사진 첨부
* **Keyword Search:** 스킬 검색, 인기 검색어·인기 스킬 조회
* **Profile:** 프로필 수정, 크레딧 사용내역 조회, 스킬 제목·시간·지역·사진 등록 
* **SEO:** 동적 메타데이터 및 사이트맵 적용으로 검색 엔진 최적화

---

## 🏗 Project Structure
```text
src/
├── app/                    # 라우팅 (실제 페이지 & URL)
├── features/               # 기능 단위로 코드 통합
├── components/            # 공통 UI 컴포넌트 (버튼, 모달, 레이아웃 등)
├── hooks/                 # 전역 훅 (특정 기능에 종속되지 않음)
├── lib/                   # 설정 (Axios, QueryClient, Utils)
├── stores/                # 클라이언트 상태 (Zustand)
└── types/                 # 전역 타입 정의
```
---

## ⚙️ Installation
레포지토리 클론
```Bash
git clone https://github.com/SWYP-Link-it/frontend.git
```

패키지 설치
```Bash
pnpm install
```

환경 변수 설정 (.env.example)
```
NEXT_PUBLIC_SERVER_URL=
NEXT_PUBLIC_FRONTEND_URL=
```

개발 서버 실행
```Bash
pnpm run dev
```


## 🛠️ Contributors

| 이름 | 역할 | 담당 업무 |
| :--- | :---: | :--- |
| **한보은** | FE Developer | 초기 환경 세팅, 인증(로그인·회원가입), 스킬 리스트·상세·요청, SEO 최적화 |
| **기원희** | FE Developer | 아키텍처 설계, 실시간 채팅, 스킬 교환 내역, 마이페이지, 스킬 등록·편집 |
