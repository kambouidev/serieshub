import { FC } from 'react'
import { SHHeader } from './components/SHHeader/SHHeader.component'
import SHSearchBar from './components/SHSearchBar/SHSearchBar.component'

const App: FC = () => {
  return (
    <div className='w-[85%] m-auto '>
      <SHHeader />
      <SHSearchBar />
    </div>
  )
}

export default App
