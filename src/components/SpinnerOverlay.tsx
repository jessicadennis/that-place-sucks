export default function SpinnerOverlay({ isLoading }: { isLoading: boolean }) {
  if (isLoading) {
    return (
      <div
        className="spinner-overlay"
        style={{ opacity: "30%" }}>
        <div
          className="spinner-border"
          role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return <></>;
}
