export const BASEURL =
  "https://ggtdzwxtjpskgkilundm.supabase.co/storage/v1/object/public/";

export const ICONS = {
  color:
    "M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z",
  puzzle:
    "M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z",
  stack:
    "M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3",
  chevronDown: "m19.5 8.25-7.5 7.5-7.5-7.5",
  arrowUpDown:
    "M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5",
  arrowUp: "M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18",
  arrowDown: "M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3",
  funnel:
    "M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z",
  pencil:
    "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125",
  duplicate:
    "M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75",
};

export const VEREINE = ["testVerein", "Verein 1", "Verein 2", "THB Demo"];

export const FONTS = [
  {
    name: "Roboto",
    className: "font-roboto",
    googleFontName: "Roboto",
    fontStack: "'Roboto', sans-serif",
  },
  {
    name: "Inter",
    className: "font-inter",
    googleFontName: "Inter",
    fontStack: "'Inter', sans-serif",
  },
  {
    name: "Raleway",
    className: "font-raleway",
    googleFontName: "Raleway",
    fontStack: "'Raleway', sans-serif",
  },
  {
    name: "Orbitron",
    className: "font-orbitron",
    googleFontName: "Orbitron",
    fontStack: "'Orbitron', sans-serif",
  },
  {
    name: "Lora",
    className: "font-lora",
    googleFontName: "Lora",
    fontStack: "'Lora', serif",
  },
  {
    name: "Merriweather",
    className: "font-merriweather",
    googleFontName: "Merriweather",
    fontStack: "'Merriweather', serif",
  },
  {
    name: "Playfair Display",
    className: "font-playfair",
    googleFontName: "Playfair+Display",
    fontStack: "'Playfair Display', serif",
  },
  {
    name: "Alegreya",
    className: "font-alegreya",
    googleFontName: "Alegreya",
    fontStack: "'Alegreya', serif",
  },
  {
    name: "Pacifico",
    className: "font-pacifico",
    googleFontName: "Pacifico",
    fontStack: "'Pacifico', cursive",
  },
  {
    name: "Caveat",
    className: "font-caveat",
    googleFontName: "Caveat",
    fontStack: "'Caveat', cursive",
  },
  {
    name: "Lobster",
    className: "font-lobster",
    googleFontName: "Lobster",
    fontStack: "'Lobster', cursive",
  },
  {
    name: "Monoton",
    className: "font-monoton",
    googleFontName: "Monoton",
    fontStack: "'Monoton', cursive",
  },
  {
    name: "Fredericka the Great",
    className: "font-fredericka",
    googleFontName: "Fredericka+the+Great",
    fontStack: "'Fredericka the Great', cursive",
  },
  {
    name: "Bangers",
    className: "font-bangers",
    googleFontName: "Bangers",
    fontStack: "'Bangers', cursive",
  },
  {
    name: "Source Code Pro",
    className: "font-sourcecode",
    googleFontName: "Source+Code+Pro",
    fontStack: "'Source Code Pro', monospace",
  },
  {
    name: "Fira Code",
    className: "font-firacode",
    googleFontName: "Fira+Code",
    fontStack: "'Fira Code', monospace",
  },
  {
    name: "UnifrakturCook",
    className: "font-unifraktur",
    googleFontName: "UnifrakturCook",
    fontStack: "'UnifrakturCook', cursive",
  },
  {
    name: "Dancing Script",
    className: "font-dancing",
    googleFontName: "Dancing+Script",
    fontStack: "'Dancing Script', cursive",
  },
  {
    name: "Quicksand",
    className: "font-quicksand",
    googleFontName: "Quicksand",
    fontStack: "'Quicksand', sans-serif",
  },
  {
    name: "Shadows Into Light",
    className: "font-shadows",
    googleFontName: "Shadows+Into+Light",
    fontStack: "'Shadows Into Light', cursive",
  },
];

export const pathnames = {
  public: ["login", "", "join", "impressum", "examples", "about"],
  private: ["dashboard", "styleguide", "create", "content"],
  admin: ["management"],
  actions: ["styleguide", "create"],
};
