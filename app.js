
  const textarea = document.querySelector('#feed-textarea > ul');

  const datedujour = new Date();
  console.log(datedujour);
  const datedujourmoins5 = day_minus_five();
  document.querySelector('#date').innerHTML = datedujourmoins5.toLocaleDateString() + ' - ' + datedujour.toLocaleDateString();
  let feeds = ['https://nouveaupartianticapitaliste.org/rss.xml','https://unioncommunistelibertaire.org/spip.php?page=backend','http://mouvement-municipal.fr/feed/'];

  
// for each feed in the feeds array we do the following
  feeds.forEach(function (url) {
    feednami.load(url).then(feed => {

      let newarticle = false; 
      feed.entries.forEach(entry => { // we check if there is at least one article that is newer than 5 days
          let date = new Date(entry.pubDate);
          if (date > day_minus_five()) {
            newarticle = true;
            return newarticle;
          }
      });

      if (newarticle) { // if there is at least one article that is newer than 5 days we display the feed
        let ul = document.createElement('ul');
        ul.innerHTML = '<h2>' + feed.meta.title + '</h2>'; // we add the feed title
        textarea.appendChild(ul);
        feed.entries.forEach(entry => {
          let date = new Date(entry.pubDate);
          if (date > day_minus_five()) { // if it's less than 5 days old we add it to the page
            let li = document.createElement('li');
            li.innerHTML = `<h4><a href="${entry.link}" target="_blank">${entry.title}</a></h4>`;
            textarea.appendChild(li);
          }
        });
      }
    });
  });





  function day_minus_five(){ // function to get the date of 5 days ago
    let dateminus5 = new Date();
    dateminus5.setDate(dateminus5.getDate() - 5);
    return dateminus5;
  }
//Using feednami to fetch RSS feeds
//https://toolkit.sekando.com/docs/en/feednami
