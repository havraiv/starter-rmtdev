interface I_ResultsCount {
  jobItemsCount: number;
}

export default function ResultsCount({ jobItemsCount }: I_ResultsCount) {
  return (
    <p className="count">
      <span className="u-bold">{jobItemsCount} </span>
      results
    </p>
  );
}
