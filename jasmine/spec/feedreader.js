/* Place all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/
$(function() {
  describe('RSS Feeds', function() {
    // test to make sure if allFeeds variable has been defined
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    // test to check if each objet in allFeeds has a defined URL
    it('have defined URLs', function() {
      allFeeds.forEach(el => {
        let url = el.url;

        expect(url).toBeDefined();
        expect(url).not.toBe('');
      });
    });

    // test to check if each objet in allFeeds has a defined name
    it('have defined names', function() {
      allFeeds.forEach(el => {
        let name = el.name;

        expect(name).toBeDefined();
        expect(name).not.toBe('');
      });
    });
  });

  describe('The menu', function() {

    // test to ensure the menu element is hidden by default
    it('is hidden by default', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    // test to ensure the menu changes visibility when the menu icon is clicked.
    it('change visibility when clicking on menu icon', function() {

      // test if the menu shows when clicked
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(false);

      // test if the menu hides when clicked
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
  });


  describe('Initial Entries', function() {

    // test to ensure when the loadFeed function is called and completes its works,
    // there is at least a single .entry element within the .feed container.

    // use asynchonous done() function since loadFeed() is asynchronous
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      })
    });

    it('has at least a single entry', function(done) {
      expect($('.feed .entry').length).toBeGreaterThan(0);
      done();
    });

  });


  describe('New Feed Selection', function() {

    // test to ensure that the content acutally changes when a new feed is loaded by the loadFeed function
    let preContent;
    let newContent;

    beforeEach(function(done) {
      loadFeed(0, function() {
        // feed 0 done loading
        preContent = document.querySelector('.entry h2').textContent;

        loadFeed(1, function() {
          // feed 1 done loading
          newContent = document.querySelector('.entry h2').textContent;
          // all variables initialized, can begin tests
          done();
        });
      });
    });

    // test if the content is changed
    it('feed content is changed', function(done) {
      expect(newContent).not.toEqual(preContent);
      done();
    });
  });
}());
