// 홈페이지 문의 → Resend API로 메일 발송 (기존 laicaicompany.net 과 같은 구조·같은 환경변수)
// Netlify 환경변수: RESEND_API_KEY, CONTACT_FROM_EMAIL(noreply@laicaicompany.net), CONTACT_TO_EMAIL(laicaicompany@gmail.com)
export default async (req) => {
  if (req.method !== "POST") return Response.json({ error: "Method Not Allowed" }, { status: 405 });
  const { RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL || !CONTACT_TO_EMAIL)
    return Response.json({ error: "Netlify 환경 변수(RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL)가 설정되지 않았습니다." }, { status: 500 });

  const f = await req.json().catch(() => ({}));
  if (f.honeypot) return Response.json({ success: true }); // 숨김칸이 채워졌으면 봇 → 성공인 척 무시
  const get = (k, max) => String(f[k] ?? "").trim().slice(0, max);
  const company = get("company", 100), name = get("name", 50), phone = get("phone", 50);
  if (!company || !name || !phone) return Response.json({ error: "회사명·성함·연락처를 입력해주세요." }, { status: 400 });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      subject: `[홈페이지 문의] ${company}`,
      text: [
        `회사·브랜드명: ${company}`,
        `담당자: ${name}`,
        `연락처: ${phone}`,
        `관심 분야: ${get("interest", 300) || "-"}`,
        "",
        get("message", 5000) || "(내용 없음)",
      ].join("\n"),
    }),
  });
  if (!res.ok) {
    console.error("Resend Error:", await res.text());
    return Response.json({ error: "Resend 발송 실패" }, { status: 500 });
  }
  return Response.json({ success: true });
};
