/*
@Author : Hemanth.HM
@email : hemanth.hm@gmail.com
@license : GNU GPLv3
*/


// Set up the context menus
chrome.contextMenus.create({
     "title": "to gist",
     "contexts": ["selection"],
     "onclick": function (info, tab) {
         create_gist(info.selectionText);
     }
 });

/*
TODO :
 Language detection!
*/

function create_gist(text) {
     var request = new XMLHttpRequest();

     var url = "https://api.github.com/gists";

     request.onreadystatechange = function () {
         if (request.readyState == 4) {
             gist_tab(request.responseText);
         }
     }

     var gist = {
         "description": "test",
         "public": true,
         "files": {
             "test.txt": {
                 "content": text
             }
         }
     };
     request.open("POST", url, true);
     request.send(JSON.stringify(gist));
 }

function gist_tab(response) {
     gist_url = JSON.parse(response).html_url
     chrome.tabs.create({
         'url': gist_url
     }, function (tab) {});
 }
