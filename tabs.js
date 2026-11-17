(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('[role="tabpanel"]'));
  if (!tabs.length) {
    return;
  }
  function show(key, focus) {
    if (!tabs.some(function (tab) { return tab.dataset.key === key; })) {
      key = tabs[0].dataset.key;
    }
    tabs.forEach(function (tab) {
      var selected = tab.dataset.key === key;
      tab.setAttribute('aria-selected', selected ? 'true' : 'false');
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) {
        tab.focus();
      }
    });
    panels.forEach(function (panel) {
      panel.hidden = panel.id !== 'panel-' + key;
    });
  }
  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () {
      history.replaceState(null, '', '#' + tab.dataset.key);
      show(tab.dataset.key, false);
    });
    tab.addEventListener('keydown', function (event) {
      var step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
      if (!step) {
        return;
      }
      var next = tabs[(index + step + tabs.length) % tabs.length].dataset.key;
      history.replaceState(null, '', '#' + next);
      show(next, true);
    });
  });
  window.addEventListener('hashchange', function () {
    show(location.hash.slice(1), false);
  });
  show(location.hash.slice(1), false);
})();
