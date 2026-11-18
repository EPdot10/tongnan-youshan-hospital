/**
 * 医师信息：来自健康 160 平台公示（资料包第三章 / S11）。
 * 上线前须与《医师执业证书》逐一核对执业范围与执业地点；出诊时间待院方提供排班表。
 * 按《医疗广告管理办法》精神，不使用“权威”“首席”“名医”等无依据称谓。
 */
export interface Doctor {
  slug: string;
  name: string;
  title: string;
  dept: string; // departments.ts 的 slug
  role?: string;
  years?: string;
  education?: string;
  training?: string[];
  honors?: string[];
  social?: string[];
  specialty: string[];
  techniques?: string[];
  senior?: boolean;
}

export const doctors: Doctor[] = [
  {
    slug: "long-yonghui",
    name: "龙永会",
    title: "副主任医师",
    dept: "fuchanke",
    role: "院长",
    years: "妇产科临床 27 年",
    education: "大学本科，毕业于长沙医学院",
    training: ["铜梁区人民医院", "重庆医科大学附属第一医院", "北京医科大学（妇产科专业进修）"],
    honors: ["2019 年潼南区“十佳人气医生”", "2021 年潼南区“最美医务工作者”", "2023 年重庆市“巾帼标兵”", "国内医学杂志发表论文 2 篇，实用新型专利 3 项"],
    social: ["重庆市社会医疗协会委员"],
    specialty: ["子宫肌瘤、卵巢囊肿、异位妊娠", "原发 / 继发不孕、月经不调、围绝经期综合征", "妊娠合并高血压、糖尿病、甲状腺疾病", "围产期保健、高危妊娠识别与管理"],
    techniques: ["剖宫产", "子宫全切术", "子宫肌瘤剔除术", "卵巢囊肿剔除术", "宫外孕手术", "阴道镜检查", "盆底肌修复"],
    senior: true,
  },
  {
    slug: "chen-long",
    name: "陈龙",
    title: "副主任医师",
    dept: "neike",
    role: "党支部书记、业务院长",
    years: "临床工作 17 年",
    education: "大学本科，毕业于长沙医学院；国家执业药师、三级心理咨询师",
    training: ["解放军 324 医院心内科、呼吸科", "潼南区人民医院心内科"],
    honors: ["国内医学杂志发表论文 2 篇"],
    specialty: ["冠心病、心律失常、急慢性心力衰竭", "脑梗塞、脑卒中", "急慢性胃炎、消化道溃疡、消化功能紊乱", "老年慢性呼吸道、消化与神经系统疾病"],
    techniques: ["无痛胃肠镜", "消化道早癌筛查", "高血压 / 糖尿病 / 幽门螺杆菌规范化管理"],
    senior: true,
  },
  {
    slug: "yang-gang",
    name: "杨刚",
    title: "副主任医师",
    dept: "erke",
    role: "曾任潼南区人民医院儿科主任",
    years: "儿科临床 31 年余",
    education: "毕业于重庆医科大学儿科系",
    training: ["重庆医科大学附属儿童医院免疫科、肾内科"],
    honors: ["多次获评“先进工作者”“优秀医生”", "第二届医师节潼南区“最佳人气医生”", "各类医学杂志发表文章 10 余篇"],
    social: ["重庆市儿科医师联盟学组委员", "渝西儿科片区专委会委员", "重庆市小儿内分泌、心血管、重症医学组专委会委员"],
    specialty: ["小儿肾病、过敏性紫癜", "小儿支气管哮喘", "小儿内分泌、心血管疾病", "儿童呼吸道、消化道常见病"],
    senior: true,
  },
  {
    slug: "wang-long",
    name: "王隆",
    title: "副主任中医师",
    dept: "kangfu",
    years: "行医 40 余年",
    education: "本科，毕业于成都中医学院",
    training: ["三甲医院儿科、全科进修"],
    specialty: ["中医调治肺气肿、肺心病等慢性病", "小儿咳喘、泄泻、厌食", "月经不调、痛经、不孕症", "头痛、眩晕、失眠", "颈腰椎病、风湿类风湿、中风偏瘫、面瘫"],
    senior: true,
  },
  {
    slug: "xu-yirong",
    name: "徐镱榕",
    title: "主治医师",
    dept: "fuchanke",
    role: "妇产科主任",
    years: "妇产科临床 20 余年",
    education: "毕业于川北医学院",
    training: ["潼南区人民医院", "遂宁市中心医院"],
    honors: ["2024 年潼南区“优秀医生”"],
    specialty: ["异常子宫出血、异位妊娠", "子宫肌瘤、卵巢囊肿", "妊娠期高血压、妊娠期糖尿病", "宫颈病变、HPV 感染、盆腔炎性疾病"],
    techniques: ["输卵管疏通术", "子宫全切术", "卵巢囊肿剔除术", "剖宫产", "盆底肌修复"],
  },
  {
    slug: "cao-feng",
    name: "曹凤",
    title: "主治医师",
    dept: "fuchanke",
    role: "妇产科副主任",
    years: "妇产科 10 余年",
    education: "毕业于重庆医科大学临床医学专业",
    training: ["2019—2022 年陆军军医大学第一附属医院（西南医院）住院医师规范化培训，获“优秀住培生”"],
    honors: ["2019 年、2023 年潼南区肩难产技能比赛一等奖"],
    specialty: ["妇科炎症、宫颈疾病", "子宫肌瘤、子宫腺肌症、卵巢良性肿瘤", "异常子宫出血、节育避孕", "围产期保健、难产接生、产钳助产"],
    techniques: ["宫腔镜检查与手术", "腹腔镜妇科良性肿瘤手术", "剖宫产"],
  },
  {
    slug: "li-xiaoyan",
    name: "李小燕",
    title: "主治医师",
    dept: "neike",
    role: "内科主任",
    years: "临床工作 26 年余",
    education: "重庆医药高等专科学校、川北医学院",
    training: ["潼南区人民医院呼吸内科、急诊科", "重庆市急救医疗中心重症医学科、内分泌科"],
    social: ["重庆市社会医疗协会会员"],
    specialty: ["慢阻肺、支气管扩张、肺部感染、肺结节", "慢性胃炎", "脑梗塞、高血压病", "糖尿病、痛风、高尿酸血症"],
    techniques: ["慢病管理", "动态血糖监测", "糖尿病精准分型"],
  },
  {
    slug: "ling-yinggang",
    name: "凌应刚",
    title: "主治医师",
    dept: "neike",
    years: "临床工作 26 年余",
    education: "重庆医药高等专科学校、川北医学院",
    training: ["潼南区人民医院呼吸内科、急诊科", "重庆市急救医疗中心重症医学科、内分泌科"],
    specialty: ["急慢性支气管炎、慢阻肺、肺部感染", "慢性胃炎、胃溃疡、慢性肠炎", "冠心病、脑梗塞、高血压病", "糖尿病、痛风"],
    techniques: ["慢病管理"],
  },
  {
    slug: "li-wenqin",
    name: "李文琴",
    title: "主治医师",
    dept: "zhongyi",
    years: "中医、疼痛康复 10 余年",
    education: "本科，毕业于湖南中医药大学",
    training: ["重庆市第四人民医院", "铜梁区人民医院", "重庆市中医院", "市卫健委“体重管理师”岗位能力提升班"],
    specialty: ["体重管理、肥胖症中西医结合治疗", "颈腰椎疾病、肩周炎、腱鞘炎", "治未病、营养膳食指导"],
  },
  {
    slug: "liao-heng",
    name: "廖恒",
    title: "医师",
    dept: "kangfu",
    role: "后勤院长",
    years: "颈腰椎疼痛治疗 10 余年",
    education: "毕业于重庆医药高等专科学校",
    training: ["重庆大学附属三峡医院", "新桥医院", "湘乡市第二人民医院"],
    specialty: ["头痛、颈椎病、肩周炎、腰痛", "三叉神经痛、坐骨神经痛", "面瘫、中风后遗症"],
    techniques: ["针灸", "穴位贴敷", "穴位埋线", "隔物灸", "理疗"],
  },
  {
    slug: "zhao-xuemei",
    name: "赵雪梅",
    title: "医师",
    dept: "erke",
    education: "中医执业医师",
    training: ["曾在云南施甸县中医院儿科工作"],
    specialty: ["小儿肺部感染、咳嗽、发热", "小儿消化不良、腹泻", "小儿推拿、中药调理脾胃"],
    techniques: ["小儿推拿", "小儿中医调理"],
  },
  {
    slug: "chen-xianfu",
    name: "陈先富",
    title: "医师",
    dept: "waike",
    education: "本科，毕业于川北医学院",
    training: ["遂宁市中心医院进修", "曾就职于大英县中医医院"],
    specialty: ["普通外科、骨科常见病", "泌尿外科、男科常见病", "肛肠疾病"],
    techniques: ["腹腔镜胆囊切除术（含单孔）", "腹腔镜阑尾切除术", "腹腔镜疝修补术", "前列腺汽化电切术", "输尿管结石钬激光碎石", "混合痔外剥内扎术"],
  },
  {
    slug: "zhang-liang",
    name: "张亮",
    title: "医师",
    dept: "waike",
    years: "外科临床 7 年",
    education: "大学本科",
    training: ["重庆市第五人民医院", "潼南区人民医院"],
    specialty: ["腹股沟疝、胆囊炎、阑尾炎", "下肢静脉曲张、体表包块", "骨折"],
    techniques: ["腹腔镜阑尾切除术", "腹腔镜胆囊切除术", "腹股沟疝无张力修补术", "四肢骨折微创手术"],
  },
];

export const getDoctor = (slug: string) => doctors.find((d) => d.slug === slug);
