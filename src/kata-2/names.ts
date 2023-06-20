const NAMES = [
  "Grigria Yaapaa",
  "Pemabur Adoileerq",
  "Qaakii Tha'chut",
  "Ooxaa Ga",
  "Uzah Gukrob",
  "Oiqugauc Ooku",
  "Sendou Suti",
  "Shressan Baweing",
  "Oothoum Pabberg",
  "Splarra Dasummah",
];

shuffleArray(NAMES);

let currentIndex = -1;

export const generateRandomName = () => {
  currentIndex += 1;
  if (currentIndex >= NAMES.length) {
    throw Error("I'm out of names!");
  }
  return NAMES[currentIndex];
};

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
