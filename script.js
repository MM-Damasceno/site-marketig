document.addEventListener('DOMContentLoaded', function() {
  // Botão de voltar ao topo
  const btnTopo = document.getElementById('btnTopo');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      btnTopo.style.display = 'block';
    } else {
      btnTopo.style.display = 'none';
    }
  });
  
  btnTopo.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Carrossel de Fundadores
  const founders = [
    {
      name: "Ian Borges - CEO",
      desc: "Especialista em tráfego pago com 10 anos de experiência no mercado digital.",
      img: "img/Fundadores/Thiago.png"
    },
    {
      name: "Thiago Ribeiro- Puta",
      desc: "Designer premiada com especialização em branding e identidade visual.",
      img: "img/Fundadores/Maria.png"
    },
    {
      name: "Gustavo  - Head de Mídia",
      desc: "Expert em estratégias de mídia social e growth hacking.",
      img: "img/Fundadores/Carlos.png"
    },
    {
      name: "Mateus Damasceno - Developer",
      desc: ""
    }
  ];

  let currentFounder = 0;
  const founderImg = document.getElementById('founderImg');
  const founderName = document.getElementById('founderName');
  const founderDesc = document.getElementById('founderDesc');
  const prevFounder = document.getElementById('prevFounder');
  const nextFounder = document.getElementById('nextFounder');

  function updateFounder(index) {
    founderImg.src = founders[index].img;
    founderName.textContent = founders[index].name;
    founderDesc.textContent = founders[index].desc;
    founderImg.classList.add('fade-in');
    
    setTimeout(() => {
      founderImg.classList.remove('fade-in');
    }, 500);
  }

  prevFounder.addEventListener('click', function() {
    currentFounder = (currentFounder - 1 + founders.length) % founders.length;
    updateFounder(currentFounder);
  });

  nextFounder.addEventListener('click', function() {
    currentFounder = (currentFounder + 1) % founders.length;
    updateFounder(currentFounder);
  });

  // Menu mobile (para futura implementação)
  const menuToggle = document.createElement('div');
  menuToggle.className = 'menu-toggle';
  menuToggle.innerHTML = '<span></span><span></span><span></span>';
  const header = document.querySelector('header');
  
  // Adiciona apenas se for mobile
  function setupMobileMenu() {
    if (window.innerWidth <= 768) {
      header.insertBefore(menuToggle, header.firstChild);
      
      const nav = document.querySelector('nav');
      menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
      });
      
      // Fecha o menu ao clicar em um link
      document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('active');
          menuToggle.classList.remove('active');
        });
      });
    } else {
      if (document.querySelector('.menu-toggle')) {
        header.removeChild(menuToggle);
      }
    }
  }
  
  // Verifica no carregamento e no redimensionamento
  setupMobileMenu();
  window.addEventListener('resize', setupMobileMenu);

  // Efeito de digitação no hero (opcional)
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < originalText.length) {
        heroTitle.textContent += originalText.charAt(i);
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, 50);
  }

  // Animação de scroll para as seções
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Observador de elementos para animações
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.service, .portfolio-item, .founder-profile');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.classList.add('animated');
      }
    });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Executa uma vez no carregamento

  // Contador de estatísticas (opcional)
  
  
  // Insere antes do rodapé
  const footer = document.querySelector('footer');
  footer.parentNode.insertBefore(statsSection, footer);
  
  // Animação do contador
  function animateCounter() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;
      
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(animateCounter, 1);
      } else {
        counter.innerText = target;
      }
    });
  }
  
  // Observador para a seção de estatísticas
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(statsSection);
});