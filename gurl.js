$(document).ready(function() {
    // Set up form submit handlers
    $("#clickButton").live("click",
        function () {
            getLink();
            return false;
        });
    $("#inLink").live("keypress",
        function(e) {
            if (e.keyCode == 13) {
                getLink();
                return false;
            }
        });
    $("#inLink").select();
});
// Convert string to byte array
function stringToArray(b) {
    var charArray = new Array();
    // Loop over string
    for (var i=0; i<b.length; i++) {
        var thisChar = b[i];
        // Add character code to array
        charArray.push(thisChar.charCodeAt(0));
    }
    return charArray;
}
// Get link from goo.gl.php
function getLink() {
    // Hide inputs until .get returns
    $("#inLink").attr("disabled","disabled");
    $("#clickButton").attr("disabled","disabled");
    // Get URL from input
    var textLink = document.getElementById("inLink").value;
    // Construct link for php
    var getLink = "goo.gl.php?url=" + encodeURIComponent(textLink) + "&auth=" + getUrlShorteningRequestParams(textLink);
    // Get link
    jQuery.get(getLink, function(data){
        var c = eval("(" + data + ")");
        // Check for short URL being returned
        if ("short_url" in c) {
            // Create link if so
            var newLink = $("<a>").attr("href",c["short_url"]).text(c["short_url"]);
            // Insert into message box
            $("#urlSpan").html(newLink);
        } else {
            // Display error message
            $("#urlSpan").html("Error in conversion.");
        }
        // Enable form elements
        $("#inLink").attr("disabled","");
        $("#clickButton").attr("disabled","");
    });
}

// Shamelessly copied from toolbar.js in the Google Toolbar package
//
// Creates auth_token for POST

function getUrlShorteningRequestParams (b) {
    function c() {
        for (var l = 0, m = 0; m < arguments.length; m++) l = l + arguments[m] & 4294967295;
        return l
    }
    function d(l) {
        l = l = String(l > 0 ? l : l + 4294967296);
        var m;
        m = l;
        for (var o = 0, n = false, p = m.length - 1; p >= 0; --p) {
            var q = Number(m.charAt(p));
            if (n) {
                q *= 2;
                o += Math.floor(q / 10) + q % 10
            } else o += q;
            n = !n
        }
        m = m = o % 10;
        o = 0;
        if (m != 0) {
            o = 10 - m;
            if (l.length % 2 == 1) {
                if (o % 2 == 1) o += 9;
                o /= 2
            }
        }
        m = String(o);
        m += l;
        return l = m
    }
    function e(l) {
        for (var m = 5381, o = 0; o < l.length; o++) m = c(m << 5, m, l.charCodeAt(o));
        return m
    }
    function f(l) {
        for (var m = 0, o = 0; o < l.length; o++) m = c(l.charCodeAt(o), m << 6, m << 16, -m);
        return m
    }
    var g = "auth_token";
    var h = {
        byteArray_: stringToArray(b),
        charCodeAt: function (l) {
            return this.byteArray_[l]
        }
    };
    h.length = h.byteArray_.length;
    var i = e(h);
    i = i >> 2 & 1073741823;
    i = i >> 4 & 67108800 | i & 63;
    i = i >> 4 & 4193280 | i & 1023;
    i = i >> 4 & 245760 | i & 16383;
    var j = "7";
    h = f(h);
    var k = (i >> 2 & 15) << 4 | h & 15;
    k |= (i >> 6 & 15) << 12 | (h >> 8 & 15) << 8;
    k |= (i >> 10 & 15) << 20 | (h >> 16 & 15) << 16;
    k |= (i >> 14 & 15) << 28 | (h >> 24 & 15) << 24;
    j += d(k);
    return j;
}
