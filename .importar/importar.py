"""Copia única: trae de la web publicada los archivos que faltan en el repo y comprueba que son idénticos."""
import base64, json, os, re, sys, urllib.request, blake3
ORIGEN = "https://59755432.kit-andresrendon.pages.dev"
m = json.load(open(".importar/manifest.json"))
def h(b, ruta): return blake3.blake3((base64.b64encode(b).decode() + ruta.rsplit(".", 1)[1]).encode()).hexdigest()[:32]
def limpiar(t):
    t = re.sub(r"<!-- Cloudflare Pages Analytics -->.*?<!-- Cloudflare Pages Analytics -->", "", t, flags=re.S)
    t = re.sub(r'<script data-cfasync="false" src="/cdn-cgi/scripts/[^"]*email-decode\.min\.js"></script>', "", t)
    def dec(x):
        k = int(x[:2], 16); return "".join(chr(int(x[i:i+2], 16) ^ k) for i in range(2, len(x), 2))
    t = re.sub(r'<a href="/cdn-cgi/l/email-protection#([0-9a-f]+)"', lambda g: '<a href="mailto:' + dec(g.group(1)) + '"', t)
    t = re.sub(r'<a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="([0-9a-f]+)">\[email&#160;protected\]</a>', lambda g: dec(g.group(1)), t)
    t = re.sub(r'<span class="__cf_email__" data-cfemail="([0-9a-f]+)">\[email&#160;protected\]</span>', lambda g: dec(g.group(1)), t)
    return t
mal = []
for ruta, esperado in m.items():
    dst = ruta.lstrip("/")
    if os.path.exists(dst) and h(open(dst, "rb").read(), ruta) == esperado: continue
    req = urllib.request.Request(ORIGEN + ruta, headers={"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) importar-kit"})
    try:
        b = urllib.request.urlopen(req, timeout=60).read()
    except Exception as e:
        print("ERROR " + ruta + " " + repr(e)); mal.append(ruta); continue
    if h(b, ruta) != esperado and ruta.endswith(".html"):
        b = limpiar(b.decode("utf-8")).encode("utf-8")
    os.makedirs(os.path.dirname(dst) or ".", exist_ok=True)
    open(dst, "wb").write(b)
    ok = h(b, ruta) == esperado
    print(("OK   " if ok else "DIST ") + ruta)
    if not ok: mal.append(ruta)
if mal: print("No coinciden:", mal); sys.exit(1)
print("Todo idéntico a producción")
