/**
 * 院内导航数据：楼层分区（示意）+ 各类就医场景的分步路线。
 *
 * ⚠ 楼层布局为示意：资料包只知道门诊综合院区位于潼南大道南二段 20 号 1—2 层（工商登记），
 *   具体诊室位置待院方确认。拿到实际布局后只需改本文件的 zones（坐标）与各步骤的 zone。
 */

export type Floor = "1F" | "2F";

export interface Zone {
  id: string;
  floor: Floor;
  name: string;
  short?: string; // 图上显示的短名
  desc: string;
  /** SVG 坐标（viewBox 0 0 360 250） */
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: "emergency" | "service" | "clinic" | "tech" | "pharmacy" | "move";
}

export const zones: Zone[] = [
  // ── 1F：急诊、服务窗口、医技、药房 ──
  { id: "emergency", floor: "1F", name: "急诊科", desc: "24 小时应诊，设独立急诊入口，危重患者先救治后补办手续。", x: 10, y: 10, w: 104, h: 108, tone: "emergency" },
  { id: "imaging", floor: "1F", name: "放射科", short: "放射 DR/CT", desc: "X 光（DR）、CT 检查。检查前取下金属物品，孕妇请提前告知医生。", x: 122, y: 10, w: 112, h: 66, tone: "tech" },
  { id: "lab", floor: "1F", name: "检验科（采血）", short: "检验 · 采血", desc: "抽血、尿液等检验。部分项目需空腹（8 小时以上不进食）。", x: 242, y: 10, w: 108, h: 66, tone: "tech" },
  { id: "lift1", floor: "1F", name: "楼梯 / 电梯", short: "楼梯 电梯", desc: "上二楼各科诊室。", x: 122, y: 84, w: 112, h: 34, tone: "move" },
  { id: "pharmacy", floor: "1F", name: "药房（西药 · 中药）", short: "药房", desc: "凭缴费单据取药；中药饮片可代煎。", x: 242, y: 84, w: 108, h: 92, tone: "pharmacy" },
  { id: "register", floor: "1F", name: "挂号 · 收费 · 医保结算", short: "挂号收费", desc: "挂号、预约报到、缴费；医保直接结算；办理入院、出院手续。", x: 10, y: 126, w: 140, h: 50, tone: "service" },
  { id: "guide", floor: "1F", name: "导诊服务台", short: "导诊台", desc: "不知道挂哪个科、找不到地方，先问导诊。可借轮椅、测体温。", x: 158, y: 126, w: 76, h: 50, tone: "service" },
  { id: "entrance", floor: "1F", name: "门诊大门", short: "门诊大门", desc: "潼南大道南二段 20 号（凉风垭人行天桥旁）。", x: 122, y: 200, w: 116, h: 40, tone: "move" },
  { id: "er-door", floor: "1F", name: "急诊入口", short: "急诊入口", desc: "急诊独立出入口，方便救护车与急危重患者直接进入。", x: 10, y: 200, w: 104, h: 40, tone: "emergency" },

  // ── 2F：门诊诊室、超声心电、妇产科 ──
  { id: "c-neike", floor: "2F", name: "内科诊室", short: "内科", desc: "呼吸、消化、心血管、内分泌及慢病管理。", x: 10, y: 10, w: 82, h: 70, tone: "clinic" },
  { id: "c-waike", floor: "2F", name: "外科诊室", short: "外科", desc: "普外、泌尿、肛肠、骨科。", x: 98, y: 10, w: 82, h: 70, tone: "clinic" },
  { id: "c-erke", floor: "2F", name: "儿科诊室", short: "儿科", desc: "0—14 岁儿童就诊。", x: 186, y: 10, w: 76, h: 70, tone: "clinic" },
  { id: "c-zhongyi", floor: "2F", name: "中医科 · 康复门诊", short: "中医 · 康复", desc: "中医内科、治未病、颈肩腰腿痛门诊评估。", x: 268, y: 10, w: 82, h: 70, tone: "clinic" },
  { id: "waiting", floor: "2F", name: "候诊区 · 护士站", short: "候诊区 · 护士站", desc: "报到后在此候诊，留意叫号屏。", x: 98, y: 88, w: 164, h: 52, tone: "service" },
  { id: "lift2", floor: "2F", name: "楼梯 / 电梯", short: "楼梯 电梯", desc: "下一楼缴费、检查、取药。", x: 10, y: 88, w: 82, h: 52, tone: "move" },
  { id: "ultrasound", floor: "2F", name: "超声 · 心电图室", short: "B 超 · 心电", desc: "彩超、心电图、动态心电图。部分腹部 B 超需空腹，妇科 / 泌尿 B 超需憋尿。", x: 268, y: 88, w: 82, h: 52, tone: "tech" },
  { id: "c-fuchan", floor: "2F", name: "妇产科门诊", short: "妇产科门诊", desc: "产科、高危、产前筛查、妇科门诊；胎监室、阴道镜室、盆底康复室。", x: 10, y: 148, w: 170, h: 92, tone: "clinic" },
  { id: "c-surgery", floor: "2F", name: "门诊手术 · 治疗室", short: "门诊手术 · 治疗", desc: "门诊小手术、换药、妇科治疗。", x: 186, y: 148, w: 164, h: 92, tone: "clinic" },
];

export const otherSites = {
  rehab: {
    name: "中医康复病区",
    where: "潼南大道辅路 · 富华阳光",
    desc: "针灸、推拿、理疗、疼痛治疗与康复住院。",
    map: "https://uri.amap.com/marker?position=105.835732,30.165855&name=友善阳光中医医院中医康复病区",
  },
  inpatient: {
    name: "内科住院部",
    where: "凉风垭金竹广场二楼（潼南第一中学旁）",
    desc: "内科住院患者在此住院。",
    map: "https://uri.amap.com/search?keyword=潼南金竹广场&city=500152",
  },
} as const;

export type SiteKey = keyof typeof otherSites;

export interface Step {
  title: string;
  /** 在门诊楼内的位置 */
  zone?: string;
  /** 在其他院区 / 线上 */
  site?: SiteKey | "online" | "home";
  detail: string;
  bring?: string[];
  tip?: string;
}

export interface Flow {
  slug: string;
  name: string;
  sub: string;
  icon: "stethoscope" | "siren" | "flask" | "pill" | "bed" | "baby" | "clipboard" | "leaf";
  urgent?: boolean;
  note?: string;
  steps: Step[];
}

export const flows: Flow[] = [
  {
    slug: "outpatient",
    name: "门诊看病",
    sub: "挂号 → 看诊 → 缴费 → 检查 → 取药",
    icon: "stethoscope",
    steps: [
      {
        title: "提前预约（推荐）",
        site: "online",
        detail: "通过医院微信公众号、健康 160 或电话 023-44819999 预约，减少排队。预约截止：上午 11:00；下午 14:00—16:00。",
        bring: ["医保卡 / 医保电子凭证", "身份证"],
      },
      {
        title: "到导诊台问路（不确定挂哪科时）",
        zone: "guide",
        detail: "进入门诊大门后，导诊服务台就在正前方。说出主要不适，导诊护士会帮您选科室。",
        tip: "需要轮椅、测体温也可在这里办理。",
      },
      {
        title: "挂号 / 预约报到",
        zone: "register",
        detail: "在一楼挂号收费窗口实名挂号；已线上预约的到窗口报到取号。",
        bring: ["医保卡 / 医保电子凭证", "身份证"],
      },
      {
        title: "上二楼候诊、看医生",
        zone: "waiting",
        detail: "乘电梯或走楼梯到二楼，在候诊区等候叫号，到对应科室诊室就诊。",
        tip: "带上以前的病历、检查报告和正在吃的药，方便医生判断。",
      },
      {
        title: "回一楼缴费",
        zone: "register",
        detail: "医生开具检查或药品后，到一楼收费窗口缴费，医保可直接结算。",
      },
      {
        title: "做检查 / 检验",
        zone: "lab",
        detail: "按单据上的项目前往：抽血、尿检在一楼检验科；X 光、CT 在一楼放射科；B 超、心电图在二楼超声 · 心电图室。",
        tip: "抽血可能需要空腹；做腹部 B 超前请先问清是否需要空腹或憋尿。",
      },
      {
        title: "拿结果回诊室复诊",
        zone: "waiting",
        detail: "结果出来后回到原科室给医生看。挂号 3 天内（含当天）同一科室可免费复看结果 1 次。",
      },
      {
        title: "到药房取药",
        zone: "pharmacy",
        detail: "凭缴费单据到一楼药房取药，核对药品和用法后再离开。",
        tip: "中药饮片可以代煎，具体取药时间以药房告知为准。",
      },
    ],
  },
  {
    slug: "emergency",
    name: "急诊",
    sub: "24 小时 · 先救治后挂号",
    icon: "siren",
    urgent: true,
    note: "胸痛、呼吸困难、意识不清、大出血等危急情况，请立即拨打 120。",
    steps: [
      {
        title: "先打电话",
        site: "home",
        detail: "危急情况拨打 120；一般急症可拨打医院 24 小时电话 023-44819999，说明病情和到达时间。",
      },
      {
        title: "走急诊入口直接进急诊科",
        zone: "er-door",
        detail: "急诊有独立入口，进门即是急诊科，不需要先去挂号。",
      },
      {
        title: "急诊医生评估、救治",
        zone: "emergency",
        detail: "医护人员先评估病情、立即处理。危重患者先抢救，手续由家属随后补办。",
        tip: "家属请留一人在患者身边，另一人去办手续。",
      },
      {
        title: "家属补办挂号、缴费",
        zone: "register",
        detail: "一楼挂号收费窗口办理急诊挂号和缴费，医保可直接结算。",
        bring: ["患者医保卡 / 身份证"],
      },
      {
        title: "急诊检查（优先）",
        zone: "imaging",
        detail: "需要拍片、CT 的在一楼放射科，抽血在检验科，急诊患者优先安排。",
      },
      {
        title: "取药 / 留观 / 住院",
        zone: "pharmacy",
        detail: "可以回家的到药房取药；需要观察或住院的，由医护人员安排并协助办理入院。",
      },
    ],
  },
  {
    slug: "exam",
    name: "检查检验",
    sub: "抽血 · B 超 · 拍片 · 心电图",
    icon: "flask",
    steps: [
      {
        title: "医生开单后先缴费",
        zone: "register",
        detail: "拿着检查单到一楼收费窗口缴费，医保可直接结算。",
      },
      {
        title: "抽血、尿检：检验科",
        zone: "lab",
        detail: "一楼检验科采血窗口。血脂、血糖、肝功能等项目通常需空腹 8 小时以上。",
        tip: "抽完血按压针眼 3—5 分钟，不要揉。",
      },
      {
        title: "拍片、CT：放射科",
        zone: "imaging",
        detail: "一楼放射科。检查前取下项链、皮带、发夹等金属物品；怀孕或可能怀孕请提前告诉医生。",
      },
      {
        title: "B 超、心电图：二楼",
        zone: "ultrasound",
        detail: "二楼超声 · 心电图室。肝胆 B 超一般需空腹；妇科、泌尿 B 超需憋尿。",
      },
      {
        title: "取报告，回诊室给医生看",
        zone: "waiting",
        detail: "报告出来后回到开单科室。挂号 3 天内同一科室可免费复看结果 1 次。",
      },
    ],
  },
  {
    slug: "pharmacy",
    name: "取药",
    sub: "缴费 → 药房 → 核对用法",
    icon: "pill",
    steps: [
      {
        title: "缴费",
        zone: "register",
        detail: "医生开好处方后，到一楼收费窗口缴费（医保直接结算）。",
      },
      {
        title: "到药房取药",
        zone: "pharmacy",
        detail: "一楼药房分西药、中药窗口，凭缴费单据取药。",
      },
      {
        title: "当面核对药品和用法",
        zone: "pharmacy",
        detail: "核对姓名、药名、数量和服用方法；有疑问当场问药师。",
        tip: "中药饮片可代煎，取药时间以药房告知为准。",
      },
    ],
  },
  {
    slug: "inpatient",
    name: "住院",
    sub: "开住院证 → 办入院 → 去病区",
    icon: "bed",
    steps: [
      {
        title: "医生开具住院证",
        zone: "waiting",
        detail: "门诊或急诊医生判断需要住院时，会开具住院证。",
      },
      {
        title: "一楼办理入院手续",
        zone: "register",
        detail: "到一楼收费窗口办理入院登记、医保登记并缴纳预交金。",
        bring: ["住院证", "患者身份证", "医保卡 / 医保电子凭证"],
        tip: "外地医保患者请先办理异地就医备案，可直接结算。",
      },
      {
        title: "前往对应病区",
        site: "inpatient",
        detail: "内科患者到凉风垭金竹广场二楼内科住院部；中医康复患者到中医康复病区；其他科室按护士指引前往。",
      },
      {
        title: "出院结算",
        zone: "register",
        detail: "医生通知出院后，到收费窗口办理出院结算，领取出院小结和费用清单。",
      },
    ],
    note: "陪护、探视时间及住院物品清单，以病区护士告知为准。",
  },
  {
    slug: "prenatal",
    name: "产检",
    sub: "建档 · 定期产检 · 胎监",
    icon: "baby",
    steps: [
      {
        title: "预约妇产科门诊",
        site: "online",
        detail: "公众号或电话预约产科门诊。孕早期确认怀孕后尽早来院建档。",
        bring: ["身份证", "医保卡", "之前的检查报告"],
      },
      {
        title: "挂号报到",
        zone: "register",
        detail: "一楼挂号收费窗口挂产科门诊号。",
      },
      {
        title: "二楼妇产科门诊",
        zone: "c-fuchan",
        detail: "医生问诊、测血压体重、听胎心，开具本次产检项目。高危孕妇到高危门诊。",
      },
      {
        title: "做产检项目",
        zone: "ultrasound",
        detail: "B 超、心电图在二楼；抽血在一楼检验科；孕晚期在妇产科胎监室做胎心监护。",
        tip: "抽血类项目建议空腹，可带点小零食抽完血再吃。",
      },
      {
        title: "回诊室看结果、约下次产检",
        zone: "c-fuchan",
        detail: "医生解读结果并告知下次产检时间。临近预产期如有见红、破水、规律宫缩，直接来急诊。",
      },
    ],
  },
  {
    slug: "checkup",
    name: "健康体检",
    sub: "入职 · 健康体检",
    icon: "clipboard",
    note: "体检项目与开展范围以医院公布为准（待院方确认）。",
    steps: [
      {
        title: "电话预约、确认项目",
        site: "online",
        detail: "拨打 023-44819999 预约，确认体检项目、时间和费用。单位团体体检可提前联系。",
      },
      {
        title: "体检当天空腹到院",
        zone: "guide",
        detail: "早上空腹到一楼导诊服务台登记，领取体检指引单。",
        bring: ["身份证", "近期照片（入职体检如需）"],
        tip: "前一晚清淡饮食、不喝酒，晚上 10 点后不进食。",
      },
      {
        title: "先抽血",
        zone: "lab",
        detail: "一楼检验科抽血、留尿样。抽完血就可以吃早餐了。",
      },
      {
        title: "影像与其他项目",
        zone: "imaging",
        detail: "按指引单完成胸片（一楼放射科）、B 超和心电图（二楼）等项目。",
      },
      {
        title: "交回指引单，领取报告",
        zone: "guide",
        detail: "全部项目完成后把指引单交回服务台，按约定时间领取体检报告。",
      },
    ],
  },
  {
    slug: "rehab",
    name: "中医康复",
    sub: "针灸 · 推拿 · 疼痛治疗",
    icon: "leaf",
    steps: [
      {
        title: "门诊看诊评估",
        zone: "c-zhongyi",
        detail: "先在二楼中医科 · 康复门诊就诊，医生评估病情、制定治疗方案。",
        bring: ["以前的影像片子（CT / 核磁）", "医保卡"],
      },
      {
        title: "缴费",
        zone: "register",
        detail: "一楼收费窗口缴费，医保可直接结算。",
      },
      {
        title: "到中医康复病区治疗",
        site: "rehab",
        detail: "针灸、推拿、理疗、疼痛介入治疗在中医康复病区进行（潼南大道辅路 · 富华阳光）。",
        tip: "穿宽松方便的衣服；空腹或过饱都不宜做针灸。",
      },
      {
        title: "预约下次疗程",
        site: "rehab",
        detail: "治疗后与康复治疗师约好下次时间，按疗程坚持治疗，期间有不适及时告知医生。",
      },
    ],
  },
];

export const getZone = (id?: string) => zones.find((z) => z.id === id);
