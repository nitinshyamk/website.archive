function htmlTitleString(htmlTitle) {
  return ''+
  '<div class=row><div class="md-col-12 section-title header">' +
  htmlTitle +
  '</div></div>'
};

function getBodyContent(objectList, primary, secondaryLeft, secondaryRight, text) {
  var html1 = '<div class="entry">'+
  '<div class="row primary">\n' +
  '<div class="sm-col-12 header">\n';

  var html2 = '' +
  '</div>\n</div>\n<div class="row">\n' +
  '<div class="sm-col-6 header secondary pull-left">\n';

  var html3 = '\n'+
  '</div>\n' +
  '<div class="sm-col-6 header secondary pull-right">\n';

  var html4 = '\n' +
  '</div>\n</div>\n<div class="row">'+
  '<div class="sm-col-12 description">\n';

  var html5 = ''+
  '</div>\n</div>\n</div>\n'

  var htmlString = '';
  for (var i = 0; i < objectList.length; i++) {
    var toAdd = html1 + objectList[i][primary] +
      html2 + objectList[i][secondaryLeft] +
      html3 + objectList[i][secondaryRight] +
      html4 + objectList[i][text] + html5;
    htmlString = htmlString + toAdd;
  };
  return htmlString + '<div class="entry-end"></div>';
};


var research = [{
  prof: 'Siddhartha Banerjee',
  date: 'January 2016 - Present', 
  kind: 'Operations Research and Information Engineering',
  descrip: '<ul>' +
    '<li>Adapted randomized algorithms from personalized page rank for solving matrix equations</li>' +
    '<li>Coauthorship, accepted to Allerton conference</li>' +
    '</ul>'
},{
  prof: 'Jesse Goldberg',
  date: 'August 2014 - December 2015', 
  kind: 'Systems and Computational Neuroscience',
  descrip: '<ul>' +
    '<li>Investigated mammalian variability generating neural circuits and their role in motor learning</li>' +
    '<li>Coauthorship in upcoming paper </li>' +
    '</ul>'
}];

var work = [{
  company: '<a href="https://www.uber.com/" target="__blank">Uber Technologies Inc</a>',
  date: 'June 2016 - August 2016', 
  position: 'Software Engineering Intern',
  descrip: '<ul>'+
    '<li>Worked on internal endpoint and routing monitoring tools for Marketplace Gateway team</li>' +
    '<li>Built routing mechanism to allow dynamic configuration of downstream clients in testing</li>'+
    '</ul>'
},{
  company: '<a href="http://www.hudson-trading.com/" target="__blank">Hudson River Trading LLC</a>',
  date: 'January 2016',
  position: 'Algo Development and Core Intern',
  descrip: '<ul> ' +
    '<li> Built data structures for tracking order book price levels' +
    '<li> Developed profitable automated trading strategy for Brazilian equities</li>' +
    '</ul>'
}];

var projects = [{
  title: 'Spatiotemporal Models for Crime Rate',
  date: 'June 2016 - September 2016', 
  language: 'Python (numpy, sklearn)',
  descrip: 'iPython notebook to teach members of project team how to construct a nonhomogeneous point process model for crime rates using data from Boston Crime Incident data set.'
},{
  title: 'Percolation and Epidemic Propagation',
  date: 'March 2016', 
  language: 'Python (numpy, sklearn)',
  descrip: 'Wrote iPython notebook to teach members of project team epidemic simulation techniques and connections with percolation models'
},{
  title: 'Acute Kidney Transplant Rejection Classifier',
  date: 'June 2015', 
  language: 'Python (numpy, scipy, sklearn)',
  descrip: 'Acheived 82% accuracy predicting kidney rejection from blood protein profile data'
},{
  title: 'Asynchronous Monte Carlo PageRank',
  date: 'May 2015', 
  language: 'Java',
  descrip: 'Developed software for asynchronous PageRank computation (see "Monte Carlo Methods in PageRank Computation" by Avrachenkov et. al.)'
},{
  title: 'Network Honeypot',
  date: 'May 2015', 
  language: 'C',
  descrip: 'Built network honeypot for multicore MIPS machine capable of 40 Mbps network traffic (class average around 5-10)'
}]

document.getElementById('research').innerHTML = 
  htmlTitleString('Research') +
  getBodyContent(research,'kind', 'prof', 'date', 'descrip');

document.getElementById('work').innerHTML = 
  htmlTitleString('Work') +
  getBodyContent(work,'company', 'position', 'date', 'descrip');

document.getElementById('projects').innerHTML = 
  htmlTitleString('Projects') +
  getBodyContent(projects,'title', 'language', 'date', 'descrip');





