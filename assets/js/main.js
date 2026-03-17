// Taurine Documentation - Main JavaScript

// Mobile menu toggle (navbar)
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Mobile sidebar toggle
function toggleSidebar() {
    const sidebar = document.querySelector('.docs-sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }
}

// Copy to clipboard
function copyToClipboard(button) {
    const code = button.previousElementSibling.textContent;
    navigator.clipboard.writeText(code).then(() => {
        const originalText = button.textContent;
        button.textContent = '✓';
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    });
}

// Tab functionality
document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                
                // Remove active class from all tabs
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Hide all tab panes
                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('active');
                });
                
                // Show selected tab pane
                const targetPane = document.getElementById(tabId);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }
    
    // Active sidebar link
    highlightActiveSidebar();
    
    // Add mobile sidebar toggle button if on docs page
    addMobileSidebarToggle();
});

// Highlight active sidebar link based on current page
function highlightActiveSidebar() {
    const currentPath = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('.sidebar-links a');
    
    sidebarLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath || 
            linkHref === currentPath.split('/').pop() ||
            linkHref + '.html' === currentPath.split('/').pop()) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile sidebar after clicking anchor
                const sidebar = document.querySelector('.docs-sidebar');
                if (sidebar && sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        }
    });
});

// Add mobile sidebar toggle button
function addMobileSidebarToggle() {
    const docsLayout = document.querySelector('.docs-layout');
    if (!docsLayout) return;
    
    // Check if we're on a mobile device
    if (window.innerWidth <= 768) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mobile-sidebar-toggle';
        toggleBtn.innerHTML = '☰ Меню';
        toggleBtn.onclick = toggleSidebar;
        
        const docsContent = document.querySelector('.docs-content');
        if (docsContent) {
            docsContent.insertBefore(toggleBtn, docsContent.firstChild);
        }
    }
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    const sidebar = document.querySelector('.docs-sidebar');
    const toggleBtn = document.querySelector('.mobile-sidebar-toggle');
    
    if (sidebar && sidebar.classList.contains('active') && 
        !sidebar.contains(e.target) && 
        !toggleBtn?.contains(e.target)) {
        sidebar.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const sidebar = document.querySelector('.docs-sidebar');
        const toggleBtn = document.querySelector('.mobile-sidebar-toggle');
        
        if (window.innerWidth > 768) {
            if (sidebar) sidebar.style.display = '';
            if (toggleBtn) toggleBtn.remove();
        } else {
            addMobileSidebarToggle();
        }
    }, 250);
});
