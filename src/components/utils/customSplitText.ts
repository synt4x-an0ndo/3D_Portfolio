/**
 * Custom SplitText implementation to replace gsap-trial/SplitText
 * Splits text into characters, words, and lines for animation
 */

export interface SplitTextResult {
  chars: HTMLSpanElement[];
  words: HTMLSpanElement[];
  lines: HTMLSpanElement[];
  revert: () => void;
}

interface SplitTextOptions {
  type?: string;
  linesClass?: string;
}

export class SplitText {
  chars: HTMLSpanElement[] = [];
  words: HTMLSpanElement[] = [];
  lines: HTMLSpanElement[] = [];
  private elements: (HTMLElement | null)[] = [];
  private originalHTML: Map<HTMLElement, string> = new Map();
  private linesClass: string;

  constructor(
    target: string | HTMLElement | (string | HTMLElement)[],
    options: SplitTextOptions = {}
  ) {
    this.linesClass = options.linesClass || "split-line";
    const types = (options.type || "chars,words,lines").split(",").map((t) => t.trim());

    // Handle array of selectors or elements
    const targets = Array.isArray(target) ? target : [target];

    targets.forEach((t) => {
      const elements =
        typeof t === "string"
          ? Array.from(document.querySelectorAll<HTMLElement>(t))
          : [t];

      elements.forEach((el) => {
        if (el) {
          this.elements.push(el);
          this.originalHTML.set(el, el.innerHTML);
          this.splitElement(el, types);
        }
      });
    });
  }

  private splitElement(element: HTMLElement, types: string[]) {
    const text = element.textContent || "";
    const includeChars = types.includes("chars");
    const includeLines = types.includes("lines");

    element.innerHTML = "";
    element.style.position = "relative";

    const wordsArray = text.split(/\s+/).filter((word) => word.length > 0);
    const wordSpans: HTMLSpanElement[] = [];

    wordsArray.forEach((word, wordIndex) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "split-word";
      wordSpan.style.display = "inline-block";
      wordSpan.style.position = "relative";

      if (includeChars) {
        word.split("").forEach((char) => {
          const charSpan = document.createElement("span");
          charSpan.className = "split-char";
          charSpan.style.display = "inline-block";
          charSpan.style.position = "relative";
          charSpan.textContent = char;
          wordSpan.appendChild(charSpan);
          this.chars.push(charSpan);
        });
      } else {
        wordSpan.textContent = word;
      }

      wordSpans.push(wordSpan);
      this.words.push(wordSpan);

      element.appendChild(wordSpan);

      // Add space between words (except after last word)
      if (wordIndex < wordsArray.length - 1) {
        const space = document.createTextNode(" ");
        element.appendChild(space);
      }
    });

    // Wrap in lines if needed
    if (includeLines) {
      this.wrapInLines(element, wordSpans);
    }
  }

  private wrapInLines(element: HTMLElement, wordSpans: HTMLSpanElement[]) {
    if (wordSpans.length === 0) return;

    // Get positions of words to determine line breaks
    const lineGroups: HTMLSpanElement[][] = [];
    let currentLine: HTMLSpanElement[] = [];
    let currentTop = wordSpans[0]?.getBoundingClientRect().top;

    wordSpans.forEach((wordSpan) => {
      const top = wordSpan.getBoundingClientRect().top;
      if (Math.abs(top - currentTop) > 5 && currentLine.length > 0) {
        lineGroups.push(currentLine);
        currentLine = [];
        currentTop = top;
      }
      currentLine.push(wordSpan);
    });

    if (currentLine.length > 0) {
      lineGroups.push(currentLine);
    }

    // Clear element and rebuild with line wrappers
    element.innerHTML = "";

    lineGroups.forEach((lineWords, index) => {
      const lineSpan = document.createElement("span");
      lineSpan.className = this.linesClass;
      lineSpan.style.display = "block";
      lineSpan.style.position = "relative";
      lineSpan.style.overflow = "hidden";

      lineWords.forEach((wordSpan, wordIndex) => {
        lineSpan.appendChild(wordSpan);
        if (wordIndex < lineWords.length - 1) {
          lineSpan.appendChild(document.createTextNode(" "));
        }
      });

      this.lines.push(lineSpan);
      element.appendChild(lineSpan);

      // Add line break between lines (except after last line)
      if (index < lineGroups.length - 1) {
        // Lines are block-level, so no explicit break needed
      }
    });
  }

  revert() {
    this.elements.forEach((el) => {
      if (el) {
        const original = this.originalHTML.get(el);
        if (original !== undefined) {
          el.innerHTML = original;
        }
      }
    });
    this.chars = [];
    this.words = [];
    this.lines = [];
  }
}

export default SplitText;
