import SimilarProblemPanel from "./components/worksheet/SimilarProblemPanel"
import WorksheetEditor from "./components/worksheet/WorksheetEditor"


function App() {
  return (
    <>
      <div className="w-full h-[100vh] flex justify-center p-[14px]">
        <div className="w-full max-w-screen-xl px-4">
          <div className="flex h-full gap-4 justify-center">
            <SimilarProblemPanel />
            <WorksheetEditor />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
