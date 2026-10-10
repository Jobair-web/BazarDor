const BN = "০১২৩৪৫৬৭৮৯";

// 148 -> "১৪৮"
export const toBnDigits = (v: string | number): string =>
  String(v).replace(/\d/g, (d) => BN[Number(d)]);

// Bengali string -> number ("১,২৯০ টাকা" -> 1290)
export const parseBnNumber = (v: string | number): number => {
  if (typeof v === "number") return v;
  const ascii = v
    .replace(/[০-৯]/g, (d) => String(BN.indexOf(d)))
    .replace(/,/g, "");
  const m = ascii.match(/-?\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : 0;
};

// 1290 -> "১,২৯০ টাকা"
export const formatTaka = (n: number) =>
  `${toBnDigits(n.toLocaleString("en-US"))} টাকা`;

// "মঙ্গলবার, ৬ অক্টোবর, ২০২৬"
export const banglaDate = (d = new Date()) =>
  new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);