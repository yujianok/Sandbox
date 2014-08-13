exports.handle = function(query, rsp) {
    rsp.set('Content-Type', 'application/xml');
    var s = '<?xml version="1.0" encoding="UTF-8"?><wangwang_eservice_chatpeers_get_response><chatpeers list="true"></chatpeers><count>0</count><ret>10000</ret></wangwang_eservice_chatpeers_get_response>';
    rsp.send(new Buffer(s));
}