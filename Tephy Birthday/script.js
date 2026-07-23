const music = document.getElementById('bg-music');
document.addEventListener('DOMContentLoaded', () => {
  const music = document.getElementById('bg-music');
  const beginBtn = document.getElementById('begin-btn');
  const continueBtn2 = document.getElementById('continue-btn-2');
  
 // --- PAGE 1 LOGIC ---
const page1Content = document.querySelector('#page1 .content');
if (page1Content) {
  const h1 = page1Content.querySelector('h1');
  const p = page1Content.querySelector('p');
  const btn = page1Content.querySelector('.btn');
  
  // Initial hidden state
  h1.style.opacity = '0';
  h1.style.transform = 'translateY(20px)';
  p.style.opacity = '0';
  p.style.transform = 'translateY(20px)';
  
  // Sequential fade-in animation
  setTimeout(() => {
    h1.style.transition = 'opacity 1s ease, transform 1s ease';
    h1.style.opacity = '1';
    h1.style.transform = 'translateY(0)';
  }, 300);
  
  setTimeout(() => {
    p.style.transition = 'opacity 1s ease, transform 1s ease';
    p.style.opacity = '1';
    p.style.transform = 'translateY(0)';
  }, 800);
  
  // Button click handler
  const beginBtn = document.getElementById('begin-btn');
  if (beginBtn) {
    beginBtn.addEventListener('click', () => {
      // Start music
      if (music) {
        music.volume = 0.4;
        music.play().catch(e => console.log("Music blocked:", e));
      }
      
      // Navigate to Page 2
      document.getElementById('page1').classList.remove('active');
      setTimeout(() => {
        const p2 = document.getElementById('page2');
        if (p2) p2.classList.add('active');
      }, 1000);
    });
  }
}

  // --- PAGE 2 LOGIC ---
  const page2Content = document.querySelector('#page2 .content');
  if (page2Content) {
    const texts = page2Content.querySelectorAll('.fade-text');
    const btn2 = page2Content.querySelector('#continue-btn-2');
    const animatePage2 = () => {
    texts.forEach(t => { t.style.transition = 'opacity 1.3s ease, transform 1.3s ease'; t.style.opacity = '0'; t.style.transform = 'translateY(20px)'; });
      if(btn2) { btn2.style.opacity = '0'; btn2.style.transform = 'scale(0.8)'; }
  setTimeout(() => { texts[0].style.opacity = '1'; texts[0].style.transform = 'translateY(0)'; }, 700);
  setTimeout(() => { texts[1].style.opacity = '1'; texts[1].style.transform = 'translateY(0)'; }, 2000);
  setTimeout(() => { texts[2].style.opacity = '1'; texts[2].style.transform = 'translateY(0)'; }, 3300);
  setTimeout(() => { if(btn2) { btn2.style.opacity = '1'; btn2.style.transform = 'scale(1)'; } }, 4000);
};
    const observer2 = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class' && page2Content.parentElement.classList.contains('active')) {
          animatePage2();
          observer2.disconnect();
        }
      });
    });
    observer2.observe(document.getElementById('page2'), { attributes: true });
  }

  // --- PAGE 3 LOGIC (Little Stars) ---
  const page3Content = document.querySelector('#page3 .content');
  if (page3Content) {
    const stars = page3Content.querySelectorAll('.star-item');
    const hint = page3Content.querySelector('.continue-hint');
    let starsClicked = 0;
    const totalStars = stars.length;

    // Animate Page 3 Entry
    const animatePage3 = () => {
      const title = page3Content.querySelector('h1');
      title.style.opacity = '0';
      title.style.transform = 'translateY(20px)';
      setTimeout(() => {
        title.style.transition = 'opacity 1s ease, transform 1s ease';
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
      }, 500);

      // Show stars one by one
      stars.forEach((star, index) => {
        star.style.opacity = '0';
        star.style.transform = 'scale(0.5)';
        setTimeout(() => {
          star.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          star.style.opacity = '1';
          star.style.transform = 'scale(1)';
        }, 1000 + (index * 400));
      });
    };

    const observer3 = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class' && page3Content.parentElement.classList.contains('active')) {
          animatePage3();
          observer3.disconnect();
        }
      });
    });
    observer3.observe(document.getElementById('page3'), { attributes: true });

    // Handle Star Clicks
    stars.forEach(star => {
  star.addEventListener('click', (e) => {
    // Prevent double-clicking the same star
    if (star.classList.contains('clicked')) return;

    const message = star.querySelector('.star-message');
    if (message) {
      // Ensure it's visible and not hidden by 'hidden' class
      message.style.display = 'block'; 
      message.classList.remove('hidden');
      
      // Small delay to allow display:block to apply before opacity transition
      setTimeout(() => {
        message.classList.add('show');
        star.classList.add('clicked'); // Mark as clicked
      }, 10);

      starsClicked++;
      
      if (starsClicked === totalStars) {
        setTimeout(() => {
          hint.classList.remove('hidden');
          setTimeout(() => hint.classList.add('show'), 10);
        }, 500);
      }
    }
  });
});

    // Navigate to Page 5 on any click after all stars are done
    if (hint) {
      page3Content.addEventListener('click', (e) => {
        if (e.target.closest('.star-item')) return;

        if (starsClicked === totalStars) {
          document.getElementById('page3').classList.remove('active');
          setTimeout(() => {
            const p5 = document.getElementById('page5');
            if (p5) p5.classList.add('active');
          }, 1000);
        }
      });
    }
  }

  // --- NAVIGATION HANDLERS ---
  if (beginBtn) {
    beginBtn.addEventListener('click', () => {
      if (music) { music.volume = 0.4; music.play().catch(e => console.log("Music blocked:", e)); }
      document.getElementById('page1').classList.remove('active');
      setTimeout(() => {
        const p2 = document.getElementById('page2');
        if(p2) p2.classList.add('active');
      }, 1000);
    });
  }

  if (continueBtn2) {
    continueBtn2.addEventListener('click', () => {
      document.getElementById('page2').classList.remove('active');
      setTimeout(() => {
        const p3 = document.getElementById('page3');
        if(p3) p3.classList.add('active');
      }, 1000);
    });
  }
});
// --- PAGE 5 LOGIC (Happy Birthday & Gift Box) ---
const page5Content = document.querySelector('#page5 .content');
if (page5Content) {
  const birthdayGreeting = page5Content.querySelector('.birthday-greeting');
  const giftSubtext = page5Content.querySelector('.gift-subtext');
  const tapHint = page5Content.querySelector('#gift-tap-hint');
  let giftOpened = false;

  const animatePage5 = () => {
    // Reset and animate elements
    birthdayGreeting.style.opacity = '0';
    birthdayGreeting.style.transform = 'translateY(20px)';
    giftSubtext.style.opacity = '0';
    giftSubtext.style.transform = 'translateY(20px)';

    // Fade in sequence
    setTimeout(() => {
      birthdayGreeting.style.transition = 'opacity 1s ease, transform 1s ease';
      birthdayGreeting.style.opacity = '1';
      birthdayGreeting.style.transform = 'translateY(0)';
    }, 300);

    setTimeout(() => {
      giftSubtext.style.transition = 'opacity 1s ease, transform 1s ease';
      giftSubtext.style.opacity = '1';
      giftSubtext.style.transform = 'translateY(0)';
    }, 1000);

    setTimeout(() => {
      tapHint.classList.add('show');
    }, 2000);
  };

  const observer5 = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class' && page5Content.parentElement.classList.contains('active')) {
        animatePage5();
        observer5.disconnect();
      }
    });
  });
  observer5.observe(document.getElementById('page5'), { attributes: true });

  // Handle gift box opening (tap the box itself)
  document.getElementById('page5').addEventListener('click', () => {
  if (giftOpened) return;
  giftOpened = true;

  // star burst
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ffd700', '#d1a2b2', '#ffffff'],
    shapes: ['star']
  });

  tapHint.classList.remove('show');

  setTimeout(() => {
    document.getElementById('page5').classList.remove('active');
    setTimeout(() => {
      const p6 = document.getElementById('page6');
      if (p6) p6.classList.add('active');
    }, 1000);
  }, 800);
});
}
  // --- PAGE 6 LOGIC (Gift Cards) ---
const page6Content = document.querySelector('#page6 .content');
if (page6Content) {
  const cards = page6Content.querySelectorAll('.flip-card');
  const hint = page6Content.querySelector('.cards-hint');
  const continueBtn = page6Content.querySelector('#continue-to-cake');
  let cardsFlipped = 0;
  const totalCards = cards.length;

  const animatePage6 = () => {
    const title = page6Content.querySelector('.cards-title');
    title.style.opacity = '0';
    title.style.transform = 'translateY(20px)';
    
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 500 + (index * 200));
    });

    setTimeout(() => {
      title.style.transition = 'opacity 1s ease, transform 1s ease';
      title.style.opacity = '1';
      title.style.transform = 'translateY(0)';
    }, 300);
  };

  const observer6 = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class' && page6Content.parentElement.classList.contains('active')) {
        animatePage6();
        observer6.disconnect();
      }
    });
  });
  observer6.observe(document.getElementById('page6'), { attributes: true });

  // Handle card flips
  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      if (!card.classList.contains('flipped')) {
        card.classList.add('flipped');
        cardsFlipped++;
        
      // Duck background music for any audio card (song or voice memo)
const audioCardMap = { '1': 'song-1', '3': 'memory-3' };
if (audioCardMap[card.dataset.id]) {
  const cardAudio = document.getElementById(audioCardMap[card.dataset.id]);
  if (cardAudio && music) {
    // Duck the background music down instead of stopping it entirely
    music.volume = 0.05;

    // Auto-play since this click IS the user gesture
    cardAudio.play().catch(e => console.log("Audio autoplay blocked:", e));

    // When she pauses it manually, bring background music back up
    cardAudio.addEventListener('pause', () => {
      music.volume = 0.4;
    });

    // When the audio plays again after pausing, duck again
    cardAudio.addEventListener('play', () => {
      music.volume = 0.05;
    });

    // When it finishes naturally, restore background volume
    cardAudio.addEventListener('ended', () => {
      music.volume = 0.4;
    });
  }
}

        // Show hint after first flip
        if (cardsFlipped === 1 && hint) {
          hint.classList.remove('hidden');
          setTimeout(() => hint.classList.add('show'), 10);
        }
        
        // Show continue button once all cards are flipped
        if (cardsFlipped === totalCards && continueBtn) {
          continueBtn.style.opacity = '0';
          setTimeout(() => {
            continueBtn.style.transition = 'opacity 0.5s ease';
            continueBtn.style.opacity = '1';
          }, 500);
        }
      }
    });
  });

  // Navigate to Page 7
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      document.getElementById('page6').classList.remove('active');
      setTimeout(() => {
        const p7 = document.getElementById('page7');
        if (p7) p7.classList.add('active');
      }, 1000);
    });
  }
}
// --- PAGE 7 LOGIC (Cake & Candle) ---
const page7Content = document.querySelector('#page7 .content');
if (page7Content) {
  const cakeTitle = document.querySelector('#page7 .cake-title'); 
  const pageFlame = document.getElementById('page7-flame');
  const candleTapHint = document.getElementById('candle-tap-hint');
  const continueBtn = page7Content.querySelector('#continue-to-ending');
  let candleExtinguished = false;

  const animatePage7 = () => {
    cakeTitle.style.opacity = '0';
    cakeTitle.style.transform = 'translateY(20px)';
    continueBtn.style.opacity = '0';
    continueBtn.style.transform = 'scale(0.8)';

    setTimeout(() => {
      cakeTitle.style.transition = 'opacity 1s ease, transform 1s ease';
      cakeTitle.style.opacity = '1';
      cakeTitle.style.transform = 'translateY(0)';
    }, 300);

    setTimeout(() => {
      candleTapHint.classList.add('show');
    }, 1500);
  };

  const observer7 = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class' && page7Content.parentElement.classList.contains('active')) {
        animatePage7();
        observer7.disconnect();
      }
    });
  });
  observer7.observe(document.getElementById('page7'), { attributes: true });

  // Handle flame tap
  if (pageFlame) {
    pageFlame.addEventListener('click', () => {
      if (candleExtinguished) return;
      candleExtinguished = true;

      pageFlame.classList.add('extinguished');
      candleTapHint.classList.remove('show');

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#ffd700', '#d1a2b2', '#ffffff'],
        shapes: ['star']
      });

      setTimeout(() => {
        continueBtn.style.transition = 'opacity 1s ease, transform 1s ease';
        continueBtn.style.opacity = '1';
        continueBtn.style.transform = 'scale(1)';
      }, 1200);
    });
  }

  // Navigate to Page 8
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      document.getElementById('page7').classList.remove('active');
      setTimeout(() => {
        const p8 = document.getElementById('page8');
        if (p8) p8.classList.add('active');
      }, 1000);
    });
  }
}
// --- PAGE 8 LOGIC (Final Letter) ---
const page8Content = document.querySelector('#page8 .content');
if (page8Content) {
  const finalGreeting = page8Content.querySelector('.final-greeting');
  const letterPaper = page8Content.querySelector('.letter-paper');
  const heartIcon = page8Content.querySelector('.heart-icon');
  const restartBtn = page8Content.querySelector('#restart-btn');

  if (finalGreeting && letterPaper && heartIcon) {
    const animatePage8 = () => {
      // Reset elements
      finalGreeting.style.opacity = '0';
      finalGreeting.style.transform = 'translateY(20px)';
      letterPaper.style.opacity = '0';
      letterPaper.style.transform = 'translateY(30px) rotateY(-10deg)';
      heartIcon.style.opacity = '0';
      heartIcon.style.transform = 'scale(0.5)';
      
      // Animate in sequence
      setTimeout(() => {
        finalGreeting.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
        finalGreeting.style.opacity = '1';
        finalGreeting.style.transform = 'translateY(0)';
      }, 300);

      setTimeout(() => {
        letterPaper.style.transition = 'opacity 1.5s ease, transform 1.5s ease';
        letterPaper.style.opacity = '1';
        letterPaper.style.transform = 'translateY(0) rotateY(0deg)';
      }, 1000);

      setTimeout(() => {
        heartIcon.style.transition = 'opacity 1s ease, transform 1s ease';
        heartIcon.style.opacity = '1';
        heartIcon.style.transform = 'scale(1)';
      }, 2000);

      setTimeout(() => {
        if (restartBtn) {
          restartBtn.style.transition = 'opacity 1s ease, transform 1s ease';
          restartBtn.style.opacity = '1';
          restartBtn.style.transform = 'scale(1)';
        }
      }, 2500);
    };

    const observer8 = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class' && page8Content.parentElement.classList.contains('active')) {
          animatePage8();
          observer8.disconnect();
        }
      });
    });
    observer8.observe(document.getElementById('page8'), { attributes: true });

    // Restart the journey
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        // Stop music if playing
        if (music) {
          music.pause();
          music.currentTime = 0;
        }
        
        // Reset all pages
        document.querySelectorAll('.page').forEach(page => {
          page.classList.remove('active');
        });
        
        // Reset Page 1
        const p1 = document.getElementById('page1');
        if (p1) {
          p1.classList.add('active');
          
          // Reset animations for Page 1
          const page1Content = p1.querySelector('.content');
          if (page1Content) {
            const h1 = page1Content.querySelector('h1');
            const p = page1Content.querySelector('p');
            const btn = page1Content.querySelector('.btn');
            
            h1.style.opacity = '0';
            h1.style.transform = 'translateY(20px)';
            p.style.opacity = '0';
            p.style.transform = 'translateY(20px)';
            btn.style.opacity = '0';
            btn.style.transform = 'scale(0.8)';
            
            // Re-trigger Page 1 animation
            setTimeout(() => { 
              h1.style.transition = 'opacity 1s ease, transform 1s ease'; 
              h1.style.opacity = '1'; 
              h1.style.transform = 'translateY(0)'; 
            }, 300);
            setTimeout(() => { 
              p.style.transition = 'opacity 1s ease, transform 1s ease'; 
              p.style.opacity = '1'; 
              p.style.transform = 'translateY(0)'; 
            }, 800);
            setTimeout(() => { 
              btn.style.transition = 'opacity 1s ease, transform 1s ease'; 
              btn.style.opacity = '1'; 
              btn.style.transform = 'scale(1)'; 
            }, 1500);
          }
        }
      });
    }
  }
}
