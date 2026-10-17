(() => {
  const form = document.querySelector('.publication-filters');
  const search = document.querySelector('#paper-search');
  const type = document.querySelector('#paper-type');
  const year = document.querySelector('#paper-year');
  const papers = [...document.querySelectorAll('.publication-list > li')];
  const count = document.querySelector('.publication-count');
  const update = () => {
    const terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;
    papers.forEach(paper => {
      paper.hidden = !terms.every(term => paper.textContent.toLowerCase().includes(term)) || (type.value && type.value !== paper.dataset.type) || (year.value && year.value !== paper.dataset.year);
      if (!paper.hidden) visible++;
    });
    document.querySelectorAll('.publication-group').forEach(group => { group.hidden = ![...group.querySelectorAll('li')].some(paper => !paper.hidden); });
    count.textContent = `${visible} of ${papers.length} publications`;
    document.querySelector('#no-publications').hidden = visible > 0;
  };
  form.hidden = false; count.hidden = false;
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('reset', () => { setTimeout(update, 0); });
  window.addEventListener('hashchange', () => {
    const paper = papers.find(p => '#' + p.id === location.hash);
    if (paper && paper.hidden) { form.reset(); setTimeout(() => paper.scrollIntoView(), 0); }
  });
  update();
})();
