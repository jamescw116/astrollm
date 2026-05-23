// utils/tracker.ts
interface TimerRecord {
  step: number;
  startTime: number;
  endTime?: number;
}

interface TimerResult {
  step: number;
  start: number;
  end: number | undefined;
}

interface TimerResults {
  start: number;
  steps: TimerResult[] | undefined;
  end: number | undefined;
  total: number | undefined;
}

export class Timer {
  private timerStart: number = 0;
  private logs: TimerRecord[] = [];

  start = (): void => {
    this.logs = [];
    this.timerStart = Date.now();
    this.logs.push({ step: 1, startTime: this.timerStart });
  };

  tick = (): void => {
    if (this.logs.length > 0) {
      this.logs[this.logs.length - 1].endTime = Date.now();
      this.logs.push({ step: this.logs.length + 1, startTime: Date.now() });
    }
  };

  stop = (): void => {
    if (this.logs.length > 0) {
      this.logs[this.logs.length - 1].endTime = Date.now();
    }
  };

  prevResult = (): TimerResult | undefined => this.result(this.logs.length - 2);

  result = (step: number = this.logs.length - 1): TimerResult | undefined =>
    step < this.logs.length
      ? {
          step: this.logs[step].step,
          start: this.logs[step].startTime,
          end: this.logs[step].endTime,
        }
      : undefined;

  startString = (): string => `Timer started at: ${new Date(this.timerStart).toLocaleTimeString()}`;

  resultString = (result: TimerResult | undefined): string =>
    result
      ? `Step ${result.step}: ` +
        `${result.end && result.start ? result.end - result.start : "N/A"} ms ` +
        `(Start: ${new Date(result.start).toLocaleTimeString()}, ` +
        `End: ${result.end === undefined ? "N/A" : new Date(result.end).toLocaleTimeString()})`
      : "No result available.";

  results = (): TimerResults => ({
    start: this.timerStart,
    steps: this.logs
      .map((_, index) => this.result(index))
      .filter((res) => res !== undefined),
    end:
      this.logs.length > 0
        ? this.logs[this.logs.length - 1].endTime
        : undefined,
    total:
      this.logs.length > 0 && this.logs[this.logs.length - 1].endTime
        ? (this.logs[this.logs.length - 1].endTime ?? 0 - this.timerStart)
        : undefined,
  });

  resultsString = (results: TimerResults): string => {
    const stepsStr = results.steps
      ? results.steps.map((step) => this.resultString(step)).join("\n")
      : "No steps recorded.";

    return (
      `Timer started at: ${new Date(results.start).toLocaleTimeString()}\n` +
      `${stepsStr}\n` +
      `Timer ended at: ${results.end === undefined ? "N/A" : new Date(results.end).toLocaleTimeString()}\n` +
      `Total duration: ${results.total === undefined ? "N/A" : results.total} ms`
    );
  };
}
