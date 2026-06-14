import Board from '../board/Board.jsx'

// Responsive two-column layout shared by every mode: the board on the left
// (stacks on top on mobile) and a mode-specific side panel on the right.
export default function GameLayout({ side, top, interactive = true }) {
  return (
    <div className="flex flex-col gap-4">
      {top}
      <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-start lg:justify-center">
        <div className="flex w-full justify-center lg:w-auto lg:shrink-0">
          <Board interactive={interactive} />
        </div>
        <aside className="w-full max-w-md flex-shrink-0 space-y-3 lg:w-80">
          {side}
        </aside>
      </div>
    </div>
  )
}
