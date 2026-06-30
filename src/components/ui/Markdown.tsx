import { Fragment, type ReactNode } from 'react'

// ----------------------------------------------------------------------------
// Minimal Markdown renderer (no external deps).
// Supports: #/##/### headings, **bold**, `code`, - lists, 1. lists,
// > blockquotes, | tables | and paragraphs. Good enough for theory content.
// ----------------------------------------------------------------------------

let keyCounter = 0
const nextKey = () => `md-${keyCounter++}`

/** Renders inline **bold** and `code` segments. */
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    const token = match[0]
    if (token.startsWith('**')) {
      nodes.push(<strong key={nextKey()}>{token.slice(2, -2)}</strong>)
    } else if (token.startsWith('*')) {
      nodes.push(<em key={nextKey()}>{token.slice(1, -1)}</em>)
    } else {
      nodes.push(<code key={nextKey()}>{token.slice(1, -1)}</code>)
    }
    lastIndex = regex.lastIndex
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return nodes
}

function isTableRow(line: string) {
  return line.trim().startsWith('|') && line.trim().endsWith('|')
}

function parseRow(line: string): string[] {
  return line
    .trim()
    .slice(1, -1)
    .split('|')
    .map((c) => c.trim())
}

export function Markdown({ source }: { source: string }) {
  const lines = source.split('\n')
  const blocks: ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    if (trimmed === '') {
      i++
      continue
    }

    // Headings
    if (trimmed.startsWith('### ')) {
      blocks.push(<h3 key={nextKey()}>{renderInline(trimmed.slice(4))}</h3>)
      i++
      continue
    }
    if (trimmed.startsWith('## ')) {
      blocks.push(<h2 key={nextKey()}>{renderInline(trimmed.slice(3))}</h2>)
      i++
      continue
    }
    if (trimmed.startsWith('# ')) {
      blocks.push(<h1 key={nextKey()}>{renderInline(trimmed.slice(2))}</h1>)
      i++
      continue
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      const quote: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quote.push(lines[i].trim().slice(2))
        i++
      }
      blocks.push(
        <blockquote key={nextKey()}>{renderInline(quote.join(' '))}</blockquote>,
      )
      continue
    }

    // Tables
    if (isTableRow(trimmed)) {
      const rows: string[] = []
      while (i < lines.length && isTableRow(lines[i].trim())) {
        rows.push(lines[i])
        i++
      }
      const header = parseRow(rows[0])
      const bodyRows = rows
        .slice(1)
        .filter((r) => !/^\|[\s:-]+\|$/.test(r.trim().replace(/[^|:-\s]/g, '')))
        .map(parseRow)
        .filter((r) => !r.every((c) => /^[-:]+$/.test(c) || c === ''))
      blocks.push(
        <div key={nextKey()} className="my-3 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {header.map((h) => (
                  <th
                    key={nextKey()}
                    className="border-b border-slate-600 px-3 py-2 text-left font-bold text-slate-100"
                  >
                    {renderInline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((r) => (
                <tr key={nextKey()}>
                  {r.map((c) => (
                    <td
                      key={nextKey()}
                      className="border-b border-slate-700/60 px-3 py-2 text-slate-300"
                    >
                      {renderInline(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      )
      continue
    }

    // Ordered list
    if (/^\d+\.\s/.test(trimmed)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ''))
        i++
      }
      blocks.push(
        <ol key={nextKey()}>
          {items.map((it) => (
            <li key={nextKey()}>{renderInline(it)}</li>
          ))}
        </ol>,
      )
      continue
    }

    // Unordered list
    if (trimmed.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2))
        i++
      }
      blocks.push(
        <ul key={nextKey()}>
          {items.map((it) => (
            <li key={nextKey()}>{renderInline(it)}</li>
          ))}
        </ul>,
      )
      continue
    }

    // Paragraph
    blocks.push(<p key={nextKey()}>{renderInline(trimmed)}</p>)
    i++
  }

  return <div className="prose-paes">{blocks.map((b) => (
    <Fragment key={nextKey()}>{b}</Fragment>
  ))}</div>
}
