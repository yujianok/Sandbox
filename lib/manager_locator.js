
exports.getManager = function(type) {
    var genericManager = require('./manager/generic_manager');
    try {
        var specificManager = require('./manager/' + type + '_manager');

        return combine(specificManager, genericManager);
    } catch(err) {
        return genericManager;
    }
}

function combine(specificManager, genericManager) {
    var result = {
        get: genericManager.get,
        find: genericManager.find,
        create: genericManager.create,
        update: genericManager.update,
        delete: genericManager.delete
    };

    if (specificManager.get) {
        result.get = specificManager.get;
    }
    if (specificManager.find) {
        result.find = specificManager.find;
    }
    if (specificManager.create) {
        result.create = specificManager.create;
    }
    if (specificManager.update) {
        result.update = specificManager.update;
    }
    if (specificManager.delete) {
        result.delete = specificManager.delete;
    }

    return result;
}