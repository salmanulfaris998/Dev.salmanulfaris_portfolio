// Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.9)';
                navbar.style.boxShadow = 'none';
            }
        });

        // Parallax effect for floating elements
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-element');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.2);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Add typing effect to the name
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }

        // Initialize typing effect after page load
        window.addEventListener('load', function() {
            setTimeout(() => {
                const nameElement = document.querySelector('.name');
                const originalText = nameElement.textContent;
                typeWriter(nameElement, originalText, 150);
            }, 1000);
        });

        // Add mouse movement parallax effect
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const profileContainer = document.querySelector('.profile-container');
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            
            profileContainer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        // Add intersection observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);

        // Observe animated elements
        document.querySelectorAll('.content-left, .content-right').forEach(el => {
            observer.observe(el);
        });

        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navLinks = document.getElementById('navLinks');

        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
        });

        // Carousel functionality for multiple carousels
        document.querySelectorAll('.carousel-container').forEach(carousel => {
            const track = carousel.querySelector('.carousel-track');
            if (!track) return;

            const images = Array.from(track.children);
            let currentIndex = 0;
            let isDragging = false;
            let startPos = 0;
            let currentDrag = 0;

            function updateCarousel() {
                track.style.transition = 'transform 0.4s ease-out';
                track.style.transform = `translateX(-${currentIndex * 100}%)`;
            }

            function dragStart(e) {
                isDragging = true;
                startPos = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
                track.style.transition = 'none';
                track.style.cursor = 'grabbing';
            }

            function dragging(e) {
                if (isDragging) {
                    e.preventDefault();
                    const currentPosition = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
                    currentDrag = currentPosition - startPos;
                    const baseTranslate = -currentIndex * 100;
                    const dragTranslate = (currentDrag / carousel.offsetWidth) * 100;
                    track.style.transform = `translateX(${baseTranslate + dragTranslate}%)`;
                }
            }

            function dragEnd() {
                if (!isDragging) return;
                isDragging = false;
                track.style.cursor = 'grab';
                
                const swipeThreshold = carousel.offsetWidth * 0.2;

                if (currentDrag < -swipeThreshold && currentIndex < images.length - 1) {
                    currentIndex++;
                }
                if (currentDrag > swipeThreshold && currentIndex > 0) {
                    currentIndex--;
                }

                updateCarousel();
                currentDrag = 0;
            }

            track.addEventListener('mousedown', dragStart);
            track.addEventListener('touchstart', dragStart, { passive: true });
            
            track.addEventListener('mousemove', dragging);
            track.addEventListener('touchmove', dragging, { passive: false });

            window.addEventListener('mouseup', dragEnd);
            track.addEventListener('mouseleave', dragEnd);
            track.addEventListener('touchend', dragEnd);
            
            images.forEach(img => {
                img.addEventListener('dragstart', (e) => e.preventDefault());
            });

            updateCarousel();
        });

        document.addEventListener('DOMContentLoaded', () => {
            const navLinks = document.querySelectorAll('.nav-animate');
            navLinks.forEach(link => {
                const text = link.textContent;
                link.innerHTML = '';
                for (let i = 0; i < text.length; i++) {
                    const span = document.createElement('span');
                    span.textContent = text[i];
                    span.classList.add('nav-letter');
                    link.appendChild(span);
                }
            });

            let current = 0;
            let letter = 0;
            const allLinks = Array.from(document.querySelectorAll('.nav-animate'));

            function animateShadow() {
                // Remove shadow from all letters
                allLinks.forEach(link => {
                    link.querySelectorAll('.nav-letter').forEach(span => {
                        span.style.textShadow = '';
                    });
                });

                // Add shadow to the current letter
                const spans = allLinks[current].querySelectorAll('.nav-letter');
                if (spans[letter]) {
                    spans[letter].style.textShadow = '0 0 12px #fb0d0d, 0 0 24px #fb0d0d';
                }

                letter++;
                if (letter >= spans.length) {
                    letter = 0;
                    current = (current + 1) % allLinks.length;
                }
                setTimeout(animateShadow, 120);
            }

            animateShadow();

            // Letter-by-letter moving red shadow for headings
            animateHeadingsShadow();
        });

        // Letter-by-letter moving red shadow for headings
        function animateHeadingsShadow() {
            const headings = document.querySelectorAll('.animated-heading');
            let currentHeading = 0;
            let currentLetter = 0;
            let prevSpan = null;

            function step() {
                // Remove shadow from all letters in all headings
                headings.forEach(h => {
                    h.querySelectorAll('.animated-letter').forEach(span => {
                        span.style.textShadow = '';
                    });
                });
                // Add shadow to current letter
                const spans = headings[currentHeading].querySelectorAll('.animated-letter');
                if (spans.length > 0 && spans[currentLetter]) {
                    spans[currentLetter].style.textShadow = '0 0 8pxrgba(251, 13, 13, 0.31), 0 0 16pxrgba(251, 13, 13, 0.35), 0 0 32pxrgba(255, 0, 0, 0.33), 0 0 48pxrgba(255, 0, 0, 0.45)';
                }
                currentLetter++;
                if (currentLetter >= spans.length) {
                    currentLetter = 0;
                    currentHeading = (currentHeading + 1) % headings.length;
                }
                setTimeout(step, 120);
            }
            step();
        } 