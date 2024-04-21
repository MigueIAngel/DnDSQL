
import './App.css';
import DraggableBlock from './components/DraggableBlock';
import Canvas from './components/Canvas';
import { v4 as uuidv4 } from 'uuid';
function App() {
  return (
    <div className="App">
      <div>
        <DraggableBlock id={uuidv4()} type="SELECT">SELECT</DraggableBlock>
        <DraggableBlock id={uuidv4()} type="FROM">FROM</DraggableBlock>
        <DraggableBlock id={uuidv4()} type="WHERE">WHERE</DraggableBlock>
      </div>
      <Canvas />
    </div>
  );
}

export default App;
