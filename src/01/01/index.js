// document.querySelector('#msg').innerHTML = '<h1>Hello World</h1>';
function printMessage(elementId, format, message) {
  document.querySelector(`#${elementId}`).innerHTML = `<${format}>${message}</${format}>`;
}

printMessage('msg', 'h1', 'Hello World');