export function beutifuyFunc(str) {
  let html = '';
  for (let i = 0; i < str.length; i += 3) {
    if (str.length == 7 && i >= 3) {
      html =
        str.substring(0, 1) +
        ' ' +
        str.substring(1, 4) +
        ' ' +
        str.substring(3, 6);
    }
    html += str.slice(i, i + 3) + ' ';
  }
  return html;
}

beutifuyFunc('2506000');
