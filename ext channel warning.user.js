// ==UserScript==
// @name         ext channel warning
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       hiukkanen
// @match        https://*.slack.com/*
// @grant        none
// @require      https://raw.githubusercontent.com/pie6k/jquery.initialize/f9a071e627c72d3827c2612e3d5599878e3ef42f/jquery.initialize.min.js
// ==/UserScript==


if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function()
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

(function() {
    'use strict';

    var css = '#msg_form .ext-channel { background-color: #f2dede; }',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet){
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);

    $.initialize("li.channel, li.group", function () {
        var active = $("li.channel.active, li.group.active").get(0);
        var $active = $(active);
        var text = $active.find("span:last").text().trim();
        var $form = $("#msg_form");
        var $allKids = $form.find("*").not("i, button");
        if(text.match(/-ext$/)) {
            $allKids.addClass("ext-channel");
        } else {
            $allKids.removeClass("ext-channel");
        }
    });

})();