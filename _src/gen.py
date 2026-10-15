import pathlib, re
ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = "https://fuzzysiren.com"
NAV = [("index.html","Home"),("games.html","Games"),("about.html","Studio"),("press.html","Press"),("contact.html","Contact")]
TPL = (ROOT/"_src"/"template.html").read_text(encoding="utf-8")

for page in sorted((ROOT/"_src"/"pages").glob("*.html")):
    raw = page.read_text(encoding="utf-8")
    meta = dict(re.findall(r"^<!--\s*(\w+):\s*(.*?)\s*-->$", raw, re.M))
    body = re.sub(r"^<!--\s*\w+:.*?-->\n", "", raw, flags=re.M)
    nav = "".join(
        f'<a href="{href}"{" aria-current=\"page\"" if href == page.name else ""}>{label}</a>'
        for href, label in NAV)
    canonical = SITE + ("/" if page.name == "index.html" else "/" + page.name)
    out = (TPL.replace("{{title}}", meta.get("title","Fuzzy Siren LLC"))
              .replace("{{description}}", meta.get("description",""))
              .replace("{{canonical}}", canonical)
              .replace("{{nav}}", nav)
              .replace("{{body}}", body.strip()))
    (ROOT/page.name).write_text(out, encoding="utf-8")
    print("wrote", page.name)
