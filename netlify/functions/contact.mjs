// 홈페이지 문의 → Resend API로 메일 발송 (기존 laicaicompany.net 과 같은 구조·같은 환경변수)
// Netlify 환경변수: RESEND_API_KEY, CONTACT_FROM_EMAIL(noreply@laicaicompany.net), CONTACT_TO_EMAIL(laicaicompany@gmail.com)
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// 메일 본문 (메일 앱 호환: 표 레이아웃 + 인라인 스타일). 색은 홈페이지와 같음: 검정 / 흰색 / 회색 #8A8A86 / 인주색 #C8281E
export function renderHtml({ company, name, phone, email, interest, message }) {
  const F = "font-family:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif;";
  const row = (k, v) =>
    `<tr><td style="${F}padding:14px 0;border-bottom:1px solid #E5E5E2;color:#8A8A86;font-size:13px;width:96px;vertical-align:top">${k}</td>` +
    `<td style="${F}padding:14px 0;border-bottom:1px solid #E5E5E2;color:#000;font-size:15px;vertical-align:top">${v}</td></tr>`;
  const tags = interest
    ? interest.split(",").map((t) => `<span style="display:inline-block;margin:0 6px 6px 0;padding:4px 10px;border:1px solid #000;font-size:13px">${esc(t.trim())}</span>`).join("")
    : `<span style="color:#8A8A86">-</span>`;
  const btn = (href, label, bg) =>
    `<a href="${href}" style="${F}display:inline-block;margin-right:8px;padding:12px 22px;background:${bg};color:#fff;font-size:14px;font-weight:700;text-decoration:none">${label}</a>`;
  return `<!doctype html><html><body style="margin:0;padding:0;background:#F2F2F0">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F2F2F0;padding:32px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff">
  <tr><td style="background:#000;padding:22px 32px">
    <span style="font-family:Arial,sans-serif;font-size:22px;font-weight:800;letter-spacing:-0.5px;color:#fff">laicai<span style="color:#C8281E">.</span></span>
    <span style="${F}float:right;color:#8A8A86;font-size:12px;line-height:30px">홈페이지 문의</span>
  </td></tr>
  <tr><td style="padding:32px 32px 8px">
    <p style="${F}margin:0;color:#C8281E;font-size:13px;font-weight:700">새 프로젝트 문의</p>
    <h1 style="${F}margin:6px 0 0;font-size:24px;line-height:1.35;color:#000">${esc(company)}</h1>
  </td></tr>
  <tr><td style="padding:16px 32px 8px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:2px solid #000">
      ${row("담당자", esc(name))}
      ${row("연락처", esc(phone))}
      ${row("이메일", `<a href="mailto:${esc(email)}" style="color:#000">${esc(email)}</a>`)}
      ${row("관심 분야", tags)}
    </table>
  </td></tr>
  <tr><td style="padding:20px 32px 8px">
    <p style="${F}margin:0 0 8px;color:#8A8A86;font-size:13px">문의 내용</p>
    <div style="${F}padding:18px 20px;background:#F7F7F5;border-left:3px solid #C8281E;color:#000;font-size:15px;line-height:1.7;white-space:pre-wrap">${esc(message) || '<span style="color:#8A8A86">(내용 없음)</span>'}</div>
  </td></tr>
  <tr><td style="padding:24px 32px 32px">
    ${btn(`mailto:${esc(email)}`, "답장하기", "#000")}${btn(`tel:${esc(phone.replace(/[^\d+]/g, ""))}`, "전화하기", "#C8281E")}
  </td></tr>
  <tr><td style="${F}padding:16px 32px;border-top:1px solid #E5E5E2;color:#8A8A86;font-size:12px">laicaicompany.com 문의 폼에서 접수된 메일입니다. 답장하면 문의하신 분께 바로 전달됩니다.</td></tr>
</table></td></tr></table></body></html>`;
}

export default async (req) => {
  if (req.method !== "POST") return Response.json({ error: "Method Not Allowed" }, { status: 405 });
  const { RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL || !CONTACT_TO_EMAIL)
    return Response.json({ error: "Netlify 환경 변수(RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL)가 설정되지 않았습니다." }, { status: 500 });

  const f = await req.json().catch(() => ({}));
  if (f.honeypot) return Response.json({ success: true }); // 숨김칸이 채워졌으면 봇 → 성공인 척 무시
  const get = (k, max) => String(f[k] ?? "").trim().slice(0, max);
  const d = { company: get("company", 100), name: get("name", 50), phone: get("phone", 50), email: get("email", 100), interest: get("interest", 300), message: get("message", 5000) };
  if (!d.company || !d.name || !d.phone || !d.email) return Response.json({ error: "회사명·성함·연락처·이메일을 입력해주세요." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return Response.json({ error: "이메일 주소를 확인해주세요." }, { status: 400 });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
    body: JSON.stringify({
      from: `라이차이컴퍼니 홈페이지 <${CONTACT_FROM_EMAIL}>`,
      to: CONTACT_TO_EMAIL,
      reply_to: d.email, // 받은 메일에서 답장 → 문의한 분에게 바로
      subject: `[홈페이지 문의] ${d.company}`,
      html: renderHtml(d),
      text: [`회사·브랜드명: ${d.company}`, `담당자: ${d.name}`, `연락처: ${d.phone}`, `이메일: ${d.email}`, `관심 분야: ${d.interest || "-"}`, "", d.message || "(내용 없음)"].join("\n"),
    }),
  });
  if (!res.ok) {
    console.error("Resend Error:", await res.text());
    return Response.json({ error: "Resend 발송 실패" }, { status: 500 });
  }
  return Response.json({ success: true });
};
