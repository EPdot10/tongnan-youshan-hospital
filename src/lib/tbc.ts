/** 「待院方确认」的值：页面上以虚线下划线显示，方便审稿时一眼看到。 */
export type Tbc = { tbc: true; value: string; note?: string };
export type Text = string | Tbc;

export const tbc = (value: string, note?: string): Tbc => ({ tbc: true, value, note });
export const isTbc = (t: Text): t is Tbc => typeof t === "object" && t !== null && "tbc" in t;
export const plain = (t: Text) => (isTbc(t) ? t.value : t);
