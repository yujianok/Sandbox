exports.handle = function(query, rsp) {
    var start = query.start_modified;
    var end = query.end_modified;
    var session = query.session;
    rsp.json(query);
}