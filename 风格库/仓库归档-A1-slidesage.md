# 仓库归档 · slidesage

> vedraut/slidesage — 7 套 style-system，每套是机器可读的 JSON token（palette/type/layout/decor）。
> **结构最清晰、最适合直接复刻**的仓库：token 即配方。

## 仓库特点

- 7 套风格系统，每套一份 `assets/style-tokens/<id>.json`（palette + type + layout + decor 全字段）。
- 字体全部用系统字体（Arial/Georgia/Verdana/Comic Sans MS/Consolas），无需 CDN，断网可用。
- 金律：**先理解内容再选风格**（先做 storyboard 再穿衣）。
- 一份 deck 只用一套，全程一致。

## 风格总表

| id | 名称 | 调性 | 适合 | 底色 | 强调色 |
|----|------|------|------|------|--------|
| futuristic-tech | Futuristic Tech Editorial | 锐利、数据驱动、自信 | 产品发布/战略/金融科技（**暗色默认**） | `#0B0F14` | 青`#2BA39A`/薄荷`#5BD1C6` |
| corporate-bright | Corporate Bright | 干净、明亮、自信 | 技术演示/内部评审/品牌对齐（**亮色默认**） | `#FFFFFF` | 蓝`#2A6FD6`/绿`#3FA535` |
| minimalist-luxury | Minimalist Luxury Branding | 高级、克制、大量留白 | 品牌/高管提案/董事会 | `#FBFAF7` | 金`#B08D57` |
| modern-illustration | Modern Illustration Editorial | 明亮、概念性、矢量友好 | 营销/思想领导力/大会演讲 | `#FFFFFF` | 蓝`#3D5AFE`/珊瑚`#FF6F61` |
| soft-clay-3d | Soft 3D Clay | 温暖、圆润、claymorphism | 教育/新手引导（**教育默认**） | `#F4F1FB` | 紫`#8B7CF6`/橙`#F2A65A` |
| japanese-editorial | Japanese Editorial (Washi) | 安静、编辑、大留白、暖纸 | 反思/叙事/设计素养受众 | `#F6F3EC` | 闷红`#B5524B`/松绿`#3F6F66` |
| hand-drawn-editorial | Japanese Hand-Drawn Editorial | 有机、手绘、人味 | 工作坊/构思/非正式教学 | `#FCFBF7` | 赤陶橙`#D9743B`/鼠尾草绿`#4C7A6E` |

## 各风格完整 spec（token 直出）

### futuristic-tech
```json
{
  "palette":{"bg":"0B0F14","bgAlt":"121821","ink":"F2F6FA","inkSoft":"9FB0C0","accent":"2BA39A","accent2":"5BD1C6","chart":["2BA39A","5BD1C6","F2A65A","E2607B","7C8CF8"]},
  "type":{"heading":"Arial","body":"Arial","mono":"Consolas","scale":{"kicker":12,"title":30,"coverTitle":48,"body":16,"caption":11,"stat":80}},
  "layout":{"marginX":0.6,"marginY":0.55,"titleY":0.55,"bodyGap":0.32,"bullet":"—","rule":true},
  "decor":{"coverShape":"diagonal","sectionBand":true}
}
```

### corporate-bright
```json
{
  "palette":{"bg":"FFFFFF","bgAlt":"F1F6FC","ink":"12243B","inkSoft":"5B6B82","accent":"2A6FD6","accent2":"3FA535","chart":["2A6FD6","3FA535","E23B2E","F2A100","6E5BD1"]},
  "type":{"heading":"Arial","body":"Arial","mono":"Consolas","scale":{"kicker":12,"title":30,"coverTitle":48,"body":16,"caption":11,"stat":80}},
  "layout":{"marginX":0.7,"marginY":0.6,"titleY":0.6,"bodyGap":0.32,"bullet":"•","rule":true},
  "decor":{"coverShape":"block","sectionBand":true}
}
```

### minimalist-luxury
```json
{
  "palette":{"bg":"FBFAF7","bgAlt":"F1EEE7","ink":"1A1A1A","inkSoft":"8A8377","accent":"B08D57","accent2":"1A1A1A","chart":["B08D57","1A1A1A","C9B89A","6E6658","D8CFC0"]},
  "type":{"heading":"Georgia","body":"Arial","mono":"Courier New","scale":{"kicker":11,"title":32,"coverTitle":54,"body":16,"caption":10,"stat":72}},
  "layout":{"marginX":0.9,"marginY":0.8,"titleY":0.8,"bodyGap":0.34,"bullet":"none","rule":true},
  "decor":{"coverShape":"frame","sectionBand":false}
}
```

### modern-illustration
```json
{
  "palette":{"bg":"FFFFFF","bgAlt":"F3F6FF","ink":"16213A","inkSoft":"5C6B8A","accent":"3D5AFE","accent2":"FF6F61","chart":["3D5AFE","FF6F61","00BFA6","FFB300","8E24AA"]},
  "type":{"heading":"Trebuchet MS","body":"Arial","mono":"Consolas","scale":{"kicker":12,"title":30,"coverTitle":50,"body":16,"caption":11,"stat":78}},
  "layout":{"marginX":0.7,"marginY":0.6,"titleY":0.6,"bodyGap":0.34,"bullet":"•","rule":true},
  "decor":{"coverShape":"block","sectionBand":true}
}
```

### soft-clay-3d
```json
{
  "palette":{"bg":"F4F1FB","bgAlt":"E9E3FA","ink":"2E2A4A","inkSoft":"7B749C","accent":"8B7CF6","accent2":"F2A65A","chart":["8B7CF6","F2A65A","5BD1C6","F285B0","7CC0F8"]},
  "type":{"heading":"Verdana","body":"Verdana","mono":"Consolas","scale":{"kicker":12,"title":30,"coverTitle":50,"body":16,"caption":11,"stat":76}},
  "layout":{"marginX":0.7,"marginY":0.6,"titleY":0.6,"bodyGap":0.36,"bullet":"•","rule":false},
  "decor":{"coverShape":"circle","sectionBand":true}
}
```

### japanese-editorial
```json
{
  "palette":{"bg":"F6F3EC","bgAlt":"ECE6DA","ink":"2B2A28","inkSoft":"7A756B","accent":"B5524B","accent2":"3F6F66","chart":["B5524B","3F6F66","C99A57","6E7B8B","A7A092"]},
  "type":{"heading":"Georgia","body":"Arial","mono":"Courier New","scale":{"kicker":11,"title":28,"coverTitle":46,"body":15,"caption":10,"stat":66}},
  "layout":{"marginX":0.85,"marginY":0.75,"titleY":0.75,"bodyGap":0.34,"bullet":"・","rule":false},
  "decor":{"coverShape":"circle","sectionBand":false}
}
```
> **已实现**：见 `已实现配方/05-和纸柔光.md`（基于此 token 做的旅行页配方，含呼吸圆等签名元素）。

### hand-drawn-editorial
```json
{
  "palette":{"bg":"FCFBF7","bgAlt":"F0ECE0","ink":"33312C","inkSoft":"857F72","accent":"D9743B","accent2":"4C7A6E","chart":["D9743B","4C7A6E","C7A33B","8C6E9E","6E8CA0"]},
  "type":{"heading":"Comic Sans MS","body":"Verdana","mono":"Courier New","scale":{"kicker":12,"title":28,"coverTitle":46,"body":15,"caption":10,"stat":68}},
  "layout":{"marginX":0.8,"marginY":0.7,"titleY":0.7,"bodyGap":0.34,"bullet":"–","rule":false},
  "decor":{"coverShape":"circle","sectionBand":false}
}
```
> 手绘速写本气质，Comic Sans + `–` 短横列表。**尚未实现旅行页配方，需要时按此 token 制作。**

## token 字段说明

- `palette`: bg/bgAlt/ink/inkSoft/accent/accent2 + chart 数组（图表色）
- `type`: heading/body/mono 字体 + scale（kicker/title/coverTitle/body/caption/stat 的 pt 阶梯）
- `layout`: marginX/marginY（英寸）、bodyGap、bullet（列表符）、rule（标题是否加 accent 横线）
- `decor`: coverShape（block/diagonal/circle/frame）、sectionBand（是否有分节带）

## 复刻方法

1. 把 JSON 的 palette 写成 CSS `:root` 变量（bg→`--bg`，accent→`--accent`...）。
2. 字体栈按 heading/body/mono 设三档。
3. 按 coverShape 定 hero 形态（block=色块、diagonal=对角线、circle=圆形母题、frame=边框）。
4. bullet 符号、是否 rule、sectionBand 决定列表与分节样式。
5. 参考 `已实现配方/05-和纸柔光.md` 看如何把 token 落成完整旅行页。
