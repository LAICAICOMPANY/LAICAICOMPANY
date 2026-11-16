# CLAUDE.md — 라이차이컴퍼니 홈페이지 리뉴얼 (laicaicompany.com)

이 폴더는 laicaicompany.com 리뉴얼본입니다. 사용자는 라이차이컴퍼니 이사님이고, Windows PC에서 작업합니다.
**답변과 설명은 모두 한국어로** 하세요. 사용자는 개발자가 아닐 수 있으니 명령어는 직접 실행해 주고, 결과는 쉬운 말로 알려 주세요.

## 1. 지금 상황
- 현재 운영 중인 사이트: Netlify 호스팅, Vite + React(App.tsx) 프로젝트. 이사님 PC 어딘가에 그 프로젝트 폴더가 있음
- 이 폴더의 리뉴얼본은 **기존 사이트를 통째로 교체**하는 것이 목표
- 기존 사이트에서 그대로 가져온 것 (빠뜨리면 안 됨)
  - 네이버 사이트 인증 메타태그 `naver-site-verification` (index.html `<head>`)
  - 문의 폼 주소 Formspree `https://formspree.io/f/meeagqzq` (App.jsx `CONFIG.formEndpoint`) → 문의가 기존과 같은 메일함으로 들어감
  - `logo.png`, `og-image.png`, `robots.txt`, `sitemap.xml`
  - 도메인 laicaicompany.com 연결은 Netlify 쪽 설정이므로 건드리지 않음

## 2. 폴더 구조
```
CLAUDE.md                ← 이 파일
이사님_먼저_읽어주세요.txt  ← 사람용 안내
source/
  App.jsx                ← 사이트의 모든 내용(문구·순서·디자인). 수정은 여기서
  build.py               ← 빌드 스크립트
site/                    ← 배포 폴더. 이 폴더 전체를 Netlify에 올림
  index.html, app.js     ← build.py가 만든 결과물 (직접 고치지 말 것)
  assets/                ← 영상(PC 가로 / 모바일 세로), 포스터 이미지, 글꼴
  logo.png, og-image.png, robots.txt, sitemap.xml
```

## 3. 수정 → 확인 → 배포 순서
1. **수정**: `source/App.jsx`만 고친다. 문구는 맨 위 `CONFIG`, `BLOCKED`, `STATS`, `CLIENTS`, `SERVICES`, `FAQS` 데이터에 모여 있음
2. **빌드**: `cd source` 후 `python build.py`
   - Node.js의 `npx esbuild`로 App.jsx → `site/app.js` 컴파일, `site/index.html` 생성
   - Node가 없으면 설치 안내(https://nodejs.org LTS). 급하면 `python build.py preview`로 미리보기만 가능
3. **로컬 확인**: `cd site` 후 `python -m http.server 8765` → 브라우저에서 http://localhost:8765
   - 휴대폰 화면 확인: 브라우저 개발자도구(F12) → 기기 툴바(Ctrl+Shift+M) → iPhone 크기
4. **배포** (아래 중 기존 방식에 맞는 것)
   - (A) Netlify 사이트 화면 → Deploys → `site` 폴더를 끌어다 놓기. 가장 간단
   - (B) Netlify CLI: `npx netlify-cli deploy --dir=site --prod` (처음엔 `npx netlify-cli login`, `link` 필요)
   - (C) 기존 프로젝트가 GitHub 연동 자동배포라면: 기존 저장소의 배포 폴더(`dist` 등)가 이 `site` 내용이 되도록 바꿔서 커밋. 기존 Vite 설정이 `npm run build`로 덮어쓰지 않게 Netlify의 Build command / Publish directory를 확인하고 사용자에게 먼저 설명할 것
   - 배포 전, 기존 사이트를 되돌릴 수 있게 Netlify Deploys 목록에서 현재 배포가 남아 있는지 사용자에게 알려 줄 것 (Netlify는 이전 배포로 "Publish deploy" 되돌리기 가능)

## 4. 배포 후 꼭 확인할 것
- [ ] PC와 휴대폰에서 첫 화면 영상이 나오는지 (PC는 가로 `hero.mp4`, 세로 화면은 `hero-mobile.mp4`가 자동으로 나옴)
- [ ] 문의 폼 테스트 1건 → Formspree에 연결된 메일함에 들어오는지. 테스트 문의임을 적어서 보내고, 실제로 보내기 전에 사용자에게 확인받을 것
- [ ] 이전 캐시가 보이면 Ctrl+F5

## 5. 디자인 원칙 (수정할 때 지킬 것)
- 색: 검정 `#000` / 흰색 `#FFF` / 회색 `#8A8A86` / 인주색 `#C8281E`(포인트만). 둥근 모서리 쓰지 않음
- 글꼴: 큰 제목 Black Han Sans(`font-display`), 영문 Archivo(`font-en`), 본문 Pretendard
- 한국어 제목 아래(PC는 옆)에 영문 부제. 모바일과 PC 배치는 이미 맞춰져 있으니, 크기를 바꿀 땐 `text-[2.1rem] md:text-[5.2rem]`처럼 모바일·PC 값을 함께 바꿀 것
- 자동 움직임은 첫 화면 영상과 숫자 올라가기뿐. 효과를 더 넣지 말 것

## 6. 남은 할 일 (사용자에게 물어보고 진행)
- [ ] 클라이언트 로고 이미지: `site/assets/logos/`에 넣고 App.jsx `CLIENTS`의 `logo` 경로 지정. 지금은 이름 글자로 표시됨
- [ ] 메타 픽셀: 픽셀 기본 코드를 `build.py`의 HEAD 안 `[ ] 메타 픽셀` 주석 자리에 넣고 다시 빌드. 문의 접수 시 `Lead` 이벤트는 이미 코드에 들어 있음
- [ ] 첫 화면 영상·사진 속 젠지·오뚜기 로고, 인물 얼굴 사용 동의 확인
- [ ] 영상 파일을 바꿀 땐 같은 이름으로 덮어쓰고, App.jsx `CONFIG`의 `?v=` 숫자를 하나 올릴 것(캐시 갱신)
