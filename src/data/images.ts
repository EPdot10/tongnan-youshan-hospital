/**
 * 图片登记表。第一版全部来自 Unsplash（Unsplash License：可免费商用，无需署名）。
 * 构建时由 scripts/fetch-images.mjs 下载并转成 WebP，存到本站 /images/ 下托管。
 * 换医院实拍：见 docs/IMAGES.md。
 * 格式必须保持「id: "...", unsplash: "..."」同一行顺序，下载脚本靠它解析。
 */
export const images = [
  { id: "hero-corridor", unsplash: "Pk-KuizxQv8", alt: "明亮整洁的医院走廊" },
  { id: "hero-ward", unsplash: "s_FCfUvLaDI", alt: "护士在病房照护患者" },
  { id: "hero-herbs", unsplash: "nMaoi6CivHM", alt: "木架上的中药材罐" },
  { id: "building", unsplash: "aYvI1HC7wM0", alt: "医院建筑外观" },
  { id: "hallway", unsplash: "TcFOSqNi8T0", alt: "候诊区座椅" },
  { id: "bed", unsplash: "zbpgmGe27p8", alt: "整洁的住院病房" },
  { id: "acupuncture", unsplash: "QgcdtM9rA5s", alt: "针灸治疗" },
  { id: "cupping", unsplash: "Pdea8oxLHkU", alt: "拔罐治疗" },
  { id: "tuina", unsplash: "wGFibXDQlBI", alt: "推拿理疗" },
  { id: "herbs-rose", unsplash: "V8IiD0GVb3o", alt: "中药饮片" },
  { id: "mortar", unsplash: "bd_fCZhy_W8", alt: "研钵研磨药材" },
  { id: "consult", unsplash: "iyeUwItlIPk", alt: "医生为患者问诊" },
  { id: "doctor-desk", unsplash: "_zbqco3m7dA", alt: "医生在诊室" },
  { id: "stethoscope", unsplash: "RlIppR1I3E8", alt: "医生与听诊器" },
  { id: "pregnant", unsplash: "ux53SGpRAHU", alt: "孕期妈妈" },
  { id: "newborn", unsplash: "NkNpDBdi6A0", alt: "妈妈怀抱新生儿" },
  { id: "child-exam", unsplash: "fx9RJgZYRUE", alt: "医生为儿童检查" },
  { id: "baby-chest", unsplash: "oGJQt3-X_FY", alt: "医生为婴儿听诊" },
  { id: "lab-tubes", unsplash: "0jE8ynV4mis", alt: "检验采血管" },
  { id: "microscope", unsplash: "gKUC4TMhOiY", alt: "检验科显微镜" },
  { id: "therapy-device", unsplash: "PBdLYkML-b0", alt: "康复理疗仪器治疗" },
  { id: "leg-exam", unsplash: "pbUWW-CBoqY", alt: "医生检查患者腿部" },
] as const;

export type ImageId = (typeof images)[number]["id"];
