/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against app.js.
 */

/* All tests are placed within the $() function,
 * since some of these tests may require DOM elements. This is
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This test suite is all about the RSS feeds definitions. */
    describe('RSS Feeds', function() {
        /* This test makes sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeTruthy();
            });
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('name defined', function() {
             allFeeds.forEach(function(feed) {
                 expect(feed.name).toBeDefined();
                 expect(feed.name.length).not.toBe(0);
             });
         });
    });

    /* This test suite is all about menu visibility. */
    describe('The menu', function() {
        /* This test ensures the menu element is
         * hidden by default.
         */
         it('menu hidden', function() {
             expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('menu visibility', function() {
              $('.menu-icon-link').click();
              expect($('body').hasClass('menu-hidden')).toBe(false);
              $('.menu-icon-link').click();
              expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });
    /* This test suite is all about initial entries. */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('at least 1 entry', function() {
            expect($('.feed .entry').length).not.toBe(0);
        });
    });
    /* This test suite is all about feed selection. */
    describe('New Feed Selection', function() {
        var oldFeed = null;
        beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeed = $('.feed').html();
                loadFeed(1, done);
            });
        });
        /* This test ensures that when a new feed is loaded,
         * the content actually changes. 
         */
         it('content changes', function() {
             expect($('.feed').html()).not.toEqual(oldFeed);
         });
    });
}());
