/** 页面文案：医院简介、沿革、资质、设备、特色医疗、新闻、招聘。来源见资料包对应章节。 */
import type { ImageId } from "./images";

export const intro = [
  "重庆潼南友善阳光中医医院（原潼南善友阳光医院）是一家二级中医（综合）医院，位于重庆市潼南区梓潼街道潼南大道南二段 20 号。",
  "医院前身为经营十三年的综合医院，2023 年由潼南区从渝北区招商引资引进，历时两年多完成升级改造，2024 年 5 月经潼南区卫生健康委员会核准登记为二级中医（综合）医院，是潼南区重点打造的中医特色医疗项目。",
  "医院以中医药为核心、中西医结合为特色，在传承岐黄精髓的同时积极融合现代医疗技术，构建覆盖“预防—诊疗—康复—慢病管理”的中医药诊疗体系。现开设内科、外科、妇产科、儿科、康复针灸科、中医科及医学检验、医学影像、麻醉、预防保健等科室，设门诊综合院区、中医康复病区、内科住院部三个院区。",
  "医院实行无节假日接诊，急诊 24 小时值守，全年为辖区约 20 万居民提供医疗咨询与诊疗服务。",
];

export const history: { date: string; title: string; text?: string }[] = [
  { date: "2011", title: "医院前身成立", text: "以一级综合医院运营十三年，妇产科、儿科同年设立。" },
  { date: "2023", title: "招商引资 · 升级改造", text: "潼南区从渝北区招商引资引进并注资，启动向二级中医医院转型。" },
  { date: "2024.05", title: "二级中医（综合）医院", text: "取得《医疗机构执业许可证》，6 月由区卫健委公告执业登记。" },
  { date: "2025.05", title: "内科住院部迁址", text: "内科住院部整体搬迁至凉风垭金竹广场二楼。" },
  { date: "2025.05", title: "商保定点合作", text: "成为中国人寿保险医疗定点单位。" },
  { date: "2026", title: "引进 PRP 再生治疗技术", text: "康复针灸科开展富血小板血浆（PRP）治疗。" },
  { date: "2026.10", title: "承办潼南区首届疼痛技术学术交流会", text: "联合重庆市妇幼卫生学会非公医疗机构促进发展专业委员会举办。" },
];

export const honors = ["诚信医院", "工人先锋号", "优秀医疗团队", "爱心企业"];

export const qualifications = [
  "二级中医（综合）医院",
  "潼南区经批准开展助产技术的医疗机构",
  "重庆市社会医疗协会会员单位",
];

/** 设备清单（资料包 1.7，已去掉表述不严谨的条目；品牌型号待补） */
export const equipment = [
  { group: "影像诊断", items: ["CT", "500 毫安 X 光机", "彩色 B 超", "动态心电图机"] },
  { group: "内镜与检查", items: ["胃肠镜", "电子阴道镜", "乳腺诊断仪"] },
  { group: "检验", items: ["全自动生化分析仪", "全自动血球计数仪", "尿液分析仪"] },
  { group: "手术与监护", items: ["麻醉机", "呼吸机", "多参数监护仪", "高频电刀", "前列腺汽化电切镜", "LEEP 刀"] },
  { group: "康复理疗", items: ["产后康复综合治疗仪", "盆腔治疗仪", "体外短波治疗仪", "CRS 靶向超短波"] },
];

export interface Feature {
  slug: string;
  title: string;
  sub: string;
  image: ImageId;
  body: string[];
  points?: { title: string; items: string[] }[];
  note?: string;
  dept?: string;
}

export const features: Feature[] = [
  {
    slug: "tcm-rehab",
    title: "中西医结合康复",
    sub: "颈肩腰腿痛 · 骨关节病 · 神经痛",
    image: "acupuncture",
    dept: "kangfu",
    body: [
      "以中医为主、中西医结合，把针灸、推拿、拔罐、刮痧、中药熏药等传统外治方法，与超声可视化精准介入、C 臂引导下射频消融、医用臭氧治疗、神经阻滞等微创技术结合起来，为疼痛与功能障碍患者制定个体化康复方案。",
    ],
    points: [
      { title: "传统外治", items: ["针灸", "推拿", "拔罐", "刮痧", "中药熏药", "穴位贴敷 / 埋线", "隔物灸"] },
      { title: "微创与介入", items: ["超声可视化精准介入", "C 臂引导下射频消融", "医用臭氧治疗", "神经阻滞", "关节腔灌注", "小针刀"] },
    ],
  },
  {
    slug: "prp",
    title: "PRP 富血小板血浆治疗",
    sub: "用自身血液中的修复因子，帮助组织修复",
    image: "therapy-device",
    dept: "kangfu",
    body: [
      "PRP 是从患者自身少量静脉血中，经离心分离制备的高浓度血小板血浆，在无菌条件下注射到受损部位，借助其中的生长因子促进组织修复。",
      "治疗流程：医生面诊评估 → 抽取少量静脉血 → 离心制备 → 精准注射 → 休养与复诊。",
    ],
    points: [
      { title: "常见适用方向（须经医师评估）", items: ["膝骨关节炎", "半月板 / 关节软骨损伤", "肩袖损伤、网球肘", "跟腱炎、踝关节损伤", "慢性肌筋膜炎、滑膜炎", "慢性难愈合创面"] },
      { title: "不适宜人群", items: ["血小板功能异常", "凝血功能障碍", "活动性感染", "恶性肿瘤", "妊娠期、哺乳期"] },
    ],
    note: "是否适合 PRP 治疗须由医师面诊评估，治疗效果因人而异。",
  },
  {
    slug: "maternity",
    title: "孕产全程服务",
    sub: "产前检查 · 高危妊娠管理 · 住院分娩 · 盆底康复",
    image: "newborn",
    dept: "fuchanke",
    body: [
      "妇产科设产科门诊、高危门诊、产前筛查门诊，配胎儿监护室与盆底康复室，从孕早期建档到产后康复提供连续服务。医院为潼南区经批准开展助产技术的医疗机构之一，并为生育保险定点单位。",
    ],
  },
  {
    slug: "emergency",
    title: "24 小时急诊 · 节假日不停诊",
    sub: "随时都能找到医生",
    image: "bed",
    body: [
      "急诊 24 小时应诊。医院实行无节假日接诊，节假日期间各科室正常开诊，检查、治疗与手术正常开展。",
    ],
  },
];

export type NewsKind = "news" | "notice" | "science";
export interface NewsItem {
  date: string;
  kind: NewsKind;
  title: string;
  summary: string;
  url?: string;
  image?: ImageId;
}

export const newsKinds: Record<NewsKind, string> = { news: "医院新闻", notice: "通知公告", science: "健康科普" };

/** 取自医院微信公众号（标题与发布日期为原文，摘要为概述），点击跳转原文。 */
export const news: NewsItem[] = [
  {
    date: "2026-11-18",
    kind: "science",
    title: "第 25 个世界慢阻肺日 —— 慢阻肺病：早诊断早管理",
    summary: "认识慢阻肺的高危人群与典型症状，从接种疫苗、规范用药、戒烟、肺康复训练等方面做好预防与管理。",
    url: "https://mp.weixin.qq.com/s/RzhzAjrri-DyGFfSpWh5cQ",
    image: "elderly",
  },
  {
    date: "2026-11-14",
    kind: "science",
    title: "“早发现，早行动” —— 2026 年世界糖尿病日",
    summary: "糖尿病早期常无明显症状，高危人群应主动筛查血糖；确诊后在医生指导下规范治疗、长期管理。",
    url: "https://mp.weixin.qq.com/s/JZS9bBTHRg8rWEujos0cfw",
    image: "lab-tubes",
  },
  {
    date: "2026-11-09",
    kind: "news",
    title: "为爱挽袖，热血传情 —— 医院干部职工踊跃参与无偿献血",
    summary: "11 月 6 日，医院支部委员会组织干部职工参加 2026 年无偿献血活动，党员带头，临床与行政后勤人员踊跃参与。",
    url: "https://mp.weixin.qq.com/s/YskI8HJ8qNwo8sMNnfWbGA",
    image: "wx-blood",
  },
  {
    date: "2026-11-04",
    kind: "science",
    title: "腰椎间盘突出症 —— 该手术还是保守？",
    summary: "用 8 个问题讲清腰椎间盘突出症的成因、判断方法和治疗选择；出现鞍区麻木、大小便障碍应尽快急诊就医。",
    url: "https://mp.weixin.qq.com/s/TB9xzJS4rwlJxT3rSLwyRQ",
    image: "leg-exam",
  },
  {
    date: "2026-11-02",
    kind: "science",
    title: "小小臭氧，凭什么能搞定顽固疼痛？",
    summary: "介绍医用臭氧治疗的原理、适用的慢性疼痛类型，以及禁用和慎用人群，治疗须经医生评估。",
    url: "https://mp.weixin.qq.com/s/8giB3exzH8VK_gTRzJLGWA",
    image: "therapy-device",
  },
  {
    date: "2026-11-01",
    kind: "science",
    title: "神奇的“一根针” —— 射频治疗技术",
    summary: "中医康复科开展超声可视化精准介入与 C 臂引导下射频消融术，为顽固性疼痛患者提供微创治疗选择。",
    url: "https://mp.weixin.qq.com/s/cNUzV7IwshjXg76gEO6Vww",
    image: "acupuncture",
  },
  {
    date: "2026-10-29",
    kind: "news",
    title: "潼南区首届疼痛技术学术交流会顺利召开",
    summary: "10 月 27 日，由重庆市妇幼卫生学会主办、我院承办的疼痛技术学术交流会召开，围绕疼痛适宜技术在基层的应用开展研讨。",
    url: "https://mp.weixin.qq.com/s/9Soog1NS9BmZ99B0IXlVeg",
    image: "wx-conf-hall",
  },
  {
    date: "2026-10-26",
    kind: "notice",
    title: "医院承办第一届疼痛技术学术交流会（会议通知）",
    summary: "交流会于 10 月 27 日在潼南区举行，邀请三位疼痛领域专家授课。",
    url: "https://mp.weixin.qq.com/s/cd87DwBYF_ADIiAA9eVrYw",
    image: "wx-conf-sign",
  },
  {
    date: "2025-05-30",
    kind: "news",
    title: "医院正式成为中国人寿保险医疗定点单位",
    summary: "参保患者可在医院享受相应的商业保险理赔服务。",
  },
  {
    date: "2025-05-07",
    kind: "notice",
    title: "内科住院部整体搬迁至凉风垭金竹广场二楼",
    summary: "新址位于潼南第一中学旁，住院患者及家属请按新地址前往。",
  },
];

export const jobs = [
  { title: "外科主任 / 学科带头人", req: "副主任医师及以上职称，具备外科学科建设与带教能力。" },
  { title: "超声科医生", req: "医学影像相关专业，具备超声诊断执业资格。" },
  { title: "中医疼痛方向医师", req: "中医、针灸推拿或疼痛相关专业，具备执业资格。" },
];
