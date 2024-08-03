import { SHAPES } from '../types';


function UpcomingBlocks({ upcomingBlocks }) {
  return (
    <>
    <div className=' p-2 '>
    <h2 className='vt323-regular text-xl'>Up Coming Blocks</h2>
    <div className="upcoming pt-2">
      {upcomingBlocks.map((block, blockIndex) => {
        const shape = SHAPES[block].shape.filter((row) =>
          row.some((cell) => cell)
        );
        return (
          <div key={blockIndex}>
            {shape.map((row, rowIndex) => {
              return (
                <div key={rowIndex} className="row">
                  {row.map((isSet, cellIndex) => {
                    const cellClass = isSet ? block : 'hidden';
                    return (
                      <div
                        key={`${blockIndex}-${rowIndex}-${cellIndex}`}
                        className={`cell ${cellClass}`}
                      ></div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
    </div>
    </>
  );
}

export default UpcomingBlocks;
