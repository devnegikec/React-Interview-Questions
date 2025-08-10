import ErrorBoundary from "./ErrorBoundary";
import Example from "./Example";
function ErrorBoundaryContainer() {
  return (
    <ErrorBoundary>
      <Example />
    </ErrorBoundary>
  );
}

export default ErrorBoundaryContainer;
