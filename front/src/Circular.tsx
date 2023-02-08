export default function Circular({
  arr,
  setArr,
  width,
}: {
  width: number;
  arr: any[];
  setArr: any;
}) {
  const createCircular = (arr: any[]) => {
    let angle = 360 - 90;
    let dangle = 360 / arr.length;

    return arr.map((a) => {
      angle = angle + dangle;

      return (
        <div
          key={a}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            borderRadius: '50%',
            transform: `rotate(${angle}deg) translate(${width / 2}px) rotate(-${angle}deg)`,
            transition: 'all 0.2s ',
          }}
        >
          {a}
        </div>
      );
    });
  };

  return (
    <div style={{ position: 'relative' }} onClick={() => setArr()}>
      {createCircular(arr)}
    </div>
  );
}
