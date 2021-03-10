const cropString = require('./cropString');
const fetch = require('./fetchposts');

// test('cropping string', () => {
//     expect(cropString('DomDomDom', 3)).toBe('Dom ...');
//
//
// });
//
// test('empty string', () => {
//     expect(cropString('', 30)).toBe('');
// });
//
// test('lorem ipsum', () => {
//     expect(cropString('Lorem ipsum', 5)).toBe('Lorem ...');
// });
//
// test('number', () => {
//     expect(cropString(13, 5)).toBe(13);
// });
//
// test('number', () => {
//     expect(cropString('1377', 2)).toBe("13 ...");
// });

test('json data', () => {
    expect(fetch.posts("https://jsonplaceholder.typicode.com/posts")).resolve.toBeNull();
    expect(fetch.posts("https://jsonplaceholder.typicode.com/posts")).resolve.toBeDefined();
    expect(fetch.posts("https://jsonplaceholder.typicode.com/posts")).resolve.toBeTruthy();
    expect(fetch.posts("")).resolve.toBeTruthy();

});

