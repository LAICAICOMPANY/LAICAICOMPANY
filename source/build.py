# -*- coding: utf-8 -*-
"""
라이차이컴퍼니 홈페이지 빌드 스크립트 (Windows / Mac 공통)

  python build.py           → source/App.jsx 를 컴파일해 site/app.js, site/index.html 생성 (배포용)
                               (Node.js 필요: npx esbuild 를 사용)
  python build.py preview   → site/preview.html 생성 (Node 없이 브라우저에서 바로 확인용, 배포 전 자동 삭제됨)

배포: site 폴더 전체를 Netlify 에 올리면 됩니다.
"""
import pathlib, subprocess, sys, shutil

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent
SITE = ROOT / "site"
APP = HERE / "App.jsx"

TITLE = "라이차이컴퍼니 | 도우인·샤오홍슈 운영, 왕홍, 행사, 중국 법인 대행"
DESC = "라이차이컴퍼니는 서울 본사와 상하이 현지 팀이 함께 도우인·샤오홍슈 계정과 상점 운영, 왕홍·KOL 섭외, 팝업·행사, 현지 촬영, 티몰 입점, 중국 법인 업무까지 대신하는 중국 전문 대행사입니다."

HEAD = f"""<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{TITLE}</title>
<link rel="icon" type="image/png" href="/logo.png" />
<meta name="naver-site-verification" content="50ab138917d8b33e23f8cbfab3ed7e2737ff8ac1" />
<meta name="description" content="{DESC}" />
<meta name="keywords" content="라이차이, 라이차이컴퍼니, LaiCai, 중국마케팅, 도우인, 샤오홍슈, 왕홍, 중국 라이브커머스, 티몰 입점, 중국 법인 설립, 중국 팝업" />
<link rel="canonical" href="https://laicaicompany.com" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://laicaicompany.com" />
<meta property="og:title" content="{TITLE}" />
<meta property="og:description" content="{DESC}" />
<meta property="og:image" content="https://laicaicompany.com/og-image.png?v=2" />
<meta property="og:site_name" content="라이차이컴퍼니" />
<meta property="og:locale" content="ko_KR" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{TITLE}" />
<meta name="twitter:description" content="{DESC}" />
<meta name="twitter:image" content="https://laicaicompany.com/og-image.png?v=2" />
<script type="application/ld+json">
{{"@context":"https://schema.org","@type":"Organization","name":"주식회사 라이차이컴퍼니 (LaiCai Company)","url":"https://laicaicompany.com","logo":"https://laicaicompany.com/logo.png","description":"{DESC}","contactPoint":{{"@type":"ContactPoint","contactType":"customer service","email":"laicaicompany@gmail.com"}}}}
</script>
<!-- Meta Pixel (1449018493425141): 모든 페이지 PageView, 문의 접수 시 Lead (app.js) -->
<script>
!function(f,b,e,v,n,t,s){{if(f.fbq)return;n=f.fbq=function(){{n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)}};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','1449018493425141');
fbq('track','PageView');
</script>
<noscript><img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=1449018493425141&ev=PageView&noscript=1"/></noscript>
<link rel="preload" href="assets/hero-poster.jpg?v=11" as="image" media="(orientation: landscape)" />
<link rel="preload" href="assets/hero-mobile-poster.jpg?v=2" as="image" media="(orientation: portrait)" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
<style>
@font-face{{font-family:"Archivo";src:url("assets/fonts/Archivo-Variable.ttf") format("truetype");font-weight:100 900;font-stretch:62% 125%;font-display:swap}}
@font-face{{font-family:"Black Han Sans";src:url("assets/fonts/BlackHanSans-Regular.ttf") format("truetype");font-display:swap}}
.font-en{{font-stretch:115%;letter-spacing:-0.01em}}
.font-logo{{font-family:"Archivo",sans-serif;font-stretch:125%;font-weight:800;letter-spacing:-0.03em}}
html{{scroll-behavior:smooth;scroll-padding-top:64px}} body{{background:#fff;word-break:keep-all}} :focus-visible{{outline:2px solid #C8281E;outline-offset:3px}}
</style>
<script src="https://cdn.tailwindcss.com/3.4.16"></script>
<script>
tailwind.config = {{ theme: {{ extend: {{
  colors: {{ ink: '#000000', paper: '#FFFFFF', mute: '#8A8A86', seal: '#C8281E', dyred: '#FE2C55', dycyan: '#25F4EE', brand: {{ orange: '#FF4D00', navy: '#0A0E17' }} }},
  fontFamily: {{ sans: ['Pretendard', 'sans-serif'], display: ['"Black Han Sans"', 'Pretendard', 'sans-serif'], en: ['Archivo', 'Pretendard', 'sans-serif'] }}
}} }} }};
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
"""

MOUNT = "ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));"


def build_site():
    npx = shutil.which("npx") or shutil.which("npx.cmd")
    if not npx:
        sys.exit("Node.js(npx)가 없습니다. https://nodejs.org 에서 LTS 설치 후 다시 실행하거나, 'python build.py preview' 로 미리보기만 하세요.")
    subprocess.run([npx, "--yes", "esbuild@0.24.0", str(APP), "--loader:.jsx=jsx",
                    "--jsx-factory=React.createElement", "--jsx-fragment=React.Fragment",
                    "--outfile=" + str(SITE / "app.js")], check=True)
    html = HEAD + f"""</head>
<body>
<div id="root"></div>
<script src="app.js?v={int(APP.stat().st_mtime)}"></script>
<script>{MOUNT}</script>
</body>
</html>"""
    (SITE / "index.html").write_text(html, encoding="utf-8")
    pv = SITE / "preview.html"
    if pv.exists():
        pv.unlink()
    print("완료: site/index.html, site/app.js  → site 폴더를 Netlify 에 배포하세요")


def build_preview():
    app = APP.read_text(encoding="utf-8")
    html = HEAD + f"""<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.26.4/babel.min.js"></script>
</head>
<body>
<div id="root"></div>
<script type="text/babel">
{app}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
</script>
</body>
</html>"""
    (SITE / "preview.html").write_text(html, encoding="utf-8")
    print("완료: site/preview.html  → site 폴더에서  python -m http.server 8765  실행 후 http://localhost:8765/preview.html")


if __name__ == "__main__":
    build_preview() if (len(sys.argv) > 1 and sys.argv[1] == "preview") else build_site()
