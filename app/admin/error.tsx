'use client'
import CodeTerminal from "../components/CodeTerminal";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="mx-auto w-1/4 ">
        <CodeTerminal text={error.message} />
        <button className="btn-primary mt-5" onClick={() => reset()}>Try Again</button>
      </div>
    </div>
  );
}
