# -*- coding: utf-8 -*-
"""空仓库策略：先用 Contents API 种下首提交（README），再用 Git Data API 一次提交其余全部文件"""
import base64, json, os, sys, urllib.request, urllib.parse, urllib.error

TOKEN = sys.argv[1]
REPO = "jiaweifengNN/travel-journal"
ROOT = os.path.dirname(os.path.abspath(__file__))
API = "https://api.github.com"

def api(method, path, body=None):
    req = urllib.request.Request(API + path, method=method, data=(
        json.dumps(body).encode("utf-8") if body is not None else None))
    req.add_header("Authorization", "token " + TOKEN)
    req.add_header("Accept", "application/vnd.github+json")
    req.add_header("User-Agent", "travel-journal-setup")
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read().decode("utf-8")) if r.status != 204 else {}
    except urllib.error.HTTPError as e:
        print("HTTP", e.code, path, e.read().decode("utf-8", "ignore")[:300])
        raise

def b64(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("ascii")

# 1. 首提交：README via Contents API（空仓库唯一可行入口）
res = api("PUT", f"/repos/{REPO}/contents/{urllib.parse.quote('README.md')}", {
    "message": "初始化旅行记录册：README 索引与记录规则",
    "content": b64(os.path.join(ROOT, "README.md")),
})
head_sha = res["commit"]["sha"]
print("首提交 ok:", head_sha)

# 2. 其余文件：blobs -> tree -> commit -> 更新 ref
files = []
for dirpath, dirnames, filenames in os.walk(ROOT):
    if ".git" in dirpath or ".github_push.py" in dirpath:
        continue
    for fn in filenames:
        full = os.path.join(dirpath, fn)
        rel = os.path.relpath(full, ROOT).replace("\\", "/")
        if rel != "README.md":
            files.append(rel)
files.sort()
print("剩余文件:", len(files))

tree_items = []
for rel in files:
    blob = api("POST", f"/repos/{REPO}/git/blobs", {"content": b64(os.path.join(ROOT, rel)), "encoding": "base64"})
    tree_items.append({"path": rel, "mode": "100644", "type": "blob", "sha": blob["sha"]})
    print("blob ok:", rel)

head = api("GET", f"/repos/{REPO}/git/commits/{head_sha}")
tree = api("POST", f"/repos/{REPO}/git/trees", {"base_tree": head["tree"]["sha"], "tree": tree_items})
commit = api("POST", f"/repos/{REPO}/git/commits", {
    "message": "加入模板与 2026 十一平潭自驾 V1（行程/清单/账本/日记/交互页）",
    "tree": tree["sha"], "parents": [head_sha],
})
api("PATCH", f"/repos/{REPO}/git/refs/heads/main", {"sha": commit["sha"], "force": False})
print("DONE:", commit["sha"])
print("URL: https://github.com/" + REPO)
