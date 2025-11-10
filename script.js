 const canvas = document.getElementById('rainCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drops = [];
    const dropCount = 250;

    class Drop {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.length = Math.random() * 20 + 10;
        this.speed = Math.random() * 4 + 4;
        this.opacity = Math.random() * 0.3 + 0.2;
      }
      update() {
        this.y += this.speed;
        if (this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${this.opacity})`;
        ctx.lineWidth = 1;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        ctx.stroke();
      }
    }

    for (let i = 0; i < dropCount; i++) {
      drops.push(new Drop());
    }

    function drawScene() {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(canvas.width - 80, 80, 30, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();

      drops.forEach(drop => {
        drop.update();
        drop.draw();
      });

      requestAnimationFrame(drawScene);
    }

    drawScene();
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    // Notes box logic
    const notesBox = document.getElementById('notesBox');
    notesBox.setAttribute('contenteditable', 'false');

    notesBox.addEventListener('dblclick', () => {
      notesBox.classList.add('editing', 'clicked');
      notesBox.setAttribute('contenteditable', 'true');
      notesBox.focus();

      setTimeout(() => {
        notesBox.classList.remove('clicked');
      }, 150);
    });

    notesBox.addEventListener('blur', () => {
      notesBox.classList.remove('editing');
      notesBox.setAttribute('contenteditable', 'false');
    });