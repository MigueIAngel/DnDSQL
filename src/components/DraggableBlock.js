import { useDrag } from 'react-dnd';

function DraggableBlock({ type, children }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "sql-block",
    item: { type },
    
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
      {children}
      
    </div>
  );
}

export default DraggableBlock;
