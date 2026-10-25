// Dictations the hero plays on a loop. A leading "~" marks a word Chirp
// drops (filler, a self-correction, or a spoken command).

export type Script = {
  said: string;
  meant: string;
  placeholder: string;
};

export const SCRIPTS: Script[] = [
  {
    said: "~um ~so tell sam the launch is ~tuesday ~no ~wait wednesday",
    meant: "Tell Sam the launch is Wednesday.",
    placeholder: "Message #launch",
  },
  {
    said: "hi priya ~uh thanks for the quick turnaround ~new ~line cheers pieter",
    meant: "Hi Priya, thanks for the quick turnaround.\nCheers, Pieter",
    placeholder: "Reply to Priya",
  },
  {
    said: "~so ~like summarize this thread in ~three ~actually two bullets",
    meant: "Summarize this thread in two bullets.",
    placeholder: "Ask anything",
  },
];
