import { Character } from "./Character";

const main = () => {
  const characters = [new Character(), new Character(), new Character()];

  characters[0].attack({ character: characters[1] });
  characters[1].attack({ character: characters[0] });

  console.log(characters);

  for (const character of characters) {
    character.tick();
  }

  console.log(characters);
};

main();
