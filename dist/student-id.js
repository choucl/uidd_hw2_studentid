
$(document).ready(function() {
  $.getJSON('./students.json', (data) => {
    $.each(data, function(i, field){
      listDict.set(i, field);
    });
  })

  let listDict = new Map();
  $('#list button[type="submit"]').click((event) => {
    // show student id list
    event.preventDefault();
    
    if ($('#id-list').text() != "") {
      $('#id-list').empty();
    } else {
      for(let entry of listDict) {
        $("#id-list").append(entry[0] + "\t" + entry[1] + "<br>");
      };
    }
  
  })

  $('#search button[type="submit"]').click((event) => {
    // search specific studentid
    event.preventDefault();
    $.get('./response', {
      id: $('#search [name=search-id]').val()
    }, (data) => {
      if(listDict.get(data)){
        $('#search-result').text("Hello, " + listDict.get(data));
      } else {
        $('#search-result').text("Sorry, no such person");
      }

    })
  })

  $('#add button[type="submit"]').click((event) => {
    // add student
    event.preventDefault();
    $.get('./add-response', {
      addId: $('#add [name=add-id]').val(),
      addName: $('#add [name=add-name]').val()
    }, (data) => {
      if(listDict.get(data[0])){
        $('#add-result').text("Sorry, conflicted data");
      } else {
        listDict.set(data[0], data[1]);
        $('#add-result').text(data[0] + " " + data[1] + " has added to list");
      }
    })
  })

  $('#delete button[type="submit"]').click((event) => {
    // delete student
    event.preventDefault();
    $.get('./response', {
      id: $('#delete [name=delete-id]').val(),
    }, (data) => {
      if(listDict.get(data)){
        $('#delete-result').text(data + " " + listDict.get(data) + " has deleted from list");
        listDict.delete(data);
      } else {
        $('#delete-result').text("Sorry, no such person");
      }
    })
  })
});
