
import Header from './components/Header';
import Center from './components/Center';
import { useState } from 'react';

const App = () => {
  const [boardModalOpen, setBoardModalOpen] = useState(false);

  return (
    <div>
      <Header boardModalOpen={boardModalOpen} setBoardModalOpen={setBoardModalOpen}/>
      <Center />
    </div>
  )
}

export default App;