/*

Styling

*/

function createCSS() {
	element = document.getElementById("customCSS")
	if (element) {
		console.log("Removing old CSS")
		element.parentNode.removeChild(element)
	}

	let style = document.createElement('style');
	style.id = "customCSS"
	document.getElementsByTagName('head')[0].appendChild(style)
	return style
}

function updateStyle() {
	console.log('updating style')

	setTimeout(() => {
		editorBody = document.querySelector(".ace_editor")

		styleColor = window.getComputedStyle(editorBody, null).getPropertyValue("background-color")

		console.log(styleColor)

		style = createCSS()

		// add the CSS as a string
		style.textContent = `
    #editor {
      background: ${styleColor} !important
    }
    
    #editor-rich-text {
      background: ${styleColor}
    }
    
    .editor-container {
      background: ${styleColor}
    }
    
    // .pdf-viewer {
    //   background: ${styleColor}
    // }
    
    .ace_active-line {
      background: ${styleColor} !important
    }
    
    .ace_gutter, .ace_gutter-active-line, .ace_gutter-cell {
      background: ${styleColor} !important;
      color: ${styleColor}
    }
    
    .ace-tm, .ace-gruvbox {
      background: ${styleColor} !important
    }
    `;
	}, 200);
}

/*

Fullscreen

*/

// Get OS function

function getOS() {
	var userAgent = window.navigator.userAgent,
		platform = window.navigator.platform,
		macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
		windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
		iosPlatforms = ['iPhone', 'iPad', 'iPod'],
		os = null;

	if (macosPlatforms.indexOf(platform) !== -1) {
		os = 'Mac';
	} else if (iosPlatforms.indexOf(platform) !== -1) {
		os = 'iOS';
	} else if (windowsPlatforms.indexOf(platform) !== -1) {
		os = 'Windows';
	} else if (/Android/.test(userAgent)) {
		os = 'Android';
	} else if (!os && /Linux/.test(platform)) {
		os = 'Linux';
	}

	return os;
}


function requestFullscreen(element) {
	if (element.requestFullscreen) {
		element.requestFullscreen()
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen()
	}
}

function cancelFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen()
	} else if (document.webkitCancelFullscreen) {
		document.webkitCancelFullscreen()
	}
}

// define fullscreen handler
function fullscreen(e) {
	e.preventDefault();
	var OS = getOS()

	if (OS == "Mac") {
		var platform_key = e.metaKey && e.ctrlKey

	} else {
		var platform_key = e.ctrlKey
	}

	// Enter fullscreen
	if (platform_key && e.key === 'ArrowUp') {
		// call your function to do the thing
		if (document.getElementById("editor")) {
			editor = document.getElementById("editor")
		} else if (document.getElementById("editor-rich-text")) {
			editor = document.getElementById("editor-rich-text")
		}
		requestFullscreen(editor)
	}

	// Exit fullscreen
	else if (platform_key && e.key === 'ArrowDown') {
		cancelFullscreen()
	}
}

// register the handlers

// Add eventlistener to theme changer
var editorTheme = document.getElementsByName("editorTheme")[0]

editorTheme.addEventListener("change", updateStyle, true)

// Get current style
updateStyle()

// Add eventlistener for fullscreen
var OS = getOS()

if (OS == "Mac") {
	document.addEventListener('keydown', fullscreen, false)

} else {
	document.addEventListener('keyup', fullscreen, false)
}

// Update style on editor change
var styleSwitch = document.getElementById('toggle-switch-false-37')
styleSwitch.onclick = updateStyle

// Add button

fs = document.querySelector('.toolbar-editor > div:nth-child(3)')

new_fs = fs.cloneNode(true)

new_fs.children[0].children[0].remove()
new_fs.children[0].removeAttribute('href')
new_fs.children[1].children[0].remove()
new_fs.children[1].removeAttribute('href')

document.querySelector('.toolbar-editor').appendChild(new_fs)

new_fs.children[0].textContent = "⛶"
new_fs.children[0].style.fontSize="20px"
new_fs.children[1].textContent = "⛶"
new_fs.children[1].style.fontSize="20px"
new_fs.style.marginLeft = "4px"
new_fs.style.cursor = "pointer"

function editorFullscreen(){
	if (document.getElementById("editor")) {
		editor = document.getElementById("editor")
	} else if (document.getElementById("editor-rich-text")) {
		editor = document.getElementById("editor-rich-text")
	}
	requestFullscreen(editor)
}

new_fs.onclick = editorFullscreen

// Dropdown tooltip

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

let fs_div = document.querySelector('div.toolbar-right:nth-child(5)');
let fs_tooltip = htmlToElement('<div id="focusleaf-toggle" role="tooltip" class="fade in tooltip bottom" style="top: 68px; position: fixed;"><div class="tooltip-arrow" style="left: 50%;"></div><div class="tooltip-inner">Focusleaf Full screen</div></div>');

function add_tooltip() {
  String(parseInt(fs_tooltip.style.left.slice(0,-2)) + 24) + "px";
  let rect = fs_div.getBoundingClientRect();
  fs_tooltip.style.left = String(rect.left-59.2666015625) + "px";
  fs_div.appendChild(fs_tooltip);
}

fs_div.onmouseover = add_tooltip;
fs_div.onmouseout = function(){document.getElementById('focusleaf-toggle').remove();};