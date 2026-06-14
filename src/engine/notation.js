// Formatting helpers for the move list. Turns a verbose history array into
// numbered movetext rows for the MoveHistory panel.

/**
 * @param {Array} history verbose moves from ChessGame.history()
 * @returns {Array<{number, white, black, whitePly, blackPly}>}
 */
export function toMoveRows(history) {
  const rows = []
  for (let i = 0; i < history.length; i += 2) {
    const white = history[i]
    const black = history[i + 1]
    rows.push({
      number: i / 2 + 1,
      white: white ? white.san : '',
      black: black ? black.san : '',
      whitePly: white ? i + 1 : null,
      blackPly: black ? i + 2 : null,
    })
  }
  return rows
}

/** Compact one-line PGN-ish movetext, e.g. "1. e4 e5 2. Nf3 Nc6". */
export function toMovetext(history) {
  return toMoveRows(history)
    .map((r) => `${r.number}. ${r.white}${r.black ? ' ' + r.black : ''}`)
    .join(' ')
}
