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
        '<img src="images/info.png" style="float: left; padding-right: 10px"/> <p style="font-size: medium; font-weight: bold">' + text + '</p>');
      break;
    case 1:
      $('.ui-widget.ui-widget-content.ui-dialog [aria-describedby="alertMessage"]').css('border', '4px solid gold');
      $('[aria-describedby="alertMessage"]').css('border', '4px solid gold');
      $('#alertMessage').html(
        '<img src="images/warn.png" style="float: left; padding-right: 10px"/> <p style="font-size: medium; font-weight: bold">' + text + '</p>');
      break;
    case 2:
      $('[aria-describedby="alertMessage"]').css('border', '4px solid red');
      $('#alertMessage').html(
        '<img src="images/error.png" style="float: left; padding-right: 10px"/> <p style="font-size: medium; font-weight: bold">' + text + '</p>');
      break;
    default:
      $('[aria-describedby="alertMessage"]').css('border', '4px solid royalblue');
      $('#alertMessage').html(
        '<img src="images/confirm.png" style="float: left; padding-right: 10px"/> <p style="font-size: medium; font-weight: bold">' + text + '</p>');
      break;
  }
  $('#alertMessage').dialog('open');
  return false;
}




function callAPITest() {
  const queryURL = 'https://jobs.github.com/positions.json?description=node&location=66213';
  $.ajax({
    url: queryURL,
    method: 'GET',
  }).then(function (response) {
    console.log(response);
  });
}

// callAPITest();
alert_msg('Alert Message', 'This is a test', true, 1);


$('#primary-menu').on(
  'show.zf.dropdownmenu', function() {
    var dropdown = $(this).find('.is-dropdown-submenu');
    dropdown.css('display', 'none');
    dropdown.fadeIn('slow');
});
$('#primary-menu').on(
  'hide.zf.dropdownmenu', function() {
    var dropdown = $(this).find('.is-dropdown-submenu');
    dropdown.css('display', 'inherit');
    dropdown.fadeOut('slow');
});