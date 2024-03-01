# 🧈 Butter And Better

![커버](https://storage.googleapis.com/elice_04/presentation/readme_cover.png)

## “ 요리 서적 전문 온라인 쇼핑몰 ”

### 버터는 요리에서 다양하게 활용될 수 있는 재료입니다.<br/>이처럼 "Butter & Better"는 다양한 재료와 요리법을 탐구하고,<br/>각자의 독특한 창의력을 발휘하여 더 나은 요리를 만들어가는 과정을 장려하는 공간이 될 수 있습니다.

카테고리 별 상품 조회, 상품 등록 및 수정, 장바구니 추가, 주문하기 등 온라인 쇼핑몰의 주요 기능 구현

<br/>

## 📍 서비스 주요 기능

### → 홈

- 베스트 셀러 상품 불러오기
- 메인 배너 슬라이드

### → 상품

- 상품의 가격 및 상세 정보 조회
- 상품의 재고 수량에 따라 품절 표시
- 수량을 조정하여 장바구니에 상품 담기
- 상품 정렬 및 페이지네이션

### → 장바구니 및 결제

- 장바구니에 상품 담기
- 장바구니 리스트 중 선택적으로 구매 가능
- 비회원 상품 구매 및 주문 조회

### → 회원가입 및 로그인

- JWT refreshToken 을 이용한 회원 인증
- 로그인 여부에 따른 마이 페이지 접근

### → 일반 회원 - 정보 관리

- 관리자와 일반 사용자를 구분하여 페이지 변환
- 주문목록 열람 및 수정
- 회원 정보 변경 및 탈퇴

### → 관리자 - 주문 관리

- 주문 취소 가능
  - 주문 내역이 삭제되지 않고 관리자가 주문 상태 변경 (Soft delete)
- 배송 상태 (배송 준비 중, 배송중, 배송완료) 변경 가능

### → 관리자 - 상품 관리

- 상품 추가 및 수정, 삭제
- multer를 통한 상품 이미지 업로드
- 카테고리가 삭제된 상품은 '미설정' 카테고리에서 확인 가능(데이터 보존)

### → 관리자 - 카테고리 관리

- 카테고리 추가 및 수정, 삭제 관리

## 📍 실행 방법

npm install 의존성 설치 -> .env 생성 (\*별도 전달)

- node 서버로 실행 시
  `npm start` 혹은 `npm run dev`

- pm2 서버로 실행 시
  `pm2 start`

### 테스트 계정

#### 회원 및 관리자 테스트 계정

|           | 이메일            | 비밀번호  |
| --------- | ----------------- | --------- |
| 일반 회원 | test@test.com     | 12345678  |
| 관리자    | butter@better.com | butter123 |

#### 비회원 테스트 계정

|        | 주문 번호                |
| ------ | ------------------------ |
| 비회원 | 65e074b2861ee0d4423cc3f2 |

## 📍 기술 스택

### Front End

<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>

### Back End

<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/express-000000?style=flat-square&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/>
<img src="https://img.shields.io/badge/NGINX-009639?style=flat-square&logo=NGINX&logoColor=white"/> <img src="https://img.shields.io/badge/PM2-2B037A?style=flat-square&logo=PM2&logoColor=white"/>

<br/>

## 📍 기획

### 1. 화면 구성안

![화면 구성](https://storage.googleapis.com/elice_04/presentation/readme_img_01.png)

### 2. [데이터 베이스 스키마]()

### 3. [API 명세서]()

<br/>

## 📍 참여자

| 이름   | 담당 업무 |
| ------ | --------- |
| 최세영 | BE / PM   |
| 김송이 | BE        |
| 이진주 | BE        |
| 강경림 | FE        |
| 손민혁 | FE        |
| 임기택 | FE        |

<br />
