'use strict';
jQuery(function($) {

  var App = {
    init: function() {
      this.bindEvents();
    },
    bindEvents: function() {
      $('button').on('click', this.sendQuery);
    },
    sendQuery: function() {
      event.preventDefault();
      var isbn = $('#book-isbn').val();
      console.log(isbn);
      App.getBookByIsbn(isbn);
    },
    render: function(data) {
      $('#error').addClass('hide');
      $('#book-info').removeClass('hide');
      $('#book-title').text(data.title);
      data.author.forEach(function(person) {
        $('#book-author').text(person);
      });
      $('#book-publisher').text(data.publisher);
      $('#book-pubdate').text(data.pubdate);
      $('#book-pages').text(data.pages);
      $('#book-price').text(data.price);
      $('#book-cover').attr('src', data.images.large);
      $('#book-summary').text(data.summary);
    },
    showError: function() {
      $('#book-info').addClass('hide');
      $('#error').removeClass('hide');
    },
    getBookByIsbn: function(isbn) {
      $.ajax({
        dataType: 'jsonp',
        jsonpCallback: 'bookquery',
        timeout: 2000,
        url: 'http://api.douban.com/v2/book/isbn/' + isbn + '?alt=xd',
      })
      .done(function(response) {
        App.render(response);
      })
      .fail(function() {
        App.showError();
      })
      .always(function() {
        $('#welcome').addClass('hide');
      });
    }
  };

  App.init();

});