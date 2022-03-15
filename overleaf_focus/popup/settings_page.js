function set_width(e) {
  if (e.target.className == "toggle_focus") {
    browser.tabs.reload()
  } else {
    browser.tabs.executeScript({
      'code': `console.log('test');`
    })
  }
}

document.addEventListener("click", set_width);