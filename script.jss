/* =========================================
   1. VITA EFFECT (SCROLL OBSERVER)
   ========================================= */
document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the class that triggers the CSS slide-up animation
                entry.target.classList.add('effect-visible');
                observer.unobserve(entry.target); // Run only once
            }
        });
    }, observerOptions);

    // Target all elements with the 'effect-mask' class
    const elements = document.querySelectorAll('.effect-mask');
    elements.forEach(el => observer.observe(el));
});

/* =========================================
   2. EXISTING FUNCTIONALITY
   ========================================= */

// Facility Tab Switcher
function switchTab(tabName) {
    // Reset Tabs
    const tabs = document.querySelectorAll('.tab-box');
    tabs.forEach(t => {
        t.classList.remove('bg-orange', 'text-white');
        t.classList.add('bg-white', 'text-dark', 'border-bottom');
        t.querySelector('i').classList.add('text-muted');
    });

    // Set Active Tab
    const activeTab = document.getElementById('tab-' + tabName);
    activeTab.classList.remove('bg-white', 'text-dark', 'border-bottom');
    activeTab.classList.add('bg-orange', 'text-white');
    activeTab.querySelector('i').classList.remove('text-muted');

    // Toggle Content
    document.getElementById('content-facilities').style.display = 'none';
    document.getElementById('content-quality').style.display = 'none';
    
    // Show selected
    const content = document.getElementById('content-' + tabName);
    content.style.display = 'block';
}

// Slider Initialization (JQuery)
$(document).ready(function(){
    // Industry Slider
    if($('.industry-slider').length) {
        $('.industry-slider').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3000,
            dots: false,
            arrows: true,
            prevArrow: $('#prevBtn'),
            nextArrow: $('#nextBtn'),
            responsive: [
                { breakpoint: 992, settings: { slidesToShow: 2 } },
                { breakpoint: 576, settings: { slidesToShow: 1 } }
            ]
        });
    }

    // Number Counter Logic
    let counterStarted = false;
    $(window).on('scroll', function() {
        // Simple check to prevent error if .about-us-banner doesn't exist
        if ($('.about-us-banner').length) {
            const bannerTop = $('.about-us-banner').offset().top;
            const windowHeight = $(window).height();
            const scrollTop = $(window).scrollTop();

            if (!counterStarted && scrollTop + windowHeight > bannerTop + 100) {
                $('.counter').each(function() {
                    const $this = $(this);
                    const target = parseInt($this.attr('data-target'));
                    $({ countNum: 0 }).animate(
                        { countNum: target },
                        {
                            duration: 2000,
                            easing: 'swing',
                            step: function() { $this.text(Math.floor(this.countNum)); },
                            complete: function() { $this.text(this.countNum); }
                        }
                    );
                });
                counterStarted = true;
            }
        }
    });
});
