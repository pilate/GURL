<?php

if (isset($_GET['url']) && isset($_GET['auth'])) {

    $postUrl = "http://goo.gl/api/url";
   
    $post_url = $_GET['url'];
    $auth_token = $_GET['auth'];

    $postD = "&user=toolbar@google.com&url=" . urlencode($post_url) . "&auth_token=" . $auth_token;

    print makeLink();

};

function makeLink () {
    global $postUrl, $postD;
    //print $postD;
    $ch = curl_init($postUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER,array(
        'Content-Type=application/x-www-form-urlencoded',
    ));
    curl_setopt($ch, CURLOPT_USERAGENT,'toolbar');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postD);
    $disResult = curl_exec($ch);
    curl_close($ch);
    return $disResult;

}

?>
