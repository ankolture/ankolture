
window.addEventListener('beforeunload', function () {
    const currentUrl = window.location.pathname + window.location.search;
    
    const savedUrl = JSON.parse(localStorage.getItem('previous_url'))?.url;

    if (savedUrl !== currentUrl) {
        const current_url = { url: currentUrl };
        localStorage.setItem('previous_url', JSON.stringify(current_url));
    }
});

window.addEventListener('load', function () {
    const saved = JSON.parse(localStorage.getItem('previous_url'));

    if (saved && saved.url && saved.url !== window.location.pathname + window.location.search) {
        console.log(saved.url);
        const link = document.querySelector('.volver-link');
        
        if (link) {
            link.href = saved.url; 
        }
    }
});
