function htmlTitleString(htmlTitle) {
  return ''+
  '<div class=row><div class="md-col-12 section-title header">' +
  htmlTitle +
  '</div></div>'
};

var html1 = '<div class="entry">'+
'<div class="row primary">\n' +
'<div class="sm-col-12 header">\n';

var html2 = '' +
'</div>\n</div>\n<div class="row header secondary">\n' +
'<div class="sm-col-6 pull-left">\n';

var html3 = ''+
'</div>\n' +
'<div class="sm-col-6 pull-right">\n';

var html4 = '' +
'</div>\n</div>\n<div class="row">'+
'<div class="sm-col-12 description">\n'

var html5 = ''+
'</div>\n</div>\n</div>\n'


function getBodyContent(objectList, primary, secondaryLeft, secondaryRight, text) {
  var htmlString = '';
  for (var i = 0; i < objectList.length; i++) {
    var toAdd = html1 + objectList[i][primary] +
      html2 + objectList[i][secondaryLeft] +
      html3 + objectList[i][secondaryRight] +
      html4 + objectList[i][text] + html5;
    console.log(toAdd);
    htmlString = htmlString + toAdd;
  };
  return htmlString;
};