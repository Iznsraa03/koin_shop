export interface NotificationItem {
  id: number;
  /** ID game 8 digit, ditampilkan dengan sebagian disamarkan */
  gameId: string;
  product: string;
  /** Durasi (milidetik) notifikasi ini tampil sebelum hilang */
  displayMs: number;
  /** Jeda (milidetik) sebelum notifikasi berikutnya muncul setelah yang ini hilang */
  delayMs: number;
}

const notifications: NotificationItem[] = [
  { id: 1,  gameId: "47291038", product: "Koin 1B",   displayMs: 4000, delayMs: 2000 },
  { id: 2,  gameId: "83054712", product: "Koin 500M",  displayMs: 5000, delayMs: 2000 },
  { id: 3,  gameId: "19283740", product: "Koin 2B",   displayMs: 4500, delayMs: 2000 },
  { id: 4,  gameId: "60471829", product: "Koin 200M",  displayMs: 3500, delayMs: 2000 },
  { id: 5,  gameId: "35820194", product: "Koin 5B",   displayMs: 5500, delayMs: 2000 },
  { id: 6,  gameId: "72948301", product: "Koin 100M",  displayMs: 4000, delayMs: 2000 },
  { id: 7,  gameId: "48103927", product: "Koin 3B",   displayMs: 6000, delayMs: 2000 },
  { id: 8,  gameId: "91738204", product: "Koin 500M",  displayMs: 4200, delayMs: 2000 },
  { id: 9,  gameId: "26480391", product: "Koin 1B",   displayMs: 3800, delayMs: 2000 },
  { id: 10, gameId: "53917284", product: "Koin 200M",  displayMs: 5000, delayMs: 2000 },
  { id: 11, gameId: "38201947", product: "Koin 1B",   displayMs: 4000, delayMs: 2000 },
  { id: 12, gameId: "74920183", product: "Koin 500M",  displayMs: 5200, delayMs: 2000 },
  { id: 13, gameId: "92014738", product: "Koin 2B",   displayMs: 4600, delayMs: 2000 },
  { id: 14, gameId: "10483927", product: "Koin 3B",   displayMs: 3700, delayMs: 2000 },
  { id: 15, gameId: "56739201", product: "Koin 100M",  displayMs: 5800, delayMs: 2000 },
  { id: 16, gameId: "84920317", product: "Koin 5B",   displayMs: 4300, delayMs: 2000 },
  { id: 17, gameId: "23018479", product: "Koin 200M",  displayMs: 4000, delayMs: 2000 },
  { id: 18, gameId: "67194028", product: "Koin 1B",   displayMs: 5000, delayMs: 2000 },
  { id: 19, gameId: "41738290", product: "Koin 500M",  displayMs: 3900, delayMs: 2000 },
  { id: 20, gameId: "98023741", product: "Koin 2B",   displayMs: 6000, delayMs: 2000 },
  { id: 21, gameId: "30274918", product: "Koin 100M",  displayMs: 4100, delayMs: 2000 },
  { id: 22, gameId: "71849023", product: "Koin 1B",   displayMs: 4700, delayMs: 2000 },
  { id: 23, gameId: "58302941", product: "Koin 3B",   displayMs: 5300, delayMs: 2000 },
  { id: 24, gameId: "14972038", product: "Koin 200M",  displayMs: 3600, delayMs: 2000 },
  { id: 25, gameId: "82039471", product: "Koin 500M",  displayMs: 4800, delayMs: 2000 },
  { id: 26, gameId: "39018427", product: "Koin 5B",   displayMs: 5100, delayMs: 2000 },
  { id: 27, gameId: "65481930", product: "Koin 1B",   displayMs: 4400, delayMs: 2000 },
  { id: 28, gameId: "27394810", product: "Koin 2B",   displayMs: 3800, delayMs: 2000 },
  { id: 29, gameId: "90127483", product: "Koin 100M",  displayMs: 5600, delayMs: 2000 },
  { id: 30, gameId: "43810729", product: "Koin 500M",  displayMs: 4200, delayMs: 2000 },
];

export default notifications;
