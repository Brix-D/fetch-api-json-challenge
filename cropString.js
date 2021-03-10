function cropString(string, len) {
    if (string.length >= len) {
        return string.substring(0, len) + " ...";
    }
    return string;
}

module.exports = cropString;

