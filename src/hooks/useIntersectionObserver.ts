type intersectionCallback = (entry: IntersectionObserverEntry) => void;

const intersectionHandler = (isIntersectingFn: intersectionCallback) => {
  return function handleIntersection(
    entries: Array<IntersectionObserverEntry>
  ) {
    entries.forEach((entry) => {
      isIntersectingFn(entry);
    });
  };
};

function observeElement(
  element: HTMLElement,
  isIntersectingFn: intersectionCallback,
  options?: IntersectionObserverInit
) {
  const handleIntersection = intersectionHandler(isIntersectingFn);
  const observer = new IntersectionObserver(handleIntersection, options);
  observer.observe(element);
  return observer;
}

export default { observeElement };
