const { useState, useEffect, useRef } = React;
const CONFIG = {
  email: "laicaicompany@gmail.com",
  formEndpoint: "/.netlify/functions/contact",
  // netlify/functions/contact.mjs → Resend로 laicaicompany@gmail.com 발송 (기존 .net과 같은 구조)
  heroVideo: "assets/hero.mp4?v=11",
  // v13: 사무실 회의 → 젠지 행사 3컷(관중석·입구·응원봉), 11초 루프
  heroPoster: "assets/hero-poster.jpg?v=11",
  heroVideoMobile: "assets/hero-mobile.mp4?v=2",
  // 세로(9:16) 버전: 같은 4컷을 세로 화면에 맞게 따로 자름, 11초 루프
  heroPosterMobile: "assets/hero-mobile-poster.jpg?v=2"
};
const BLOCKED = [
  { kr: "\uC911\uAD6D \uD50C\uB7AB\uD3FC \uACC4\uC815", d: "\uD55C\uAD6D\uC5D0\uC11C \uB9C9\uD78C \uB3C4\uC6B0\uC778\uBD80\uD130 \uC0E4\uC624\uD64D\uC288 \uAE30\uC5C5 \uACC4\uC815\uAE4C\uC9C0 \uC5F4\uC5B4 \uB4DC\uB9BD\uB2C8\uB2E4." },
  { kr: "\uC0C1\uC810 \uC785\uC810 \xB7 \uC6B4\uC601", d: "\uB3C4\uC6B0\uC778, \uC0E4\uC624\uD64D\uC288, \uD2F0\uBAB0 \uC785\uC810 \uC2EC\uC0AC\uBD80\uD130 \uC6B4\uC601\uAE4C\uC9C0 \uB300\uC2E0 \uC9C4\uD589\uD569\uB2C8\uB2E4." },
  { kr: "\uCF58\uD150\uCE20 \uC2EC\uC758", d: "\uC218\uC2DC\uB85C \uBC14\uB00C\uB294 \uAE30\uC900\uC5D0 \uB9DE\uCDB0 \uD604\uC9C0 \uD300\uC774 \uBC1C\uD589\uD569\uB2C8\uB2E4." },
  { kr: "\uC655\uD64D \xB7 \uD589\uC0AC", d: "\uD604\uC7A5\uC5D0\uC11C\uB9CC \uB418\uB294 \uC12D\uC678\uC640 \uC6B4\uC601, \uC911\uAD6D \uD300\uC774 \uB9E1\uC2B5\uB2C8\uB2E4." }
];
const STATS = [
  { value: 120, suffix: "\uC5B5 \uC6D0+", label: "\uB204\uC801 \uB9E4\uCD9C", en: "Total sales", tags: ["\uB3C4\uC6B0\uC778 \uB77C\uC774\uBE0C\uCEE4\uBA38\uC2A4", "\uC0E4\uC624\uD64D\uC288 \uC2A4\uD1A0\uC5B4", "\uD2F0\uBAB0 \uC785\uC810", "\uACF5\uB3D9\uAD6C\uB9E4"], sample: false },
  { value: 80, suffix: "+", label: "\uD568\uAED8\uD55C \uBE0C\uB79C\uB4DC", en: "Brands", tags: ["\uBDF0\uD2F0", "\uC2DD\uD488", "e\uC2A4\uD3EC\uCE20", "\uD328\uC158", "\uB9AC\uBE59", "\uBCD1\uC6D0 \xB7 \uC11C\uBE44\uC2A4\uC5C5"], sample: false },
  // [ ] 업종 확인
  { value: 3e3, suffix: "\uBA85+", label: "\uC655\uD64D \uB124\uD2B8\uC6CC\uD06C", en: "Influencers", tags: ["\uB3C4\uC6B0\uC778 \uC655\uD64D", "\uC0E4\uC624\uD64D\uC288 KOC", "\uB77C\uC774\uBE0C \uC140\uB7EC", "\uC7AC\uD55C \uC911\uAD6D\uC778 \uD06C\uB9AC\uC5D0\uC774\uD130", "KOC \xB7 KOL \uCCB4\uD5D8\uB2E8"], sample: false },
  { value: 500, suffix: "\uD68C+", label: "\uB77C\uC774\uBE0C \uBC29\uC1A1", en: "Live shows", tags: ["\uC790\uCCB4 \uB77C\uC774\uBE0C", "\uC655\uD64D \uB77C\uC774\uBE0C", "\uACF5\uB3D9\uAD6C\uB9E4", "\uD589\uC0AC \uD604\uC7A5 \uC911\uACC4"], sample: false }
];
const SERVICES = [
  { kr: "\uB3C4\uC6B0\uC778 \uC0C1\uC810 \uC6B4\uC601 \xB7 \uB77C\uC774\uBE0C\uCEE4\uBA38\uC2A4", cn: "Douyin store & live commerce", d: "\uC0C1\uC810 \uAC1C\uC124\uBD80\uD130 \uC0C1\uD488 \uB4F1\uB85D, CS, \uAD11\uACE0, \uB77C\uC774\uBE0C \uD310\uB9E4\uC640 \uB9E4\uCD9C \uAD00\uB9AC\uAE4C\uC9C0 \uB9E1\uC2B5\uB2C8\uB2E4." },
  { kr: "\uC0E4\uC624\uD64D\uC288 \uACC4\uC815 \uAD00\uB9AC \xB7 \uC2A4\uD1A0\uC5B4 \uC6B4\uC601\uB300\uD589", cn: "Xiaohongshu account & store", d: "\uACF5\uC2DD \uACC4\uC815 \uAC1C\uC124\uACFC \uAD00\uB9AC, \uCF58\uD150\uCE20 \uBC1C\uD589, \uCCB4\uD5D8\uB2E8\uBD80\uD130 \uC0E4\uC624\uD64D\uC288 \uC2A4\uD1A0\uC5B4 \uC785\uC810\uACFC \uC6B4\uC601\uAE4C\uC9C0 \uB9E1\uC2B5\uB2C8\uB2E4." },
  { kr: "\uC655\uD64D \xB7 KOL \xB7 \uBAA8\uB378 \uC12D\uC678", cn: "Influencers, KOL & talent", d: "\uC655\uD64D, KOC, KOL\uBD80\uD130 \uD604\uC9C0 \uC5F0\uC608\uC778\uACFC \uBAA8\uB378\uAE4C\uC9C0 \uC12D\uC678\uD558\uACE0, \uAD6D\uB0B4\uC640 \uD604\uC9C0 \uCCB4\uD5D8\uB2E8\uB3C4 \uC6B4\uC601\uD569\uB2C8\uB2E4." },
  { kr: "\uD31D\uC5C5 \xB7 \uC624\uD504\uB77C\uC778 \uD589\uC0AC", cn: "Pop-ups & events", d: "\uC7A5\uC18C \uC12D\uC678, \uBD80\uC2A4 \uC81C\uC791, \uD604\uC7A5 \uC6B4\uC601, \uD589\uC0AC \uCD2C\uC601\uAE4C\uC9C0 \uD55C \uD300\uC774 \uC9C4\uD589\uD569\uB2C8\uB2E4." },
  { kr: "\uD604\uC9C0 \uC81C\uC791 \xB7 \uCD2C\uC601 \xB7 \uB85C\uCF00\uC774\uC158", cn: "Local production & locations", d: "\uD604\uC9C0 \uCD2C\uC601\uD300 \uAD6C\uC131, \uB85C\uCF00\uC774\uC158 \uC12D\uC678, \uBAA8\uB378 \uCE90\uC2A4\uD305\uBD80\uD130 \uCD2C\uC601\uACFC \uD3B8\uC9D1\uAE4C\uC9C0 \uC9C4\uD589\uD569\uB2C8\uB2E4." },
  { kr: "\uBC95\uC778 \uC124\uB9BD \xB7 \uD604\uC9C0 \uC5C5\uBB34 \uB300\uD589", cn: "China setup & operations", d: "\uBC95\uC778 \uAC1C\uC124, \uD589\uC815, \uD604\uC9C0 \uD30C\uD2B8\uB108 \uC5F0\uACB0 \uB4F1 \uC911\uAD6D \uC2E4\uBB34 \uC804\uBC18." },
  { kr: "\uD2F0\uBAB0 \xB7 \uC774\uCEE4\uBA38\uC2A4 \uC785\uC810 \xB7 \uC6B4\uC601\uB300\uD589", cn: "Tmall & e-commerce", d: "\uD2F0\uBAB0\uC744 \uBE44\uB86F\uD55C \uC911\uAD6D \uC774\uCEE4\uBA38\uC2A4 \uC785\uC810 \uC2EC\uC0AC\uBD80\uD130 \uC0C1\uC810 \uC6B4\uC601\uAE4C\uC9C0 \uB300\uC2E0 \uC9C4\uD589\uD569\uB2C8\uB2E4." },
  { kr: "GEO \xB7 SEO \xB7 \uCEE4\uBBA4\uB2C8\uD2F0 \uB9C8\uCF00\uD305", cn: "Search, AI & community marketing", d: "\uC911\uAD6D \uAC80\uC0C9\uACFC AI \uB2F5\uBCC0\uC5D0 \uBE0C\uB79C\uB4DC\uAC00 \uB178\uCD9C\uB418\uB3C4\uB85D GEO\xB7SEO\uB97C \uC9C4\uD589\uD558\uACE0, \uB124\uC774\uBC84\xB7Reddit \uB4F1 \uAD6D\uB0B4\uC678 \uCEE4\uBBA4\uB2C8\uD2F0 \uB9C8\uCF00\uD305\uAE4C\uC9C0 \uB9E1\uC2B5\uB2C8\uB2E4." }
];
const CLIENTS = [
  // [ ] logo: "assets/logos/xxx.svg" 를 넣으면 글자 대신 로고 표시 (흑백 단색 로고 권장)
  // [ ] 사이트에 이름을 노출해도 되는 곳만 남기기 (특히 젠지·오뚜기는 사전 동의)
  { name: "Gen.G", work: "\uC911\uAD6D \uD32C \uC774\uBCA4\uD2B8" },
  { name: "OTTOGI", work: "\uC911\uAD6D \uD32C \uC774\uBCA4\uD2B8" },
  { name: "NEOTERIA", work: "\uD604\uC9C0 \uCD2C\uC601 \xB7 \uB77C\uC774\uBE0C" },
  { name: "BALLOP", work: "\uC0E4\uC624\uD64D\uC288 \uC6B4\uC601" },
  { name: "GTS GLOBAL", work: "\uC911\uAD6D \uB9C8\uCF00\uD305" },
  { name: "PR SEOUL", work: "\uCCB4\uD5D8\uB2E8" },
  { name: "CLISIER", work: "[ ]" },
  { name: "DIOPTON", work: "[ ]" },
  { name: "CAMA AGENCY" },
  { name: "TOUS les JOURS" },
  { name: "SAWA" },
  // 사와참숯화로 · 스시사와
  { name: "NUTATS" },
  { name: "ALDIYOUU" }
];
const FAQS = [
  { q: "\uD55C\uAD6D\uC5D0\uC11C \uB3C4\uC6B0\uC778\xB7\uC0E4\uC624\uD64D\uC288 \uACC4\uC815\uC774\uB098 \uC0C1\uC810\uC744 \uC5F4 \uC218 \uC788\uB098\uC694?", a: "\uC9C1\uC811 \uAC1C\uC124\uC740 \uC5B4\uB835\uC9C0\uB9CC, \uB77C\uC774\uCC28\uC774\uB294 \uB3C4\uC6B0\uC778\xB7\uC0E4\uC624\uD64D\uC288 \uBCF8\uC0AC\uC640\uC758 \uD611\uB825\uC73C\uB85C \uD55C\uAD6D \uBC88\uD638, \uD55C\uAD6D \uC0AC\uC5C5\uC790, \uD55C\uAD6D \uD68C\uC0AC \uACC4\uC88C\uB85C \uAC1C\uC124\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uAC1C\uC124\uBD80\uD130 \uC6B4\uC601\uAE4C\uC9C0 A to Z\uB97C \uB77C\uC774\uCC28\uC774\uCEF4\uD37C\uB2C8\uAC00 \uAD00\uB9AC\uD569\uB2C8\uB2E4." },
  { q: "\uC911\uAD6D \uBC95\uC778\uC774 \uC5C6\uC5B4\uB3C4 \uB418\uB098\uC694?", a: "\uAC00\uB2A5\uD569\uB2C8\uB2E4. \uBC95\uC778 \uC5C6\uC774 \uC2DC\uC791\uD558\uB294 \uBC29\uBC95\uACFC, \uD544\uC694\uD558\uBA74 \uBC95\uC778 \uC124\uB9BD\uAE4C\uC9C0 \uC0C1\uB2F4 \uB54C \uD568\uAED8 \uC548\uB0B4\uB4DC\uB9BD\uB2C8\uB2E4." },
  { q: "\uC655\uD64D\uC774\uB098 \uCCB4\uD5D8\uB2E8\uB9CC \uB530\uB85C \uC9C4\uD589\uD560 \uC218 \uC788\uB098\uC694?", a: "\uAC00\uB2A5\uD569\uB2C8\uB2E4. \uC655\uD64D, KOC, KOL, \uD604\uC9C0 \uC5F0\uC608\uC778\uACFC \uBAA8\uB378 \uC12D\uC678, \uAD6D\uB0B4\xB7\uD604\uC9C0 \uCCB4\uD5D8\uB2E8\uAE4C\uC9C0 \uD544\uC694\uD55C \uAC83\uB9CC \uACE8\uB77C \uC9C4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." },
  { q: "\uC911\uAD6D \uD604\uC9C0 \uCD2C\uC601\uC774\uB098 \uD589\uC0AC\uB3C4 \uB9E1\uAE38 \uC218 \uC788\uB098\uC694?", a: "\uB124. \uD604\uC9C0 \uCD2C\uC601\uD300, \uB85C\uCF00\uC774\uC158, \uBAA8\uB378 \uC12D\uC678\uBD80\uD130 \uD31D\uC5C5\xB7\uC624\uD504\uB77C\uC778 \uD589\uC0AC\uC758 \uAE30\uD68D\uACFC \uD604\uC7A5 \uC6B4\uC601\uAE4C\uC9C0 \uC911\uAD6D \uD300\uC774 \uC9C1\uC811 \uC9C4\uD589\uD569\uB2C8\uB2E4." },
  { q: "\uC911\uAD6D \uB9D0\uACE0 \uAD6D\uB0B4\uB098 \uAE00\uB85C\uBC8C \uB9C8\uCF00\uD305\uB3C4 \uD558\uB098\uC694?", a: "\uB124. \uB124\uC774\uBC84, Reddit \uB4F1 \uAD6D\uB0B4\uC678 \uCEE4\uBBA4\uB2C8\uD2F0 \uB9C8\uCF00\uD305\uACFC \uAC80\uC0C9\xB7AI \uB2F5\uBCC0 \uB178\uCD9C\uC744 \uC704\uD55C GEO\xB7SEO\uB3C4 \uD568\uAED8 \uC9C4\uD589\uD569\uB2C8\uB2E4." },
  { q: "\uBCD1\uC6D0\xB7\uC11C\uBE44\uC2A4\uC5C5\uB3C4 \uC9C4\uD589 \uAC00\uB2A5\uD55C\uAC00\uC694?", a: "\uAC00\uB2A5\uD569\uB2C8\uB2E4. \uC0E4\uC624\uD64D\uC288\xB7\uB3C4\uC6B0\uC778 \uCC44\uB110 \uC6B4\uC601\uC5D0 \uADF8\uCE58\uC9C0 \uC54A\uACE0, \uC911\uAD6D \uCEE4\uBBA4\uB2C8\uD2F0 \uB9C8\uCF00\uD305\uAE4C\uC9C0 \uD568\uAED8 \uC9C4\uD589\uD574 \uBC29\uD55C \uC911\uAD6D\uC778 \uACE0\uAC1D\uACFC \uD658\uC790 \uC720\uCE58\uB97C \uBAA9\uD45C\uB85C \uD569\uB2C8\uB2E4." },
  { q: "\uBE44\uC6A9\uC740 \uC5B4\uB5BB\uAC8C \uC815\uD574\uC9C0\uB098\uC694?", a: "\uC9C4\uD589 \uBC94\uC704\uC640 \uAE30\uAC04\uC5D0 \uB530\uB77C \uB2EC\uB77C\uC9D1\uB2C8\uB2E4. \uC0C1\uB2F4 \uD6C4 \uBE0C\uB79C\uB4DC\uC5D0 \uB9DE\uB294 \uC9C4\uD589\uC548\uACFC \uACAC\uC801\uC744 \uBCF4\uB0B4\uB4DC\uB9BD\uB2C8\uB2E4." }
];
const Wrap = ({ children, className = "" }) => /* @__PURE__ */ React.createElement("div", { className: `mx-auto w-full max-w-[1320px] px-5 md:px-10 ${className}` }, children);
const Title = ({ kr, cn, className = "" }) => /* @__PURE__ */ React.createElement("div", { className: `flex flex-col gap-2 md:flex-row md:flex-wrap md:items-baseline md:gap-x-6 ${className}` }, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-[2.1rem] leading-[1.15] md:text-[5.2rem] md:leading-[1.1]" }, kr), /* @__PURE__ */ React.createElement("span", { className: "font-en text-lg font-medium text-mute md:text-2xl" }, cn));
const Seal = ({ text = "\uD574\uACB0", size = 64, className = "" }) => /* @__PURE__ */ React.createElement(
  "span",
  {
    className: `inline-flex shrink-0 items-center justify-center border-[3px] border-seal font-display text-seal ${className}`,
    style: { width: size, height: size, fontSize: size * 0.32, lineHeight: 1.05, transform: "rotate(-8deg)", borderRadius: 6 }
  },
  /* @__PURE__ */ React.createElement("span", { style: { writingMode: "vertical-rl" } }, text)
);
function useCityTimes() {
  const fmt = (tz) => new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false }).format(/* @__PURE__ */ new Date());
  const read = () => ({ seoul: fmt("Asia/Seoul"), shanghai: fmt("Asia/Shanghai") });
  const [t, setT] = useState(read);
  useEffect(() => {
    const id = setInterval(() => setT(read()), 2e4);
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
  return /* @__PURE__ */ React.createElement("section", { className: "relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-white" }, /* @__PURE__ */ React.createElement("video", { className: "absolute inset-0 h-full w-full object-cover", key: portrait ? "m" : "d", src: portrait ? CONFIG.heroVideoMobile : CONFIG.heroVideo, poster: portrait ? CONFIG.heroPosterMobile : CONFIG.heroPoster, autoPlay: true, muted: true, loop: true, playsInline: true }), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.75)_0%,rgba(0,0,0,.15)_25%,rgba(0,0,0,.25)_55%,#000_100%)]" }), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-x-0 top-0 z-10" }, /* @__PURE__ */ React.createElement(Wrap, { className: "flex h-20 items-center justify-between" }, /* @__PURE__ */ React.createElement("a", { href: "#", className: "font-logo text-2xl" }, "laicai."), /* @__PURE__ */ React.createElement("nav", { className: "hidden items-center gap-9 font-en text-sm font-medium text-white/80 md:flex" }, /* @__PURE__ */ React.createElement("a", { href: "#blocked", className: "hover:text-white" }, "About"), /* @__PURE__ */ React.createElement("a", { href: "#services", className: "hover:text-white" }, "Services"), /* @__PURE__ */ React.createElement("a", { href: "#clients", className: "hover:text-white" }, "Clients"), /* @__PURE__ */ React.createElement("a", { href: "#contact", className: "hover:text-white" }, "Contact")))), /* @__PURE__ */ React.createElement(Wrap, { className: "relative flex h-full items-end pb-20 md:pb-14" }, /* @__PURE__ */ React.createElement("div", { className: "grid w-full items-end gap-10 md:grid-cols-[1fr_300px]" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "font-display text-[16vw] leading-[0.95] md:text-[6.4vw] xl:text-[7rem]" }, "\uC911\uAD6D\uC740,", /* @__PURE__ */ React.createElement("br", null), "\uC0DD\uAC01\uBCF4\uB2E4", /* @__PURE__ */ React.createElement("br", { className: "md:hidden" }), " \uAC00\uAE5D\uC2B5\uB2C8\uB2E4"), /* @__PURE__ */ React.createElement("p", { className: "mt-6 font-en text-xl font-semibold text-white/90 md:text-3xl" }, "China is closer than you think."), /* @__PURE__ */ React.createElement("p", { className: "mt-4 max-w-xl text-white/70 md:text-lg" }, "\uB3C4\uC6B0\uC778\xB7\uC0E4\uC624\uD64D\uC288\uBD80\uD130 \uC655\uD64D, \uD589\uC0AC, \uBC95\uC778\uAE4C\uC9C0. \uC911\uAD6D \uC0AC\uC5C5\uC744 \uD55C\uAD6D\uC5D0\uC11C \uD574\uACB0\uD569\uB2C8\uB2E4."), /* @__PURE__ */ React.createElement("p", { className: "mt-6 flex gap-6 border-t border-white/30 pt-3 font-en text-sm text-white/60 md:hidden" }, /* @__PURE__ */ React.createElement("span", null, "Seoul ", /* @__PURE__ */ React.createElement("b", { className: "ml-1 font-medium tabular-nums text-white" }, time.seoul)), /* @__PURE__ */ React.createElement("span", null, "Shanghai ", /* @__PURE__ */ React.createElement("b", { className: "ml-1 font-medium tabular-nums text-white" }, time.shanghai)))), /* @__PURE__ */ React.createElement("div", { className: "hidden md:block" }, /* @__PURE__ */ React.createElement("dl", { className: "grid grid-cols-2 border-t border-white/30 font-en" }, [["Seoul", time.seoul], ["Shanghai", time.shanghai]].map(([city, hm]) => /* @__PURE__ */ React.createElement("div", { key: city, className: "pt-4" }, /* @__PURE__ */ React.createElement("dt", { className: "text-sm text-white/60" }, city), /* @__PURE__ */ React.createElement("dd", { className: "mt-1 text-3xl font-medium tabular-nums" }, hm)))), /* @__PURE__ */ React.createElement("a", { href: "#contact", className: "mt-8 flex items-center justify-between border border-white/70 px-6 py-4 font-medium transition hover:bg-white hover:text-ink" }, /* @__PURE__ */ React.createElement("span", null, "\uD504\uB85C\uC81D\uD2B8 \uBB38\uC758"), /* @__PURE__ */ React.createElement("span", { className: "font-en text-sm opacity-70" }, "Contact"))))));
}
function Blocked() {
  return /* @__PURE__ */ React.createElement("section", { id: "blocked", className: "bg-paper py-24 md:py-40" }, /* @__PURE__ */ React.createElement(Wrap, null, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-[2.1rem] leading-[1.15] md:text-7xl" }, "\uC911\uAD6D,", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { className: "text-mute" }, "\uB77C\uC774\uCC28\uC774\uC5D0\uC11C \uD574\uACB0\uD574 \uB4DC\uB9AC\uACA0\uC2B5\uB2C8\uB2E4.")), /* @__PURE__ */ React.createElement("p", { className: "mt-6 font-en text-lg font-medium text-mute md:text-2xl" }, "China? We'll handle it."), /* @__PURE__ */ React.createElement("p", { className: "mt-10 text-lg font-bold leading-relaxed text-neutral-500 md:mt-14 md:text-2xl" }, "\uC5F4\uB9AC\uC9C0 \uC54A\uB294 \uACC4\uC815, \uD1B5\uACFC\uB418\uC9C0 \uC54A\uB294 \uC2EC\uC0AC.", /* @__PURE__ */ React.createElement("br", null), "\uADDC\uCE59\uB3C4, \uD50C\uB7AB\uD3FC\uB3C4, \uC5B8\uC5B4\uB3C4 \uB2E4\uB978 \uC911\uAD6D."), /* @__PURE__ */ React.createElement("p", { className: "mt-6 max-w-2xl text-lg leading-relaxed md:text-2xl" }, /* @__PURE__ */ React.createElement("strong", { className: "font-bold" }, "\uC11C\uC6B8 \uBCF8\uC0AC\uC640 \uC0C1\uD558\uC774 \uD604\uC9C0 \uD300"), "\uC774 \uD55C \uD300\uC73C\uB85C \uC6C0\uC9C1\uC785\uB2C8\uB2E4. \uC0C1\uB2F4\uC740 \uD55C\uAD6D\uC5D0\uC11C, \uC911\uAD6D \uC77C\uC740 \uC0C1\uD558\uC774 \uD300\uC774 \uD604\uC9C0\uC5D0\uC11C \uC9C1\uC811 \uCC98\uB9AC\uD569\uB2C8\uB2E4."), /* @__PURE__ */ React.createElement("ul", { className: "mt-16 border-t-2 border-ink md:mt-24" }, BLOCKED.map((b) => /* @__PURE__ */ React.createElement("li", { key: b.kr, className: "grid gap-2 border-b border-ink/15 py-6 md:grid-cols-[1fr_1fr] md:items-baseline md:gap-10 md:py-8" }, /* @__PURE__ */ React.createElement("span", { className: "font-display text-2xl leading-none md:text-5xl" }, b.kr), /* @__PURE__ */ React.createElement("span", { className: "text-neutral-600 md:text-lg" }, b.d)))), /* @__PURE__ */ React.createElement("div", { className: "mt-20 md:mt-32" }, /* @__PURE__ */ React.createElement("p", { className: "font-display text-[2.1rem] leading-[1.15] md:text-7xl" }, "\uAD11\uACE0\uB9CC \uD558\uB294 \uD68C\uC0AC\uAC00 \uC544\uB2D9\uB2C8\uB2E4.", /* @__PURE__ */ React.createElement("br", null), "\uC911\uAD6D\uC758 \uBAA8\uB4E0 \uC77C\uC744 \uD558\uB294 \uB300\uD589\uC0AC\uC785\uB2C8\uB2E4."), /* @__PURE__ */ React.createElement("p", { className: "mt-6 font-en text-lg font-medium text-mute md:text-2xl" }, "Not just an ad agency. Your agency for everything China."))));
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
function Stat({ s }) {
  const ref = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setRun(true);
        io.disconnect();
      }
    }, { threshold: 0.5 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const n = useCountUp(s.value, run);
  return /* @__PURE__ */ React.createElement("li", { ref, className: "border-t border-white/30 pt-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between gap-4" }, /* @__PURE__ */ React.createElement("p", { className: "whitespace-nowrap font-en text-5xl font-semibold tabular-nums leading-none md:text-8xl xl:text-9xl" }, n.toLocaleString("ko-KR"), /* @__PURE__ */ React.createElement("span", { className: "ml-1.5 font-sans text-xl font-bold md:ml-2 md:text-4xl" }, s.suffix)), /* @__PURE__ */ React.createElement("ul", { className: "space-y-1 pt-1 text-right text-xs text-white/60 md:space-y-1.5 md:pt-2 md:text-base" }, s.tags.map((t, i) => /* @__PURE__ */ React.createElement(
    "li",
    {
      key: t,
      style: { transitionDelay: run ? `${1300 + i * 140}ms` : "0ms" },
      className: `whitespace-nowrap transition duration-300 motion-reduce:transition-none ${run ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"}`
    },
    t
  )))), /* @__PURE__ */ React.createElement("p", { className: "mt-4 text-base font-bold md:mt-5 md:text-lg" }, s.label), /* @__PURE__ */ React.createElement("p", { className: "font-en text-sm text-white/50" }, s.en));
}
function Stats() {
  return /* @__PURE__ */ React.createElement("section", { id: "numbers", className: "bg-ink py-24 text-white md:py-36" }, /* @__PURE__ */ React.createElement(Wrap, null, /* @__PURE__ */ React.createElement(Title, { kr: "\uB77C\uC774\uCC28\uC774\uAC00 \uB9CC\uB4E0 \uC22B\uC790", cn: "By the numbers", className: "[&_span]:text-white/50" }), /* @__PURE__ */ React.createElement("ul", { className: "mt-12 grid grid-cols-1 gap-x-16 gap-y-10 md:mt-24 md:grid-cols-2 md:gap-y-16" }, STATS.map((s) => /* @__PURE__ */ React.createElement(Stat, { key: s.label, s })))));
}
function Clients() {
  return /* @__PURE__ */ React.createElement("section", { id: "clients", className: "bg-paper py-24 md:py-36" }, /* @__PURE__ */ React.createElement(Wrap, null, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col justify-between gap-6 md:flex-row md:items-end" }, /* @__PURE__ */ React.createElement(Title, { kr: "\uD568\uAED8\uD55C \uBE0C\uB79C\uB4DC", cn: "Clients" }), /* @__PURE__ */ React.createElement("p", { className: "max-w-sm text-neutral-600" }, "\uD328\uC158, \uBDF0\uD2F0, \uC2DD\uD488, e\uC2A4\uD3EC\uCE20\uAE4C\uC9C0. \uD55C\uAD6D \uBE0C\uB79C\uB4DC\uC758 \uC911\uAD6D \uC0AC\uC5C5\uC744 \uD604\uC9C0\uC5D0\uC11C \uD568\uAED8 \uB9CC\uB4E4\uC5B4 \uC654\uC2B5\uB2C8\uB2E4.")), /* @__PURE__ */ React.createElement("ul", { className: "mt-14 grid grid-cols-2 border-l border-t border-ink/15 sm:grid-cols-3 lg:grid-cols-4" }, CLIENTS.map((c, i) => /* @__PURE__ */ React.createElement("li", { key: i, className: "group relative flex aspect-[3/2] items-center justify-center border-b border-r border-ink/15 p-3 md:p-6" }, c.logo ? /* @__PURE__ */ React.createElement("img", { src: c.logo, alt: c.name, className: "max-h-12 max-w-[70%] opacity-50 grayscale transition group-hover:opacity-100 group-hover:grayscale-0" }) : /* @__PURE__ */ React.createElement("span", { className: "text-center font-logo text-sm leading-tight text-neutral-400 transition group-hover:text-ink md:text-2xl" }, c.name))))));
}
function Services() {
  const [open, setOpen] = useState(0);
  return /* @__PURE__ */ React.createElement("section", { id: "services", className: "bg-[#F2F2F0] py-24 md:py-36" }, /* @__PURE__ */ React.createElement(Wrap, null, /* @__PURE__ */ React.createElement(Title, { kr: "\uC911\uAD6D, A\uBD80\uD130 Z\uAE4C\uC9C0", cn: "Services" }), /* @__PURE__ */ React.createElement("ul", { className: "mt-14 border-t-2 border-ink" }, SERVICES.map((s, i) => {
    const on = open === i;
    return /* @__PURE__ */ React.createElement("li", { key: s.kr, className: "border-b border-ink/15" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setOpen(on ? -1 : i), "aria-expanded": on, className: "flex w-full flex-col gap-1 py-5 text-left md:flex-row md:items-baseline md:justify-between md:gap-6 md:py-8" }, /* @__PURE__ */ React.createElement("span", { className: "text-xl font-bold md:text-4xl" }, s.kr), /* @__PURE__ */ React.createElement("span", { className: "font-en text-sm font-medium text-mute md:text-lg" }, s.cn)), /* @__PURE__ */ React.createElement("div", { className: `grid transition-[grid-template-rows] duration-300 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}` }, /* @__PURE__ */ React.createElement("p", { className: "overflow-hidden text-base text-neutral-700 md:text-lg" }, /* @__PURE__ */ React.createElement("span", { className: "block pb-6 md:pb-8" }, s.d))));
  }))));
}
function Faq() {
  return /* @__PURE__ */ React.createElement("section", { className: "bg-paper py-24 md:py-36" }, /* @__PURE__ */ React.createElement(Wrap, { className: "grid gap-12 md:grid-cols-[1fr_1.7fr]" }, /* @__PURE__ */ React.createElement(Title, { kr: "\uC790\uC8FC \uBB3B\uB294 \uC9C8\uBB38", cn: "FAQ", className: "md:flex-col md:items-start" }), /* @__PURE__ */ React.createElement("dl", { className: "border-t-2 border-ink" }, FAQS.map((f) => /* @__PURE__ */ React.createElement("div", { key: f.q, className: "border-b border-ink/15 py-7" }, /* @__PURE__ */ React.createElement("dt", { className: "text-lg font-bold md:text-xl" }, f.q), /* @__PURE__ */ React.createElement("dd", { className: "mt-3 text-neutral-700 leading-relaxed" }, f.a))))));
}
function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const interests = ["\uB3C4\uC6B0\uC778 \uC0C1\uC810\xB7\uB77C\uC774\uBE0C", "\uC0E4\uC624\uD64D\uC288 \uACC4\uC815\xB7\uC2A4\uD1A0\uC5B4", "\uC655\uD64D\xB7KOL\xB7\uCCB4\uD5D8\uB2E8", "\uD31D\uC5C5\xB7\uD589\uC0AC", "\uD604\uC9C0 \uCD2C\uC601", "\uD2F0\uBAB0\xB7\uC774\uCEE4\uBA38\uC2A4", "GEO\xB7SEO\xB7\uCEE4\uBBA4\uB2C8\uD2F0", "\uBC95\uC778\xB7\uD604\uC9C0 \uC5C5\uBB34", "\uAE30\uD0C0"];
  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setFailed(false);
    const fd = new FormData(e.target);
    const body = { ...Object.fromEntries(fd), interest: fd.getAll("interest").join(", ") };
    try {
      const res = await fetch(CONFIG.formEndpoint, { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } });
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
  return /* @__PURE__ */ React.createElement("section", { id: "contact", className: "bg-ink py-24 md:py-36" }, /* @__PURE__ */ React.createElement(Wrap, { className: "grid gap-14 md:grid-cols-[1fr_1.2fr] md:items-start" }, /* @__PURE__ */ React.createElement("div", { className: "text-white" }, /* @__PURE__ */ React.createElement(Title, { kr: "\uD504\uB85C\uC81D\uD2B8 \uBB38\uC758", cn: "Start a project", className: "[&_span]:text-white/50" }), /* @__PURE__ */ React.createElement("p", { className: "mt-8 text-lg text-white/70" }, "\uBE0C\uB79C\uB4DC\uC640 \uBAA9\uD45C\uB97C \uB0A8\uACA8\uC8FC\uC2DC\uBA74 \uB2F4\uB2F9 \uB9E4\uB2C8\uC800\uAC00 1\uC601\uC5C5\uC77C \uB0B4 \uC5F0\uB77D\uB4DC\uB9BD\uB2C8\uB2E4. \uCCAB \uC0C1\uB2F4\uACFC \uC9C4\uCD9C \uAC00\uB2A5\uC131 \uC9C4\uB2E8\uC740 \uBB34\uB8CC\uC785\uB2C8\uB2E4."), /* @__PURE__ */ React.createElement("p", { className: "mt-8 text-white/60" }, /* @__PURE__ */ React.createElement("a", { href: `mailto:${CONFIG.email}`, className: "underline-offset-4 hover:text-white hover:underline" }, CONFIG.email))), /* @__PURE__ */ React.createElement("div", { className: "relative bg-paper p-7 md:p-10" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-baseline justify-between border-b-2 border-ink pb-4" }, /* @__PURE__ */ React.createElement("p", { className: "text-xl font-bold" }, "\uD504\uB85C\uC81D\uD2B8 \uBB38\uC758\uC11C")), /* @__PURE__ */ React.createElement("form", { onSubmit, name: "contact", className: "mt-6 space-y-5" }, /* @__PURE__ */ React.createElement("input", { name: "honeypot", tabIndex: -1, autoComplete: "off", "aria-hidden": "true", className: "hidden" }), /* @__PURE__ */ React.createElement("div", { className: "grid gap-5 sm:grid-cols-2" }, /* @__PURE__ */ React.createElement("input", { required: true, name: "company", placeholder: "\uD68C\uC0AC\xB7\uBE0C\uB79C\uB4DC\uBA85", className: field }), /* @__PURE__ */ React.createElement("input", { required: true, name: "name", placeholder: "\uB2F4\uB2F9\uC790 \uC131\uD568", className: field })), /* @__PURE__ */ React.createElement("input", { required: true, name: "phone", placeholder: "\uC5F0\uB77D\uCC98", className: field }), /* @__PURE__ */ React.createElement("input", { required: true, name: "tel", type: "tel", inputMode: "tel", autoComplete: "tel", placeholder: "\uC804\uD654\uBC88\uD638", className: field }), /* @__PURE__ */ React.createElement("fieldset", null, /* @__PURE__ */ React.createElement("legend", { className: "mb-3 pt-2 text-sm text-mute" }, "\uAD00\uC2EC \uBD84\uC57C"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, interests.map((t) => /* @__PURE__ */ React.createElement("label", { key: t, className: "cursor-pointer" }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", name: "interest", value: t, className: "peer sr-only" }), /* @__PURE__ */ React.createElement("span", { className: "block border border-ink/25 px-4 py-2 text-sm peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-seal" }, t))))), /* @__PURE__ */ React.createElement("textarea", { name: "message", rows: 3, placeholder: "\uC81C\uD488\xB7\uC11C\uBE44\uC2A4, \uBAA9\uD45C \uC2DC\uC7A5, \uD604\uC7AC \uC0C1\uD669\uC744 \uC801\uC5B4\uC8FC\uC138\uC694", className: field }), /* @__PURE__ */ React.createElement("button", { disabled: sent || sending, className: "w-full bg-ink py-4 text-lg font-bold text-white transition hover:bg-seal disabled:bg-mute" }, sent ? "\uBB38\uC758\uAC00 \uC811\uC218\uB418\uC5C8\uC2B5\uB2C8\uB2E4. 1\uC601\uC5C5\uC77C \uB0B4 \uC5F0\uB77D\uB4DC\uB9BD\uB2C8\uB2E4" : sending ? "\uBCF4\uB0B4\uB294 \uC911" : "\uBB38\uC758 \uC811\uC218"), failed && /* @__PURE__ */ React.createElement("p", { role: "alert", className: "text-sm text-seal" }, "\uC804\uC1A1\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uB204\uB974\uC2DC\uAC70\uB098 ", CONFIG.email, " \uB85C \uBA54\uC77C \uC8FC\uC138\uC694.")))), /* @__PURE__ */ React.createElement(Wrap, { className: "mt-24 flex flex-col justify-between gap-3 border-t border-white/15 pt-8 pb-20 text-sm text-white/40 md:flex-row md:pb-0" }, /* @__PURE__ */ React.createElement("p", { className: "font-logo text-white" }, "laicai."), /* @__PURE__ */ React.createElement("p", { className: "flex flex-col gap-1 md:flex-row md:gap-4" }, /* @__PURE__ */ React.createElement("span", null, "\uC8FC\uC2DD\uD68C\uC0AC \uB77C\uC774\uCC28\uC774\uCEF4\uD37C\uB2C8"), /* @__PURE__ */ React.createElement("span", null, "\uB300\uD45C \uC774\uC81C\uD615"), /* @__PURE__ */ React.createElement("span", null, "\uC0AC\uC5C5\uC790\uB4F1\uB85D\uBC88\uD638 216-88-03745")), /* @__PURE__ */ React.createElement("p", null, "\xA9 2026 Laicai Company")), /* @__PURE__ */ React.createElement("style", null, `@keyframes stamp { from { transform: scale(1.8); opacity: 0 } to { transform: scale(1); opacity: 1 } } @media (prefers-reduced-motion: reduce) { [class*="animate-[stamp"] { animation: none } }`));
}
function MobileCart() {
  return /* @__PURE__ */ React.createElement("a", { href: "#contact", className: "fixed inset-x-0 bottom-0 z-40 flex items-center justify-between bg-ink px-5 py-4 text-white md:hidden" }, /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, "\uD504\uB85C\uC81D\uD2B8 \uBB38\uC758"), /* @__PURE__ */ React.createElement("span", { className: "font-en text-sm text-white/60" }, "Contact"));
}
function App() {
  return /* @__PURE__ */ React.createElement("div", { className: "font-sans text-ink antialiased" }, /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement(Hero, null), /* @__PURE__ */ React.createElement(Stats, null), /* @__PURE__ */ React.createElement(Blocked, null), /* @__PURE__ */ React.createElement(Clients, null), /* @__PURE__ */ React.createElement(Services, null), /* @__PURE__ */ React.createElement(Faq, null), /* @__PURE__ */ React.createElement(Contact, null)), /* @__PURE__ */ React.createElement(MobileCart, null));
}
