import SetPicker from '../components/theme/SetPicker.jsx'

// Theme picker page: choose your African empire chess set.
export default function SetsMode() {
  return (
    <div className="space-y-5">
      <header className="text-center">
        <h1 className="font-display text-3xl font-bold text-gradient md:text-4xl">
          Choose Your Empire
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-white/70">
          Nine great African civilizations, each rendered as a complete chess set
          with its own carved pieces, board colors and regalia. Your choice
          applies everywhere and is remembered between visits.
        </p>
      </header>
      <SetPicker />
    </div>
  )
}
