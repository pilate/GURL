<?php

if (isset($_GET['url']) && isset($_GET['auth'])) {

    $google_url = "http://goo.gl/api/url";

    $shorten_url = $_GET['url'];
    $auth_token = $_GET['auth'];

    $post_data = "&user=toolbar@google.com&url=" . urlencode($shorten_url) . "&auth_token=" . $auth_token;

    print makeLink($google_url, $post_data);

};

function makeLink ($curl_url, $curl_data) {
    $ch = curl_init($curl_url);
    $options = array(
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_USERAGENT => 'toolbar',
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $curl_data,
    );
    curl_setopt_array($ch, $options);
    $disResult = curl_exec($ch);
    curl_close($ch);
    return $disResult;
}

?>
