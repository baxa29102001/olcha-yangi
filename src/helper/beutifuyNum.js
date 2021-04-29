export function beutifuyFunc(str) {
  let html = '';
  for (let i = 0; i < str.length; i += 3) {
    html += str.slice(i, i + 3) + ' ';
  }
  return html;
}
