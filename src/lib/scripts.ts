// Dictations the hero plays. A leading "~" marks a word Chirp drops
// (filler, a self-correction, or a spoken command that becomes formatting).

export type Script = {
  said: string;
  meant: string;
  app: string;
  headline: string[];
};

export const SCRIPTS: Script[] = [
  {
    said: "~um ~so tell sam the launch is ~tuesday ~no ~wait wednesday at three",
    meant: "Tell Sam the launch is Wednesday at 3.",
    app: "Slack · #launch",
    headline: ["say it messy."],
  },
  {
    said: "~uh make the auth hook retry twice ~like before it gives up ~new ~line and add a test",
    meant: "Make the auth hook retry twice before it gives up.\nAdd a test.",
    app: "VS Code · useAuth.ts",
    headline: ["in any app."],
  },
  {
    said: "hi priya ~new ~line thanks for the quick turnaround ~um i'll send the invoice friday ~new ~line cheers pieter",
    meant: "Hi Priya,\nThanks for the quick turnaround. I'll send the invoice Friday.\nCheers, Pieter",
    app: "Outlook · RE: Q3 invoice",
    headline: ["what you", "meant."],
  },
  {
    said: "~so my audio ~like never leaves this pc ~right",
    meant: "My audio never leaves this PC.",
    app: "Notepad",
    headline: ["never", "uploaded."],
  },
];
