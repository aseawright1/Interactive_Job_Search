function alert_msg(title, text, mode, level) {
  $("<div id='alertMessage'></div>").dialog({
    autoOpen: false,
    modal: mode,
    height: 'auto',
    width: 500,
    resizable: false,
    buttons: {
      OK: function () {
        $(this).dialog('destroy');
        return false;
      }
    }
  });
  if (title === '') {
    $('#alertMessage').dialog('option', 'dialogClass', 'noTitle');
  } else {
    $('#alertMessage').dialog('option', 'title', title);
  }
  switch (level) {
    case 0:
      $('[aria-describedby="alertMessage"]').css('border', '4px solid royalblue');
      $('#alertMessage').html(
        `<img src="images/info.png" style="float: left; padding-right: 10px"/> <p style="font-size: medium; font-weight: bold">${  text  }</p>`);
      break;
    case 1:
      $('.ui-widget.ui-widget-content.ui-dialog [aria-describedby="alertMessage"]').css('border', '4px solid gold');
      $('[aria-describedby="alertMessage"]').css('border', '4px solid gold');
      $('#alertMessage').html(
        `<img src="images/warn.png" style="float: left; padding-right: 10px"/> <p style="font-size: medium; font-weight: bold">${  text  }</p>`);
      break;
    case 2:
      $('[aria-describedby="alertMessage"]').css('border', '4px solid red');
      $('#alertMessage').html(
        `<img src="images/error.png" style="float: left; padding-right: 10px"/> <p style="font-size: medium; font-weight: bold">${  text  }</p>`);
      break;
    default:
      $('[aria-describedby="alertMessage"]').css('border', '4px solid royalblue');
      $('#alertMessage').html(
        `<img src="images/confirm.png" style="float: left; padding-right: 10px"/> <p style="font-size: medium; font-weight: bold">${  text  }</p>`);
      break;
  }
  $('#alertMessage').dialog('open');
  return false;
}

const jobs = [
  {
    title: '',
    description: '',
    company: '',
    link: '',
  },
];

function setDetail(div) {
  const desc = $(div).attr('data-desc');
  $('#jobDetail').empty();
  $('#jobDetail').html(desc);
  $('.card').removeClass('highlight');
  $(div).addClass('highlight');
}

function parseJobs() {
  // Populate Jobs List Section from Jobs Array
  for (let x = 0; x < jobs.length; x += 1) {
    const sp1 = $('<span>').text(`Company: ${jobs[x].company}`);
    const sp2 = $('<span>');
    const link = sp2.append($('<a>').attr('href', jobs[x].link).text(jobs[x].link));
    const h3 = $('<h3>').addClass('article-title').text(jobs[x].title);
    const dtl = $('<div>').addClass('article-details');
    const card = $('<div>').addClass('card-section');
    const job = $('<div>').addClass('card-flex-article card');
    if (x === 0) {
      job.addClass('highlight');
    }
    dtl.append(sp1);
    dtl.append($('<br>'));
    dtl.append(link);
    card.append(h3);
    card.append(dtl);
    job.append(card);
    job.attr('onclick', 'setDetail(this);');
    job.attr('data-desc', jobs[x].description);
    $('#jobsList').append(job);
  }
  // Populate Job Detail Section from first Job Link
  $('#jobDetail').html(jobs[0].description);
}

// USAJOBS API
function getUSAJOBS(key, loc) {
  const authKey = 'hj0D4Ir4RE5JwrvNkpwBJ4p0Nof6pqfn52EknRPkn+4=';

  $.ajax({
    url: `https://data.usajobs.gov/api/search?Keyword=${key}&LocationName=${loc}`,
    method: 'GET',
    headers: {
      'Authorization-Key': authKey,
    },
  }).then((response) => {
    console.log(response);
    for (let x = 0; x < response.SearchResult.SearchResultItems.length; x += 1) {
      const job = {
        title: '', description: '', company: '', link: '',
      };
      job.title = response.SearchResult.SearchResultItems[x].MatchedObjectDescriptor.PositionTitle;
      job.description = response.SearchResult.SearchResultItems[x].MatchedObjectDescriptor.QualificationSummary;
      job.company = response.SearchResult.SearchResultItems[x].MatchedObjectDescriptor.OrganizationName;
      job.link = response.SearchResult.SearchResultItems[x].MatchedObjectDescriptor.PositionURI;
      jobs.push(job);
    }
    console.log(jobs);
    parseJobs();
  });
}

// MUSE API
function getMUSEJOBS(category, loc) {
  $.ajax({
    url: `https://www.themuse.com/api/public/jobs?category=${category}&location=${loc}&page=0`,
    method: 'GET',
  }).then((response) => {
    console.log(response);
    for (let x = 0; x < response.results.length; x += 1) {
      const job = {
        title: '', description: '', company: '', link: '',
      };
      job.title = response.results[x].name;
      job.description = response.results[x].contents;
      job.company = response.results[x].company.name;
      job.link = response.results[x].refs.landing_page;
      jobs.push(job);
    }
    console.log(jobs);
    parseJobs();
  });
}

// Click Event for Search Button
$('#btnSearch').click(() => {
  if ($('#txtLocation').val() === '') {
    alert_msg('Warning', 'You must enter a City or Zip Code!', true, 1);
    return false;
  }
  if ($('#txtKeyword').val() === '' && $('#txtCategory').val() === 'Select a Category') {
    alert_msg('Warning', 'You must enter either a Keyword or a Category!', true, 1);
    return false;
  }
  // Clear Jobs Array
  jobs.length = 0;
  // Clear Jobs List Section
  $('#jobsList').empty();
  // Clear Job Detail Section
  $('#jobDetail').empty();
  if ($('#txtCategory').val() !== '' && $('#txtCategory').val() !== 'Select a Category') {
    const category = $('#txtCategory').val();
    const location = $('#txtLocation').val();
    getMUSEJOBS(category, location);
  } else {
    const keyword = $('#txtKeyword').val();
    const location = $('#txtLocation').val();
    getUSAJOBS(keyword, location);
  }
});

// Test functions
// getUSAJOBS('Web Developer', 'Overland Park,KS');
// getMUSEJOBS('Data Science', 'Overland Park,KS');
