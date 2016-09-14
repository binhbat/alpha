---
layout: page
title: Search
search_omit: true
permalink: /search.html
---

  <h1>Search</h1>
  <!-- Search form -->
  <form method="get" action="/search" data-search-form>
    <label for="q">Search term</label>
    <input type="search" name="q" id="q" placeholder="Enter search term" data-search-input />
    <input type="submit" value="Search" />
  </form>

  <!-- Search results placeholder -->
  <p data-search-found>
    <span data-search-found-count></span> result(s) found for &ldquo;<span data-search-found-term></span>&rdquo;.
  </p>
  <div data-search-results></div>
  <!-- Search result template -->
  <script type="text/x-template" id="search-result">
    <div>
      <h1><a href="##Url##">##Title##</a></h1>
      <!--h2><a href="##Url##">##Date##</a></h2>
      <a href="##Url##">Read &ldquo;##Title##&rdquo;</a-->
    </div>
  </script>

  <!--script src="/scripts/search.js"></script-->
  <script>
var q, jsonFeedUrl = "/posts.json",
    $searchForm = $("[data-search-form]"),
    $searchInput = $("[data-search-input]"),
    $resultTemplate = $("#search-result"),
    $resultsPlaceholder = $("[data-search-results]"),
    $foundContainer = $("[data-search-found]"),
    $foundTerm = $("[data-search-found-term]"),
    $foundCount = $("[data-search-found-count]"),
    allowEmpty = true,showLoader = true,
    loadingClass = "is--loading";
$(document).ready( function(){$foundContainer.hide();initSearch();});
function initSearch(){if (getParameterByName('q')){q = decodeURIComponent(getParameterByName('q'));$searchInput.val(q);execSearch(q);}$(document).on("submit", $searchForm, function(e){e.preventDefault();q = $searchInput.val();execSearch(q);});}
function execSearch(q){if (q != '' || allowEmpty){if (showLoader){toggleLoadingClass();}getSearchResults(processData());}}
function toggleLoadingClass(){$resultsPlaceholder.toggleClass(loadingClass);$foundContainer.toggleClass(loadingClass);}
function getSearchResults(callbackFunction){$.get(jsonFeedUrl, callbackFunction, 'json');}
function processData(){$results = [];return function(data){var resultsCount = 0,results = "";$.each(data, function(index, item){if (item.search_omit != "true" && (item.content.toLowerCase().indexOf(q.toLowerCase()) > -1 || item.title.toLowerCase().indexOf(q.toLowerCase()) > -1)){var result = populateResultContent($resultTemplate.html(),item);resultsCount++;results += result;}});if (showLoader){toggleLoadingClass();}populateResultsString(resultsCount);showSearchResults(results);}}
function showSearchResults(results){$resultsPlaceholder.html(results);}
function populateResultContent(html, item){
    html = injectContent(html, item.title, '##Title##');
    html = injectContent(html, item.link, '##Url##');
    html = injectContent(html, item.excerpt, '##Excerpt##');
    html = injectContent(html, item.date, '##Date##');
    return html;}
function populateResultsString(count){$foundTerm.text(q);$foundCount.text(count);$foundContainer.show();}
function getParameterByName(name){var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);return match && decodeURIComponent(match[1].replace(/\+/g, ' '));}
function injectContent(originalContent,injection,placeholder){var regex = new RegExp(placeholder,'g');return originalContent.replace(regex,injection);}
  </script>