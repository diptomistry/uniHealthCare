import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridGenerator = () => {
  const [columns, setColumns] = useState(5);
  const [rows, setRows] = useState(5);
  const [layout, setLayout] = useState(
    Array.from({ length: 25 }, (_, i) => ({
      i: String(i),
      x: i % 5,
      y: Math.floor(i / 5),
      w: 1,
      h: 1,
    }))
  );
  const [cellContents, setCellContents] = useState(Array(25).fill(''));

  // Define breakpoints and columns for each breakpoint
  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: columns, md: columns, sm: columns, xs: columns, xxs: columns };

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  const handleCellContentChange = (index, content) => {
    const newContents = [...cellContents];
    newContents[index] = content;
    setCellContents(newContents);
  };

  return (
    <div className="p-4">
      <div className="mb-4 space-x-4">
        <label>
          Columns:
          <input 
            type="number" 
            value={columns} 
            onChange={(e) => setColumns(parseInt(e.target.value))} 
            className="ml-2 p-1 border" 
          />
        </label>
        <label>
          Rows:
          <input 
            type="number" 
            value={rows} 
            onChange={(e) => setRows(parseInt(e.target.value))} 
            className="ml-2 p-1 border" 
          />
        </label>
      </div>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={breakpoints}
        cols={cols}
        onLayoutChange={handleLayoutChange}
        rowHeight={30}
        width={1200}
        compactType={null}
        preventCollision={true}
        margin={[0, 0]} // This sets gap to 0
      >
        {layout.map((item, index) => (
          <div key={item.i} className="border border-gray-300 bg-white">
            <textarea
              value={cellContents[index]}
              onChange={(e) => handleCellContentChange(index, e.target.value)}
              className="w-full h-full resize-none p-1"
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default GridGenerator;