
(function(){
  const search = document.getElementById('buscadorGlosario');
  const buttons = Array.from(document.querySelectorAll('.gl58-filter'));
  const cards = Array.from(document.querySelectorAll('.gl58-card'));
  const groups = Array.from(document.querySelectorAll('.gl58-letter-group'));
  const counter = document.getElementById('gl58Counter');
  const empty = document.getElementById('gl58Empty');
  let active = 'todos';
  function render(){
    const q = (search.value || '').trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const matchesCat = active === 'todos' || card.dataset.cat === active;
      const haystack = card.dataset.search || '';
      const matchesSearch = !q || haystack.includes(q);
      const show = matchesCat && matchesSearch;
      card.classList.toggle('gl58-hidden', !show);
      if(show) visible += 1;
    });
    groups.forEach(group => {
      const shown = group.querySelectorAll('.gl58-card:not(.gl58-hidden)').length;
      group.classList.toggle('gl58-hidden', shown === 0);
    });
    counter.textContent = 'Mostrando ' + visible + ' término' + (visible === 1 ? '' : 's');
    empty.hidden = visible !== 0;
  }
  buttons.forEach(btn => btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    active = btn.dataset.filter || 'todos';
    render();
  }));
  if(search){search.addEventListener('input', render);} 
  render();
})();
