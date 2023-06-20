import { Character } from "./Character";

const main = () => {
  const a = new Character();
  const b = new Character();
  a.attack({ character: b });
};

main();
