import React from 'react';

type StatusButton = 'start' | 'pause';

function App() {
  const [time, setTime] = React.useState({ h: 0, m: 0, s: 0 });
  const [status, setStatus] = React.useState<StatusButton>('start');

  const start = () => {
    setStatus('start');
  };
  const stop = () => {
    setStatus('pause');
  };
  const reset = () => {
    setStatus('pause');
    setTime({ h: 0, m: 0, s: 0 });
  };

  const handleUpdateSecond = () => {
    setTime((prev) => ({ h: prev.h, m: prev.m, s: prev.s + 1 }));
  };

  let intervalRef: React.MutableRefObject<undefined | NodeJS.Timer> =
    React.useRef();

  React.useEffect(() => {
    if (status === 'start') {
      intervalRef.current = setInterval(handleUpdateSecond, 1000);
      if (time.s === 60) {
        setTime((prev) => ({ h: prev.h, m: prev.m + 1, s: 0 }));
      }
      if (time.m === 60) {
        setTime((prev) => ({ h: prev.h + 1, m: 0, s: prev.s }));
      }
    }

    return () => clearInterval(intervalRef.current);
  }, [status, time]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div style={{ display: 'flex', gap: 5 }}>
        <div>
          {time.h}
          <span>H</span>
        </div>
        <div>
          {time.m}
          <span>M</span>
        </div>
        <div>
          {time.s}
          <span>S</span>
        </div>
      </div>
      <div>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
