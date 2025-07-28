export type CharactersData = (Character & {
  author: User;
  photo: { data: Uint8Array; mimetype: string; name: string };
})[];

export type ChatHistroy = (Chat & {
  character: Character & { photo: CharacterImage; author: User };
  messages: Message[];
})[];
