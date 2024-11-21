const pixelGrid = document.getElementById("pixel-grid");
const canvas = document.getElementById("image-canvas");
const ctx = canvas.getContext("2d");

const imageUrl = "./img.jpeg";

let screenWidth = window.innerWidth;
let maxImageWidth = screenWidth * 0.4;
let pixelSize = 40;

const questions = [
  { question: "What's my favorite animal?", answer: "Monkey", index: 0 },
  { question: "What's my middle name'?", answer: "Rita", index: 1 },
  { question: "In which city do I live?", answer: "Chengdu", index: 2 },
  {
    question:
      "Who's the cutest patootie in the whole wide world? (Answer format: intials)",
    answer: "AB",
    index: 3,
  },
];

let currentQuestionIndex = 0;
let passwordVerified = false;

const img = new Image();
img.onload = () => {
  createPixelGrid(img);
};
img.src = imageUrl;

const correctPassword = "naranjas";

window.onload = () => {
  const enteredPassword = prompt(
    "Please enter the password to access the hidden message:"
  );

  if (enteredPassword === correctPassword) {
    passwordVerified = true;
    alert(
      "Welcome boobeenoo! ❤️ Just needed to make sure it was really you first, hehe 😈. I want to share one of my favorite memories with you, but the image is blurry! The only way to make it clear is by answering a few questions. Click on the image to get a question, and the picture will start revealing itself as you answer correctly. Once it's clear, the hidden letter I've written you will appear."
    );
  } else {
    alert("Incorrect password. Access denied ⛔");
    document.body.innerHTML = `
    <div style="height: 100vh; display: flex; justify-content: center; align-items: center; text-align: center; background-color: #f2f2f2;">
      <h1>Access Denied ⛔</h1>
    </div>`;
  }
};

document.body.addEventListener("click", (event) => {
  if (!passwordVerified) {
    alert("You must enter the correct password to access the content.");
    return;
  }

  if (event.target === canvas || event.target.closest("#pixel-grid")) {
    askQuestionOrDisplayMsg();
  }
});

function createPixelGrid(image, isFullClear = false) {
  const scaleFactor = isFullClear ? 1 : maxImageWidth / image.width;
  const newWidth = isFullClear ? image.width : maxImageWidth;
  const newHeight = image.height * scaleFactor;

  canvas.width = newWidth;
  canvas.height = newHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (isFullClear) {
    ctx.drawImage(image, 0, 0, newWidth, newHeight);
  } else {
    ctx.drawImage(image, 0, 0, newWidth, newHeight);
    const imgData = ctx.getImageData(0, 0, newWidth, newHeight);
    const { width, height, data } = imgData;

    const cols = Math.ceil(width / pixelSize);
    pixelGrid.style.gridTemplateColumns = `repeat(${cols}, ${pixelSize}px)`;

    pixelGrid.innerHTML = "";

    for (let y = 0; y < height; y += pixelSize) {
      for (let x = 0; x < width; x += pixelSize) {
        const i = (y * width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        pixel.style.width = `${pixelSize}px`;
        pixel.style.height = `${pixelSize}px`;

        pixelGrid.appendChild(pixel);
      }
    }
  }
}

function askQuestionOrDisplayMsg() {
  if (currentQuestionIndex < questions.length) {
    const { question, answer } = questions[currentQuestionIndex];
    const userAnswer = prompt(question);

    if (userAnswer && userAnswer.toLowerCase() === answer.toLowerCase()) {
      switch (currentQuestionIndex) {
        case 0:
          alert("Correct! 🐒");
          break;
        case 1:
          alert("Good job!");
          break;
        case 2:
          alert("Bravo! À ne pas confondre avec 'Tindouf' 🤭");
          break;
        case 3:
          alert(
            "🎉🥳🎊 Ouiiii choupi, you did it! Now wait a bit and the letter will appear.... Anytime now ....⏰ "
          );
          setTimeout(() => showLetterPopup(), 1500);
          break;
        default:
          break;
      }
      if (pixelSize >= 20) {
        pixelSize = Math.max(pixelSize - 10);
        createPixelGrid(img);
      } else {
        pixelSize = 5;
        maxImageWidth = screenWidth * 0.45;
        createPixelGrid(img, false);
      }
      currentQuestionIndex++;
    } else {
      alert("Incorrect! Try again.");
      askQuestionOrDisplayMsg();
    }
  } else {
    setTimeout(() => showLetterPopup(), 1500);
  }
}

function showLetterPopup() {
  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.padding = "20px";
  popup.style.backgroundColor = "#fff";
  popup.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  popup.style.borderRadius = "10px";
  popup.style.textAlign = "center";
  popup.style.zIndex = "1000";
  popup.style.pointerEvents = "auto";

  const letterContainer = document.createElement("div");
  letterContainer.style.fontFamily = "'Dancing Script', cursive";
  letterContainer.style.fontSize = "1.2em";
  letterContainer.style.backgroundColor = "#fdf3e6";
  letterContainer.style.border = "2px solid #e2c7a0";
  letterContainer.style.borderRadius = "15px";
  letterContainer.style.padding = "20px";
  letterContainer.style.maxWidth = "1500px";
  letterContainer.style.margin = "0 auto";
  letterContainer.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  letterContainer.style.textAlign = "center";
  letterContainer.style.lineHeight = "1.8";
  letterContainer.style.maxHeight = "60vh";
  letterContainer.style.overflowY = "auto";
  letterContainer.style.paddingBottom = "40px";

  letterContainer.innerHTML = `
    <p style="margin-bottom: 15px;">💌 Boobeenoo, chéri, houbi, mon petit couscous, [insert all other 19303049 nicknames I gave you],</p>
    <p style="margin-bottom: 15px;">
      First of all, I hope you’re feeling better and that the fever has passed. I so wish I could’ve been there to take care of you (though I know you’re in good hands).

I’ve been trying to find the right inspiration to write this letter to you, to convey to you everything I feel for you, but it’s hard to put it into words, as talkative as I am! (Unless your name is AB and you write like Shakespeare 😎🤓).
</p>
<p>
I’ve been thinking about how to start this letter off for a week now, but I can’t seem to find the right opening sentence, and I keep circling back to one word: love.
</p>
<p>
There’s a reason the song goes like “What is love, baby don’t hurt me, don’t hurt me...🎵”. It’s not easy to put yourself out there and be vulnerable with someone. As Freud once said, “We are never so vulnerable as when we love.”
</p>
<p>
If I’m being honest, the bigger part of me wanted to make absolutely sure it was love before saying it. But also, another part of me, and perhaps the more cautious part, wanted to hold back a little longer and delay it. Because delaying it also meant delaying the hurt that could come with a potential deception. Also, you are the master of your unspoken words, but once they’re spoken, you become a slave to them. So I pretended not to see what was right in front of me, until I couldn’t pretend any longer.
</p>
<p>
Someone once said, “To love is to allow someone to hurt you, but to trust that they won’t.”

However people choose to define it, all I know is this: I love you, I trust you, and you’ve become so important to me. I once told you that you’re one of the best gifts Allah has bestowed upon me, and that I hoped to never take that gift for granted. I meant it then, and I mean it even more now. My wish is to always cherish you, love you, support you, and stand by your side through it all. The ups and the downs, the highs and the lows, and grow stronger and stronger together.
</p>
<p>
Happy 30th, my love. Here’s to many more years together, inshaAllah. ❤️
    </p>
  `;

  popup.appendChild(letterContainer);

  const closeBtn = document.createElement("button");
  closeBtn.innerText = "X";
  closeBtn.id = "close-popup";
  closeBtn.style.marginTop = "10px";
  closeBtn.style.padding = "10px 20px";
  closeBtn.style.backgroundColor = "#ff6961";
  closeBtn.style.color = "#fff";
  closeBtn.style.border = "none";
  closeBtn.style.borderRadius = "5px";
  closeBtn.style.fontFamily = "'Roboto', sans-serif";
  closeBtn.style.cursor = "pointer";
  popup.appendChild(closeBtn);

  document.body.appendChild(popup);

  const allElements = document.body.children;
  for (let element of allElements) {
    if (element !== popup) {
      element.style.pointerEvents = "none";
    }
  }

  popup.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  closeBtn.addEventListener("click", () => {
    popup.remove();
    for (let element of allElements) {
      element.style.pointerEvents = "auto";
    }
  });
}
