// ==============================================
// MAGICAL MOMENTS PHOTOGRAPHY - MAIN SCRIPT
// SIMPLIFIED VERSION - GUARANTEED TO WORK
// ==============================================

console.log('🎨 Script starting...');

// ==============================================
// 1. REMOVE PRELOADER IMMEDIATELY
// ==============================================
setTimeout(() => {
    document.body.classList.add('loaded');
    console.log('✅ Preloader removed');
}, 1000);

// ==============================================
// 2. INITIALIZE WHEN DOM IS READY
// ==============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM Ready - Starting initialization');
    
    initMobileMenu();
    initSmoothScroll();
    initNavbar();
    initPortfolioFilter();
    initLightbox();
    initTiltEffect();
    initScrollAnimations();
    initCounterAnimation();
    initTestimonialSlider();
    initContactForm();
    initScrollToTop();
    initFAQ();
    
    console.log('✅ All features initialized');
});

// ==============================================
// MOBILE MENU
// ==============================================
function initMobileMenu() {
    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!burger || !navMenu) return;

    burger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        burger.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            burger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    console.log('✅ Mobile menu ready');
}

// ==============================================
// SMOOTH SCROLLING
// ==============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    console.log('✅ Smooth scroll ready');
}

// ==============================================
// NAVBAR SCROLL EFFECT
// ==============================================
function initNavbar() {
    const nav = document.querySelector('.nav-container');
    if (!nav) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    console.log('✅ Navbar effects ready');
}

// ==============================================
// PORTFOLIO FILTER
// ==============================================
function initPortfolioFilter() {
    const grid = document.querySelector('.grid');
    const filters = document.querySelectorAll('.filter-btn');
    
    if (!grid || !filters.length) {
        console.log('⚠️ Grid or filters not found');
        return;
    }

    // Check if Isotope is available
    if (typeof Isotope === 'undefined') {
        console.log('⚠️ Isotope not loaded - using simple filtering');
        
        // Simple filter without Isotope
        filters.forEach(function(filter) {
            filter.addEventListener('click', function() {
                filters.forEach(function(btn) {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                const items = document.querySelectorAll('.grid-item');
                
                items.forEach(function(item) {
                    if (filterValue === '*' || item.classList.contains(filterValue.replace('.', ''))) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
        
        console.log('✅ Simple filter ready');
        return;
    }

    // Use Isotope if available
    const iso = new Isotope(grid, {
        itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
            columnWidth: '.grid-item'
        }
    });

    setTimeout(function() {
        iso.layout();
    }, 500);

    filters.forEach(function(filter) {
        filter.addEventListener('click', function() {
            filters.forEach(function(btn) {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            iso.arrange({ filter: filterValue });
        });
    });

    console.log('✅ Isotope filter ready');
}

// ==============================================
// LIGHTBOX
// ==============================================
function initLightbox() {
    if (typeof GLightbox === 'undefined') {
        console.log('⚠️ GLightbox not loaded');
        return;
    }

    const lightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        openEffect: 'fade',
        closeEffect: 'fade'
    });

    console.log('✅ Lightbox ready');
}

// ==============================================
// TILT EFFECT
// ==============================================
function initTiltEffect() {
    if (typeof VanillaTilt === 'undefined') {
        console.log('⚠️ VanillaTilt not loaded');
        return;
    }

    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    if (tiltElements.length > 0) {
        VanillaTilt.init(tiltElements, {
            max: 8,
            speed: 400,
            glare: true,
            'max-glare': 0.2
        });
        console.log('✅ Tilt effect ready');
    }
}

// ==============================================
// SCROLL ANIMATIONS (AOS)
// ==============================================
function initScrollAnimations() {
    if (typeof AOS === 'undefined') {
        console.log('⚠️ AOS not loaded');
        return;
    }

    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    console.log('✅ Scroll animations ready');
}

// ==============================================
// COUNTER ANIMATION
// ==============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    const animateCounter = function(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = function() {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        updateCounter();
    };

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(function(counter) {
        counterObserver.observe(counter);
    });

    console.log('✅ Counters ready');
}

// ==============================================
// TESTIMONIAL SLIDER
// ==============================================
function initTestimonialSlider() {
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.nav-prev');
    const nextBtn = document.querySelector('.nav-next');
    
    if (!cards.length || !prevBtn || !nextBtn) return;

    let currentIndex = 0;

    const showCard = function(index) {
        cards.forEach(function(card, i) {
            card.classList.remove('active');
            if (i === index) {
                card.classList.add('active');
            }
        });
    };

    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        showCard(currentIndex);
    });

    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % cards.length;
        showCard(currentIndex);
    });

    // Auto-play
    setInterval(function() {
        currentIndex = (currentIndex + 1) % cards.length;
        showCard(currentIndex);
    }, 5000);

    console.log('✅ Testimonial slider ready');
}

// ==============================================
// CONTACT FORM - SEND VIA WHATSAPP
// ==============================================
function initContactForm() {
    const form = document.querySelector('.contact-form');
    const messageDiv = document.querySelector('.form-message');
    
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        // Get service name
        const serviceNames = {
            'wedding': 'Wedding Photography',
            'portrait': 'Portrait Session',
            'event': 'Event Coverage',
            'family': 'Family & Maternity'
        };
        const serviceName = serviceNames[service] || service;
        
        // Construct WhatsApp message
        let whatsappMessage = `*New Booking Request*%0A%0A`;
        whatsappMessage += `*Name:* ${name}%0A`;
        whatsappMessage += `*Email:* ${email}%0A`;
        if (phone) {
            whatsappMessage += `*Phone:* ${phone}%0A`;
        }
        whatsappMessage += `*Service:* ${serviceName}%0A%0A`;
        whatsappMessage += `*Message:*%0A${message}`;
        
        // WhatsApp number (without + or spaces)
        const whatsappNumber = '254713541293';
        
        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappURL, '_blank');
        
        // Show success message
        if (messageDiv) {
            messageDiv.className = 'form-message success';
            messageDiv.textContent = 'Redirecting to WhatsApp... Please send the message to complete your booking request.';
            setTimeout(function() {
                messageDiv.className = 'form-message';
            }, 5000);
        }
        
        // Reset form after a short delay
        setTimeout(function() {
            form.reset();
        }, 1000);
    });

    console.log('✅ Contact form ready (WhatsApp integration)');
}

// ==============================================
// SCROLL TO TOP BUTTON
// ==============================================
function initScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-top');
    if (!scrollBtn) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    console.log('✅ Scroll to top ready');
}

// ==============================================
// CUSTOM CURSOR (OPTIONAL)
// ==============================================
window.addEventListener('load', function() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        return;
    }

    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (!cursorDot || !cursorOutline) return;

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    const animateCursor = function() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        requestAnimationFrame(animateCursor);
    };
    
    animateCursor();
    console.log('✅ Custom cursor ready');
});

console.log('🎉 All scripts loaded successfully!');


// ==============================================
// FAQ ACCORDION
// ==============================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;
    
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(function(otherItem) {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    console.log('✅ FAQ accordion ready');
}


// ==============================================
// LOAD MORE GALLERY IMAGES
// ==============================================
function initLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const hiddenItems = document.querySelectorAll('.grid-item.hidden');
    
    if (!loadMoreBtn || !hiddenItems.length) {
        // Hide button if no hidden items
        if (loadMoreBtn) {
            loadMoreBtn.parentElement.style.display = 'none';
        }
        return;
    }
    
    loadMoreBtn.addEventListener('click', function() {
        // Show all hidden items
        hiddenItems.forEach(function(item) {
            item.classList.remove('hidden');
        });
        
        // Re-layout Isotope if available
        const grid = document.querySelector('.grid');
        if (grid && typeof Isotope !== 'undefined') {
            const iso = Isotope.data(grid);
            if (iso) {
                setTimeout(function() {
                    iso.layout();
                }, 100);
            }
        }
        
        // Hide the load more button
        loadMoreBtn.parentElement.style.display = 'none';
        
        console.log('✅ Loaded all gallery images');
    });
    
    console.log('✅ Load more button ready');
}

// Initialize on load
window.addEventListener('load', function() {
    initLoadMore();
});


// ==============================================
// SHUFFLE GALLERY IMAGES
// ==============================================
function shuffleGallery() {
    const grid = document.querySelector('.grid');
    if (!grid) return;
    
    // Get all grid items
    const items = Array.from(grid.querySelectorAll('.grid-item'));
    
    if (items.length === 0) return;
    
    // Shuffle array using Fisher-Yates algorithm
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }
    
    // Clear the grid
    grid.innerHTML = '';
    
    // Append shuffled items back
    items.forEach(function(item) {
        grid.appendChild(item);
    });
    
    // Re-initialize Isotope if available
    if (typeof Isotope !== 'undefined') {
        setTimeout(function() {
            const iso = new Isotope(grid, {
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: { columnWidth: '.grid-item' }
            });
            
            // Re-attach filter functionality
            const filters = document.querySelectorAll('.filter-btn');
            filters.forEach(function(f) {
                f.addEventListener('click', function(e) {
                    filters.forEach(function(btn) {
                        btn.classList.remove('active');
                    });
                    e.target.classList.add('active');
                    const filterValue = e.target.getAttribute('data-filter');
                    iso.arrange({ filter: filterValue });
                });
            });
        }, 100);
    }
    
    console.log('✅ Gallery shuffled');
}

// Shuffle on page load
window.addEventListener('load', function() {
    shuffleGallery();
    
    // Add click handler for shuffle button
    const shuffleBtn = document.getElementById('shuffleBtn');
    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', function() {
            // Add animation effect
            this.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
            
            // Shuffle the gallery
            shuffleGallery();
            
            // Reset filter to "All Photos"
            const filters = document.querySelectorAll('.filter-btn');
            filters.forEach(function(btn) {
                btn.classList.remove('active');
                if (btn.getAttribute('data-filter') === '*') {
                    btn.classList.add('active');
                }
            });
        });
        console.log('✅ Shuffle button ready');
    }
});
