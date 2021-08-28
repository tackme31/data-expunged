import './App.css'
import Preview from './components/Preview'
import Settings from './components/Settings'

function App() {
  return (
    <div className="App">
      <div className="left">
        <Settings />
      </div>
      <div className="right">
        <Preview />
      </div>
    </div>
  )
}

export default App
