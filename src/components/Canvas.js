import React, { useState, useRef } from 'react';  // Asegúrate de importar useRef
import { useDrag, useDrop } from 'react-dnd';
function DraggableBlock({ id, type, children, moveBlock, findBlock, removeBlock }) {
  const originalIndex = findBlock(id).index;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "sql-block",
    item: { type, id },
    end: (item, monitor) => {
      const { index: dropIndex } = findBlock(id);
      const didDrop = monitor.didDrop();
      if (!didDrop || dropIndex === null) {
        removeBlock(id);
      }
    },
    
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [id, type, removeBlock, findBlock]);

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.2 : 1, cursor: 'move' }}>
      {children}
      <input type='text' placeholder='Enter text here' />
    </div>
  );
}
function Canvas() {
  const [blocks, setBlocks] = useState([]);
  const ref = useRef(null);

  const moveBlock = (id, atIndex) => {
    const { block, index } = findBlock(id);
    setBlocks((prevBlocks) => {
      const newBlocks = [...prevBlocks];
      newBlocks.splice(index, 1);
      newBlocks.splice(atIndex, 0, block);
      return newBlocks;
    });
  };
  

  const removeBlock = (id) => {
    setBlocks((prevBlocks) => prevBlocks.filter(block => block.id !== id));
  };

  const findBlock = (id) => {
    const block = blocks.find((b) => b.id === id);
    if (!block) {
      throw new Error(`Block with id ${id} not found`);
    }
    return {
      block,
      index: blocks.indexOf(block),
    };
  };

  const [, drop] = useDrop({
    accept: "sql-block",
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        setBlocks([...blocks, { id: item.id, type: item.type }]);  // Asegúrate de que item.id esté definido
      }
    }
  });

  drop(ref);

  return (
    <div ref={ref} style={{ width: '100%', height: '400px', border: '1px solid black' }}>
      {blocks.map((block, index) => (
        <DraggableBlock key={block.id} id={block.id} type={block.type} children={block.type}
                        moveBlock={moveBlock} findBlock={findBlock} removeBlock={removeBlock} />
      ))}
    </div>
  );
}

export default Canvas;
