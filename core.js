;(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.RepoTool = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
function esc(value){return String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}function inline(value){var placeholders=[];value=value.replace(/`([^`]+)`/g,function(_,code){placeholders.push('<code>'+esc(code)+'</code>');return '\u0000'+(placeholders.length-1)+'\u0000';});value=esc(value).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>').replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" rel="noopener noreferrer">$1</a>');return value.replace(/\u0000(\d+)\u0000/g,function(_,i){return placeholders[+i];});}function convert(input){var lines=String(input||'').replace(/\r\n/g,'\n').split('\n'),out=[],list=false,code=false,buf=[];function close(){if(list){out.push('</ul>');list=false;}}lines.forEach(function(line){if(/^```/.test(line)){close();if(code){out.push('<pre><code>'+esc(buf.join('\n'))+'</code></pre>');buf=[];}code=!code;return;}if(code){buf.push(line);return;}var h=/^(#{1,6})\s+(.+)$/.exec(line);if(h){close();out.push('<h'+h[1].length+'>'+inline(h[2])+'</h'+h[1].length+'>');return;}var li=/^[-*]\s+(.+)$/.exec(line);if(li){if(!list){out.push('<ul>');list=true;}out.push('<li>'+inline(li[1])+'</li>');return;}close();if(line.trim())out.push('<p>'+inline(line.trim())+'</p>');});if(code)throw new Error('Unclosed code fence');close();return out.join('\n');}
async function process(input){var output=convert(input);return{output:output,summary:'Markdown converted with raw HTML escaped'};}
  return { process: process, convert: convert, esc: esc };
});
