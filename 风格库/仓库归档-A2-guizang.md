# 仓库归档 · guizang-ppt-skill-mod

> alphane-ai/guizang-ppt-skill-mod — 两套风格体系，共 **9 套主题色预设**（5 电子墨水 + 4 瑞士）。
> 纪律型仓库：所有颜色走 `:root` token，**禁止现场发明 hex**，只从预设里选。

## 仓库特点

- 两套风格：①「电子杂志×电子墨水」（衬线+WebGL 流体背景）②「瑞士国际主义」（无衬线+网格点阵）。
- 每套若干主题色预设，整体替换 `:root` 即可切主题。
- 铁律：一份 deck 只用一套主题，**不允许混搭**，不允许用户自定义 hex。

---

## 一、电子杂志 × 电子墨水（5 套）

> 暖纸底 + 墨色字 + WebGL shader 散射背景。衬线杂志感，最通用。

通用灰阶/结构（跨主题统一）：`--paper-tint` / `--ink-tint` 作区块底，shader 默认钛金/银色散。

| 主题 | 调性 | 适合 | ink | paper |
|------|------|------|-----|-------|
| 🖋 墨水经典 Monocle | 纯墨黑+暖米白，Monocle/A Book Apart 风，杂志感最强 | 通用/商业/科技，**安全默认** | `#0a0a0b` | `#f1efea` |
| 🌊 靛蓝瓷 Indigo Porcelain | 深靛蓝+瓷白，冷静理性像学术期刊 | 科技/研究/数据/工程师/发布会 | `#0a1f3d` | `#f1f3f5` |
| 🌿 森林墨 Forest Ink | 深森林绿+象牙，像旧版国家地理 | 自然/可持续/文化/户外 | `#1a2e1f` | `#f5f1e8` |
| 🍂 牛皮纸 Kraft Paper | 深棕+暖米，像牛皮信封/老笔记本 | 怀旧/人文/阅读/历史/文学 | `#2a1e13` | `#eedfc7` |
| 🌙 沙丘 Dune | 炭灰+沙色，克制高级像建筑图册 | 艺术/设计/创意/时尚/画廊 | `#1f1a14` | `#f0e6d2` |

### 主题变量（替换 `:root` 中"主题色"行）

**🖋 墨水经典**
```css
--ink:#0a0a0b; --ink-rgb:10,10,11;
--paper:#f1efea; --paper-rgb:241,239,234;
--paper-tint:#e8e5de; --ink-tint:#18181a;
```
**🌊 靛蓝瓷**
```css
--ink:#0a1f3d; --ink-rgb:10,31,61;
--paper:#f1f3f5; --paper-rgb:241,243,245;
--paper-tint:#e4e8ec; --ink-tint:#152a4a;
```
**🌿 森林墨**
```css
--ink:#1a2e1f; --ink-rgb:26,46,31;
--paper:#f5f1e8; --paper-rgb:245,241,232;
--paper-tint:#ece7da; --ink-tint:#253d2c;
```
**🍂 牛皮纸**
```css
--ink:#2a1e13; --ink-rgb:42,30,19;
--paper:#eedfc7; --paper-rgb:238,223,199;
--paper-tint:#e0d0b6; --ink-tint:#3a2a1d;
```
**🌙 沙丘**
```css
--ink:#1f1a14; --ink-rgb:31,26,20;
--paper:#f0e6d2; --paper-rgb:240,230,210;
--paper-tint:#e3d7bf; --ink-tint:#2d2620;
```

---

## 二、瑞士国际主义（4 套）

> 高级灰白底 + **单一高饱和高亮色**（单锚点）。无衬线，网格点阵+细线，零圆角零阴影。
> 灰阶跨主题完全统一，只换 accent。

统一灰阶（不可改）：
```css
--paper:#fafaf8; --grey-1:#f0f0ee; --grey-2:#d4d4d2; --grey-3:#737373; --ink:#0a0a0a;
```

| 主题 | 调性 | 适合 | accent | accent-on |
|------|------|------|--------|-----------|
| 🔵 克莱因蓝 IKB | 纯白底+IKB，极致冷静理性像 Vignelli 作品集 | 通用/AI/科技/设计，**经典默认** | `#002FA7` | `#ffffff` |
| 🟡 柠檬黄 Lemon | 浅米白+柠檬黄，鲜亮活力像 IKEA | 年轻/运动/零售/消费/Y2K | `#FFD500` | `#0a0a0a`（**必须黑字**） |
| 🟢 柠檬绿 Lemon Green | 浅米白+荧光柠檬绿，未来感年轻像 Off-White | 生态/可持续/新兴科技/Z世代 | `#C5E803` | `#0a0a0a`（**必须黑字**） |
| 🟠 安全橙 Safety Orange | 浅米白+安全橙，工业紧迫感像 Saul Bass | 工业/警示/运动/汽车/转折页 | `#FF6B35` | `#ffffff`（白字加粗） |

### 主题变量

**🔵 克莱因蓝 IKB**
```css
--accent:#002FA7; --accent-rgb:0,47,167; --accent-on:#ffffff;
```
**🟡 柠檬黄**
```css
--accent:#FFD500; --accent-rgb:255,213,0; --accent-on:#0a0a0a;
```
**🟢 柠檬绿**
```css
--accent:#C5E803; --accent-rgb:197,232,3; --accent-on:#0a0a0a;
```
**🟠 安全橙**
```css
--accent:#FF6B35; --accent-rgb:255,107,53; --accent-on:#ffffff;
```

### 瑞士风硬规则
- ❌ 不允许混搭多个高亮色（单锚点是灵魂）
- ❌ 不允许自定义 hex（从 4 套选）
- ❌ 不改灰阶变量
- ❌ 不要渐变（纯色）
- ❌ accent 不加阴影/圆角/透明度（直角、纯色、不透明）
- 浅色 accent（黄/绿）的 `accent-on` 必须纯黑，否则糊掉

---

## 复刻说明

- **已实现**：瑞士-克莱因蓝 → `已实现配方/01-瑞士国际主义.md`（含点阵/细线/kicker/IKB 色块等签名元素）。
- 电子墨水 5 套、瑞士其余 3 套**尚未做旅行页配方**，需要时按上面变量 + 瑞士风纪律制作。
- 电子墨水风格需 WebGL shader 背景（motion.min.js）；做纯 HTML 旅行页可降级为静态径向渐变模拟散射感。
