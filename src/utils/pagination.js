// Builds a "1 2 … 21" style page list around the current page.
export function pageNumbers(current, total) {
  const delta = 1
  const middle = []
  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    middle.push(i)
  }
  const result = current - delta > 2 ? [1, '...'] : [1]
  result.push(...middle)
  if (current + delta < total - 1) result.push('...', total)
  else if (total > 1) result.push(total)
  return [...new Set(result)]
}
