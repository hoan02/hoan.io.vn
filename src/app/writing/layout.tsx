import { Space_Grotesk, Newsreader, Patrick_Hand } from "next/font/google";

// Display, accent and handwritten faces for the transit-map writing pages.
// All three ship a Vietnamese subset so EN/VI render with the same glyphs.
const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const serifAccent = Newsreader({
  variable: "--font-serif-accent",
  subsets: ["latin", "vietnamese"],
  style: ["italic"],
  weight: ["400"],
  display: "swap",
});

const hand = Patrick_Hand({
  variable: "--font-hand",
  subsets: ["latin", "vietnamese"],
  weight: "400",
  display: "swap",
});

export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${display.variable} ${serifAccent.variable} ${hand.variable}`}>{children}</div>;
}
