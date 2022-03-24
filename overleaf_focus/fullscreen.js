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

	if (document.getElementsByName("editorTheme")[0].value === "textmate") {

	}
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

	var OS = getOS()

	if (OS == "Mac") {
		var platform_key = e.metaKey && e.ctrlKey

	} else {
		var platform_key = e.ctrlKey
	}

	// Enter fullscreen
	if (platform_key && e.key === 'ArrowUp') {
		// call your function to do the thing
		editor = document.querySelector("#editor")
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
document.addEventListener('keyup', fullscreen, false)
