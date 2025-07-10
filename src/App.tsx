import { useState, useEffect, useRef } from 'react';

const Visualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState<number>(10);
  const [speed, setSpeed] = useState<number>(500);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize array
  const resetArray = () => {
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 10);
    setArray(newArray);
  };

  useEffect(() => {
    resetArray();
  }, [arraySize]);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = canvas.width / array.length;
    array.forEach((value, index) => {
      ctx.fillStyle = '#4B5EAA';
      ctx.fillRect(index * barWidth, canvas.height - value * 2, barWidth - 2, value * 2);
    });
  }, [array]);

  // Bubble sort with animation
  const bubbleSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await new Promise(resolve => setTimeout(resolve, speed));
        }
      }
    }
    setIsSorting(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">DSA Visualizer: Bubble Sort</h1>
      <canvas ref={canvasRef} width={600} height={300} className="border mb-4 w-full" />
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <div>
          <label className="block text-sm font-medium">Array Size (5-20):</label>
          <input
            type="number"
            min="5"
            max="20"
            value={arraySize}
            onChange={(e) => setArraySize(Number(e.target.value))}
            disabled={isSorting}
            className="border p-2 rounded w-20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Speed (ms):</label>
          <input
            type="number"
            min="100"
            max="2000"
            step="100"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isSorting}
            className="border p-2 rounded w-20"
          />
        </div>
      </div>
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={bubbleSort}
          disabled={isSorting}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Start Sorting
        </button>
        <button
          onClick={resetArray}
          disabled={isSorting}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Reset Array
        </button>
      </div>
      <div className="text-sm">
        <h2 className="text-lg font-semibold">Explanation</h2>
        <p>
          Bubble Sort compares adjacent elements and swaps them if they are in the wrong order.
          This process repeats until the array is sorted. The visualization shows bars representing
          array elements, with height indicating value. Watch the bars swap during sorting!
        </p>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <div className="min-h-screen bg-gray-100 flex justify-center items-center">
    <Visualizer />
  </div>
);

export default App;