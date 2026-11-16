const {
  useState,
  useEffect,
  useRef
} = React;
const CONFIG = {
  email: "laicaicompany@gmail.com",
  formEndpoint: "https://formspree.io/f/meeagqzq",
  heroVideo: "assets/hero.mp4?v=11",
  heroPoster: "assets/hero-poster.jpg?v=11",
  heroVideoMobile: "assets/hero-mobile.mp4?v=2",
  heroPosterMobile: "assets/hero-mobile-poster.jpg?v=2"
};
const BLOCKED = [{
  kr: "중국 플랫폼 계정",
  d: "한국에서 막힌 도우인부터 샤오홍슈 기업 계정까지 열어 드립니다."
}, {
  kr: "상점 입점 · 운영",
  d: "도우인, 샤오홍슈, 티몰 입점 심사부터 운영까지 대신 진행합니다."
}, {
  kr: "콘텐츠 심의",
  d: "수시로 바뀌는 기준에 맞춰 현지 팀이 발행합니다."
}, {
  kr: "왕홍 · 행사",
  d: "현장에서만 되는 섭외와 운영, 중국 팀이 맡습니다."
}];
const STATS = [{
  value: 120,
  suffix: "억 원+",
  label: "누적 매출",
  en: "Total sales",
  tags: ["도우인 라이브커머스", "샤오홍슈 스토어", "티몰 입점", "공동구매"],
  sample: false
}, {
  value: 80,
  suffix: "+",
  label: "함께한 브랜드",
  en: "Brands",
  tags: ["뷰티", "식품", "e스포츠", "패션", "리빙", "병원 · 서비스업"],
  sample: false
}, {
  value: 3000,
  suffix: "명+",
  label: "왕홍 네트워크",
  en: "Influencers",
  tags: ["도우인 왕홍", "샤오홍슈 KOC", "라이브 셀러", "재한 중국인 크리에이터", "KOC · KOL 체험단"],
  sample: false
}, {
  value: 500,
  suffix: "회+",
  label: "라이브 방송",
  en: "Live shows",
  tags: ["자체 라이브", "왕홍 라이브", "공동구매", "행사 현장 중계"],
  sample: false
}];
const SERVICES = [{
  kr: "도우인 상점 운영 · 라이브커머스",
  cn: "Douyin store & live commerce",
  d: "상점 개설부터 상품 등록, CS, 광고, 라이브 판매와 매출 관리까지 맡습니다."
}, {
  kr: "샤오홍슈 계정 관리 · 스토어 운영대행",
  cn: "Xiaohongshu account & store",
  d: "공식 계정 개설과 관리, 콘텐츠 발행, 체험단부터 샤오홍슈 스토어 입점과 운영까지 맡습니다."
}, {
  kr: "왕홍 · KOL · 모델 섭외",
  cn: "Influencers, KOL & talent",
  d: "왕홍, KOC, KOL부터 현지 연예인과 모델까지 섭외하고, 국내와 현지 체험단도 운영합니다."
}, {
  kr: "팝업 · 오프라인 행사",
  cn: "Pop-ups & events",
  d: "장소 섭외, 부스 제작, 현장 운영, 행사 촬영까지 한 팀이 진행합니다."
}, {
  kr: "현지 제작 · 촬영 · 로케이션",
  cn: "Local production & locations",
  d: "현지 촬영팀 구성, 로케이션 섭외, 모델 캐스팅부터 촬영과 편집까지 진행합니다."
}, {
  kr: "법인 설립 · 현지 업무 대행",
  cn: "China setup & operations",
  d: "법인 개설, 행정, 현지 파트너 연결 등 중국 실무 전반."
}, {
  kr: "티몰 · 이커머스 입점 · 운영대행",
  cn: "Tmall & e-commerce",
  d: "티몰을 비롯한 중국 이커머스 입점 심사부터 상점 운영까지 대신 진행합니다."
}, {
  kr: "GEO · SEO · 커뮤니티 마케팅",
  cn: "Search, AI & community marketing",
  d: "중국 검색과 AI 답변에 브랜드가 노출되도록 GEO·SEO를 진행하고, 네이버·Reddit 등 국내외 커뮤니티 마케팅까지 맡습니다."
}];
const CLIENTS = [{
  name: "Gen.G",
  work: "중국 팬 이벤트"
}, {
  name: "OTTOGI",
  work: "중국 팬 이벤트"
}, {
  name: "NEOTERIA",
  work: "현지 촬영 · 라이브"
}, {
  name: "BALLOP",
  work: "샤오홍슈 운영"
}, {
  name: "GTS GLOBAL",
  work: "중국 마케팅"
}, {
  name: "PR SEOUL",
  work: "체험단"
}, {
  name: "CLISIER",
  work: "[ ]"
}, {
  name: "DIOPTON",
  work: "[ ]"
}, {
  name: "CAMA AGENCY"
}, {
  name: "TOUS les JOURS"
}, {
  name: "SAWA"
}, {
  name: "NUTATS"
}, {
  name: "ALDIYOUU"
}];
const FAQS = [{
  q: "한국에서 도우인·샤오홍슈 계정이나 상점을 열 수 있나요?",
  a: "직접 개설은 어렵지만, 라이차이는 도우인·샤오홍슈 본사와의 협력으로 한국 번호, 한국 사업자, 한국 회사 계좌로 개설할 수 있습니다. 개설부터 운영까지 A to Z를 라이차이컴퍼니가 관리합니다."
}, {
  q: "중국 법인이 없어도 되나요?",
  a: "가능합니다. 법인 없이 시작하는 방법과, 필요하면 법인 설립까지 상담 때 함께 안내드립니다."
}, {
  q: "왕홍이나 체험단만 따로 진행할 수 있나요?",
  a: "가능합니다. 왕홍, KOC, KOL, 현지 연예인과 모델 섭외, 국내·현지 체험단까지 필요한 것만 골라 진행할 수 있습니다."
}, {
  q: "중국 현지 촬영이나 행사도 맡길 수 있나요?",
  a: "네. 현지 촬영팀, 로케이션, 모델 섭외부터 팝업·오프라인 행사의 기획과 현장 운영까지 중국 팀이 직접 진행합니다."
}, {
  q: "중국 말고 국내나 글로벌 마케팅도 하나요?",
  a: "네. 네이버, Reddit 등 국내외 커뮤니티 마케팅과 검색·AI 답변 노출을 위한 GEO·SEO도 함께 진행합니다."
}, {
  q: "병원·서비스업도 진행 가능한가요?",
  a: "가능합니다. 샤오홍슈·도우인 채널 운영에 그치지 않고, 중국 커뮤니티 마케팅까지 함께 진행해 방한 중국인 고객과 환자 유치를 목표로 합니다."
}, {
  q: "비용은 어떻게 정해지나요?",
  a: "진행 범위와 기간에 따라 달라집니다. 상담 후 브랜드에 맞는 진행안과 견적을 보내드립니다."
}];
const Wrap = ({
  children,
  className = ""
}) => React.createElement("div", {
  className: `mx-auto w-full max-w-[1320px] px-5 md:px-10 ${className}`
}, children);
const Title = ({
  kr,
  cn,
  className = ""
}) => React.createElement("div", {
  className: `flex flex-col gap-2 md:flex-row md:flex-wrap md:items-baseline md:gap-x-6 ${className}`
}, React.createElement("h2", {
  className: "font-display text-[2.1rem] leading-[1.15] md:text-[5.2rem] md:leading-[1.1]"
}, kr), React.createElement("span", {
  className: "font-en text-lg font-medium text-mute md:text-2xl"
}, cn));
const Seal = ({
  text = "해결",
  size = 64,
  className = ""
}) => React.createElement("span", {
  className: `inline-flex shrink-0 items-center justify-center border-[3px] border-seal font-display text-seal ${className}`,
  style: {
    width: size,
    height: size,
    fontSize: size * 0.32,
    lineHeight: 1.05,
    transform: "rotate(-8deg)",
    borderRadius: 6
  }
}, React.createElement("span", {
  style: {
    writingMode: "vertical-rl"
  }
}, text));
function useCityTimes() {
  const fmt = tz => new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(new Date());
  const read = () => ({
    seoul: fmt("Asia/Seoul"),
    shanghai: fmt("Asia/Shanghai")
  });
  const [t, setT] = useState(read);
  useEffect(() => {
    const id = setInterval(() => setT(read()), 20000);
    return () => clearInterval(id);
  }, []);
  return t;
}
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
  return React.createElement("section", {
    className: "relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-white"
  }, React.createElement("video", {
    className: "absolute inset-0 h-full w-full object-cover",
    key: portrait ? "m" : "d",
    src: portrait ? CONFIG.heroVideoMobile : CONFIG.heroVideo,
    poster: portrait ? CONFIG.heroPosterMobile : CONFIG.heroPoster,
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true
  }), React.createElement("div", {
    className: "absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.75)_0%,rgba(0,0,0,.15)_25%,rgba(0,0,0,.25)_55%,#000_100%)]"
  }), React.createElement("div", {
    className: "absolute inset-x-0 top-0 z-10"
  }, React.createElement(Wrap, {
    className: "flex h-20 items-center justify-between"
  }, React.createElement("a", {
    href: "#",
    className: "font-logo text-2xl"
  }, "laicai."), React.createElement("nav", {
    className: "hidden items-center gap-9 font-en text-sm font-medium text-white/80 md:flex"
  }, React.createElement("a", {
    href: "#blocked",
    className: "hover:text-white"
  }, "About"), React.createElement("a", {
    href: "#services",
    className: "hover:text-white"
  }, "Services"), React.createElement("a", {
    href: "#clients",
    className: "hover:text-white"
  }, "Clients"), React.createElement("a", {
    href: "#contact",
    className: "hover:text-white"
  }, "Contact")))), React.createElement(Wrap, {
    className: "relative flex h-full items-end pb-20 md:pb-14"
  }, React.createElement("div", {
    className: "grid w-full items-end gap-10 md:grid-cols-[1fr_300px]"
  }, React.createElement("div", null, React.createElement("h1", {
    className: "font-display text-[16vw] leading-[0.95] md:text-[6.4vw] xl:text-[7rem]"
  }, "\uC911\uAD6D\uC740,", React.createElement("br", null), "\uC0DD\uAC01\uBCF4\uB2E4", React.createElement("br", {
    className: "md:hidden"
  }), " \uAC00\uAE5D\uC2B5\uB2C8\uB2E4"), React.createElement("p", {
    className: "mt-6 font-en text-xl font-semibold text-white/90 md:text-3xl"
  }, "China is closer than you think."), React.createElement("p", {
    className: "mt-4 max-w-xl text-white/70 md:text-lg"
  }, "\uB3C4\uC6B0\uC778\xB7\uC0E4\uC624\uD64D\uC288\uBD80\uD130 \uC655\uD64D, \uD589\uC0AC, \uBC95\uC778\uAE4C\uC9C0. \uC911\uAD6D \uC0AC\uC5C5\uC744 \uD55C\uAD6D\uC5D0\uC11C \uD574\uACB0\uD569\uB2C8\uB2E4."), React.createElement("p", {
    className: "mt-6 flex gap-6 border-t border-white/30 pt-3 font-en text-sm text-white/60 md:hidden"
  }, React.createElement("span", null, "Seoul ", React.createElement("b", {
    className: "ml-1 font-medium tabular-nums text-white"
  }, time.seoul)), React.createElement("span", null, "Shanghai ", React.createElement("b", {
    className: "ml-1 font-medium tabular-nums text-white"
  }, time.shanghai)))), React.createElement("div", {
    className: "hidden md:block"
  }, React.createElement("dl", {
    className: "grid grid-cols-2 border-t border-white/30 font-en"
  }, [["Seoul", time.seoul], ["Shanghai", time.shanghai]].map(([city, hm]) => React.createElement("div", {
    key: city,
    className: "pt-4"
  }, React.createElement("dt", {
    className: "text-sm text-white/60"
  }, city), React.createElement("dd", {
    className: "mt-1 text-3xl font-medium tabular-nums"
  }, hm)))), React.createElement("a", {
    href: "#contact",
    className: "mt-8 flex items-center justify-between border border-white/70 px-6 py-4 font-medium transition hover:bg-white hover:text-ink"
  }, React.createElement("span", null, "\uD504\uB85C\uC81D\uD2B8 \uBB38\uC758"), React.createElement("span", {
    className: "font-en text-sm opacity-70"
  }, "Contact"))))));
}
function Blocked() {
  return React.createElement("section", {
    id: "blocked",
    className: "bg-paper py-24 md:py-40"
  }, React.createElement(Wrap, null, React.createElement("h2", {
    className: "font-display text-[2.1rem] leading-[1.15] md:text-7xl"
  }, "\uC911\uAD6D,", React.createElement("br", null), React.createElement("span", {
    className: "text-mute"
  }, "\uB77C\uC774\uCC28\uC774\uC5D0\uC11C \uD574\uACB0\uD574 \uB4DC\uB9AC\uACA0\uC2B5\uB2C8\uB2E4.")), React.createElement("p", {
    className: "mt-6 font-en text-lg font-medium text-mute md:text-2xl"
  }, "China? We'll handle it."), React.createElement("p", {
    className: "mt-10 text-lg font-bold leading-relaxed text-neutral-500 md:mt-14 md:text-2xl"
  }, "\uC5F4\uB9AC\uC9C0 \uC54A\uB294 \uACC4\uC815, \uD1B5\uACFC\uB418\uC9C0 \uC54A\uB294 \uC2EC\uC0AC.", React.createElement("br", null), "\uADDC\uCE59\uB3C4, \uD50C\uB7AB\uD3FC\uB3C4, \uC5B8\uC5B4\uB3C4 \uB2E4\uB978 \uC911\uAD6D."), React.createElement("p", {
    className: "mt-6 max-w-2xl text-lg leading-relaxed md:text-2xl"
  }, React.createElement("strong", {
    className: "font-bold"
  }, "\uC11C\uC6B8 \uBCF8\uC0AC\uC640 \uC0C1\uD558\uC774 \uD604\uC9C0 \uD300"), "\uC774 \uD55C \uD300\uC73C\uB85C \uC6C0\uC9C1\uC785\uB2C8\uB2E4. \uC0C1\uB2F4\uC740 \uD55C\uAD6D\uC5D0\uC11C, \uC911\uAD6D \uC77C\uC740 \uC0C1\uD558\uC774 \uD300\uC774 \uD604\uC9C0\uC5D0\uC11C \uC9C1\uC811 \uCC98\uB9AC\uD569\uB2C8\uB2E4."), React.createElement("ul", {
    className: "mt-16 border-t-2 border-ink md:mt-24"
  }, BLOCKED.map(b => React.createElement("li", {
    key: b.kr,
    className: "grid gap-2 border-b border-ink/15 py-6 md:grid-cols-[1fr_1fr] md:items-baseline md:gap-10 md:py-8"
  }, React.createElement("span", {
    className: "font-display text-2xl leading-none md:text-5xl"
  }, b.kr), React.createElement("span", {
    className: "text-neutral-600 md:text-lg"
  }, b.d)))), React.createElement("div", {
    className: "mt-20 md:mt-32"
  }, React.createElement("p", {
    className: "font-display text-[2.1rem] leading-[1.15] md:text-7xl"
  }, "\uAD11\uACE0\uB9CC \uD558\uB294 \uD68C\uC0AC\uAC00 \uC544\uB2D9\uB2C8\uB2E4.", React.createElement("br", null), "\uC911\uAD6D\uC758 \uBAA8\uB4E0 \uC77C\uC744 \uD558\uB294 \uB300\uD589\uC0AC\uC785\uB2C8\uB2E4."), React.createElement("p", {
    className: "mt-6 font-en text-lg font-medium text-mute md:text-2xl"
  }, "Not just an ad agency. Your agency for everything China."))));
}
function useCountUp(target, run) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    let raf, t0;
    const tick = t => {
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
function Stat({
  s
}) {
  const ref = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setRun(true);
        io.disconnect();
      }
    }, {
      threshold: 0.5
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const n = useCountUp(s.value, run);
  return React.createElement("li", {
    ref: ref,
    className: "border-t border-white/30 pt-6"
  }, React.createElement("div", {
    className: "flex items-start justify-between gap-4"
  }, React.createElement("p", {
    className: "whitespace-nowrap font-en text-5xl font-semibold tabular-nums leading-none md:text-8xl xl:text-9xl"
  }, n.toLocaleString("ko-KR"), React.createElement("span", {
    className: "ml-1.5 font-sans text-xl font-bold md:ml-2 md:text-4xl"
  }, s.suffix)), React.createElement("ul", {
    className: "space-y-1 pt-1 text-right text-xs text-white/60 md:space-y-1.5 md:pt-2 md:text-base"
  }, s.tags.map((t, i) => React.createElement("li", {
    key: t,
    style: {
      transitionDelay: run ? `${1300 + i * 140}ms` : "0ms"
    },
    className: `whitespace-nowrap transition duration-300 motion-reduce:transition-none ${run ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"}`
  }, t)))), React.createElement("p", {
    className: "mt-4 text-base font-bold md:mt-5 md:text-lg"
  }, s.label), React.createElement("p", {
    className: "font-en text-sm text-white/50"
  }, s.en));
}
function Stats() {
  return React.createElement("section", {
    id: "numbers",
    className: "bg-ink py-24 text-white md:py-36"
  }, React.createElement(Wrap, null, React.createElement(Title, {
    kr: "\uB77C\uC774\uCC28\uC774\uAC00 \uB9CC\uB4E0 \uC22B\uC790",
    cn: "By the numbers",
    className: "[&_span]:text-white/50"
  }), React.createElement("ul", {
    className: "mt-12 grid grid-cols-1 gap-x-16 gap-y-10 md:mt-24 md:grid-cols-2 md:gap-y-16"
  }, STATS.map(s => React.createElement(Stat, {
    key: s.label,
    s: s
  })))));
}
function Clients() {
  return React.createElement("section", {
    id: "clients",
    className: "bg-paper py-24 md:py-36"
  }, React.createElement(Wrap, null, React.createElement("div", {
    className: "flex flex-col justify-between gap-6 md:flex-row md:items-end"
  }, React.createElement(Title, {
    kr: "\uD568\uAED8\uD55C \uBE0C\uB79C\uB4DC",
    cn: "Clients"
  }), React.createElement("p", {
    className: "max-w-sm text-neutral-600"
  }, "\uD328\uC158, \uBDF0\uD2F0, \uC2DD\uD488, e\uC2A4\uD3EC\uCE20\uAE4C\uC9C0. \uD55C\uAD6D \uBE0C\uB79C\uB4DC\uC758 \uC911\uAD6D \uC0AC\uC5C5\uC744 \uD604\uC9C0\uC5D0\uC11C \uD568\uAED8 \uB9CC\uB4E4\uC5B4 \uC654\uC2B5\uB2C8\uB2E4.")), React.createElement("ul", {
    className: "mt-14 grid grid-cols-2 border-l border-t border-ink/15 sm:grid-cols-3 lg:grid-cols-4"
  }, CLIENTS.map((c, i) => React.createElement("li", {
    key: i,
    className: "group relative flex aspect-[3/2] items-center justify-center border-b border-r border-ink/15 p-3 md:p-6"
  }, c.logo ? React.createElement("img", {
    src: c.logo,
    alt: c.name,
    className: "max-h-12 max-w-[70%] opacity-50 grayscale transition group-hover:opacity-100 group-hover:grayscale-0"
  }) : React.createElement("span", {
    className: "text-center font-logo text-sm leading-tight text-neutral-400 transition group-hover:text-ink md:text-2xl"
  }, c.name))))));
}
function Services() {
  const [open, setOpen] = useState(0);
  return React.createElement("section", {
    id: "services",
    className: "bg-[#F2F2F0] py-24 md:py-36"
  }, React.createElement(Wrap, null, React.createElement(Title, {
    kr: "\uC911\uAD6D, A\uBD80\uD130 Z\uAE4C\uC9C0",
    cn: "Services"
  }), React.createElement("ul", {
    className: "mt-14 border-t-2 border-ink"
  }, SERVICES.map((s, i) => {
    const on = open === i;
    return React.createElement("li", {
      key: s.kr,
      className: "border-b border-ink/15"
    }, React.createElement("button", {
      onClick: () => setOpen(on ? -1 : i),
      "aria-expanded": on,
      className: "flex w-full flex-col gap-1 py-5 text-left md:flex-row md:items-baseline md:justify-between md:gap-6 md:py-8"
    }, React.createElement("span", {
      className: "text-xl font-bold md:text-4xl"
    }, s.kr), React.createElement("span", {
      className: "font-en text-sm font-medium text-mute md:text-lg"
    }, s.cn)), React.createElement("div", {
      className: `grid transition-[grid-template-rows] duration-300 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`
    }, React.createElement("p", {
      className: "overflow-hidden text-base text-neutral-700 md:text-lg"
    }, React.createElement("span", {
      className: "block pb-6 md:pb-8"
    }, s.d))));
  }))));
}
function Faq() {
  return React.createElement("section", {
    className: "bg-paper py-24 md:py-36"
  }, React.createElement(Wrap, {
    className: "grid gap-12 md:grid-cols-[1fr_1.7fr]"
  }, React.createElement(Title, {
    kr: "\uC790\uC8FC \uBB3B\uB294 \uC9C8\uBB38",
    cn: "FAQ",
    className: "md:flex-col md:items-start"
  }), React.createElement("dl", {
    className: "border-t-2 border-ink"
  }, FAQS.map(f => React.createElement("div", {
    key: f.q,
    className: "border-b border-ink/15 py-7"
  }, React.createElement("dt", {
    className: "text-lg font-bold md:text-xl"
  }, f.q), React.createElement("dd", {
    className: "mt-3 text-neutral-700 leading-relaxed"
  }, f.a))))));
}
function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const interests = ["도우인 상점·라이브", "샤오홍슈 계정·스토어", "왕홍·KOL·체험단", "팝업·행사", "현지 촬영", "티몰·이커머스", "GEO·SEO·커뮤니티", "법인·현지 업무", "기타"];
  const onSubmit = async e => {
    e.preventDefault();
    setSending(true);
    setFailed(false);
    const fd = new FormData(e.target);
    fd.set("interest", fd.getAll("interest").join(", "));
    fd.set("_subject", `[홈페이지 문의] ${fd.get("company") || ""}`);
    try {
      const res = await fetch(CONFIG.formEndpoint, {
        method: "POST",
        body: fd,
        headers: {
          Accept: "application/json"
        }
      });
      if (!res.ok) throw new Error(res.status);
      setSent(true);
      window.fbq && window.fbq("track", "Lead");
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  };
  const field = "w-full border-b border-ink/30 bg-transparent py-3 text-lg placeholder:text-mute focus:border-ink focus:outline-none";
  return React.createElement("section", {
    id: "contact",
    className: "bg-ink py-24 md:py-36"
  }, React.createElement(Wrap, {
    className: "grid gap-14 md:grid-cols-[1fr_1.2fr] md:items-start"
  }, React.createElement("div", {
    className: "text-white"
  }, React.createElement(Title, {
    kr: "\uD504\uB85C\uC81D\uD2B8 \uBB38\uC758",
    cn: "Start a project",
    className: "[&_span]:text-white/50"
  }), React.createElement("p", {
    className: "mt-8 text-lg text-white/70"
  }, "\uBE0C\uB79C\uB4DC\uC640 \uBAA9\uD45C\uB97C \uB0A8\uACA8\uC8FC\uC2DC\uBA74 \uB2F4\uB2F9 \uB9E4\uB2C8\uC800\uAC00 1\uC601\uC5C5\uC77C \uB0B4 \uC5F0\uB77D\uB4DC\uB9BD\uB2C8\uB2E4. \uCCAB \uC0C1\uB2F4\uACFC \uC9C4\uCD9C \uAC00\uB2A5\uC131 \uC9C4\uB2E8\uC740 \uBB34\uB8CC\uC785\uB2C8\uB2E4."), React.createElement("p", {
    className: "mt-8 text-white/60"
  }, React.createElement("a", {
    href: `mailto:${CONFIG.email}`,
    className: "underline-offset-4 hover:text-white hover:underline"
  }, CONFIG.email))), React.createElement("div", {
    className: "relative bg-paper p-7 md:p-10"
  }, React.createElement("div", {
    className: "flex items-baseline justify-between border-b-2 border-ink pb-4"
  }, React.createElement("p", {
    className: "text-xl font-bold"
  }, "\uD504\uB85C\uC81D\uD2B8 \uBB38\uC758\uC11C")), React.createElement("form", {
    onSubmit: onSubmit,
    name: "contact",
    className: "mt-6 space-y-5"
  }, React.createElement("div", {
    className: "grid gap-5 sm:grid-cols-2"
  }, React.createElement("input", {
    required: true,
    name: "company",
    placeholder: "\uD68C\uC0AC\xB7\uBE0C\uB79C\uB4DC\uBA85",
    className: field
  }), React.createElement("input", {
    required: true,
    name: "name",
    placeholder: "\uB2F4\uB2F9\uC790 \uC131\uD568",
    className: field
  })), React.createElement("input", {
    required: true,
    name: "phone",
    placeholder: "\uC5F0\uB77D\uCC98",
    className: field
  }), React.createElement("fieldset", null, React.createElement("legend", {
    className: "mb-3 pt-2 text-sm text-mute"
  }, "\uAD00\uC2EC \uBD84\uC57C"), React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, interests.map(t => React.createElement("label", {
    key: t,
    className: "cursor-pointer"
  }, React.createElement("input", {
    type: "checkbox",
    name: "interest",
    value: t,
    className: "peer sr-only"
  }), React.createElement("span", {
    className: "block border border-ink/25 px-4 py-2 text-sm peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-seal"
  }, t))))), React.createElement("textarea", {
    name: "message",
    rows: 3,
    placeholder: "\uC81C\uD488\xB7\uC11C\uBE44\uC2A4, \uBAA9\uD45C \uC2DC\uC7A5, \uD604\uC7AC \uC0C1\uD669\uC744 \uC801\uC5B4\uC8FC\uC138\uC694",
    className: field
  }), React.createElement("button", {
    disabled: sent || sending,
    className: "w-full bg-ink py-4 text-lg font-bold text-white transition hover:bg-seal disabled:bg-mute"
  }, sent ? "문의가 접수되었습니다. 1영업일 내 연락드립니다" : sending ? "보내는 중" : "문의 접수"), failed && React.createElement("p", {
    role: "alert",
    className: "text-sm text-seal"
  }, "\uC804\uC1A1\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uB204\uB974\uC2DC\uAC70\uB098 ", CONFIG.email, " \uB85C \uBA54\uC77C \uC8FC\uC138\uC694.")))), React.createElement(Wrap, {
    className: "mt-24 flex flex-col justify-between gap-3 border-t border-white/15 pt-8 pb-20 text-sm text-white/40 md:flex-row md:pb-0"
  }, React.createElement("p", {
    className: "font-logo text-white"
  }, "laicai."), React.createElement("p", {
    className: "flex flex-col gap-1 md:flex-row md:gap-4"
  }, React.createElement("span", null, "\uC8FC\uC2DD\uD68C\uC0AC \uB77C\uC774\uCC28\uC774\uCEF4\uD37C\uB2C8"), React.createElement("span", null, "\uB300\uD45C \uC774\uC81C\uD615"), React.createElement("span", null, "\uC0AC\uC5C5\uC790\uB4F1\uB85D\uBC88\uD638 216-88-03745")), React.createElement("p", null, "\xA9 2026 Laicai Company")), React.createElement("style", null, `@keyframes stamp { from { transform: scale(1.8); opacity: 0 } to { transform: scale(1); opacity: 1 } } @media (prefers-reduced-motion: reduce) { [class*="animate-[stamp"] { animation: none } }`));
}
function MobileCart() {
  return React.createElement("a", {
    href: "#contact",
    className: "fixed inset-x-0 bottom-0 z-40 flex items-center justify-between bg-ink px-5 py-4 text-white md:hidden"
  }, React.createElement("span", {
    className: "font-medium"
  }, "\uD504\uB85C\uC81D\uD2B8 \uBB38\uC758"), React.createElement("span", {
    className: "font-en text-sm text-white/60"
  }, "Contact"));
}
function App() {
  return React.createElement("div", {
    className: "font-sans text-ink antialiased"
  }, React.createElement("main", null, React.createElement(Hero, null), React.createElement(Stats, null), React.createElement(Blocked, null), React.createElement(Clients, null), React.createElement(Services, null), React.createElement(Faq, null), React.createElement(Contact, null)), React.createElement(MobileCart, null));
}
