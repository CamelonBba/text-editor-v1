// editor.js

function formatText(command, value = null) {
    const editor = document.getElementById('editor');
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
  
    if (command === 'bold' || command === 'italic' || command === 'underline' || command === 'strikethrough') {
      const span = document.createElement('span');
      span.style.fontWeight = command === 'bold' ? 'bold' : 'normal';
      span.style.fontStyle = command === 'italic' ? 'italic' : 'normal';
      span.style.textDecoration = command === 'underline' ? 'underline' : command === 'strikethrough' ? 'line-through' : 'none';
  
      range.surroundContents(span);
    } else if (command === 'justifyLeft' || command === 'justifyCenter' || command === 'justifyRight') {
      const alignment = command === 'justifyLeft' ? 'left' : command === 'justifyCenter' ? 'center' : 'right';
      const div = document.createElement('div');
      div.style.textAlign = alignment;
  
      range.surroundContents(div);
    } else if (command === 'insertUnorderedList' || command === 'insertOrderedList') {
      const list = document.createElement(command === 'insertUnorderedList' ? 'ul' : 'ol');
      const listItem = document.createElement('li');
  
      listItem.appendChild(range.extractContents());
      list.appendChild(listItem);
      range.insertNode(list);
    } else if (command === 'uppercase' || command === 'lowercase') {
      const text = range.toString();
      const replacedText = command === 'uppercase' ? text.toUpperCase() : text.toLowerCase();
      range.deleteContents();
      range.insertNode(document.createTextNode(replacedText));
    }
  
    updateActiveButtons();
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('block').addEventListener('change', function () {
      const command = this.value;
      const editor = document.getElementById('editor');
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
  
      switch (command) {
        case 'title1':
          formatBlock('h1', range);
          break;
        case 'title2':
          formatBlock('h2', range);
          break;
        case 'title3':
          formatBlock('h3', range);
          break;
        default:
          formatBlock('p', range);
      }
      updateActiveButtons();
    });
  
    document.getElementById('editor').addEventListener('keyup', updateActiveButtons);
    document.getElementById('editor').addEventListener('mouseup', updateActiveButtons);
    document.addEventListener('selectionchange', updateActiveButtons);
  });
  
  function formatBlock(tagName, range) {
    const element = document.createElement(tagName);
    range.surroundContents(element);
  }
  
  function updateActiveButtons() {
    const commands = ['bold', 'italic', 'underline', 'strikethrough', 'justifyLeft', 'justifyCenter', 'justifyRight', 'insertUnorderedList', 'insertOrderedList'];
    commands.forEach(command => {
      document.getElementById(`${command}-btn`).classList.toggle('active', document.queryCommandState(command));
    });
}
  