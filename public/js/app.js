import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

$(document).ready(() => {
    const editor = monaco.editor.create(document.getElementById('editor'), {
        language: 'xml',
        automaticLayout: true
    });
  
    $('#renderForm').submit(function() {
        $('[name=xmlText]').remove();
        $(this).append(
            $('<input>', {
                type: 'hidden',
                name: 'xmlText', 
                value: editor.getValue() 
            })
        );
    });
    
    let setHeight = () => {
        $('#editor').css('height', $(window).height() - 250 + 'px');
        editor.layout();
    }
    $(window).resize(setHeight);
    setHeight();
});
  

  