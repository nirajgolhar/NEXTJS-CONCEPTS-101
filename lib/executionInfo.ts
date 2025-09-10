export function getExecutionInfo(source: string) {
  return {
    renderedFrom: source,
    timestamp: new Date().toLocaleString(),
  };
}
