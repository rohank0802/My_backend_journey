// APP LAYER — root layout shell
// Zero business logic here.
// All logic lives in: api/ → state/ → hooks/ → components/

import Sidebar from '../components/Sidebar/Sidebar'
import AppHeader from '../components/AppHeader/AppHeader'
import ChatArea from '../components/ChatArea/ChatArea'
import InputBar from '../components/InputBar/InputBar'

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0b0b0b] text-[#e5e2e1]">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 bg-[#131313] overflow-hidden">
        <AppHeader />
        <ChatArea />
        <InputBar />
      </main>
    </div>
  )
}
