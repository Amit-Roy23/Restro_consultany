/**
 * Resto Hospiverse — international markets, in the order the client listed
 * them. Names come from the messages (`biz.hospiverse.countries`, same order);
 * here are the code shown on the board and the time zone for the live clock.
 */
export const hospiverseMarkets = [
  { code: "MV", timeZone: "Indian/Maldives" },
  { code: "TH", timeZone: "Asia/Bangkok" },
  { code: "BD", timeZone: "Asia/Dhaka" },
  { code: "NP", timeZone: "Asia/Kathmandu" },
  { code: "AE", timeZone: "Asia/Dubai" },
  { code: "SA", timeZone: "Asia/Riyadh" },
  { code: "QA", timeZone: "Asia/Qatar" },
  { code: "DK", timeZone: "Europe/Copenhagen" },
  { code: "ID", timeZone: "Asia/Jakarta" },
] as const;
