function MockQr() {
  const cells = [
    [1, 1, 1, 1, 1, 0, 1, 0],
    [1, 0, 0, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 0, 1, 1],
    [0, 0, 1, 0, 0, 1, 0, 1],
    [1, 1, 0, 1, 1, 0, 1, 0],
    [0, 1, 1, 0, 1, 1, 0, 1],
  ];

  return (
    <svg viewBox="0 0 160 160" className="mx-auto h-40 w-40 rounded-xl border border-slate-200 bg-white p-2">
      {cells.map((row, y) =>
        row.map((cell, x) =>
          cell ? <rect key={`${x}-${y}`} x={x * 20} y={y * 20} width="18" height="18" fill="#111827" /> : null
        )
      )}
    </svg>
  );
}

export default MockQr;
