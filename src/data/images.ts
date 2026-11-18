/**
 * 图片登记表。构建时由 scripts/fetch-images.mjs 下载、压缩成 WebP，存到本站 /images/ 托管。
 *
 * - src: "unsplash:<photo-id>"  → Unsplash 免费商用图（Unsplash License，可商用、无需署名）
 * - src: "https://mmbiz.qpic.cn/..." → 医院微信公众号文章中的实拍图（医院自有素材，正式上线前请院方确认授权）
 *
 * 格式必须保持「id: "...", src: "..."」顺序，下载脚本靠它解析。换医院实拍：见 docs/IMAGES.md。
 */
export const images = [
  // Unsplash（示意图）
  { id: "hero-corridor", src: "unsplash:1777269749032-d8d458ae594d", alt: "明亮整洁的医院走廊" },
  { id: "hero-herbs", src: "unsplash:1771128264855-1c032332cbc8", alt: "木架上的中药材罐" },
  { id: "bed", src: "unsplash:1538108149393-fbbd81895907", alt: "整洁的住院病房" },
  { id: "acupuncture", src: "unsplash:1598555763574-dca77e10427e", alt: "针灸治疗" },
  { id: "cupping", src: "unsplash:1598555748505-ccca0d9b9f7b", alt: "拔罐治疗" },
  { id: "tuina", src: "unsplash:1645005512968-0c1fe99f0093", alt: "推拿理疗" },
  { id: "herbs-rose", src: "unsplash:1778423618436-75f7620ebd10", alt: "中药饮片" },
  { id: "mortar", src: "unsplash:1492552085122-36706c238263", alt: "研钵研磨药材" },
  { id: "consult", src: "unsplash:1758691462878-6edc3d3da1be", alt: "医生为患者问诊" },
  { id: "doctor-desk", src: "unsplash:1758691462651-611d730c5272", alt: "医生在诊室" },
  { id: "stethoscope", src: "unsplash:1625134673337-519d4d10b313", alt: "医生与听诊器" },
  { id: "pregnant", src: "unsplash:1457342813143-a1ae27448a82", alt: "孕期妈妈" },
  { id: "newborn", src: "unsplash:1773243086577-5a98bc868a2f", alt: "妈妈怀抱新生儿" },
  { id: "child-exam", src: "unsplash:1632053002928-1919605ee6f7", alt: "医生为儿童检查" },
  { id: "baby-chest", src: "unsplash:1632052999447-e542d08d4f7d", alt: "医生为婴儿听诊" },
  { id: "lab-tubes", src: "unsplash:1606206591513-adbfbdd7a177", alt: "检验采血管" },
  { id: "microscope", src: "unsplash:1518152006812-edab29b069ac", alt: "检验科显微镜" },
  { id: "therapy-device", src: "unsplash:1772122028843-9139d23af4fb", alt: "康复理疗仪器治疗" },
  { id: "leg-exam", src: "unsplash:1649751361457-01d3a696c7e6", alt: "医生检查患者腿部" },

  // 医院公众号实拍
  { id: "wx-conf-hall", src: "https://mmbiz.qpic.cn/mmbiz_jpg/UvHoszaMctAhlRiavRu2smB9LLZSicia2KDiaXMsibvibXodS2XiarT3Ed1EJs6PyBfssrnaxHTvILA74nAOf7MeG2FFRU7aDziczRcSUgQIEpibx5icc/640?wx_fmt=jpeg", alt: "潼南区首届疼痛技术学术交流会会场" },
  { id: "wx-conf-sign", src: "https://mmbiz.qpic.cn/mmbiz_jpg/UvHoszaMctCnMm0hAW8QTL0FIuqiaJncXov3S219tTcF59Qs7lu02mLI0kgZRBHIkYNMJ1z2vPuvrEmYwLiar4bJz1TVCULQ3W1iaC1ESG48kI/640?wx_fmt=jpeg", alt: "疼痛技术学术交流会签到处" },
  { id: "wx-conf-audience", src: "https://mmbiz.qpic.cn/mmbiz_jpg/UvHoszaMctBH3GkDiayYhiaTmiaJ1CsRyYa3bl3CMkTibrqo1rPVWSETXe6k0oDMoxe48uR9hSdEnDeiaQSZC3r59XyjhcOlibMMuk8eZSb0VaCZA/640?wx_fmt=jpeg", alt: "学术交流会参会人员" },
  { id: "wx-blood", src: "https://mmbiz.qpic.cn/mmbiz_jpg/UvHoszaMctASjEBKqjbLgPicKl6DsFmHaib3CxaZWb5RNFg6FyuQwHYWeFgH7ntfpm313xdoicXib9QaGQ115aIlGMib0zxDZjIRicKV7tQA3UEvs/640?wx_fmt=jpeg", alt: "医院干部职工参与无偿献血" },
] as const;

export type ImageId = (typeof images)[number]["id"];
