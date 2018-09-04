import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import './sample';
import { sampleXML } from './sample';

$(document).ready(() => {
    const editor = monaco.editor.create(document.getElementById('editor'), {
        language: 'xml',
        automaticLayout: true,
        value: projectXML ? decodeURIComponent(projectXML) : sampleXML
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

        // Add simple rendering message in iframe render
        const iframe = $('[name=scoreRender]');
        iframe.contents().find('body').html(`
            <div style="background:white;height:100%">
                <h4 style="text-align:center">
                    Rendering...
                </h4>
            </div>`);
    });
    
    let setHeight = () => {
        $('#editor').css('height', $(window).height() - 250 + 'px');
        editor.layout();
    }
    $(window).resize(setHeight);
    setHeight();
});
  

  