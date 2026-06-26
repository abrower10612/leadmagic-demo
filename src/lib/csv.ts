import type { DetectedColumn } from './enrichments';

export interface ParsedCsv {
  /** First row, treated as headers. */
  headers: string[];
  /** Remaining rows. */
  rows: string[][];
  rowCount: number;
  fileName: string;
}

/** Parse a single CSV line, honoring quoted fields and escaped quotes. */
function parseLine(line: string): string[] {
  const out: string[] = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQuotes) {
      if (c === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += c;
      }
    } else if (c === ',') {
      out.push(cur);
      cur = '';
    } else if (c === '"') {
      inQuotes = true;
    } else {
      cur += c;
    }
  }
  out.push(cur);
  return out.map((v) => v.trim());
}

export function parseCsv(text: string, fileName = 'upload.csv'): ParsedCsv {
  const lines = text
    .split(/\r?\n/)
    .filter((l) => l.trim().length > 0);
  const headers = lines.length ? parseLine(lines[0]) : [];
  const rows = lines.slice(1).map(parseLine);
  return { headers, rows, rowCount: rows.length, fileName };
}

/** Spreadsheet column letter for a 0-based index (0 -> A, 26 -> AA). */
export function columnLetter(index: number): string {
  let s = '';
  let i = index + 1;
  while (i > 0) {
    const r = (i - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    i = Math.floor((i - 1) / 26);
  }
  return s;
}

export interface DetectedInfo {
  header: string;
  index: number;
  /** 0-1 share of rows with a non-empty value. */
  coverage: number;
  filled: number;
}

export type ColumnDetection = Partial<Record<DetectedColumn, DetectedInfo>>;

const PATTERNS: { type: DetectedColumn; re: RegExp }[] = [
  { type: 'email', re: /e-?mail/i },
  { type: 'linkedin_url', re: /linked-?in|\/in\/|profile.?url/i },
  {
    type: 'company_domain',
    re: /domain|company.?(domain|url|site|website)|^website$/i,
  },
  { type: 'first_name', re: /first.?name|^fname$|given.?name/i },
  { type: 'last_name', re: /last.?name|^lname$|surname|family.?name/i },
];

/** Map header names to known column types and measure real coverage. */
export function detectColumns(
  headers: string[],
  rows: string[][]
): ColumnDetection {
  const result: ColumnDetection = {};
  headers.forEach((raw, i) => {
    const header = raw.trim();
    for (const { type, re } of PATTERNS) {
      if (result[type]) continue; // first matching column per type wins
      if (re.test(header)) {
        const filled = rows.filter((r) => (r[i] ?? '').trim() !== '').length;
        result[type] = {
          header,
          index: i,
          coverage: rows.length ? filled / rows.length : 0,
          filled,
        };
        break;
      }
    }
  });
  return result;
}
