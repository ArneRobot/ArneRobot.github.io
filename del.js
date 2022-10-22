
const facebook = document.querySelector('.facebook');
const twitter = document.querySelector('.twitter');
const delKnapp = document.querySelector('.del');

const pageUrl = location.href;
let melding = 'generer brian-vitser her!';

const facebookApi = 'https://www.facebook.com/sharer/sharer.php?u=' + pageUrl;
const twitterApi = 'https://twitter.com/intent/tweet?text=' + pageUrl;

facebook.addEventListener('click', () => {
    window.open(url = facebookApi + ' ' + melding, target='_blank')
})

twitter.addEventListener('click', () => {
    window.open(url = twitterApi + ' ' + melding, target='_blank')
})

/* 
Når du deler så putter den inn sitatet i tweeten under linken til nettsiden:

twitter.addEventListener('click', () => {
    window.open(url = twitterApi  + "%0a" + sitatTekst.innerHTML + "-Brian", target='_blank')
})
*/

delKnapp.addEventListener('click', () => {
    navigator.share({
        text: melding,
        url: pageUrl,
        title: 'brianvitser.info'
    })
})
