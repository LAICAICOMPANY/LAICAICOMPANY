// 라이차이컴퍼니 웹사이트 리뉴얼 시안 v3 (2026-11-15)
//
// ── 디자인 방향 ─────────────────────────────────────────
// 주제: 한국 브랜드를 대신해 중국 현지에서 상점을 열고, 라이브로 팔고, 행사를 여는 회사
// 핵심 장면: 첫 화면 전체를 실제 현장 영상(젠지×오뚜기)으로. 오른쪽 아래 서울·상해 현재 시각 + 문의 버튼.
// 나머지는 조용하게: 흰 종이 + 검정 글자, 한국어 제목 옆에 영문 부제(Archivo 세미 익스팬디드). 중국어는 첫 화면 라이브 댓글에만
// 색: 검정 #000 / 흰색 #FFF / 회색 #8A8A86 / 인주색 #C8281E(도장에만) / 도우인 레드·시안(라이브 화면 안에서만)
// 글꼴: 제목 Black Han Sans(중국 행사 포스터 같은 간판체), 영문 Archivo(OFL, assets/fonts에 포함), 본문 Pretendard
// 레퍼런스: 사진 없이 클라이언트 로고 그리드. 첫 화면 영상만 실제 현장(젠지×오뚜기). 모서리 둥글림 없음 — 둥근 모서리는 앱 화면(라이브 UI)에만
// 움직임: 첫 화면 댓글 흐름 1곳 + 사용자가 누를 때만(서비스 펼치기, 신청 시 '접수' 도장)
//
// 실제 프로젝트로 옮길 때: 맨 위 React 줄을 `import { useState, useEffect, useRef } from "react";` 로 바꾸고 맨 아래 export 주석 해제
// 글꼴: index.html <head>에 Google Fonts(Black Han Sans, Noto Serif SC) + Pretendard 링크 추가, tailwind 색·글꼴 설정은 preview.html 참고
// [ ] 표시 = 실제 내용으로 교체할 자리

const { useState, useEffect, useRef } = React;

/* ───────── 설정 ───────── */
const CONFIG = {
  email: "laicaicompany@gmail.com",
  formEndpoint: "/.netlify/functions/contact", // netlify/functions/contact.mjs → Resend로 laicaicompany@gmail.com 발송 (기존 .net과 같은 구조)
  heroVideo: "assets/hero.mp4?v=11", // v13: 사무실 회의 → 젠지 행사 3컷(관중석·입구·응원봉), 11초 루프
  heroPoster: "assets/hero-poster.jpg?v=11",
  heroVideoMobile: "assets/hero-mobile.mp4?v=2", // 세로(9:16) 버전: 같은 4컷을 세로 화면에 맞게 따로 자름, 11초 루프
  heroPosterMobile: "assets/hero-mobile-poster.jpg?v=2",
};

/* ───────── 데이터 ───────── */
const BLOCKED = [
  { kr: "중국 플랫폼 계정", d: "한국에서 막힌 도우인부터 샤오홍슈 기업 계정까지 열어 드립니다." },
  { kr: "상점 입점 · 운영", d: "도우인, 샤오홍슈, 티몰 입점 심사부터 운영까지 대신 진행합니다." },
  { kr: "콘텐츠 심의", d: "수시로 바뀌는 기준에 맞춰 현지 팀이 발행합니다." },
  { kr: "왕홍 · 행사", d: "현장에서만 되는 섭외와 운영, 중국 팀이 맡습니다." },
];

// 수치: 실제 실적과 비슷한 수준으로 확인됨(2026-11-17). "+" 표기라 실제 값이 이 숫자 이상이어야 함
const STATS = [
  { value: 120, suffix: "억 원+", label: "누적 매출", en: "Total sales", tags: ["도우인 라이브커머스", "샤오홍슈 스토어", "티몰 입점", "공동구매"], sample: false },
  { value: 80, suffix: "+", label: "함께한 브랜드", en: "Brands", tags: ["뷰티", "식품", "e스포츠", "패션", "리빙", "병원 · 서비스업"], sample: false }, // [ ] 업종 확인
  { value: 3000, suffix: "명+", label: "왕홍 네트워크", en: "Influencers", tags: ["도우인 왕홍", "샤오홍슈 KOC", "라이브 셀러", "재한 중국인 크리에이터", "KOC · KOL 체험단"], sample: false },
  { value: 500, suffix: "회+", label: "라이브 방송", en: "Live shows", tags: ["자체 라이브", "왕홍 라이브", "공동구매", "행사 현장 중계"], sample: false },
];


const SERVICES = [
  { kr: "도우인 상점 운영 · 라이브커머스", cn: "Douyin store & live commerce", d: "상점 개설부터 상품 등록, CS, 광고, 라이브 판매와 매출 관리까지 맡습니다." },
  { kr: "샤오홍슈 계정 관리 · 스토어 운영대행", cn: "Xiaohongshu account & store", d: "공식 계정 개설과 관리, 콘텐츠 발행, 체험단부터 샤오홍슈 스토어 입점과 운영까지 맡습니다." },
  { kr: "왕홍 · KOL · 모델 섭외", cn: "Influencers, KOL & talent", d: "왕홍, KOC, KOL부터 현지 연예인과 모델까지 섭외하고, 국내와 현지 체험단도 운영합니다." },
  { kr: "팝업 · 오프라인 행사", cn: "Pop-ups & events", d: "장소 섭외, 부스 제작, 현장 운영, 행사 촬영까지 한 팀이 진행합니다." },
  { kr: "현지 제작 · 촬영 · 로케이션", cn: "Local production & locations", d: "현지 촬영팀 구성, 로케이션 섭외, 모델 캐스팅부터 촬영과 편집까지 진행합니다." },
  { kr: "법인 설립 · 현지 업무 대행", cn: "China setup & operations", d: "법인 개설, 행정, 현지 파트너 연결 등 중국 실무 전반." },
  { kr: "티몰 · 이커머스 입점 · 운영대행", cn: "Tmall & e-commerce", d: "티몰을 비롯한 중국 이커머스 입점 심사부터 상점 운영까지 대신 진행합니다." },
  { kr: "GEO · SEO · 커뮤니티 마케팅", cn: "Search, AI & community marketing", d: "중국 검색과 AI 답변에 브랜드가 노출되도록 GEO·SEO를 진행하고, 네이버·Reddit 등 국내외 커뮤니티 마케팅까지 맡습니다." },
];

const CLIENTS = [
  // [ ] logo: "assets/logos/xxx.svg" 를 넣으면 글자 대신 로고 표시 (흑백 단색 로고 권장)
  // [ ] 사이트에 이름을 노출해도 되는 곳만 남기기 (특히 젠지·오뚜기는 사전 동의)
  { name: "Gen.G", work: "중국 팬 이벤트" },
  { name: "OTOKI", work: "중국 팬 이벤트" },
  { name: "NEOTERIA", work: "현지 촬영 · 라이브" },
  { name: "BALLOP", work: "샤오홍슈 운영" },
  { name: "GTS GLOBAL", work: "중국 마케팅" },
  { name: "PR SEOUL", work: "체험단" },
  { name: "CLISIER", work: "[ ]" },
  { name: "DIOPTON", work: "[ ]" },
  { name: "CAMA AGENCY" },
  { name: "TOUS les JOURS" },
  { name: "SAWA" }, // 사와참숯화로 · 스시사와
  { name: "NUTATS" },
  { name: "ALDIYOUU" },
];

const FAQS = [
  { q: "한국에서 도우인·샤오홍슈 계정이나 상점을 열 수 있나요?", a: "직접 개설은 어렵지만, 라이차이는 도우인·샤오홍슈 본사와의 협력으로 한국 번호, 한국 사업자, 한국 회사 계좌로 개설할 수 있습니다. 개설부터 운영까지 A to Z를 라이차이컴퍼니가 관리합니다." },
  { q: "중국 법인이 없어도 되나요?", a: "가능합니다. 법인 없이 시작하는 방법과, 필요하면 법인 설립까지 상담 때 함께 안내드립니다." },
  { q: "왕홍이나 체험단만 따로 진행할 수 있나요?", a: "가능합니다. 왕홍, KOC, KOL, 현지 연예인과 모델 섭외, 국내·현지 체험단까지 필요한 것만 골라 진행할 수 있습니다." },
  { q: "중국 현지 촬영이나 행사도 맡길 수 있나요?", a: "네. 현지 촬영팀, 로케이션, 모델 섭외부터 팝업·오프라인 행사의 기획과 현장 운영까지 중국 팀이 직접 진행합니다." },
  { q: "중국 말고 국내나 글로벌 마케팅도 하나요?", a: "네. 네이버, Reddit 등 국내외 커뮤니티 마케팅과 검색·AI 답변 노출을 위한 GEO·SEO도 함께 진행합니다." },
  { q: "병원·서비스업도 진행 가능한가요?", a: "가능합니다. 샤오홍슈·도우인 채널 운영에 그치지 않고, 중국 커뮤니티 마케팅까지 함께 진행해 방한 중국인 고객과 환자 유치를 목표로 합니다." },
  { q: "비용은 어떻게 정해지나요?", a: "진행 범위와 기간에 따라 달라집니다. 상담 후 브랜드에 맞는 진행안과 견적을 보내드립니다." },
];

/* ───────── 공통 ───────── */
const Wrap = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-[1320px] px-5 md:px-10 ${className}`}>{children}</div>
);

// 한국어 제목 + 영문 부제
const Title = ({ kr, cn, className = "" }) => (
  <div className={`flex flex-col gap-2 md:flex-row md:flex-wrap md:items-baseline md:gap-x-6 ${className}`}>
    <h2 className="font-display text-[2.1rem] leading-[1.15] md:text-[5.2rem] md:leading-[1.1]">{kr}</h2>
    <span className="font-en text-lg font-medium text-mute md:text-2xl">{cn}</span>
  </div>
);

// 인주 도장
const Seal = ({ text = "해결", size = 64, className = "" }) => (
  <span
    className={`inline-flex shrink-0 items-center justify-center border-[3px] border-seal font-display text-seal ${className}`}
    style={{ width: size, height: size, fontSize: size * 0.32, lineHeight: 1.05, transform: "rotate(-8deg)", borderRadius: 6 }}
  >
    <span style={{ writingMode: "vertical-rl" }}>{text}</span>
  </span>
);

/* ───────── 첫 화면 ───────── */
// 서울·상해 현재 시각: 두 도시에서 동시에 일하는 회사라는 표시
function useCityTimes() {
  const fmt = (tz) => new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
  const read = () => ({ seoul: fmt("Asia/Seoul"), shanghai: fmt("Asia/Shanghai") });
  const [t, setT] = useState(read);
  useEffect(() => { const id = setInterval(() => setT(read()), 20000); return () => clearInterval(id); }, []);
  return t;
}

// 세로 화면(휴대폰)이면 세로 영상, 가로 화면이면 가로 영상
function usePortrait() {
  const q = "(orientation: portrait)";
  const [p, setP] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setP(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return p;
}

function Hero() {
  const time = useCityTimes();
  const portrait = usePortrait();
  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-white">
      <video className="absolute inset-0 h-full w-full object-cover" key={portrait ? "m" : "d"} src={portrait ? CONFIG.heroVideoMobile : CONFIG.heroVideo} poster={portrait ? CONFIG.heroPosterMobile : CONFIG.heroPoster} autoPlay muted loop playsInline />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.75)_0%,rgba(0,0,0,.15)_25%,rgba(0,0,0,.25)_55%,#000_100%)]" />

      {/* 상단: 로고 + 메뉴 */}
      <div className="absolute inset-x-0 top-0 z-10">
        <Wrap className="flex h-20 items-center justify-between">
          <a href="#" className="font-logo text-2xl">laicai.</a>
          <nav className="hidden items-center gap-9 font-en text-sm font-medium text-white/80 md:flex">
            <a href="#blocked" className="hover:text-white">About</a>
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#clients" className="hover:text-white">Clients</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
        </Wrap>
      </div>

      <Wrap className="relative flex h-full items-end pb-20 md:pb-14">
        <div className="grid w-full items-end gap-10 md:grid-cols-[1fr_300px]">
          <div>
            <h1 className="font-display text-[16vw] leading-[0.95] md:text-[6.4vw] xl:text-[7rem]">
              중국은,<br />생각보다<br className="md:hidden" /> 가깝습니다
            </h1>
            <p className="mt-6 font-en text-xl font-semibold text-white/90 md:text-3xl">China is closer than you think.</p>
            <p className="mt-4 max-w-xl text-white/70 md:text-lg">
              도우인·샤오홍슈부터 왕홍, 행사, 법인까지.
              중국 사업을 한국에서 해결합니다.
            </p>
            <p className="mt-6 flex gap-6 border-t border-white/30 pt-3 font-en text-sm text-white/60 md:hidden">
              <span>Seoul <b className="ml-1 font-medium tabular-nums text-white">{time.seoul}</b></span>
              <span>Shanghai <b className="ml-1 font-medium tabular-nums text-white">{time.shanghai}</b></span>
            </p>
          </div>

          <div className="hidden md:block">
            <dl className="grid grid-cols-2 border-t border-white/30 font-en">
              {[["Seoul", time.seoul], ["Shanghai", time.shanghai]].map(([city, hm]) => (
                <div key={city} className="pt-4">
                  <dt className="text-sm text-white/60">{city}</dt>
                  <dd className="mt-1 text-3xl font-medium tabular-nums">{hm}</dd>
                </div>
              ))}
            </dl>
            <a href="#contact" className="mt-8 flex items-center justify-between border border-white/70 px-6 py-4 font-medium transition hover:bg-white hover:text-ink">
              <span>프로젝트 문의</span>
              <span className="font-en text-sm opacity-70">Contact</span>
            </a>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ───────── 한국에선 막히는 일 ───────── */
function Blocked() {
  return (
    <section id="blocked" className="bg-paper py-24 md:py-40">
      <Wrap>
        <h2 className="font-display text-[2.1rem] leading-[1.15] md:text-7xl">
          중국,<br />
          <span className="text-mute">라이차이에서 해결해 드리겠습니다.</span>
        </h2>
        <p className="mt-6 font-en text-lg font-medium text-mute md:text-2xl">China? We'll handle it.</p>
        <p className="mt-10 text-lg font-bold leading-relaxed text-neutral-500 md:mt-14 md:text-2xl">
          열리지 않는 계정, 통과되지 않는 심사.<br />
          규칙도, 플랫폼도, 언어도 다른 중국.
        </p>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed md:text-2xl">
          <strong className="font-bold">서울 본사와 상하이 현지 팀</strong>이 한 팀으로 움직입니다.
          상담은 한국에서, 중국 일은 상하이 팀이 현지에서 직접 처리합니다.
        </p>
        <ul className="mt-16 border-t-2 border-ink md:mt-24">
          {BLOCKED.map((b) => (
            <li key={b.kr} className="grid gap-2 border-b border-ink/15 py-6 md:grid-cols-[1fr_1fr] md:items-baseline md:gap-10 md:py-8">
              <span className="font-display text-2xl leading-none md:text-5xl">{b.kr}</span>
              <span className="text-neutral-600 md:text-lg">{b.d}</span>
            </li>
          ))}
        </ul>
        <div className="mt-20 md:mt-32">
          <p className="font-display text-[2.1rem] leading-[1.15] md:text-7xl">
            광고만 하는 회사가 아닙니다.<br />
            중국의 모든 일을 하는 대행사입니다.
          </p>
          <p className="mt-6 font-en text-lg font-medium text-mute md:text-2xl">Not just an ad agency. Your agency for everything China.</p>
        </div>
      </Wrap>
    </section>
  );
}

/* ───────── 수치 (화면에 들어올 때 한 번만 올라가는 숫자 — 페이지의 유일한 자동 모션) ───────── */
function useCountUp(target, run) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(target); return; }
    let raf, t0;
    const tick = (t) => {
      t0 ??= t;
      const p = Math.min((t - t0) / 1400, 1);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return n;
}

// 숫자 하나하나가 화면에 들어올 때 따로 올라감 (모바일처럼 섹션이 길어도 동작)
function Stat({ s }) {
  const ref = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setRun(true); io.disconnect(); } }, { threshold: 0.5 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const n = useCountUp(s.value, run);
  return (
    <li ref={ref} className="border-t border-white/30 pt-6">
      <div className="flex items-start justify-between gap-4">
        <p className="whitespace-nowrap font-en text-5xl font-semibold tabular-nums leading-none md:text-8xl xl:text-9xl">
          {n.toLocaleString("ko-KR")}<span className="ml-1.5 font-sans text-xl font-bold md:ml-2 md:text-4xl">{s.suffix}</span>
        </p>
        {/* 숫자가 다 올라간 뒤 하나씩 나타남 */}
        <ul className="space-y-1 pt-1 text-right text-xs text-white/60 md:space-y-1.5 md:pt-2 md:text-base">
          {s.tags.map((t, i) => (
            <li
              key={t}
              style={{ transitionDelay: run ? `${1300 + i * 140}ms` : "0ms" }}
              className={`whitespace-nowrap transition duration-300 motion-reduce:transition-none ${run ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"}`}
            >{t}</li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-base font-bold md:mt-5 md:text-lg">{s.label}</p>
      <p className="font-en text-sm text-white/50">{s.en}</p>
    </li>
  );
}

function Stats() {
  return (
    <section id="numbers" className="bg-ink py-24 text-white md:py-36">
      <Wrap>
        <Title kr="라이차이가 만든 숫자" cn="By the numbers" className="[&_span]:text-white/50" />
        <ul className="mt-12 grid grid-cols-1 gap-x-16 gap-y-10 md:mt-24 md:grid-cols-2 md:gap-y-16">
          {STATS.map((s) => <Stat key={s.label} s={s} />)}
        </ul>
      </Wrap>
    </section>
  );
}

/* ───────── 클라이언트 로고 ───────── */
function Clients() {
  return (
    <section id="clients" className="bg-paper py-24 md:py-36">
      <Wrap>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Title kr="함께한 브랜드" cn="Clients" />
          <p className="max-w-sm text-neutral-600">패션, 뷰티, 식품, e스포츠까지. 한국 브랜드의 중국 사업을 현지에서 함께 만들어 왔습니다.</p>
        </div>
        <ul className="mt-14 grid grid-cols-2 border-l border-t border-ink/15 sm:grid-cols-3 lg:grid-cols-4">
          {CLIENTS.map((c, i) => (
            <li key={i} className="group relative flex aspect-[3/2] items-center justify-center border-b border-r border-ink/15 p-3 md:p-6">
              {c.logo
                ? <img src={c.logo} alt={c.name} className="max-h-12 max-w-[70%] opacity-50 grayscale transition group-hover:opacity-100 group-hover:grayscale-0" />
                : <span className="text-center font-logo text-sm leading-tight text-neutral-400 transition group-hover:text-ink md:text-2xl">{c.name}</span>}
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}

/* ───────── 서비스 목록 ───────── */
function Services() {
  const [open, setOpen] = useState(0);
  return (
    <section id="services" className="bg-[#F2F2F0] py-24 md:py-36">
      <Wrap>
        <Title kr="중국, A부터 Z까지" cn="Services" />
        <ul className="mt-14 border-t-2 border-ink">
          {SERVICES.map((s, i) => {
            const on = open === i;
            return (
              <li key={s.kr} className="border-b border-ink/15">
                <button onClick={() => setOpen(on ? -1 : i)} aria-expanded={on} className="flex w-full flex-col gap-1 py-5 text-left md:flex-row md:items-baseline md:justify-between md:gap-6 md:py-8">
                  <span className="text-xl font-bold md:text-4xl">{s.kr}</span>
                  <span className="font-en text-sm font-medium text-mute md:text-lg">{s.cn}</span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <p className="overflow-hidden text-base text-neutral-700 md:text-lg"><span className="block pb-6 md:pb-8">{s.d}</span></p>
                </div>
              </li>
            );
          })}
        </ul>
      </Wrap>
    </section>
  );
}

/* ───────── 자주 묻는 질문 ───────── */
function Faq() {
  return (
    <section className="bg-paper py-24 md:py-36">
      <Wrap className="grid gap-12 md:grid-cols-[1fr_1.7fr]">
        <Title kr="자주 묻는 질문" cn="FAQ" className="md:flex-col md:items-start" />
        <dl className="border-t-2 border-ink">
          {FAQS.map((f) => (
            <div key={f.q} className="border-b border-ink/15 py-7">
              <dt className="text-lg font-bold md:text-xl">{f.q}</dt>
              <dd className="mt-3 text-neutral-700 leading-relaxed">{f.a}</dd>
            </div>
          ))}
        </dl>
      </Wrap>
    </section>
  );
}

/* ───────── 상담 신청서 ───────── */
function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const interests = ["도우인 상점·라이브", "샤오홍슈 계정·스토어", "왕홍·KOL·체험단", "팝업·행사", "현지 촬영", "티몰·이커머스", "Reddit 커뮤니티", "법인·현지 업무", "기타"];
  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true); setFailed(false);
    const fd = new FormData(e.target);
    const body = { ...Object.fromEntries(fd), interest: fd.getAll("interest").join(", ") };
    try {
      const res = await fetch(CONFIG.formEndpoint, { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } });
      if (!res.ok) throw new Error(res.status);
      setSent(true);
      window.fbq && window.fbq("track", "Lead"); // 메타 픽셀을 붙이면 문의 접수가 전환으로 잡힘
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  };
  const field = "w-full border-b border-ink/30 bg-transparent py-3 text-lg placeholder:text-mute focus:border-ink focus:outline-none";
  return (
    <section id="contact" className="bg-ink py-24 md:py-36">
      <Wrap className="grid gap-14 md:grid-cols-[1fr_1.2fr] md:items-start">
        <div className="text-white">
          <Title kr="프로젝트 문의" cn="Start a project" className="[&_span]:text-white/50" />
          <p className="mt-8 text-lg text-white/70">브랜드와 목표를 남겨주시면 담당 매니저가 1영업일 내 연락드립니다. 첫 상담과 진출 가능성 진단은 무료입니다.</p>
          <p className="mt-8 text-white/60"><a href={`mailto:${CONFIG.email}`} className="underline-offset-4 hover:text-white hover:underline">{CONFIG.email}</a></p>
        </div>

        <div className="relative bg-paper p-7 md:p-10">
          <div className="flex items-baseline justify-between border-b-2 border-ink pb-4">
            <p className="text-xl font-bold">프로젝트 문의서</p>
          </div>
          <form onSubmit={onSubmit} name="contact" className="mt-6 space-y-5">
            <input name="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <div className="grid gap-5 sm:grid-cols-2">
              <input required name="company" placeholder="회사·브랜드명" className={field} />
              <input required name="name" placeholder="담당자 성함" className={field} />
            </div>
            <input required name="phone" placeholder="연락처" className={field} />
            <input required name="email" type="email" autoComplete="email" placeholder="이메일" className={field} />
            <fieldset>
              <legend className="mb-3 pt-2 text-sm text-mute">관심 분야</legend>
              <div className="flex flex-wrap gap-2">
                {interests.map((t) => (
                  <label key={t} className="cursor-pointer">
                    <input type="checkbox" name="interest" value={t} className="peer sr-only" />
                    <span className="block border border-ink/25 px-4 py-2 text-sm peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-seal">{t}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <textarea name="message" rows={3} placeholder="제품·서비스, 목표 시장, 현재 상황을 적어주세요" className={field} />
            <button disabled={sent || sending} className="w-full bg-ink py-4 text-lg font-bold text-white transition hover:bg-seal disabled:bg-mute">
              {sent ? "문의가 접수되었습니다. 1영업일 내 연락드립니다" : sending ? "보내는 중" : "문의 접수"}
            </button>
            {failed && <p role="alert" className="text-sm text-seal">전송되지 않았습니다. 잠시 후 다시 누르시거나 {CONFIG.email} 로 메일 주세요.</p>}
          </form>
        </div>
      </Wrap>
      <Wrap className="mt-24 flex flex-col justify-between gap-3 border-t border-white/15 pt-8 pb-20 text-sm text-white/40 md:flex-row md:pb-0">
        <p className="font-logo text-white">laicai.</p>
        <p className="flex flex-col gap-1 md:flex-row md:gap-4"><span>주식회사 라이차이컴퍼니</span><span>대표 이제형</span><span>사업자등록번호 216-88-03745</span></p>
        <p>© 2026 Laicai Company</p>
      </Wrap>
      <style>{`@keyframes stamp { from { transform: scale(1.8); opacity: 0 } to { transform: scale(1); opacity: 1 } } @media (prefers-reduced-motion: reduce) { [class*="animate-[stamp"] { animation: none } }`}</style>
    </section>
  );
}

/* 모바일 하단 고정 문의 버튼 */
function MobileCart() {
  return (
    <a href="#contact" className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between bg-ink px-5 py-4 text-white md:hidden">
      <span className="font-medium">프로젝트 문의</span>
      <span className="font-en text-sm text-white/60">Contact</span>
    </a>
  );
}

function App() {
  return (
    <div className="font-sans text-ink antialiased">
      <main>
        <Hero />
        <Stats />
        <Blocked />
        <Clients />
        <Services />
        <Faq />
        <Contact />
      </main>
      <MobileCart />
    </div>
  );
}

// export default App;
