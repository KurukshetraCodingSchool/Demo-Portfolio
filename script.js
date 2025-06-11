const counters = [
    { selector: ".experience", end: 3 },
    { selector: ".projects", end: 20 },
    { selector: ".students", end: 150 }
  ];

  counters.forEach(counter => {
    let obj = { val: 0 };
    gsap.to(obj, {
      val: counter.end,
      duration: 2,
      ease: "power1.out",
      onUpdate: () => {
        const el = document.querySelector(counter.selector);
        el.textContent = Math.floor(obj.val);
      }
    });
  });