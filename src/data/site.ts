/**
 * 医院基础信息 —— 全站唯一来源，改这里即可。
 * tbc(...) 表示「待院方确认」：页面上以虚线下划线 + 提示显示，审定后改成普通字符串即可。
 * 信源编号 S1…S19 对应《官网内容资料包》附录 A。
 */
import { tbc, type Text } from "@/lib/tbc";

export const hospital = {
  name: "重庆潼南友善阳光中医医院",
  shortName: "友善阳光中医医院",
  formerName: "潼南善友阳光医院",
  pinyin: "CHONGQING TONGNAN YOUSHAN YANGGUANG HOSPITAL OF TCM", // 英文名待院方确认（S3 页脚仅有拼音）
  slogan: "精诚博爱 · 友善阳光",
  level: "二级中医（综合）医院",
  nature: "民营",
  /** 24 小时电话（S3、S6、S7）；备用号码 023-44817999 待确认是否保留 */
  phone: "023-44819999",
  phoneHref: "tel:02344819999",
  address: "重庆市潼南区梓潼街道潼南大道南二段 20 号",
  addressNote: "富华阳光 · 凉风垭人行天桥旁",
  licenceNo: "PDY84402850015217A2102",
  licenceValid: "2024-05-29 至 2029-05-28",
  director: "龙永会",
  icp: tbc("ICP 备案号（待办理）"),
  wechat: "重庆潼南友善阳光中医医院",
} as const;

export const stats: { value: Text; unit: string; label: string }[] = [
  { value: "二级", unit: "", label: "中医（综合）医院" },
  { value: tbc("99"), unit: "张", label: "开放床位" },
  { value: "103", unit: "名", label: "医务人员" },
  { value: "3", unit: "个", label: "院区" },
  { value: "7000", unit: "㎡+", label: "医疗用房" },
  { value: "24", unit: "小时", label: "急诊值守" },
];

export const hours = {
  summer: { label: "夏令时间（5 月 1 日起）", am: "08:00—12:00", pm: "14:00—18:00" },
  winter: { label: "冬令时间", am: "08:00—12:00", pm: tbc("13:30—17:30") },
  emergency: "急诊 24 小时应诊",
  holiday: "无节假日接诊，各科室节假日正常开诊",
};

export const campuses = [
  {
    name: "门诊综合院区",
    address: "潼南大道南二段 20 号（富华阳光 · 人行天桥旁）",
    role: "门诊、急诊、医技检查、行政",
    map: "https://uri.amap.com/search?keyword=重庆潼南友善阳光中医医院&city=500152",
  },
  {
    name: "中医康复病区",
    address: "潼南大道辅路 · 富华阳光",
    role: "中医康复、针灸推拿、疼痛治疗",
    map: "https://uri.amap.com/marker?position=105.835732,30.165855&name=友善阳光中医医院中医康复病区",
  },
  {
    name: "内科住院部",
    address: "凉风垭金竹广场二楼（潼南第一中学旁）",
    role: "内科住院（2025 年 5 月迁入）",
    map: "https://uri.amap.com/search?keyword=潼南金竹广场&city=500152",
  },
];

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export const nav: NavItem[] = [
  { label: "首页", href: "/" },
  {
    label: "走进医院",
    href: "/about/",
    children: [
      { label: "医院概况", href: "/about/#intro" },
      { label: "发展历程", href: "/about/#history" },
      { label: "资质荣誉", href: "/about/#honors" },
      { label: "院区分布", href: "/about/#campus" },
      { label: "医疗设备", href: "/about/#equipment" },
    ],
  },
  {
    label: "科室导航",
    href: "/departments/",
    children: [
      { label: "内科", href: "/departments/neike/" },
      { label: "外科", href: "/departments/waike/" },
      { label: "妇产科", href: "/departments/fuchanke/" },
      { label: "儿科", href: "/departments/erke/" },
      { label: "康复针灸科", href: "/departments/kangfu/" },
      { label: "中医科", href: "/departments/zhongyi/" },
      { label: "医技科室", href: "/departments/yiji/" },
    ],
  },
  { label: "医师团队", href: "/doctors/" },
  { label: "特色医疗", href: "/featured/" },
  {
    label: "就医指南",
    href: "/guide/",
    children: [
      { label: "门诊时间", href: "/guide/#hours" },
      { label: "预约挂号", href: "/guide/#booking" },
      { label: "就诊流程", href: "/guide/#process" },
      { label: "医保服务", href: "/guide/#insurance" },
      { label: "住院须知", href: "/guide/#inpatient" },
      { label: "交通指引", href: "/guide/#traffic" },
    ],
  },
  { label: "新闻动态", href: "/news/" },
  { label: "联系我们", href: "/contact/" },
];

export const insurance = [
  "职工医保定点",
  "城乡居民医保定点",
  "生育保险定点",
  "医疗救助定点",
  "异地就医直接结算",
];

export const commercialInsurance = ["中国人寿保险 医疗定点单位", "中国太平洋财产保险 定点医疗单位"];

export const partners = [
  "重庆市第四人民医院（重庆市急救中心）",
  "重庆市中医院",
  "重庆三博江陵医院",
  "重庆三博长江医院",
];

export const friendLinks = [
  { label: "重庆市卫生健康委员会", href: "https://wsjkw.cq.gov.cn/" },
  { label: "重庆市潼南区人民政府", href: "https://www.cqtn.gov.cn/" },
  { label: "国家医疗保障局", href: "https://www.nhsa.gov.cn/" },
  { label: "国家中医药管理局", href: "http://www.natcm.gov.cn/" },
];
