document.addEventListener('DOMContentLoaded', function() {
    // আইফ্রেম রিসাইজ ফাংশন
    function resizeIframe(iframe) {
        try {
            const height = iframe.contentWindow.document.body.scrollHeight;
            iframe.style.height = height + 'px';
        } catch (e) {
            console.error('Error resizing iframe:', e);
        }
    }

    // প্রতিটি আইফ্রেমের জন্য আলাদাভাবে রিসাইজ হ্যান্ডেল
    const iframe1 = document.querySelector('.custom-iframe-1');
    const iframe2 = document.querySelector('.custom-iframe-2');

    if (iframe1) {
        iframe1.onload = function() {
            resizeIframe(iframe1);
        };
    }

    if (iframe2) {
        iframe2.onload = function() {
            resizeIframe(iframe2);
        };
    }

    // রিসাইজ ইভেন্টে রিসাইজ কার্যকর
    window.addEventListener('resize', function() {
        if (iframe1) resizeIframe(iframe1);
        if (iframe2) resizeIframe(iframe2);
    });
});
