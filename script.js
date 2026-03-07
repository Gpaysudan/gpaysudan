document.addEventListener('DOMContentLoaded', () => {
    
    const revealElements = document.querySelectorAll('.pay-card, .test-card, .stat-item, .screen-item');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                const statHeader = entry.target.querySelector('h3');
                if (entry.target.classList.contains('stat-item') && statHeader) {
                    animateValue(statHeader);
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        // بدلاً من إخفائه هنا، نعتمد على الفئة الموجودة في CSS
        el.classList.add('reveal-hidden');
        observer.observe(el);
    });

    // دالة العداد المنقحة
    function animateValue(obj) {
        const originalText = obj.innerText;
        const targetValue = parseInt(originalText.replace(/\D/g, ''));
        if (isNaN(targetValue)) return;

        const prefix = originalText.match(/^[^\d]+/)?.[0] || '';
        const suffix = originalText.match(/[^\d]+$/)?.[0] || '';
        
        let startTimestamp = null;
        const duration = 2000;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * targetValue);
            
            obj.innerHTML = `${prefix}${currentValue.toLocaleString()}${suffix}`;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = originalText;
            }
        };
        window.requestAnimationFrame(step);
    }

    // تفاعل الأزرار
    document.querySelectorAll('.btn-main, .icon-link, .btn-download-nav').forEach(btn => {
        btn.style.transition = "transform 0.1s ease";
        btn.addEventListener('mousedown', () => btn.style.transform = "scale(0.95)");
        btn.addEventListener('mouseup', () => btn.style.transform = "scale(1)");
        btn.addEventListener('mouseleave', () => btn.style.transform = "scale(1)");
    });
});