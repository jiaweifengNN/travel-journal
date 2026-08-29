# 仓库归档 · ppt-master-plus

> gnuhpc/ppt-master-plus — **23 个 visual-styles** + spec_lock 配色锁 + page_rhythm 节奏三分 + 6 个 modes（论证结构）。
> 工程型仓库：visual-style **只管"怎么用色/形状/装饰"，不带 HEX**——颜色来自独立的 spec_lock。

## 仓库特点（与别库的关键区别）

- **visual-style 不带 HEX**：它只描述形状语言、装饰密度、留白节奏、字体性格、纹理/高程。颜色真值在 `design_spec.colors`/`spec_lock.colors`。
- 所以复刻本库风格需两步：① 选 visual-style（定形状/装饰）② 选 spec_lock 配色（定 hex）。
- 另含 **page_rhythm**：anchor 锚点页 / dense 高密度页 / breathing 呼吸页，为每页定节奏。
- **mode**（论证结构，与风格正交）：briefing/instructional/narrative/pyramid/showcase/academic。
- 已实现的 `03-暗夜科技` 用了 dark-tech style + spec_lock 六字段 + page_rhythm。

## 23 个 visual-styles 总表

### 企业/产品
| style | 性格 | 适合 |
|-------|------|------|
| swiss-minimal | 网格锁定、锐利、激进留白、零装饰 | 高端咨询/建筑/字体主导 |
| soft-rounded | 圆角卡、柔和高程、亲和 | 产品/SaaS/培训/消费 |
| glassmorphism | 半透玻璃面板、渐变光、漂浮深度 | 现代 SaaS/金融科技/AI 演示 |
| dark-tech | 暗底、发光 accent、几何精确 | 科技/AI/数据/发布会 |
| blueprint | 暗蓝图纸上细线工图、等距、标注 | 技术简报/架构/工程 |
| marble-luxury | 石材面板、金属发线、粗细 CJK 对比 | 地产/奢品/董事会/高端咨询 |
| sage-minimal | 柔和大地色、超轻 CJK、巨幅留白 | 产品/生活方式/健康/ESG/清洁科技 |
| dark-serif | 近黑底、CJK 衬线、克制金属 accent | 商业计划/正式提案/法律金融/投资备忘 |

### 编辑/出版
| style | 性格 | 适合 |
|-------|------|------|
| editorial | 杂志层级、规则与分栏、衬线/无衬线互文 | 金融/新闻/分析/解释 |
| photo-editorial | 全幅照片主导、文字做点与注 | 建筑/设计/时尚/文化/大图 |
| data-journalism | 多栏微图、侧栏、来源行、密 | 金融/市场回顾/研究/数据报告 |
| brutalist | 报纸密度、框线、原始结构、扁平 | 年度回顾/研究摘要/宣言 |

### 表现/印刷
| style | 性格 | 适合 |
|-------|------|------|
| memphis | 撞色块、几何碎屑、粗轮廓、80s | 节日/消费/年轻/发布造势 |
| zine | Riso 错位、半调、限色、印刷颗粒 | 文化/设计讲座/独立品牌 |
| vintage-poster | 50-70s 中世纪海报、平色块、半调、暖 | 传承/接待/文化/周年 |
| paper-cut | 剪纸分层、层间软影、触感 | 文化/民俗/儿童/节日/可持续 |

### 手绘/笔触
| style | 性格 | 适合 |
|-------|------|------|
| sketch-notes | 暖纸、涂鸦线、柔和粉彩块 | 教育/培训/新手引导/知识 |
| ink-notes | 浅底、黑手墨、稀疏语义 accent | 方法论/前后对比/宣言 |
| chalkboard | 深石板、粉笔笔触、粉感粉彩 accent | 教学/教程/课堂/学术 |
| ink-wash | 宣纸留白、笔触、印章 accent、静 | 文化/哲学/传承/新中式 |

### 特殊
| style | 性格 | 适合 |
|-------|------|------|
| pixel-art | 严格像素网格、块状、限色、扁平 | 游戏/复古科技/怀旧/游戏味 |

## spec_lock 六字段（配色锁，需另行选择）

复刻本库风格必须额外定配色，六字段：
```
background / secondary_bg / primary / accent / secondary_accent / body_text
```
已实现的 `03-暗夜科技` 示例：
```css
--bg:#0b0e14; --bg2:#131826; --primary:#4cc9f0; --accent:#f72585; --accent2:#ffd166; --txt:#e6edf3;
```

## page_rhythm 节奏三分

每个区块标节奏徽章：
- `ANCHOR` 锚点页（品红）—— 重要视觉锚点，整版
- `DENSE` 高密度页（青）—— 表格/多数据
- `BREATHING` 呼吸页（金）—— 大留白

## 复刻方法

1. 选 1 个 visual-style（上表），读其 `.md` 拿形状/装饰/字体性格。
2. 选 spec_lock 配色六字段（可参考 slidesage/guizang/frontend-slides 的 palette 借色）。
3. 每区块标 page_rhythm 徽章，版式在整版/分栏/密排间切换。
4. **已实现**：dark-tech → `已实现配方/03-暗夜科技.md`。
5. 其余 22 个**尚未做旅行页配方**。旅行向优先推荐：ink-wash(新中式)/vintage-poster(海报)/photo-editorial(照片叙事)/sage-minimal(呼吸)/paper-cut(民俗)/zine(独立)。

## 注意

visual-style 与 mode 正交：风格=怎么看，mode=怎么论证。做旅行页通常用 narrative(叙事) 或 showcase(展示) mode。
