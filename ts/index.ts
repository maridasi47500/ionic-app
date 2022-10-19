const el = document.getElementById('container');
const btn = document.getElementById('btn');


if (el != null) {
  btn.addEventListener('click', function handleClick() {
console.log('xx');
    if (el.style.display === 'none') {
      // ✅ Shows element if hidden
      el.style.display = 'block';

    } else {
      // ✅ Hides element if shown
      el.style.display = 'none';

    }
  });
}

